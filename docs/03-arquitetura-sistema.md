# 03 · Arquitetura do Sistema

**Status:** v2 (decisões fechadas) · **Camada de tom:** trabalho · **Depende de:** 01, 02
**Responsabilidade única:** a forma do sistema — stack, hosting, fronteiras de runtime, SEO/performance, segurança, modelo de dados e roadmap. O detalhe do pipeline de eventos vive no **05**; o admin no **06**; LPs no **04**.

---

## 0. TL;DR

Monorepo (pnpm workspaces) com três runtimes desacoplados: **site público em Astro** (server-rendered, SEO/CWV máximos), **admin em Payload CMS** (Next-hosted, conteúdo + Tracker Hub) e **api-server Express** (cola fina: collect, Kommo, loop fechado). **Cloudflare na frente** de tudo (DNS/CDN/WAF); runtime/deploy a definir na Fase 0b (D-18). **PostHog** como espinha de analytics *e* dispatcher (Destinations). **Kommo** é o CRM/central conversacional — integração bidirecional. Tensão central permanentemente gerenciada: tracking não pode degradar CWV, e CWV é o SEO.

---

## 1. Decisões fechadas (log canônico no 00 §6)

| ID | Decisão |
|---|---|
| D-1 | **Híbrido:** custom no diferencial (site, LPs, cola Kommo/loop, Tracker Hub); plataforma madura no commodity (Payload p/ conteúdo+admin; PostHog p/ eventos+análise+dispatch) |
| D-2 | **Cloudflare na frente** (DNS/CDN/WAF/edge — intacto); site público **server-rendered em Astro** (condição inegociável). *A base de runtime/deploy original (Replit) foi removida pela D-18 (jun/2026); runtime/deploy a definir na Fase 0b.* |
| D-3 | **PostHog** (captura, store, funis, replay, flags/experimentos **e Destinations** como dispatcher) |
| D-4 | **Kommo** (CRM + WhatsApp central), bidirecional |
| D-6 | **WhatsApp via Kommo** (resolvido por consequência) |
| D-14 | **Atribuição de plataforma:** click IDs first-party desde a Fase 1, CTWA (05 §9.3), valores por faixa + SLA ≤ 72h no loop, eventos de visita |
| D-15 | **Split de ingestão:** analytics via proxy CF → PostHog; `/collect` só para eventos de negócio + cola |
| — | Diferidos com gancho: LGPD (consent pass-through + opt-in mínimo) · join key (campo `correlation_id` reservado) |

---

## 2. Topologia

```mermaid
flowchart TB
    subgraph CF["Cloudflare (DNS · CDN · WAF · cache)"]
    end

    subgraph Runtime["Monorepo — 3 deployments · subdomínios"]
        SITE["site (Astro, output:'server')<br/>institucional · LPs · blog · bio pages"]
        ADMIN["admin (Payload CMS / Next)<br/>conteúdo + Tracker Hub (06)"]
        API["api-server (Express + Postgres/Drizzle)<br/>/collect · cola Kommo · loop fechado · links xcode"]
    end

    PH["PostHog<br/>store · análise · replay · flags/exp · Destinations"]
    KOMMO["Kommo (CRM · WhatsApp · cadências)"]
    ADS["Meta · Google · TikTok · Pinterest"]

    CF --> SITE & ADMIN & API
    SITE -->|conteúdo (OpenAPI/local)| ADMIN
    SITE -->|analytics (proxy CF first-party — D-15)| PH
    SITE -->|eventos de negócio| API
    API --> PH
    PH -->|Destinations| ADS
    API <-->|lead in / desfecho out| KOMMO
    API -->|conversão qualificada| ADS
```

Fronteiras de propriedade:
- **site (Astro):** renderização pública. Zero lógica de API própria; consome conteúdo do Payload. Eventos: analytics do SDK via proxy reverso no Cloudflare → PostHog (D-15 — não passa pelo api-server); **eventos de negócio** (lead, conversões) ao `/collect`.
- **admin (Payload):** dono do **conteúdo** (Assuntos, LPs, blocos, posts, mídia, registros) + shell do Tracker Hub (views custom). Detalhe no 06.
- **api-server (Express):** dono da **operação** — endpoint `/collect`, cola Kommo (lead in/desfecho out), disparo de conversão qualificada, geração de links xcode. Detalhe no 05.
- **PostHog:** dono de store/análise/experimentos e do **fan-out** a plataformas de mídia via Destinations (catálogo de conectores a confirmar na implementação; o que faltar entra como webhook→api-server).
- **Kommo:** dono da conversa, cadências, funil SDR/Closer, qualificação. A plataforma nunca reconstrói isso.

**Hosting (resolve "proxy por caminho" — auditoria de delegação jun/2026):** os três runtimes são **deployments separados sob subdomínios** roteados no DNS da Cloudflare (`www` → site · `admin.` → admin · `api.`/`t.` → api-server), não um path-proxy num único deploy. O `t.` é o domínio first-party do analytics (proxy reverso → PostHog, D-15). Mantém as fronteiras de runtime físicas e simplifica cache/WAF por host.

---

## 3. Stack

| Camada | Escolha | Nota |
|---|---|---|
| Site público | **Astro** (SSR/SSG/ilhas React) | mínimo JS por padrão → CWV agressivo por construção; A/B server-side sem flicker |
| Admin/CMS | **Payload CMS** (Next-hosted) | blocks, versionamento, live preview, RBAC prontos; Postgres adapter (Drizzle por baixo) |
| API operacional | **Express 5 + PostgreSQL + Drizzle** | build novo (greenfield — D-7); contrato **OpenAPI** como fonte de verdade + codegen → `packages/contracts/generated` |
| Eventos/análise | **PostHog** | self-hosted ou cloud, sob domínio próprio |
| Linguagem | TypeScript end-to-end | contratos tipados = AI-buildable |
| Edge | **Cloudflare** | CDN/WAF/cache/rate-limit na frente dos três runtimes |
| Mídia (D-10) | **Cloudflare R2 + Images** | originais no R2 (plugin de storage do Payload; nada no filesystem do runtime); derivados responsivos AVIF/WebP on-the-fly via Images |

---

## 4. SEO & performance (o site)

**Renderização:** Astro em **`output: 'server'`** (adapter Node). Institucional e blog são **prerenderizados** por página (`export const prerender = true`) e servidos do **cache do Cloudflare**; LPs com variante de A/B resolvidas **no servidor** (zero flicker, SSR por hit). **Sem ISR** — Astro não tem ISR: o "incremental" é o **purge por URL no publish** (item 2.2.4), não revalidação por TTL. Admin sem indexação. *(Clarificação da auditoria de delegação jun/2026: "SSG/ISR" era vocabulário de Next; em Astro o estático-na-prática vem de prerender + cache de edge + purge.)*

**Orçamento de CWV (hard gate de deploy):** LCP < 2,5s (alvo < 1,8s) · INP < 200ms · CLS < 0,1 · JS inicial em rota de marketing mínimo (Astro: zero por padrão) · imagens AVIF/WebP responsivas servidas pelo pipeline D-10 (R2 + Cloudflare Images, on-the-fly) · fontes conforme **Design Guidelines** (`brand/vvf-design-guidelines.md` §3): Playfair Display (títulos) + Work Sans (corpo) — exceção registrada ao brand guide; Sloop Script Pro fora de uso. Carregamento não-bloqueante.

**SEO técnico:** JSON-LD (`EventVenue`/`LocalBusiness` por espaço, `Article`, `BreadcrumbList`, `FAQPage`, `VideoObject` para vídeo-tours — D-13) · sitemap/robots automáticos · canonical · OG/Twitter cards · URLs limpas (`/casamentos`, `/blog/{slug}`, `/lp/{campanha}`) · clusters de autoridade no blog (07).

**Política de cache (D-8):** institucional/blog = cache total no CDN. LPs **sem** experimento ativo = cache total. LPs **com** experimento ativo = HTML fora do full-page cache (SSR por hit; Astro segura o CWV) com assets sempre cacheados — a LP volta ao cache total automaticamente ao encerrar o experimento. **Etapa final:** migrar para edge logic (Worker) com a variante na chave de cache, mantendo cache total também sob teste. Publicação no admin dispara purge das rotas afetadas (pendência 2.2.4 da auditoria).

**Migração do domínio (cutover):** valeverdefestas.com.br tem site no ar com posts de blog indexados. Tarefa obrigatória da virada (etapa final, junto dos diferidos): inventariar URLs indexadas (Search Console + crawl), publicar **mapa de 301** antigo→novo (foco nos posts com tração) e monitorar 404 no pós-corte. Até lá, o site atual segue intocado.

**A reconciliação tracking × performance:** collector assíncrono/batched first-party (05), A/B server-side (08), pixels de terceiro só como complemento com dedupe — é o que permite mensuração completa com "velocidade surreal".

---

## 5. Modelo de dados (entidades núcleo)

Do 02: `TipoDeAssunto` · `Assunto` · `Molde` · `Objetivo` · `Bloco` · `LP` · `BioPage` · `Post`/`Cluster` (07) · `Experimento`/`Variante`/`Flag` (08) · `Lead` (04 §contrato) · `CampaignLink{xcode, utm, wa_redirect}` · `Destination/Integration` · `AdminUser/Role` · `ConsentRecord` (diferido).
Dimensões transversais em conteúdo/evento/lead: `brand` (default VVF) · `event_type` (01 §3.1) · `subjects[]`.
Propriedade: conteúdo no Payload; operacional (leads, links, log de dispatch) no api-server; eventos no PostHog.
**Banco (D-9):** um Postgres, dois schemas — `payload` (migrado só pelo Payload) e `app` (migrado só pelo Drizzle/api-server). Regras duras: nenhuma FK atravessa schemas (referências por id, fracas, validadas na aplicação); nenhum runtime lê tabela do outro — dados alheios sempre via API (o layout de tabela é implementação privada; a API é o contrato). O site (Astro) não acessa Postgres em hipótese alguma — consome a API do Payload e envia eventos ao `/collect`.

---

## 6. Segurança & infra

HTTPS/HSTS · WAF e rate-limit (especialmente `/collect`) no Cloudflare · credenciais em secrets (nunca no client) · RBAC + auditoria no admin (06 §6) · backups do Postgres · observabilidade dos três runtimes · proteção de formulário (honeypot + rate-limit) sem fricção visível.

**CSP & CORS (auditoria de delegação jun/2026 — agente nunca acerta sozinho):** o site publica **Content-Security-Policy** com as origens de script declaradas explicitamente (self + PostHog via proxy `t.` + pixels permitidos) — nada de `unsafe-inline` para script sem nonce. O api-server define **CORS por allowlist** das origens do site/admin (subdomínios próprios) — nunca `*` reflexivo, nunca refletir o `Origin` recebido. Ambos entram como config versionada, não ad-hoc.

---

## 7. Roadmap faseado (sequência de build p/ Claude Code)

- **Fase 0 — Fundação:** monorepo (site Astro + admin Payload + api-server) · registros do 02 no Payload · design system (§5 do Contexto) · páginas institucionais + blog base · baseline SEO/CWV. *Entrega: site no ar, performante, indexável.*
- **Fase 1 — Eventos:** collector (analytics via proxy CF — D-15) + `/collect` + PostHog + Destinations (Meta, GA4) · **click IDs/UTM/xcode em cookie first-party (D-14 — sem retrofit possível)** · conversão GA4 importada no Google Ads (demand capture apto desde já) · **GBP por espaço, NAP = structured data** (pré-requisito de mídia, como as páginas legais) · consent pass-through. *Entrega: mensuração first-party + Meta e Google aptos.*
- **Fase 2 — Leads & LPs:** editor block-based · LP Retrofit (campanha viva) · contrato de lead → Kommo · speed-to-lead · links xcode no admin · feature flags server-side + motor de A/B instalado, **experimentos de LP atrás do gate de volume (08 §7)**. *Entrega: máquina de lead.*
- **Fase 3 — Cobertura & loop:** Google Ads nativo (EC4L/OCI com `gclid`) + YouTube + TikTok · **CTWA com atribuição (05 §9.3)** · **loop fechado Kommo→ads** com valores por faixa e eventos de visita (D-14) · **ingestão de lead forms nativos + sync de audiências (D-13)** · Tracker Hub completo (realtime, teste, saúde) · Pinterest: opcional, avaliado no fim da fase (não bloqueia). *Entrega: mídia completa + console.*
- **Fase 4 — Escala & diferidos:** hardening de performance · build LGPD (CMP, gating real) · value-mapping do join key · revisitar hosting se a escala apertar.

---

### 7.1 Critérios de aceite por fase (definition of done — verificáveis)

**Fase 0 — Fundação:**
- [ ] Monorepo com os 3 runtimes + `packages/contracts` builda e sobe no runtime de deploy (provedor a definir na Fase 0b — D-18); travas de fronteira ativas no CI (09 §2)
- [ ] Registros do 02 seedados (3 TiposDeAssunto; Assuntos: 5 espaços com `categoria`, serviços com `papel`; Objetivos)
- [ ] Páginas institucionais + blog base renderizando do Payload via API; paridade visual com as Design Guidelines (tokens, Playfair+Work Sans, foco/skip-link/reduced-motion)
- [ ] **Lighthouse CI verde** (home, 1 página de espaço, 1 post) dentro do orçamento §4; axe sem violações
- [ ] sitemap/robots/canonical/OG gerados; structured data validando (Rich Results Test)
- [ ] Publicar no Payload reflete no site (purge/revalidação funcionando — item 2.2.4); preview de draft funcionando (06)
- [ ] Páginas legais publicadas (placeholder jurídico aprovado pelo fundador — exigência de aprovação de ads)
- [ ] Inventário de conteúdo ativo (`docs/conteudo/inventario.md`) com dono e prazo por item; os 5 espaços seedados com **galeria real** (fotos próprias — §5 do Contexto proíbe banco)

**Fase 1 — Eventos:**
- [ ] Collector batched emitindo o catálogo (05 §13); analytics via proxy CF → PostHog e eventos de negócio → `/collect` (D-15); `subjects[]`/`objective` presentes; campo `consent` pass-through e `correlation_id` reservado
- [ ] **Click IDs (D-14)**: `fbc`/`fbp`, `gclid`, `ttclid` capturados em cookie first-party e presentes no evento e no contrato de lead
- [ ] Round-trip de teste Meta (Test Events) e GA4 (debug) verde via modo `test:true` — sem tocar produção
- [ ] Conversão GA4 importada/marcada como conversão no Google Ads (Google Search apto a otimizar por lead)
- [ ] GBP dos espaços reivindicado/criado; NAP idêntico ao structured data do site (07 §5.1)
- [ ] **Check de cobertura PostHog-first (D-17)**: verificar se o PostHog ingere custo/ads das plataformas usadas (esp. Pinterest/TikTok no BR); resultado documentado — define se o Nível 2 vai por PostHog ou por connector na Fase 3 (não é build, é validação)
- [ ] Rate-limit + validação de schema no `/collect`; Sentry capturando nos 3 runtimes

**Fase 2 — Leads & LPs:**
- [ ] Editor block-based: criar LP = Molde + Assunto(s) + Objetivo; validação de capacidades; publish/expiração
- [ ] LP publicada converte: deep-link WhatsApp com xcode E form → card no Kommo com contrato completo (04 §7)
- [ ] **Dedup D-11 demonstrado**: 2ª conversão do mesmo telefone anexa ao card (não duplica) + notificação SDR
- [ ] Gerador de links xcode/UTM + redirect WhatsApp no admin
- [ ] A/B server-side: variantes renderizadas sem flicker (CLS = 0 na troca), `experiment_exposure` no PostHog; ativar experimento tira a LP do full-page cache automaticamente e encerrar devolve (D-8); **gate de volume do 08 §7 implementado** (experimento só arma com projeção de duração viável)

**Fase 3 — Cobertura & loop:**
- [ ] Google Ads (EC4L/OCI com `gclid`) e TikTok com round-trip de teste verde; dedupe pixel↔server por `event_id`; Pinterest somente se aprovado na avaliação da fase
- [ ] **Loop fechado demonstrado**: desfecho no Kommo (sandbox) → conversão qualificada disparada por card (1×) aos canais, **com valor por faixa (M-02) no payload** (D-14)
- [ ] **CTWA (D-14, desenho v1 — 05 §9.3)**: WABA + conta de anúncios no mesmo Business Manager com permissão de metadados concedida; UTMs de anúncio CTWA visíveis no Tracking data do card; loop de volta testado em sandbox (Conversion API da Kommo avaliada × eventos próprios casados por telefone, sem duplicação)
- [ ] **Eventos de visita (D-14)**: `visita_agendada`/`visita_realizada`/`no_show` fluindo do Kommo ao painel — funil M-04 completo
- [ ] SLA de qualificação ≤ 72h acordado com a SDR e refletido no pipeline (D-14)
- [ ] Ingestão de lead form nativo (Meta sandbox) → card no Kommo com origem correta (D-13)
- [ ] Sync de audiência (segmento de teste, PII hasheada, **somente leads com opt-in registrado** — 05 §9.2) aceito por ao menos 1 plataforma (D-13)
- [ ] Tracker Hub: inspetor realtime filtra por `test`; saúde por destino; replay restrito a Admin
- [ ] **Single pane of glass — Nível 1 (D-17, 05 §12.1)**: investimento por canal/dia puxado de ≥ 1 plataforma e blendado com qualificado+valor → **CAC e custo-por-lead-qualificado por canal** no painel, com **fonte de cada métrica rotulada**; build-vs-buy do reporting completo (Nível 2) decidido com custo como input (99 §3.5)

**Fase 4 — Escala & diferidos (etapa final):**
- [ ] Build LGPD: CMP, consent gate ativo (de pass-through a efetivo), Consent Mode, retenção/mascaramento
- [ ] Value-mapping do join key preenchido e validado ponta-a-ponta
- [ ] Mapa 301 do site antigo publicado no cutover; monitoramento de 404 pós-corte
- [ ] Edge logic de cache por variante (D-8 evolução) — LPs sob teste voltam ao cache total

## 8. Como construir via IA

Monorepo com fronteiras: `site/` · `admin/` (Payload) · `api-server/` · pacote compartilhado com o **schema de evento** (05 §4) e tipos gerados do OpenAPI. Um Bloco = um componente com props validadas. Cola Kommo e disparo de conversão = funções puras testáveis. A sequência de tasks = o roadmap (§7). Os docs 00→08 são o contexto de build.

---

## 9. Riscos & trade-offs

| Risco | Mitigação |
|---|---|
| Tracking degrada CWV/SEO | collector batched + A/B server-side + Destinations server-side; CWV como gate |
| Reinventar roda (dispatcher/analytics/CMS) | PostHog Destinations + Payload; custom só na cola fina |
| Catálogo de Destinations não cobrir um canal | fallback: webhook PostHog → api-server → API do canal |
| Runtime/host limitar na escala | Cloudflare no edge desde o dia 1; runtimes desacoplados e portáveis — provedor de deploy trocável sem mudar arquitetura (D-18) |
| Lead morrer por resposta lenta | speed-to-lead (Fase 2) |
| LGPD adiada virar passivo | ganchos ativos (consent pass-through + opt-in mínimo) desde a Fase 1 |
| Escopo inflar p/ multi-vertical | `brand`/`event_type` como dimensão; nada ativado antes dos gates |

---

## 10. Validação contra invariantes VVF

- **Tom:** doc = trabalho ✓ · copy do site = marca ✓
- **INV-05/03/07/04:** protegidos nas camadas de copy (04/06/07) ✓
- **INV-08:** pipeline com fila/retry/teste (05) = sem surpresas operacionais ✓
- **INV-09:** replicação por dados (02) ✓ · **INV-10:** aplica-se a escolhas de infra ✓
- **Gates (§8 do Contexto):** roadmap não antecipa vertical; M-01 intocado ✓
