# Arquitetura do Sistema

**Camada:** system · **Domínio:** arquitetura · **Origem:** 03-arquitetura-sistema.md · **Tom:** trabalho

Depende de: `business/comercial/_dominio.md` (modelo de domínio) e `system/plataforma.md` (primitivas). Documento transversal — é a topologia que costura os domínios de produto (`system/landing-pages.md`, `system/eventos.md`, `system/admin.md`, `system/blog.md`, `system/experimentacao.md`) sobre uma infra comum, governada pela doutrina de engenharia em `system/engenharia.md`.

---

## §0 — TL;DR

Monorepo (pnpm workspaces) com três runtimes desacoplados: **site público em Astro** (server-rendered, SEO/CWV máximos), **admin em Payload CMS** (Next-hosted, conteúdo + Tracker Hub) e **api-server Express** (cola fina: collect, Kommo, loop fechado). **Cloudflare na frente** de tudo (DNS/CDN/WAF); runtime/deploy a definir na Fase 0b (D-18). **PostHog** como espinha de analytics *e* dispatcher (Destinations). **Kommo** é o CRM/central conversacional — integração bidirecional. Tensão central permanentemente gerenciada: tracking não pode degradar CWV, e CWV é o SEO.

---

## §1 — Decisões fechadas

As decisões de arquitetura (D-1 híbrido, D-2 Cloudflare/Astro, D-3 PostHog, D-4/D-6 Kommo+WhatsApp, D-14 atribuição, D-15 split de ingestão, e os diferidos com gancho — LGPD/consent pass-through, join key/`correlation_id`) vivem no ledger canônico em [`_decisoes.md`](../_decisoes.md), que é o dono. Não se replicam aqui — cite-as por ID (D-N) quando relevante ao contexto.

---

## §2 — Topologia

```mermaid
flowchart TB
    subgraph CF["Cloudflare (DNS · CDN · WAF · cache)"]
    end

    subgraph Runtime["Monorepo — 3 deployments · subdomínios"]
        SITE["site (Astro, output:'server')<br/>institucional · LPs · blog · bio pages"]
        ADMIN["admin (Payload CMS / Next)<br/>conteúdo + Tracker Hub"]
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
- **site (Astro):** renderização pública. Zero lógica de API própria; consome conteúdo do Payload. Eventos: analytics do SDK via proxy reverso no Cloudflare → PostHog (D-15 — não passa pelo api-server); **eventos de negócio** (lead, conversões) ao `/collect`. Detalhe em [`system/landing-pages.md`](landing-pages.md).
- **admin (Payload):** dono do **conteúdo** (Assuntos, LPs, Blocos, posts, mídia, registros) + shell do Tracker Hub (views custom). Detalhe em [`system/admin.md`](admin.md).
- **api-server (Express):** dono da **operação** — endpoint `/collect`, cola Kommo (lead in/desfecho out), disparo de conversão qualificada, geração de links xcode. Detalhe em [`system/eventos.md`](eventos.md).
- **PostHog:** dono de store/análise/experimentos e do **fan-out** a plataformas de mídia via Destinations (catálogo de conectores a confirmar na implementação; o que faltar entra como webhook→api-server).
- **Kommo:** dono da conversa, cadências, funil SDR/Closer, qualificação. A plataforma nunca reconstrói isso.

**Hosting (resolve "proxy por caminho" — auditoria de delegação jun/2026):** os três runtimes são **deployments separados sob subdomínios** roteados no DNS da Cloudflare (`www` → site · `admin.` → admin · `api.`/`t.` → api-server), não um path-proxy num único deploy. O `t.` é o domínio first-party do analytics (proxy reverso → PostHog, D-15). Mantém as fronteiras de runtime físicas e simplifica cache/WAF por host. As travas de fronteira de import entre módulos vivem em [`system/engenharia.md`](engenharia.md) (dependency-cruiser no CI).

---

## §3 — Stack

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

## §4 — SEO & performance (o site)

**Renderização:** Astro em **`output: 'server'`** (adapter Node). Institucional e blog são **prerenderizados** por página (`export const prerender = true`) e servidos do **cache do Cloudflare**; LPs com variante de A/B resolvidas **no servidor** (zero flicker, SSR por hit). **Sem ISR** — Astro não tem ISR: o "incremental" é o **purge por URL no publish** (ver pendência de purge no admin), não revalidação por TTL. Admin sem indexação. *(Clarificação da auditoria de delegação jun/2026: "SSG/ISR" era vocabulário de Next; em Astro o estático-na-prática vem de prerender + cache de edge + purge.)*

**Orçamento de CWV (hard gate de deploy):** LCP < 2,5s (alvo < 1,8s) · INP < 200ms · CLS < 0,1 · JS inicial em rota de marketing mínimo (Astro: zero por padrão) · imagens AVIF/WebP responsivas servidas pelo pipeline D-10 (R2 + Cloudflare Images, on-the-fly) · fontes conforme o design system (ver [`system/design-system.md`](design-system.md)): Playfair Display (títulos) + Work Sans (corpo) — exceção registrada ao brand guide; Sloop Script Pro fora de uso. Carregamento não-bloqueante.

**SEO técnico:** JSON-LD (`EventVenue`/`LocalBusiness` por espaço, `Article`, `BreadcrumbList`, `FAQPage`, `VideoObject` para vídeo-tours — D-13) · sitemap/robots automáticos · canonical · OG/Twitter cards · URLs limpas (`/casamentos`, `/blog/{slug}`, `/lp/{campanha}`) · clusters de autoridade no blog (ver [`system/blog.md`](blog.md)).

**Política de cache (D-8):** institucional/blog = cache total no CDN. LPs **sem** experimento ativo = cache total. LPs **com** experimento ativo = HTML fora do full-page cache (SSR por hit; Astro segura o CWV) com assets sempre cacheados — a LP volta ao cache total automaticamente ao encerrar o experimento. **Etapa final:** migrar para edge logic (Worker) com a variante na chave de cache, mantendo cache total também sob teste. Publicação no admin dispara purge das rotas afetadas (pendência de purge/revalidação no admin — ver [`system/admin.md`](admin.md)).

**Migração do domínio (cutover):** valeverdefestas.com.br tem site no ar com posts de blog indexados. Tarefa obrigatória da virada (etapa final, junto dos diferidos): inventariar URLs indexadas (Search Console + crawl), publicar **mapa de 301** antigo→novo (foco nos posts com tração) e monitorar 404 no pós-corte. Até lá, o site atual segue intocado.

**A reconciliação tracking × performance:** collector assíncrono/batched first-party (ver [`system/eventos.md`](eventos.md)), A/B server-side (ver [`system/experimentacao.md`](experimentacao.md)), pixels de terceiro só como complemento com dedupe — é o que permite mensuração completa com "velocidade surreal".

---

## §5 — Modelo de dados (entidades núcleo)

Da plataforma: `TipoDeAssunto` · `Assunto` · `Molde` (de LP) · `Objetivo` · `Bloco` · `LP` · `BioPage` · `Post`/`Cluster` (ver [`system/blog.md`](blog.md)) · `Experimento`/`Variante`/`Flag` (ver [`system/experimentacao.md`](experimentacao.md)) · `Lead` (contrato em [`system/landing-pages.md`](landing-pages.md)) · `CampaignLink{xcode, utm, wa_redirect}` · `Destination/Integration` · `AdminUser/Role` · `ConsentRecord` (diferido).

Dimensões transversais em conteúdo/evento/lead: `brand` (default VVF) · `event_type` (ver `business/comercial/_dominio.md` §3.1) · `subjects[]`.

Propriedade: conteúdo no Payload; operacional (leads, links, log de dispatch) no api-server; eventos no PostHog.

**Banco (D-9):** um Postgres, dois schemas — `payload` (migrado só pelo Payload) e `app` (migrado só pelo Drizzle/api-server). Regras duras: nenhuma FK atravessa schemas (referências por id, fracas, validadas na aplicação); nenhum runtime lê tabela do outro — dados alheios sempre via API (o layout de tabela é implementação privada; a API é o contrato). O site (Astro) não acessa Postgres em hipótese alguma — consome a API do Payload e envia eventos ao `/collect`. As travas de isolamento de role/schema no banco vivem em [`system/engenharia.md`](engenharia.md).

---

## §6 — Segurança & infra

HTTPS/HSTS · WAF e rate-limit (especialmente `/collect`) no Cloudflare · credenciais em secrets (nunca no client) · RBAC + auditoria no admin (ver [`system/admin.md`](admin.md)) · backups do Postgres · observabilidade dos três runtimes (ver [`system/engenharia.md`](engenharia.md)) · proteção de formulário (honeypot + rate-limit) sem fricção visível.

**CSP & CORS (auditoria de delegação jun/2026 — agente nunca acerta sozinho):** o site publica **Content-Security-Policy** com as origens de script declaradas explicitamente (self + PostHog via proxy `t.` + pixels permitidos) — nada de `unsafe-inline` para script sem nonce. O api-server define **CORS por allowlist** das origens do site/admin (subdomínios próprios) — nunca `*` reflexivo, nunca refletir o `Origin` recebido. Ambos entram como config versionada, não ad-hoc.

---

## §8 — Como construir via IA

Monorepo com fronteiras: `site/` · `admin/` (Payload) · `api-server/` · pacote compartilhado com o **schema de evento** (ver [`system/eventos.md`](eventos.md)) e tipos gerados do OpenAPI. Um Bloco = um componente com props validadas. Cola Kommo e disparo de conversão = funções puras testáveis. A sequência de tasks = o roadmap (ver [`roadmap/fases.md`](../roadmap/fases.md)). O canon de negócio (CONTEXTO-IA), a doutrina de engenharia (`system/engenharia.md`) e os system/spec docs dos domínios são o contexto de build.

---

## §9 — Riscos & trade-offs

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

## §10 — Validação contra invariantes VVF

A arquitetura foi validada contra as invariantes do negócio (ver `CONTEXTO-IA §2`): tom na camada certa (doc = trabalho; copy do site = marca); INV-05/03/07/04 protegidos nas camadas de copy (landing-pages/admin/blog); INV-08 garantido pelo pipeline com fila/retry/teste (eventos) = sem surpresas operacionais; INV-09 pela replicação por dados (plataforma); INV-10 aplicada às escolhas de infra; gates (`CONTEXTO-IA §8`) respeitados — o roadmap não antecipa vertical e M-01 fica intocado.
