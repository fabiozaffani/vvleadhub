---
id: WO-API-001
status: pending
traces: [system/eventos.md, specs/engenharia/monorepo.md, specs/engenharia/contrato-http.md, specs/engenharia/observabilidade.md]
deps: [WO-PACKAGES-001]
skills: [work-order]
---
# WO-API-001 · api-server: esqueleto em camadas + observabilidade + OpenAPI

**Quem executa:** Claude Code (ambiente primário atual). **Camada de tom:** trabalho. **Origem:** ex-WO-07 (só scaffold de tipos hoje).

## Objetivo
Subir o api-server real: Express 5 em camadas, `/health`, observabilidade e o contrato OpenAPI como fonte de verdade.

## Estado atual
Só existe stub de tipos + `db/schema.ts` (appSchema, D-9) + `drizzle.config.ts` + regras de fronteira dormentes. **Nada de runtime.**

## Arquivos permitidos (a cerca)
`api-server/**`; `packages/api-spec/**` (o `openapi.yaml` real) e `packages/api-zod/**`/`packages/api-client/**` (regenerados via `pnpm codegen:api`) só por PR gated.

## Aceite (F0/F1)
- Express 5 em camadas `routes → services → repositories/integrations` (travas já no dependency-cruiser — [`specs/engenharia/monorepo.md`](../specs/engenharia/monorepo.md) §1.1).
- `/health` por runtime; Sentry + pino (um projeto Sentry por runtime — [`specs/engenharia/observabilidade.md`](../specs/engenharia/observabilidade.md)).
- **Contrato (D-22):** o `openapi.yaml` vive em `packages/api-spec` (não em `api-server/`); o codegen Orval desagua em `@vvf/api-zod` + `@vvf/api-client` (**não** em `contracts/generated`), com **drift-check no CI** (`pnpm codegen:check` — cruza com [`WO-CI-001`](WO-CI-001.md)). O scaffold do pipeline está em [`WO-PACKAGES-001`](WO-PACKAGES-001.md); aqui é só preencher o spec com os endpoints reais.
- **Validação de borda:** as rotas validam req/params com `@vvf/api-zod`; o envelope de erro usa `ErrorCode` de `@vvf/contracts` (D-23). Fluxo: editar `packages/api-spec/openapi.yaml` → `pnpm codegen:api` → implementar route/service.
- CORS por allowlist explícita (nunca `*` reflexivo — restrição de build 8). (`/collect` e cola Kommo são Fase 1.)

## Refs
[`system/eventos.md`](../system/eventos.md), [`specs/engenharia/contrato-http.md`](../specs/engenharia/contrato-http.md), [`specs/engenharia/observabilidade.md`](../specs/engenharia/observabilidade.md).
