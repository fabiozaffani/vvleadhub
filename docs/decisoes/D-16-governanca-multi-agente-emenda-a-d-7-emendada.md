# D-16 — Governança multi-agente — AGENTS.md fonte única

**Status:** fechada (emendada pela D-18, D-21, D-27) · **Data:** jun/2026 · **Tags:** gov, stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Governança multi-agente (emenda à D-7; emendada pela D-18, D-21 e D-27):** a fonte única de conduta é o **`AGENTS.md`** (tool-neutral). **Claude Code é o ambiente primário atual** para construção/revisão, mas a operação deve continuar transferível para outro agente que leia `AGENTS.md` + `.agents/context/`. `CLAUDE.md` é **adapter** do Claude Code; `.cursor` não é mais wrapper/fallback vivo. Encontro em `packages/contracts` e `docs/` é **gated por CODEOWNERS** (aval do fundador). **Enforcement por máquina, não por prosa:** monorepo + CI em todo PR (typecheck/lint/dependency-cruiser/test/build/Lighthouse/axe) + `pnpm verify` como DoD — Fase 0a "guardrails como código", entregue **antes** das features (0b). **Branch protection ligada (emendado jun/2026; antes: sem trava mecânica):** checks de CI obrigatórios na `main` + **auto-merge** para PR de código; caminhos sensíveis não recebem auto-merge por convenção — aval do fundador (ver `roadmap/fases.md`). **Fluxo de código (atualizado pela D-18/D-27):** código local → branch + PR → CI verde → `main`; deploy desacoplado do GitHub. _(Histórico: a D-16 original punha o Replit Agent como builder do app inteiro; D-18 removeu o Replit; D-27 removeu o acoplamento vivo ao Cursor.)_ Papéis ajustáveis em `roadmap/fases.md`.

## Consequências

Ver ecos nos docs que citam `D-16` (`grep -r "D-16" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-18 | Ver índice e ADR correspondente |
| D-21 | Ver índice e ADR correspondente |
| D-27 | `AGENTS.md` segue fonte única; `CLAUDE.md` vira adapter; `.cursor` removido como wrapper/fallback vivo. |
