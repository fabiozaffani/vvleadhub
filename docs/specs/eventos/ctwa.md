# CTWA — anúncio→WhatsApp direto

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§9.3) · **Tom:** trabalho

Click-to-WhatsApp: formato de anúncio que abre o WhatsApp direto, sem passar pelo site. Decidido na D-14. É um caso de borda do loop fechado (ver [`loop-fechado.md`](loop-fechado.md)) — a conversão qualificada de volta segue a mesma mecânica, com match degradado por falta de `ctwa_clid`.

---

Click-to-WhatsApp é formato de primeira classe no segmento (Brasil, mobile, WhatsApp-first) e **não passa pelo site**: sem página, sem xcode de URL, sem cookie. Caminho: anúncio CTWA → conversa no WhatsApp (Kommo) → card.

## 1. Validação Kommo (12/06/2026 — pesquisa na doc oficial + API)

A Kommo **não expõe `referral`/`ctwa_clid`** ao integrador — nem na API de Chats, nem no metadata de unsorted da categoria `chats` (só a categoria `forms` traz `referer`/`visitor_uid`). O que ela entrega de fato: (a) **UTMs do anúncio CTWA na aba "Tracking data" do card** (integração nativa WhatsApp Cloud API) — exige WABA e conta de anúncios no **mesmo Meta Business Manager** + permissão de leitura de metadados de anúncio na integração; (b) uma **WhatsApp Conversion API própria** (eventos de lead/compra de volta à Meta) — caixa-preta, sem `ctwa_clid` para o integrador.

## 2. Dois canais de tracking (não confundir)

(1) **texto pré-preenchido** do anúncio — aparece na caixa do cliente, **editável/apagável**: canal frágil, não usar para atribuição; (2) **objeto `referral`** — `ctwa_clid`/`source_id`/`source_url` colados à primeira mensagem **no nível do protocolo**, o cliente não toca: canal robusto. O `referral` **não viaja pela mensagem** — então não há o que parsear no texto. O gap do v1 não é fragilidade; é que **o Kommo consome o `referral` e não o expõe via API** (só os UTMs na aba Tracking data).

## 3. O que se perde sem `ctwa_clid` (menos do que parece)

Origem de campanha/anúncio **não se perde** (UTMs na Tracking data do card). Perde-se o join determinístico clique↔lead. Mas para CTWA o **telefone é substituto forte**: o Meta correta o handoff clique→conversa e guarda a ponte `ctwa_clid`↔telefone↔conversa do lado dele — fecha "conversa iniciada" nativamente e, quando devolvemos a conversão qualificada via CAPI **chaveada por telefone hasheado**, resolve de volta ao clique. Match bem melhor que público web frio. O `ctwa_clid` só seria mais determinístico nas bordas.

## 4. Dois pipelines opostos — não confundir (esclarece dúvida recorrente)

(a) **reporting** Meta→nós (Ads Manager / Marketing Insights API, *pull*): cliques, "conversas iniciadas", custo, e a **lacuna de abandono**; (b) **otimização** nós→Meta (CAPI, *push*): conversões de qualificação chaveadas por telefone. O CAPI **não mede abandono** — só otimiza/atribui fundo de funil. O abandono lê-se do reporting, sem enviar nada de volta.

## 5. "Abriu e não enviou" não é evento — é ausência de evento

O Meta só mede o **clique** e a **conversa iniciada** (= primeira mensagem **enviada**; é nela que o `referral` é anexado). Entre os dois há caixa-preta não instrumentada: quem abre e não envia não gera mensagem, logo não toca Kommo nem o HUB — **invisível para nós por construção**. O cohort = `cliques − conversas iniciadas`, **ambos métricas nativas do Ads Manager** (não se deriva cruzando nossos telefones). Disponível só em **agregado por campanha/anúncio** — nunca por pessoa (quem abandonou é anônimo: o Meta tem só o clique, nós não temos nada). Se quisermos no painel, é um job de *pull* da Insights API (não o CAPI); diagnóstico de criativo/expectativa, não otimização (o objetivo "conversas" do Meta já enviesa para prováveis-remetentes). Não construir nada custom para perseguir esse número.

## 6. Desenho v1 (registrado)

- **Entrada:** UTMs nativos no Tracking data → origem/campanha gravada no card e refletida no painel. Setup do mesmo BM + permissão de leitura de metadados é **pré-requisito de Fase 3** (critério em [`../../roadmap/fases.md`](../../roadmap/fases.md)) — sem ele a Tracking data nem popula. UTM/nomes de campanha distintos de CTWA vs link-ad para o painel separar por card.
- **Loop de volta:** nossos eventos (`lead_qualificado` com valor — ver [`loop-fechado.md`](loop-fechado.md)) seguem via CAPI **casados por telefone hasheado** — match degradado sem `ctwa_clid`, porém funcional. A Conversion API da Kommo entra em **teste de sandbox**; se o comportamento for aceitável (evento certo, sem duplicar com os nossos), assume o sinal de otimização específico do CTWA.
- **Por que o redirect estilo `wa.link` não se aplica ao CTWA nativo:** o anúncio CTWA não tem campo de URL de destino — o número é escolhido no dropdown do Business Manager e o app abre o WhatsApp nativamente, com o `referral` por baixo. Não há hop HTTP onde inserir um interstitial. O truque de redirect (capturar clique → `wa.me`) só existe em **link/URL**, não no formato CTWA.
- **Escada de captura (ranqueada — escala-se por evidência do painel, não por antecipação):**
  - **A — CTWA nativo (v1, default):** número no dropdown do BM; atribuição por UTM no Tracking data + conversão phone-matched; sem `ctwa_clid`. Build zero, melhor entrega nativa (otimização por conversa + janela 72h grátis).
  - **B — Link-ad + redirect próprio (1º degrau de escalada):** trocar o formato por anúncio de tráfego/link → **interstitial no nosso domínio** (captura `fbclid`→`fbc`, dispara Pixel/`Lead`, injeta xcode na mensagem) → `wa.me` → conversa nativa no número do Kommo. Dá atribuição **completa** (`fbc` server-side + xcode no card) por um endpoint de redirect barato. **Não é broker:** o interstitial sai antes da conversa começar — não toca o transporte de mensagem das SDRs, não colide com a arquitetura (ver [`../../system/arquitetura.md`](../../system/arquitetura.md), §2) nem INV-08. Custo é de **mídia**: perde a otimização-por-conversa e a janela de 72h do CTWA nativo; deep-link de `wa.me` em browser in-app é levemente menos confiável. A↔B é teste A/B de mídia comparado por card (CPL + qualidade).
  - **C — Broker no número (último recurso, raro):** só se o formato CTWA nativo for inegociável **E** o `ctwa_clid` real for necessário. Cloud API/BSP em **número dedicado ao tráfego CTWA** + bridge escopado ao Kommo (canal custom via API de Chats), `ctwa_clid` em campo personalizado (`PATCH /api/v4/leads/{id}`), CAPI de business messaging nosso. O número principal das SDRs **nunca** passa por middleware (o webhook do Cloud API é exclusivo por número; virar broker do número principal colide com a arquitetura — ver [`../../system/arquitetura.md`](../../system/arquitetura.md), §2 / INV-08). Dedup D-11 unifica os números pelo telefone. Custo: bridge a manter + aquecimento de quality rating do 2º número.
- **Dedup:** D-11 cobre normalmente (telefone E.164; dispara por card).
- Round-trip de teste em sandbox é critério de aceite da Fase 3 (ver [`../../roadmap/fases.md`](../../roadmap/fases.md)).

## 7. Janela de 72h (Meta)

Conversa iniciada por CTWA abre o *free entry point* de 72h — mensagem livre, sem custo e sem template aprovado durante a janela; depois dela vale a janela padrão de 24h e template pago. Converge com o SLA ≤ 72h do loop (ver [`loop-fechado.md`](loop-fechado.md)): qualificar dentro da janela é sinal de otimização no prazo **e** conversa ainda gratuita.
