---
id: WO-SITE-001
status: done
traces: [system/landing-pages.md, specs/design-system/tokens.md, specs/design-system/tipografia.md, system/blog.md, roadmap/composicao-paginas.md]
---
# WO-SITE-001 · Astro base + design system + institucional/blog

**Quem executou:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** ex-WO-02 da Fase 0b.

## Objetivo
Site `output:'server'`, tokens espelho do design-system, home + blog index conforme a planta, renderizando da API do Payload.

## Arquivos
`site/**`.

## Aceite (entregue)
- Astro `output:'server'` (adapter Node), consumo do Payload por REST (nunca Postgres — D-9).
- Home na ordem da planta (Hero → números → 4 espaços → form) e blog index (Nosso Journal + filtro + grid) — [`roadmap/composicao-paginas.md`](../roadmap/composicao-paginas.md).
- Chrome global (header com "Agende uma visita"; footer NAP), mobile-first, placeholders marcados.
- Tokens/tipografia espelho do design-system (Playfair + Work Sans, foco/skip-link/reduced-motion); restrições de build 1–4 (sem Framer no site, shadcn só no admin, `astro:assets`, fontes self-hosted).

## Refs
[`roadmap/composicao-paginas.md`](../roadmap/composicao-paginas.md), [`system/landing-pages.md`](../system/landing-pages.md), [`specs/design-system/`](../specs/design-system/), [`system/blog.md`](../system/blog.md).

## Continuações
SEO/structured-data/axe → [`WO-SITE-002`](WO-SITE-002.md); rota de post → [`WO-SITE-004`](WO-SITE-004.md).
