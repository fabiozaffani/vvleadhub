---
id: WO-SITE-002
status: in_progress
traces: [specs/landing-pages/seo-canonico.md, specs/blog/seo-on-page.md, system/arquitetura.md, specs/engenharia/acessibilidade.md]
---
# WO-SITE-002 · SEO/CWV: structured data por tipo + gate axe + rotas no Lighthouse

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** ex-WO-03 (parcial).

## Objetivo
Fechar o baseline de SEO/CWV e ligar o gate de qualidade como bloqueio real.

## Estado atual
Feito: JSON-LD `LocalBusiness` genérico, sitemap/robots/canonical/OG, `lighthouserc.json` com orçamento, job `quality` no CI. **Falta** (o que esta WO entrega):
- Structured data **por tipo**: `EventVenue`+`LocalBusiness` por espaço, `Article`/`BlogPosting`, `BreadcrumbList`, `FAQPage`, `VideoObject` (skill `app-seo-schema-org`).
- Gate **axe** ativo: script `test:a11y` (`@axe-core/playwright`) no `site/` para o CI deixar de emitir `::warning::` e passar a **bloquear** (sem violação nova).
- Lighthouse cobrindo **home + 1 espaço + 1 post** (depende das rotas de detalhe — [`WO-SITE-004`](WO-SITE-004.md) e a página de espaço, Fase 2).

## Arquivos
`site/**`, `lighthouserc.json`.

## Aceite
Lighthouse CI verde nas 3 rotas dentro do orçamento; axe sem violações novas (bloqueando); structured data validando (Rich Results Test).

## Refs
[`specs/landing-pages/seo-canonico.md`](../specs/landing-pages/seo-canonico.md), [`specs/blog/seo-on-page.md`](../specs/blog/seo-on-page.md), [`specs/engenharia/acessibilidade.md`](../specs/engenharia/acessibilidade.md), skills `app-seo-schema-org`/`app-a11y-axe`.
