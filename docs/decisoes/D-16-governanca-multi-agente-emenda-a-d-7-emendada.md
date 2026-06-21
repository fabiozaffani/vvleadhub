# D-16 — Governança multi-agente — AGENTS.md fonte única

**Status:** fechada (emendada pela D-18, D-21) · **Data:** jun/2026 · **Tags:** gov, stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Governança multi-agente (emenda à D-7; emendada pela D-18 — Replit removido da operação, jun/2026):** **o Cursor Composer é o builder primário** (o fundador desenvolve o app na IDE). O **Claude Code** é **auxiliar/backup**: auditoria, revisão, melhorias, debug, build escopado quando delegado, e trabalho onde tokens mais baratos/maior volume ajudam (roda os gates `/code-review`·`/app-audit-quality`·`/app-checklist-fase`·`/security-review`). A fonte única de conduta deixa de ser o `CLAUDE.md` e passa a ser o **`AGENTS.md`** (tool-neutral; o Cursor lê `AGENTS.md`+`.cursor/rules`, o Claude Code lê `CLAUDE.md`). `CLAUDE.md` e `.cursor/rules/*` são **ponteiros** com invioláveis inline — em conflito, o `AGENTS.md` vence. Encontro em `packages/contracts` e `docs/` é **gated por CODEOWNERS** (aval do fundador). **Enforcement por máquina, não por prosa:** monorepo + CI em todo PR (typecheck/lint/dependency-cruiser/test/build/Lighthouse/axe) + `pnpm verify` como DoD — Fase 0a "guardrails como código", entregue **antes** das features (0b). **Branch protection ligada (emendado jun/2026; antes: sem trava mecânica):** checks de CI obrigatórios na `main` + **auto-merge** para PR de código; PR que toca CODEOWNERS (contracts/docs/governança/infra) não é auto-mergeado — aval do fundador (ver `roadmap/fases.md`). **Fluxo de código (atualizado pela D-18):** o código nasce **local** (Cursor/Claude Code) → branch + PR → CI verde → `main`; deploy desacoplado do GitHub. _(Histórico: a D-16 original punha o Replit Agent como builder do app inteiro, lendo `replit.md`, com sync `replit/work`→`main` via PR e "Publish"=deploy; a **D-18** removeu o Replit — builder e base de hospedagem.)_ Papéis ajustáveis em `roadmap/fases.md`.

## Consequências

Ver ecos nos docs que citam `D-16` (`grep -r "D-16" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-18 | Ver índice e ADR correspondente |
| D-21 | Ver índice e ADR correspondente |
