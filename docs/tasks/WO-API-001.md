---
id: WO-API-001
status: pending
traces: [system/eventos.md, specs/engenharia/monorepo.md, specs/engenharia/contrato-http.md, specs/engenharia/observabilidade.md]
---
# WO-API-001 · api-server: esqueleto em camadas + observabilidade + OpenAPI

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** ex-WO-07 (só scaffold de tipos hoje).

## Objetivo
Subir o api-server real: Express 5 em camadas, `/health`, observabilidade e o contrato OpenAPI como fonte de verdade.

## Estado atual
Só existe stub de tipos + `db/schema.ts` (appSchema, D-9) + `drizzle.config.ts` + regras de fronteira dormentes. **Nada de runtime.**

## Arquivos
`api-server/**`; `packages/contracts/generated/**` só por PR gated.

## Aceite (F0/F1)
- Express 5 em camadas `routes → services → repositories/integrations` (travas já no dependency-cruiser — [`specs/engenharia/monorepo.md`](../specs/engenharia/monorepo.md) §1.1).
- `/health` por runtime; Sentry + pino (um projeto Sentry por runtime — [`specs/engenharia/observabilidade.md`](../specs/engenharia/observabilidade.md)).
- `openapi.yaml` como fonte + codegen → `packages/contracts/generated` com **drift-check no CI** (cruza com [`WO-CI-001`](WO-CI-001.md)).
- CORS por allowlist explícita (nunca `*` reflexivo — restrição de build 8). (`/collect` e cola Kommo são Fase 1.)

## Refs
[`system/eventos.md`](../system/eventos.md), [`specs/engenharia/contrato-http.md`](../specs/engenharia/contrato-http.md), [`specs/engenharia/observabilidade.md`](../specs/engenharia/observabilidade.md).
