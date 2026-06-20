---
id: WO-CI-001
status: pending
traces: [specs/engenharia/ci-gates.md, specs/engenharia/fronteiras.md]
deps: [WO-PACKAGES-001]
skills: [work-order]
---
# WO-CI-001 · Drift-check de `generated/` + gate `prettier --check`

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** gap da auditoria (jun/2026) — caminho gated por CODEOWNERS (`.github/`, `packages/contracts`).

## Objetivo
Fechar dois furos do gate de qualidade que hoje não bloqueiam.

## Arquivos permitidos (a cerca)
`.github/workflows/ci.yml`, scripts de `package.json` / `packages/contracts`.

## Aceite
- **Drift-check do Payload** no CI: regenerar `payload generate:types` e **falhar o build** se `packages/contracts/generated` divergir do commitado (hoje o arquivo é commitado mas não guardado — exigência de `specs/engenharia/ci-gates.md`/`fronteiras.md`).
- **Drift-check do OpenAPI (D-22):** `pnpm codegen:check` (já scaffolded em [`WO-PACKAGES-001`](WO-PACKAGES-001.md)) compara o hash de `packages/api-spec/openapi.yaml` com os `.lockfile.json` de `@vvf/api-zod`/`@vvf/api-client` e falha o build em drift. Já está no `pnpm verify`; garantir que roda no job de CI.
- Gate `prettier --check` no `pnpm verify` e/ou no job `verify` do CI (hoje formatação pode driftar sem falhar). O código gerado (`*/generated/`) já está fora do prettier/eslint.

## Refs
[`specs/engenharia/ci-gates.md`](../specs/engenharia/ci-gates.md), [`specs/engenharia/fronteiras.md`](../specs/engenharia/fronteiras.md).
