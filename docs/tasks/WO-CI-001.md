---
id: WO-CI-001
status: pending
traces: [specs/engenharia/ci-gates.md, specs/engenharia/fronteiras.md]
---
# WO-CI-001 · Drift-check de `generated/` + gate `prettier --check`

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** gap da auditoria (jun/2026) — caminho gated por CODEOWNERS (`.github/`, `packages/contracts`).

## Objetivo
Fechar dois furos do gate de qualidade que hoje não bloqueiam.

## Arquivos
`.github/workflows/ci.yml`, scripts de `package.json` / `packages/contracts`.

## Aceite
- **Drift-check** no CI: regenerar os tipos (`payload generate:types` e o codegen do OpenAPI quando existir — [`WO-API-001`](WO-API-001.md)) e **falhar o build** se `packages/contracts/generated` divergir do commitado (hoje o arquivo é commitado mas não guardado — exigência de `specs/engenharia/ci-gates.md`/`fronteiras.md`).
- Gate `prettier --check` no `pnpm verify` e/ou no job `verify` do CI (hoje formatação pode driftar sem falhar).

## Refs
[`specs/engenharia/ci-gates.md`](../specs/engenharia/ci-gates.md), [`specs/engenharia/fronteiras.md`](../specs/engenharia/fronteiras.md).
