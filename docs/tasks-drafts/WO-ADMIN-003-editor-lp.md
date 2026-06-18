---
id: WO-ADMIN-003
status: pending
traces: [specs/admin/editor-lp.md, specs/plataforma/primitivas.md, specs/landing-pages/blocos.md]
---
# WO-ADMIN-003 · Editor de LP block-based + Molde/LP no Payload (Fase 2) — RASCUNHO

**Pré-promoção.** Builder: Cursor Composer. **Fase:** 2 (Leads & LPs).

## Objetivo (proposto)
Modelar `Molde de LP` e `LP` no Payload e o editor block-based: compor LP = Molde + Assunto(s) (N:N) + Objetivo; blocks espelho 1:1 do site; validação de capacidades; publish/expiração; live preview (rota de draft do Astro).

## Escopo proposto
`admin/src/collections/{moldes,lps}.ts`, `admin/src/blocks/**`. Brand-locked (não sai dos tokens/guardrails).

## Critério de aceite (`roadmap/fases.md` §7.1 — Fase 2)
Criar LP no editor; validação de capacidades (bloco só renderiza o que o Assunto tem); live preview funcionando.

## Refs
[`../specs/admin/editor-lp.md`](../specs/admin/editor-lp.md), [`../specs/plataforma/primitivas.md`](../specs/plataforma/primitivas.md), [`../specs/landing-pages/blocos.md`](../specs/landing-pages/blocos.md).
