---
id: WO-SITE-005
status: pending
traces: [specs/landing-pages/blocos.md, specs/landing-pages/seo-canonico.md, specs/plataforma/primitivas.md]
---
# WO-SITE-005 · Página de espaço / LP de conversão (Fase 2) — RASCUNHO

**Pré-promoção.** Builder: Cursor Composer. **Fase:** 2 (depende do editor — [`WO-ADMIN-003`](WO-ADMIN-003-editor-lp.md)).

## Objetivo (proposto)
Construir a página de espaço/LP (não existe no protótipo): Molde "Conversão" + Assunto tipo `espaço`. Ordem da planta §4 (hero+galeria+vídeo → Experiência Integrada → Diferenciais → Depoimentos → FAQ → Form/CTA WhatsApp). Indexável, canônica (um Assunto = uma página).

## Escopo proposto
`site/src/pages/` (rota de espaço/LP), blocks correspondentes. Structured data `EventVenue`+`LocalBusiness`, `FAQPage`.

## Critério de aceite
LP renderiza do Payload; structured data validando; CWV no orçamento; regra de canônico aplicada ([`../specs/landing-pages/seo-canonico.md`](../specs/landing-pages/seo-canonico.md)).

## Refs
[`../roadmap/composicao-paginas.md`](../roadmap/composicao-paginas.md) §4, [`../specs/landing-pages/blocos.md`](../specs/landing-pages/blocos.md).
