---
id: WO-SITE-004
status: pending
traces: [specs/blog/modelo-post.md, specs/blog/seo-on-page.md, roadmap/composicao-paginas.md]
---
# WO-SITE-004 · Rota de post de blog `/blog/{slug}`

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** lacuna da auditoria (fecha a Fase 0 do site).

## Objetivo
Construir a página de post (`/blog/{slug}`) — hoje os cards do índice linkam para `href="#"`. Fecha o critério "1 post" do Lighthouse em [`WO-SITE-002`](WO-SITE-002.md).

## Arquivos
`site/src/pages/blog/[slug].astro`, `site/src/lib/**`.

## Aceite
- Rota `/blog/{slug}` renderizando do Payload: hero (capa ou fallback gradiente), corpo rich-text, CTAs contextuais para `lps_relacionadas`, posts relacionados (planta §5).
- Structured data `BlogPosting`/`Article` + `BreadcrumbList`; mesmo look-and-feel; CWV no orçamento.

## Refs
[`specs/blog/modelo-post.md`](../specs/blog/modelo-post.md), [`specs/blog/seo-on-page.md`](../specs/blog/seo-on-page.md), [`roadmap/composicao-paginas.md`](../roadmap/composicao-paginas.md) §5.

## Nota de escopo
A **página de espaço/LP** (planta §4) é Fase 2 (editor block-based) → [`../tasks-drafts/`](../tasks-drafts/), não entra aqui.
