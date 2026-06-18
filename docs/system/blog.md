# Blog — Motor de Conteúdo e SEO

**Camada:** system · **Domínio:** blog · **Origem:** 07-blog.md · **Tom:** trabalho

**Depende de:** `system/plataforma.md` (Fundação), `system/arquitetura.md` (Arquitetura), `system/admin.md` (Admin); usa o contrato de evento de `system/eventos.md`.

**Responsabilidade única:** o motor de conteúdo e SEO — clusters temáticos, modelo de post, e a ponte do conteúdo para a conversão. O admin é onde o post é editado; aqui está **como** o blog é modelado e por que existe.

> **Tom:** esta visão é trabalho. **Todo texto publicado no blog é tom de marca** (CONTEXTO-IA §4): sereno, acolhedor, segunda pessoa. Conteúdo de autoridade, sem perder a voz da marca.

---

## O que é

O blog é a camada de **descoberta e autoridade** do ecossistema: ranqueia em busca orgânica, prova repertório/excelência e alimenta a nutrição. Ele não converte por si — encaminha para a LP/WhatsApp, onde a conversão acontece. Conteúdo aqui é **dado** (posts, clusters, metadados de SEO editáveis no admin, sem deploy), não código.

As specs deste domínio carregam o detalhe:

- **Modelo de post** — `specs/blog/modelo-post.md` (estrutura do `Post`, campos, notas de ligação).
- **Clusters e relação Blog ↔ Assunto ↔ LP** — `specs/blog/clusters.md` (arquitetura de conteúdo, formato âncora "casamentos reais", como o post liga ao Assunto e à LP).
- **SEO on-page** — `specs/blog/seo-on-page.md` (structured data JSON-LD, canonical, sitemap/robots, URLs estáveis).
- **SEO local** — `specs/blog/seo-local.md` (map pack, GBP por espaço, NAP, gancho NPS→review).

## §1 — Princípios

1. **Autoridade por clusters, não posts soltos.** SEO de casamento premium é jogo de autoridade temática: pilar + satélites + internal linking forte. (Modelo em `specs/blog/clusters.md`.)
2. **Conteúdo é dado.** Posts, clusters e metadados de SEO são editáveis no admin — sem deploy.
3. **Performance herdada.** Prerender + cache do edge (purge no publish — não ISR; ver `system/arquitetura.md`), imagens otimizadas, fontes self-hosted; o orçamento de CWV da arquitetura vale aqui. (Detalhe em §6.)
4. **O blog converte.** Não é vitrine: é topo/meio de funil que encaminha para LP/WhatsApp (§9).
5. **Marca por construção.** Edição brand-locked (tokens do design system, guardrails de tom — CONTEXTO-IA §4). Conteúdo de IA, se usado, passa pelo lint de marca (ver `system/admin.md`).

## §2 — Papel no ecossistema (Ecossistema de Growth)

O blog serve três estágios do funil de growth:

- **Aquisição (orgânica):** ranqueia e traz tráfego de busca — complementa Meta/Google pagos.
- **Autoridade:** prova de repertório e excelência; sustenta a percepção premium.
- **Nutrição:** conteúdo reaproveitado em e-mail/CRM (Kommo) para leads em consideração.

Vetor ideológico (CONTEXTO-IA §3.3): histórias vividas e comemoradas, família e legado — aplicar na pauta quando couber.

## §6 — Performance

- Prerenderizado (Astro `prerender`), servido do cache do edge; revalidação por **purge no publish** (não ISR — ver `system/arquitetura.md`).
- Imagens AVIF/WebP responsivas (`next/image` ou equivalente); lazy abaixo da dobra.
- Fontes conforme o design system (`specs/design-system/tipografia.md` — Playfair + Work Sans; exceção registrada), carregamento não-bloqueante.
- JS mínimo em rota de conteúdo; sem libs pesadas. CWV como gate (ver `system/arquitetura.md`).

## §8 — Eventos do blog para o HUB

Reusa o contrato canônico (ver `system/eventos.md` — schema de evento): `page_view`, `scroll_depth`, `cta_click` (para LP/WhatsApp), `whatsapp_handoff`/`lead` (se houver CTA de captura inline). Permite medir qual conteúdo gera lead, não só tráfego — alimenta o painel (`system/eventos.md`) e a atribuição.

## §9 — Conversão a partir do blog

- **CTAs contextuais** para as `lps_relacionadas` ou WhatsApp (com `xcode`/UTM — ver `system/admin.md`, links de campanha).
- **Sem eixo de preço (INV-05 — CONTEXTO-IA §2):** conteúdo nunca usa preço/promoção como gancho.
- **Nutrição:** posts viram material de e-mail/CRM (Kommo) para leads em consideração.
- Meta de conversão do blog é encaminhamento qualificado para a LP/WhatsApp, não pageview.

A mecânica de ligação post → Assunto → LP está em `specs/blog/clusters.md`; o modelo de dados em `specs/blog/modelo-post.md`.

## §10 — Edição no admin (handoff)

Posts são criados/editados no admin: rich-text, mídia, campos de SEO, escolha de cluster e de Assuntos/LPs relacionados, preview, publish/versionamento. RBAC: Editor de conteúdo e Marketing publicam; brand-locked. Detalhe do editor e do RBAC em `system/admin.md`.

## §11 — Decisões & diferidos

- **D-1** (CMS) — **fechada: Payload** (ver `_decisoes.md`); modelo de post permanece agnóstico (conteúdo é dado).
- Geração de conteúdo por IA — opção, não requisito; sempre via lint de marca (ver `system/admin.md`). Sem decisão travada.

## §12 — Validação contra invariantes VVF

> Nota de validação (CONTEXTO-IA §2; invariantes referenciadas):

- **Tom:** spec/system = trabalho ✓ · conteúdo publicado = marca ✓
- **INV-03 (experiência integrada):** conteúdo conduz à experiência completa, nunca a um componente isolado ✓
- **INV-05 (sem preço):** nenhum gancho de preço/promoção ✓
- **INV-09 (replicável):** clusters e posts por dado; internal linking automático por Assunto ✓
- **Performance:** prerender + cache do edge (purge no publish) + CWV como gate ✓
- **CONTEXTO-IA §3.3 (legado/histórias):** pauta ancora no vetor ideológico quando couber ✓
