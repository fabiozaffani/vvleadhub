# D-21 — Auto-merge × CODEOWNERS — enforcement real

**Status:** fechada · **Data:** jun/2026 · **Tags:** gov, stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Auto-merge × CODEOWNERS — enforcement real (emenda à D-16):** a branch protection da `main` exige **só os checks de CI** (`verify`/`gitleaks`/`conventional commits`/`CWV+a11y`) — **sem required review** (descoberto jun/2026: PRs #49/#50 de `docs/` auto-mergearam no verde, sem aprovação; `reviewDecision` vazio). CODEOWNERS **auto-solicita** revisor mas **não barra** o merge. Logo: **`docs/` (e radar/discovery) auto-mescla no CI verde, sem cerimônia de review** (decisão do fundador — docs não precisam de gate de aprovação). **Caminhos sensíveis** (`packages/contracts`, `.claude/` [gate da D-1], `AGENTS.md`/`CLAUDE.md`, `.cursor/rules`, `.github/`, `infra/`) **não recebem auto-merge — por convenção: o agente não arma `--auto` neles**, deixando para o **merge explícito do fundador** (a branch protection não trava). Preserva o aval da **D-1** (gate de merge do `settings.json`) via convenção + a aprovação-em-tempo-de-edição (Bash) que a D-1 já exige. Corrige o pressuposto de D-16 ("PR que toca CODEOWNERS não é auto-mergeado") e o de ARQUITETURA-IA §4 ("armar é seguro porque a review obrigatória fecha") — falso sem required review; o claim VV-wide corrige-se no vvcore via `/sync-core`. **Reabrir o enforcement = ligar required CODEOWNERS review** na branch protection (registrado, não escolhido).

## Consequências

Ver ecos nos docs que citam `D-21` (`grep -r "D-21" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
