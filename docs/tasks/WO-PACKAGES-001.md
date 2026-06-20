---
id: WO-PACKAGES-001
status: in_progress
traces: [specs/engenharia/monorepo.md, specs/engenharia/fronteiras.md, specs/engenharia/contrato-http.md, specs/engenharia/ci-gates.md, _decisoes.md]
deps: []
skills: [work-order, sync-governanca]
---
# WO-PACKAGES-001 · Pipeline HTTP em packages/ (api-spec → api-zod + api-client)

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** auditoria de estrutura (jun/2026) — `packages/` enxuto demais vs o `lib/` do ERPVVF; gap na fatia de contrato HTTP. Caminho gated por CODEOWNERS (`packages/*`, `.github/`, `.cursor/rules`, `docs/`).

## Objetivo
Reorganizar `packages/` para o modelo de pipeline HTTP em 3 pacotes (D-22), sem subir o Express ainda. Deixar contrato, codegen, fronteiras e drift-check prontos para o [`WO-API-001`](WO-API-001.md) só preencher os endpoints.

## Arquivos
`packages/api-spec/**`, `packages/api-zod/**`, `packages/api-client/**`, `packages/contracts/**`, `scripts/**`, `.dependency-cruiser.cjs`, `eslint.config.js`, `.prettierignore`, `package.json`, `site/tsconfig.json`, `.github/CODEOWNERS`, `.cursor/rules/**`, `AGENTS.md`, `docs/**`.

## Aceite
- **Scaffold** de `@vvf/api-spec` (`openapi.yaml` stub `/healthz` + `ErrorEnvelope` + `orval.config.ts`), `@vvf/api-zod` e `@vvf/api-client` — cada um com `package.json` + `tsconfig.json` + barrel `src/index.ts`; `custom-fetch.ts` no client. Orval 8.9.1.
- **Codegen escopado:** `pnpm --filter @vvf/api-spec run codegen` roda `orval` + `codegen-write-lockfiles.mjs` + `typecheck` **só** de `api-zod`/`api-client` (não recursivo). Atalho raiz `pnpm codegen:api`.
- **`@vvf/contracts` saneado:** export `./generated` (resolve o hack de path no `site/tsconfig.json`), `http-errors.ts` (`errorCodeSchema`/`ErrorCode` — D-23), barrel e docs deixam claro "contratos de domínio".
- **Drift-check:** `scripts/checks/check-codegen-fresh.mjs` (standalone) + `pnpm codegen:check` no `pnpm verify`. Código gerado fora de eslint/prettier; `sem-orfaos` ignora `generated/`.
- **Fronteiras (dependency-cruiser):** `site`↛`api-zod`/`api-client`; `admin`↛`api-zod`; `api-server`↛`api-client`; nenhum runtime↛`api-spec`; `api-zod`↛`api-client`.
- **Governança:** CODEOWNERS + `AGENTS.md` + `.cursor/rules/api-pipeline.mdc` + D-22/D-23 no ledger.
- **NÃO** implementar Express/rotas (isso é [`WO-API-001`](WO-API-001.md)).

## Refs
[`specs/engenharia/monorepo.md`](../specs/engenharia/monorepo.md) §1/§1.1, [`specs/engenharia/fronteiras.md`](../specs/engenharia/fronteiras.md), [`specs/engenharia/contrato-http.md`](../specs/engenharia/contrato-http.md), [`specs/engenharia/ci-gates.md`](../specs/engenharia/ci-gates.md), [`_decisoes.md`](../_decisoes.md) (D-22/D-23).
