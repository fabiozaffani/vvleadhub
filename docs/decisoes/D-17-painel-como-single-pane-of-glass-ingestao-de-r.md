# D-17 — Tracker Hub — single pane (L1 + L2 faseado)

**Status:** fechada (estendida pela D-19) · **Data:** jun/2026 · **Tags:** stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Painel como single pane of glass — ingestão de reporting de plataforma (auditoria growth jun/2026):** o Tracker Hub é o **ponto único de leitura**; o time não tabula entre Meta/Google/Pinterest/TikTok/YouTube pra cruzar número. Duas camadas distintas: **(L1) diferencial, já nosso** — atribuição closed-loop *por card* (lead→qualificado→visita→ganho + valor) por canal/UTM (`specs/eventos/loop-fechado.md`), custom, nada off-the-shelf faz; **(L2) commodity, novo** — reporting das plataformas (investimento, impressões, cliques, conversas iniciadas, lacuna de abandono CTWA) puxado via API de cada plataforma (*pull* — oposto das Destinations, que são *push*). **Escopo faseado (D-1 vale — não hand-buildar o commodity):** Fase 3 = a fatia fina que se junta ao diferencial — **investimento por canal/dia** blendado com qualificado+valor → **CAC e custo-por-lead-qualificado por canal** no painel (slice pequeno e estável de cada API, vale possuir porque cruza com o que é nosso); a superfície completa de reporting = preferir **connector/ELT** (Funnel/Supermetrics/Windsor) ou reporting nativo, **nunca N integrações mantidas à mão** — build-vs-buy decidido na Fase 3 com **custo como input** (liga `system/engenharia.md`). **Guardrail:** número reportado pela plataforma ≠ número nosso (modelos/janelas de atribuição diferentes) — o painel **rotula a fonte** de cada métrica; jamais somar "conversões" entre plataformas nem comparar com nossos cards como mesmo denominador. **Inclinação do fundador (13/06, não travada):** Nível 2 **PostHog-first** — convergir reporting no PostHog (já D-3), com **check de cobertura de ingestão de custo na Fase 1** (especialmente Pinterest/TikTok no Brasil); se furar, **Windsor.ai** como connector barato canalizado ao pane, e Looker Studio como stopgap grátis no lado Google. A decisão fecha na Fase 3 com o custo na mão. Spec em `specs/eventos/painel.md`; render no Tracker Hub (`specs/admin/tracker-hub.md`).

## Consequências

Ver ecos nos docs que citam `D-17` (`grep -r "D-17" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-19 | Ver índice e ADR correspondente |
