# 05 · Spec — Event HUB & Mensuração

**Status:** v2 (D-3 fechado: PostHog + cola fina) · **Camada de tom:** trabalho · **Depende de:** 02 (Fundação), 03 (Arquitetura)
**Responsabilidade única:** a espinha de captura, persistência e distribuição de eventos — incluindo **modo de teste, realtime e saúde de integração** — e o painel interno de mensuração. O 06 (Tracker Hub) **opera** estas capacidades, não as redefine.

> **Decisão fechada (00 §6):** o pipeline **não é construído — é composto**: **PostHog** = captura, store, análise, replay, flags/experimentos **e fan-out a plataformas de mídia via Destinations**. O que é nosso é a **cola fina no api-server**: endpoint `/collect`, integração bidirecional com Kommo, **loop fechado** de conversão qualificada e consent gate. O catálogo de Destinations deve ser confirmado na implementação; canal sem conector nativo entra por webhook → api-server → API do canal.

---

## 1. Princípios

1. **First-party.** Captura por domínio próprio (ex.: `t.valeverdefestas.com.br`). Resiliência a ad-blocker, cookies longevos.
2. **Server-side nos destinos.** Conversões via APIs server-side; pixel client-side só como complemento com dedupe.
3. **Contrato único.** Um schema canônico (§4). Todo destino mapeia a partir dele. Nova plataforma = novo **adapter**.
4. **Consentimento é gate** (§6). Build diferido; gancho ativo.
5. **Não bloquear a página.** Captura assíncrona/batched; nunca degrada CWV.
6. **Loop fechado** (§9). O desfecho do Kommo retorna e alimenta os canais pagos.
7. **Teste nunca contamina produção** (§11). Eventos de teste são segregados de ponta a ponta.
8. **Compor, não construir.** PostHog cobre o commodity; código próprio só na cola que nenhuma plataforma entrega (Kommo, loop fechado, consent na nossa regra).

---

## 2. Arquitetura do HUB

```mermaid
flowchart TB
    C["Collector first-party<br/>(SDK PostHog + eventos custom, batched)"]
    I["/collect (api-server, domínio próprio)"]
    G{"Consent gate (api-server)"}
    PH["PostHog<br/>store · análise · replay · flags/exp"]
    DST["PostHog Destinations<br/>(fan-out server-side)"]
    ADS["Meta · Google · TikTok · Pinterest"]
    KM["Kommo (lead in / desfecho out)"]
    GLUE["Cola fina (api-server)<br/>loop fechado · conversão qualificada"]
    RT["Realtime → Tracker Hub (06)"]

    C -->|analytics: proxy CF first-party (D-15)| PH
    C -->|eventos de negócio| I
    I --> G
    G -->|sempre, anonimiza se preciso| PH
    PH -->|se consent.marketing| DST --> ADS
    PH -.live events.-> RT
    I -->|lead| KM
    KM -->|webhook desfecho| GLUE --> ADS
    GLUE --> PH
```

---

## 3. Collector (client SDK)

Captura sem bloquear render:
- `page_view`, `route_change`, `page_enter`/`page_exit`, tempo na página
- `scroll_depth` (25/50/75/100%)
- `cta_click` e cliques rastreáveis (heatmap-lite)
- `form_start`, `form_field`, `form_submit`, `lead`, `whatsapp_handoff`
- `experiment_exposure`

Características: **batched**, `navigator.sendBeacon`, `event_id` por evento (dedupe), `anonymous_id`/`session_id` em cookie first-party, carregamento deferido.

**Split de ingestão (D-15):** o tráfego de analytics do SDK vai por **proxy reverso no Cloudflare** (domínio first-party → PostHog Cloud — padrão suportado pelo PostHog; o Cloudflare já está na frente por D-2), **sem tocar o api-server**. O `/collect` fica com o que é de negócio: `lead`, conversões, eventos server-side e tudo que alimenta Kommo/loop. Beacon de analytics nunca depende da disponibilidade do Express/Replit — perda silenciosa de evento é "surpresa" (INV-08).

**Click IDs (D-14):** o collector persiste, junto de UTM/xcode, os click IDs das plataformas (`fbclid`→`fbc` + `fbp` do pixel, `gclid`, `ttclid`, `epik`) em cookie first-party — eles viajam no contexto do evento (§4) e no contrato de lead (04 §7). Sem eles, o match quality do CAPI/EC4L despenca; e click ID não tem retrofit.

---

## 4. Schema canônico de evento (o contrato)

Vocabulário pós-rename (02): `subjects[]` + `objective`, **nunca** `venue`.

```json
{
  "event_id": "uuid-v4",
  "event_name": "scroll_depth",
  "timestamp_client": "2026-06-10T14:03:11.221Z",
  "anonymous_id": "first-party-id",
  "session_id": "session-id",
  "brand": "VVF",
  "test": false,
  "consent": { "analytics": true, "marketing": false },
  "context": {
    "url": "https://valeverdefestas.com.br/lp/...",
    "referrer": "...",
    "utm": { "source": "", "medium": "", "campaign": "", "content": "" },
    "xcode": "CP-...",
    "click_ids": { "fbc": "", "fbp": "", "gclid": "", "ttclid": "", "epik": "" },
    "correlation_id": "reservado (join key — value-mapping diferido)",
    "lp": { "id": "", "molde": "", "variant": "a" },
    "subjects": [ { "ref": "acqua", "type": "espaço" } ],
    "objective": "handoff_whatsapp",
    "experiment": { "key": "", "variant": "" }
  },
  "params": { "depth_pct": 75 }
}
```

Campo `test` (§11): quando `true`, o evento atravessa todo o pipeline mas é roteado para endpoints de teste/sandbox e **excluído** do store de produção. Regra: adicionar destino = escrever `Destino.map(event)`. O evento é definido **uma vez**.

---

## 5. Intake & enrich

1. **Intake:** recebe lotes no endpoint first-party, valida schema, responde rápido (não espera terceiros).
2. **Enrich:** timestamp de servidor, IP→geo, parse de user-agent, stitching de sessão, **hash de PII** para Advanced/Enhanced Matching.

---

## 6. Consent gate (gancho LGPD — build diferido)

- Eventos de **marketing** só seguem se `consent.marketing = true`.
- **Analytics interno** persiste sempre, anonimizado/agregado sob interesse legítimo, respeitando opt-out.
- Hoje **pass-through** (sem efeito) até o build de LGPD (D-5). Campo e passo já existem.

---

## 7. Event Store (decidido: PostHog Cloud)

O PostHog **Cloud** (com captura first-party via proxy pelo domínio próprio; região a definir no setup, com olho na LGPD) é o store e a camada de análise. Self-host fica como **fallback documentado** caso o build de LGPD (D-5) exija dado em casa — o contrato de evento (§4) é idêntico nos dois, então a troca não é rebuild — funis, replay, heatmap, flags/experimentos prontos. O painel executivo (§12) e o Tracker Hub (06) consomem via API/embed. Eventos `test:true` ficam em namespace/projeto segregado.

---

## 8. Destinos (fan-out)

**Default: PostHog Destinations** faz o envio server-side aos canais de mídia. **Fallback** para canal sem conector: webhook PostHog → api-server → API do canal (um `map(event)` puro + testes). Kommo e a conversão qualificada do loop fechado são sempre da cola fina (api-server).

| Destino | Caminho default | Complemento client (dedupe) | Endpoint de teste (§11) |
|---|---|---|---|
| Meta | Destinations → Conversions API | Pixel | Test Events (`test_event_code`) |
| Google | Destinations → GA4/Ads (ou fallback) | Google Tag | Validation/Debug |
| TikTok | Destinations → Events API (ou fallback) | Pixel | `test_event_code` |
| Pinterest | Destinations/fallback → Conversions API | Tag | modo teste |
| **Kommo** | cola fina: API (lead in) + webhook (desfecho out) | — | pipeline/lead de teste |
| WhatsApp | via Kommo (D-6) | — | sandbox |

---

## 9. Loop fechado (Kommo → HUB → mídia)

1. **Criação de card emite `lead`** (webhook Kommo → cola fina → PostHog) em **todos** os caminhos — inclusive o A (`wa.me`), onde parte dos cliques nunca vira mensagem: a conversão real é o card, não o clique; o funil mede `whatsapp_handoff` vs `lead` e expõe o vazamento (04 §5). *Mecanismo: webhooks da Kommo (push) — a API de Events dela é pull/auditoria histórica e não serve a tempo real.*
2. Kommo emite os marcos do funil — `visita_agendada` / `visita_realizada` / `no_show` (D-14) — e o desfecho — `Ganho` / `Perdido` + motivo / `Pipeline Recuperável` — via webhook à cola fina (api-server).
3. A cola grava no PostHog (painel) **e** dispara conversão qualificada aos canais pagos (CAPI/offline conversions/EC4L), casando por `click_ids`/telefone/`event_id`/`correlation_id`.
4. Sem isso, Meta/Google otimizam por clique/preenchimento, não por lead qualificado.
5. **Dedup do loop (D-11):** `lead_qualificado`/`ganho` disparam **por card** (idempotência pela identidade do card no Kommo), nunca por interação — evita reportar conversão duplicada e inflar o CPA artificialmente.
6. **Tempo é requisito (D-14):** o ciclo de venda é longo, mas a janela útil de otimização das plataformas é de **dias** — `ganho` chega tarde e serve a reporting/audiências, não a bidding. O sinal de qualidade que otimiza é `lead_qualificado` com **SLA de qualificação ≤ 72h** (acordado com a SDR; nuance na implementação, como D-11). *Enforcement é nosso, não da Kommo (que não monitora SLA nativamente): timer na cola fina via webhook de card, ou automação no Digital Pipeline/Salesbot.* E a aritmética de volume manda: no alvo M-03/M-04 (~90 leads/semana na conta inteira), evento raro não sustenta learning phase por ad set — **otimização primária roda em `lead`**; qualificado entra como sinal secundário/consolidado.
7. **Valores (D-14):** `lead_qualificado`/`ganho` carregam **valor por faixa** derivado da matriz M-02 (configuração × dia) para value-based bidding — a plataforma aprende a puxar perfil de sábado/pacote cheio, não volume barato. É telemetria server-side às plataformas, não comunicação: **INV-05 intacto** (aval registrado na D-14).

Eventos adicionais ao catálogo (origem: Kommo): `lead` (criação de card), `lead_qualificado`, `visita_agendada`, `visita_realizada`, `no_show`, `ganho`, `perdido`.

### 9.1 Ingestão de lead forms nativos (D-13)

Leads gerados **dentro das plataformas** (Meta Instant Forms/Lead Ads, TikTok Lead Generation, Google Lead Form assets, Pinterest Lead Ads) nunca tocam o site. Caminho: webhook da plataforma → api-server (cola fina) → normalização para o contrato de lead (04 §7, com `origin_channel` da plataforma e metadados do formulário) → **dedup D-11** (telefone E.164, upsert-e-anexar) → card no Kommo. Consequências: (a) o loop fechado cobre esses leads sem trabalho extra (dispara por card); (b) a atribuição os enxerga (campanha/form id no lugar do xcode de página); (c) campanhas de lead form viram formato utilizável sem furo de funil. Evento `lead` correspondente é emitido ao PostHog para o painel.

**Portais/marketplaces sem webhook** (ex.: portais de casamento que entregam lead por e-mail/painel): parse de e-mail na cola fina **ou** entrada manual etiquetada no Kommo (`origin_channel: marketplace`) — mecânica decidida na Fase 3; até lá, entrada manual etiquetada. O dedup D-11 e o loop cobrem ambos os casos (disparam por card).

### 9.2 Sync de audiências (D-13)

Capacidade da cola fina (ou Destinations, onde houver conector): exportar **segmentos do funil** — ex.: cards `Ganho`, `lead_qualificado`, visitantes de alta intenção — como **custom audiences** (Meta Customer List, Google Customer Match, TikTok Audiences) com PII **hasheada**. É o que semeia lookalikes de alta qualidade, a prática nº 1 dos playbooks do segmento. Sync é incremental e idempotente.

**Gate desde o dia 1 (auditoria growth):** o sync exporta **somente leads com o opt-in mínimo do form registrado** (o gancho da D-5 que já existe por decisão) — exportar PII sem nenhum registro de consentimento é o flanco LGPD mais exposto do sistema, e fechá-lo custa zero. Quando o consent gate pleno ativar (Fase 4), ele assume; isso não antecipa o build diferido da D-5, só usa o gancho existente.

### 9.3 CTWA — anúncio→WhatsApp direto (D-14)

Click-to-WhatsApp é formato de primeira classe no segmento (Brasil, mobile, WhatsApp-first) e **não passa pelo site**: sem página, sem xcode de URL, sem cookie. Caminho: anúncio CTWA → conversa no WhatsApp (Kommo) → card.

**Validação Kommo (12/06/2026 — pesquisa na doc oficial + API):** a Kommo **não expõe `referral`/`ctwa_clid`** ao integrador — nem na API de Chats, nem no metadata de unsorted da categoria `chats` (só a categoria `forms` traz `referer`/`visitor_uid`). O que ela entrega de fato: (a) **UTMs do anúncio CTWA na aba "Tracking data" do card** (integração nativa WhatsApp Cloud API) — exige WABA e conta de anúncios no **mesmo Meta Business Manager** + permissão de leitura de metadados de anúncio na integração; (b) uma **WhatsApp Conversion API própria** (eventos de lead/compra de volta à Meta) — caixa-preta, sem `ctwa_clid` para o integrador.

**Dois canais de tracking (não confundir):** (1) **texto pré-preenchido** do anúncio — aparece na caixa do cliente, **editável/apagável**: canal frágil, não usar para atribuição; (2) **objeto `referral`** — `ctwa_clid`/`source_id`/`source_url` colados à primeira mensagem **no nível do protocolo**, o cliente não toca: canal robusto. O `referral` **não viaja pela mensagem** — então não há o que parsear no texto. O gap do v1 não é fragilidade; é que **o Kommo consome o `referral` e não o expõe via API** (só os UTMs na aba Tracking data).

**O que se perde sem `ctwa_clid` (menos do que parece):** origem de campanha/anúncio **não se perde** (UTMs na Tracking data do card). Perde-se o join determinístico clique↔lead. Mas para CTWA o **telefone é substituto forte**: o Meta correta o handoff clique→conversa e guarda a ponte `ctwa_clid`↔telefone↔conversa do lado dele — fecha "conversa iniciada" nativamente e, quando devolvemos a conversão qualificada via CAPI **chaveada por telefone hasheado**, resolve de volta ao clique. Match bem melhor que público web frio. O `ctwa_clid` só seria mais determinístico nas bordas.

**Desenho v1 (registrado):**
- **Entrada:** UTMs nativos no Tracking data → origem/campanha gravada no card e refletida no painel. Setup do mesmo BM + permissão de leitura de metadados é **pré-requisito de Fase 3** (critério no 03 §7.1) — sem ele a Tracking data nem popula. UTM/nomes de campanha distintos de CTWA vs link-ad para o painel separar por card.
- **Loop de volta:** nossos eventos (`lead_qualificado` com valor — §9) seguem via CAPI **casados por telefone hasheado** — match degradado sem `ctwa_clid`, porém funcional. A Conversion API da Kommo entra em **teste de sandbox**; se o comportamento for aceitável (evento certo, sem duplicar com os nossos), assume o sinal de otimização específico do CTWA.
- **Por que o redirect estilo `wa.link` não se aplica ao CTWA nativo:** o anúncio CTWA não tem campo de URL de destino — o número é escolhido no dropdown do Business Manager e o app abre o WhatsApp nativamente, com o `referral` por baixo. Não há hop HTTP onde inserir um interstitial. O truque de redirect (capturar clique → `wa.me`) só existe em **link/URL**, não no formato CTWA.
- **Escada de captura (ranqueada — escala-se por evidência do painel, não por antecipação):**
  - **A — CTWA nativo (v1, default):** número no dropdown do BM; atribuição por UTM no Tracking data + conversão phone-matched; sem `ctwa_clid`. Build zero, melhor entrega nativa (otimização por conversa + janela 72h grátis).
  - **B — Link-ad + redirect próprio (1º degrau de escalada):** trocar o formato por anúncio de tráfego/link → **interstitial no nosso domínio** (captura `fbclid`→`fbc`, dispara Pixel/`Lead`, injeta xcode na mensagem) → `wa.me` → conversa nativa no número do Kommo. Dá atribuição **completa** (`fbc` server-side + xcode no card) por um endpoint de redirect barato. **Não é broker:** o interstitial sai antes da conversa começar — não toca o transporte de mensagem das SDRs, não colide com 03 §2 nem INV-08. Custo é de **mídia**: perde a otimização-por-conversa e a janela de 72h do CTWA nativo; deep-link de `wa.me` em browser in-app é levemente menos confiável. A↔B é teste A/B de mídia comparado por card (CPL + qualidade).
  - **C — Broker no número (último recurso, raro):** só se o formato CTWA nativo for inegociável **E** o `ctwa_clid` real for necessário. Cloud API/BSP em **número dedicado ao tráfego CTWA** + bridge escopado ao Kommo (canal custom via API de Chats), `ctwa_clid` em campo personalizado (`PATCH /api/v4/leads/{id}`), CAPI de business messaging nosso. O número principal das SDRs **nunca** passa por middleware (o webhook do Cloud API é exclusivo por número; virar broker do número principal colide com 03 §2/INV-08). Dedup D-11 unifica os números pelo telefone. Custo: bridge a manter + aquecimento de quality rating do 2º número.
- **Dedup:** D-11 cobre normalmente (telefone E.164; dispara por card).
- Round-trip de teste em sandbox é critério de aceite da Fase 3 (03 §7.1).

**Janela de 72h (Meta):** conversa iniciada por CTWA abre o *free entry point* de 72h — mensagem livre, sem custo e sem template aprovado durante a janela; depois dela vale a janela padrão de 24h e template pago. Converge com o SLA ≤ 72h do §9: qualificar dentro da janela é sinal de otimização no prazo **e** conversa ainda gratuita.

---

## 10. Confiabilidade

- **Fila/retries**: no caminho Destinations, a entrega/retry é do PostHog; na cola fina (Kommo, loop fechado, fallbacks), fila própria com **idempotência** por `event_id`, retries com backoff e **dead-letter** (exposto na saúde — §11). **Tecnologia (auditoria de delegação jun/2026): `pg-boss` sobre o Postgres existente (schema `app`)** — zero infra nova (sem Redis), dead-letter consultável pelo Tracker Hub; jobs em `api-server/src/jobs/` (09 §1.1).
- **Dedupe** pixel↔server por `event_id`.
- Observabilidade do HUB e da fila; rate-limit no endpoint de coleta (`/collect` é público por design — D-12; proteção é rate-limit + validação de schema + WAF, não auth).

---

## 11. Modo de teste, realtime e saúde de integração

As três capacidades que o **Tracker Hub do 06** opera. Definidas aqui (donas do pipeline), operadas lá (console).

**11.1 Modo de teste / validação de integração.** O HUB aceita eventos `test:true` (sintéticos, disparados do Tracker Hub). Eles atravessam o pipeline real (intake → enrich → adapters) mas:
- vão para os **endpoints de teste/sandbox** de cada destino (§8) — nunca para produção;
- ficam em **namespace segregado** no store; não entram em métricas, funis nem otimização de mídia;
- retornam um **resultado de round-trip por destino** (aceito/rejeitado + payload + resposta), para validar uma integração de ponta a ponta antes de confiar nela.

**11.2 Realtime tap.** Stream ao vivo dos eventos no intake (tail), assinável por filtro (tipo, sessão, Assunto, LP, `test`). É o que alimenta o inspetor de eventos do Tracker Hub.

**11.3 Saúde de integração.** Por destino: taxa de sucesso/erro de dispatch, latência, profundidade de fila, itens em retry e em dead-letter, timestamp da última sincronização. Permite ver "Meta está aceitando? Kommo respondeu?" em um olhar.

**11.4 Replay/depuração.** Reenviar um `event_id` específico (idempotente) para depurar um destino. Ação sensível → restrita a Admin (06 §6).

---

## 12. Painel de mensuração interno

Lê do store, **agregando por `type` de Assunto e por Assunto** (ambos dados — não quebra quando o portfólio muda):
- Scroll & engajamento por LP/página.
- Click maps / heatmap-lite.
- Fluxo de navegação: entrada → saída, caminhos, bounce.
- **Funil M-04**: LP → form_start → lead/handoff → (visita → venda, do Kommo).
- Conversão por variante (+ significância — detalhe no 08).
- Atribuição por canal/UTM (lead **qualificado**, não só clique).
- Session replay (se Opção A), PII mascarada, respeitando consentimento.

---

## 13. Catálogo de eventos canônicos

`page_view` · `route_change` · `page_enter` · `page_exit` · `scroll_depth` · `cta_click` · `whatsapp_handoff` · `form_start` · `form_field` · `form_submit` · `lead` · `experiment_exposure` · `lead_qualificado` · `visita_agendada` · `visita_realizada` · `no_show` · `ganho` · `perdido`.

---

## 14. Decisões & diferidos (fonte: 00 §6)

- **D-3** — **fechado: PostHog** (incl. Destinations). Catálogo de conectores a confirmar na implementação; fallback definido (§8).
- **D-5** (LGPD) — diferido; consent gate como pass-through. Sync de audiências (§9.2) gated pelo opt-in mínimo desde o dia 1.
- **D-14** — **fechado: atribuição de plataforma** — click IDs no contrato (§3/§4), CTWA (§9.3), valores por faixa e SLA ≤ 72h no loop (§9), eventos de visita (§13).
- **D-15** — **fechado: split de ingestão** — analytics via proxy CF→PostHog; `/collect` para eventos de negócio (§3).
- **Join key** — `correlation_id` reservado; value-mapping diferido.

---

## 15. Validação contra invariantes VVF

- **Tom:** spec = trabalho ✓
- **INV-08 (sem surpresas, operação):** fila + idempotência + retries + dead-letter + modo de teste = mensuração estável e verificável ✓
- **Performance:** captura assíncrona/batched, server-side nos destinos ✓
- **Agnosticidade:** contrato único + adapters; store e plataforma plugáveis ✓
- **Cornerstone #3 (transparência):** consent gate de primeira classe; teste segregado de dados reais ✓
