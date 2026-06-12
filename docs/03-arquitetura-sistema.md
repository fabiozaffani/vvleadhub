# 03 · Arquitetura do Sistema

**Status:** v2 (decisões fechadas) · **Camada de tom:** trabalho · **Depende de:** 01, 02
**Responsabilidade única:** a forma do sistema — stack, hosting, fronteiras de runtime, SEO/performance, segurança, modelo de dados e roadmap. O detalhe do pipeline de eventos vive no **05**; o admin no **06**; LPs no **04**.

---

## 0. TL;DR

Monorepo no **Replit** com três runtimes desacoplados: **site público em Astro** (server-rendered, SEO/CWV máximos), **admin em Payload CMS** (Next-hosted, conteúdo + Tracker Hub) e **api-server Express** (cola fina: collect, Kommo, loop fechado). **Cloudflare na frente** de tudo (DNS/CDN/WAF). **PostHog** como espinha de analytics *e* dispatcher (Destinations). **Kommo** é o CRM/central conversacional — integração bidirecional. Tensão central permanentemente gerenciada: tracking não pode degradar CWV, e CWV é o SEO.

---

## 1. Decisões fechadas (log canônico no 00 §6)

| ID | Decisão |
|---|---|
| D-1 | **Híbrido:** custom no diferencial (site, LPs, cola Kommo/loop, Tracker Hub); plataforma madura no commodity (Payload p/ conteúdo+admin; PostHog p/ eventos+análise+dispatch) |
| D-2 | **Replit como base** (protótipo e produção inicial) + **Cloudflare na frente**; site público **server-rendered em Astro** (condição inegociável); revisita-se na escala |
| D-3 | **PostHog** (captura, store, funis, replay, flags/experimentos **e Destinations** como dispatcher) |
| D-4 | **Kommo** (CRM + WhatsApp central), bidirecional |
| D-6 | **WhatsApp via Kommo** (resolvido por consequência) |
| — | Diferidos com gancho: LGPD (consent pass-through + opt-in mínimo) · join key (campo `correlation_id` reservado) |

---

## 2. Topologia

```mermaid
flowchart TB
    subgraph CF["Cloudflare (DNS · CDN · WAF · cache)"]
    end

    subgraph Replit["Monorepo (Replit) — proxy por caminho"]
        SITE["site (Astro, SSR/SSG)<br/>institucional · LPs · blog · bio pages"]
        ADMIN["admin (Payload CMS / Next)<br/>conteúdo + Tracker Hub (06)"]
        API["api-server (Express + Postgres/Drizzle)<br/>/collect · cola Kommo · loop fechado · links xcode"]
    end

    PH["PostHog<br/>store · análise · replay · flags/exp · Destinations"]
    KOMMO["Kommo (CRM · WhatsApp · cadências)"]
    ADS["Meta · Google · TikTok · Pinterest"]

    CF --> SITE & ADMIN & API
    SITE -->|conteúdo (OpenAPI/local)| ADMIN
    SITE -->|eventos| API
    API --> PH
    PH -->|Destinations| ADS
    API <-->|lead in / desfecho out| KOMMO
    API -->|conversão qualificada| ADS
```

Fronteiras de propriedade:
- **site (Astro):** renderização pública. Zero lógica de API própria; consome conteúdo do Payload e envia eventos ao `/collect`.
- **admin (Payload):** dono do **conteúdo** (Assuntos, LPs, blocos, posts, mídia, registros) + shell do Tracker Hub (views custom). Detalhe no 06.
- **api-server (Express):** dono da **operação** — endpoint `/collect`, cola Kommo (lead in/desfecho out), disparo de conversão qualificada, geração de links xcode. Detalhe no 05.
- **PostHog:** dono de store/análise/experimentos e do **fan-out** a plataformas de mídia via Destinations (catálogo de conectores a confirmar na implementação; o que faltar entra como webhook→api-server).
- **Kommo:** dono da conversa, cadências, funil SDR/Closer, qualificação. A plataforma nunca reconstrói isso.

---

## 3. Stack

| Camada | Escolha | Nota |
|---|---|---|
| Site público | **Astro** (SSR/SSG/ilhas React) | mínimo JS por padrão → CWV agressivo por construção; A/B server-side sem flicker |
| Admin/CMS | **Payload CMS** (Next-hosted) | blocks, versionamento, live preview, RBAC prontos; Postgres adapter (Drizzle por baixo) |
| API operacional | **Express 5 + PostgreSQL + Drizzle** | já existente; contrato **OpenAPI** como fonte de verdade + codegen |
| Eventos/análise | **PostHog** | self-hosted ou cloud, sob domínio próprio |
| Linguagem | TypeScript end-to-end | contratos tipados = AI-buildable |
| Edge | **Cloudflare** | CDN/WAF/cache/rate-limit na frente dos três runtimes |
| Mídia (D-10) | **Cloudflare R2 + Images** | originais no R2 (plugin de storage do Payload; nada no filesystem do Replit); derivados responsivos AVIF/WebP on-the-fly via Images |

---

## 4. SEO & performance (o site)

**Renderização:** institucional e blog em SSG/ISR; LPs com variante de A/B resolvida **no servidor** (zero flicker); admin sem indexação.

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

---

## 7. Roadmap faseado (sequência de build p/ Claude Code)

- **Fase 0 — Fundação:** monorepo (site Astro + admin Payload + api-server) · registros do 02 no Payload · design system (§5 do Contexto) · páginas institucionais + blog base · baseline SEO/CWV. *Entrega: site no ar, performante, indexável.*
- **Fase 1 — Eventos:** collector + `/collect` + PostHog + Destinations (Meta, GA4) · consent pass-through. *Entrega: mensuração first-party + 2 canais.*
- **Fase 2 — Leads & LPs:** editor block-based · LP Retrofit (campanha viva) · contrato de lead → Kommo · speed-to-lead · links xcode no admin · A/B server-side. *Entrega: máquina de lead com teste.*
- **Fase 3 — Cobertura & loop:** TikTok + Pinterest + Google Ads/YouTube · **loop fechado Kommo→ads** · **ingestão de lead forms nativos + sync de audiências (D-13)** · Tracker Hub completo (realtime, teste, saúde). *Entrega: mídia completa + console.*
- **Fase 4 — Escala & diferidos:** hardening de performance · build LGPD (CMP, gating real) · value-mapping do join key · revisitar hosting se a escala apertar.

---

### 7.1 Critérios de aceite por fase (definition of done — verificáveis)

**Fase 0 — Fundação:**
- [ ] Monorepo com os 3 runtimes + `packages/contracts` sobe no Replit; travas de fronteira ativas no CI (09 §2)
- [ ] Registros do 02 seedados (3 TiposDeAssunto; Assuntos: 5 espaços com `categoria`, serviços com `papel`; Objetivos)
- [ ] Páginas institucionais + blog base renderizando do Payload via API; paridade visual com as Design Guidelines (tokens, Playfair+Work Sans, foco/skip-link/reduced-motion)
- [ ] **Lighthouse CI verde** (home, 1 página de espaço, 1 post) dentro do orçamento §4; axe sem violações
- [ ] sitemap/robots/canonical/OG gerados; structured data validando (Rich Results Test)
- [ ] Publicar no Payload reflete no site (purge/revalidação funcionando — item 2.2.4); preview de draft funcionando (06)
- [ ] Páginas legais publicadas (placeholder jurídico aprovado pelo fundador — exigência de aprovação de ads)

**Fase 1 — Eventos:**
- [ ] Collector batched emitindo o catálogo (05 §13) → `/collect` → PostHog; `subjects[]`/`objective` presentes; campo `consent` pass-through e `correlation_id` reservado
- [ ] Round-trip de teste Meta (Test Events) e GA4 (debug) verde via modo `test:true` — sem tocar produção
- [ ] Rate-limit + validação de schema no `/collect`; Sentry capturando nos 3 runtimes

**Fase 2 — Leads & LPs:**
- [ ] Editor block-based: criar LP = Molde + Assunto(s) + Objetivo; validação de capacidades; publish/expiração
- [ ] LP publicada converte: deep-link WhatsApp com xcode E form → card no Kommo com contrato completo (04 §7)
- [ ] **Dedup D-11 demonstrado**: 2ª conversão do mesmo telefone anexa ao card (não duplica) + notificação SDR
- [ ] Gerador de links xcode/UTM + redirect WhatsApp no admin
- [ ] A/B server-side: variantes renderizadas sem flicker (CLS = 0 na troca), `experiment_exposure` no PostHog; ativar experimento tira a LP do full-page cache automaticamente e encerrar devolve (D-8)

**Fase 3 — Cobertura & loop:**
- [ ] TikTok/Pinterest/Google Ads com round-trip de teste verde; dedupe pixel↔server por `event_id`
- [ ] **Loop fechado demonstrado**: desfecho no Kommo (sandbox) → conversão qualificada disparada por card (1×) aos canais
- [ ] Ingestão de lead form nativo (Meta sandbox) → card no Kommo com origem correta (D-13)
- [ ] Sync de audiência (segmento de teste, PII hasheada) aceito por ao menos 1 plataforma (D-13)
- [ ] Tracker Hub: inspetor realtime filtra por `test`; saúde por destino; replay restrito a Admin

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
| Replit limitar na escala | Cloudflare na frente desde o dia 1; D-2 revisitável sem mudar arquitetura |
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
