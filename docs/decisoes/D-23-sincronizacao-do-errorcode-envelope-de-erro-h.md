# D-23 — ErrorCode — fonte única em @vvf/contracts

**Status:** fechada · **Data:** jun/2026 · **Tags:** stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Sincronização do `ErrorCode` (envelope de erro HTTP — `specs/engenharia/contrato-http.md`; correlato à D-22):** o `code` do envelope de erro tem **fonte única em `@vvf/contracts`** (`errorCodeSchema` — os 7 códigos: `VALIDATION_FAILED`·`UNAUTHORIZED`·`FORBIDDEN`·`NOT_FOUND`·`CONFLICT`·`RATE_LIMITED`·`INTERNAL`). No `openapi.yaml`, `ErrorEnvelope.error.code` é **`type: string`** (sem enum gerado), com os códigos listados na `description` (documentação humana). Rotas validam o **shape** do envelope com `@vvf/api-zod` e checam o **valor** de `code` com `errorCodeSchema` de `@vvf/contracts`. **Opção descartada:** enum no spec → gerado em `api-zod` + teste de paridade com `contracts` — evita duas definições do mesmo enum sem mecanismo de sync (OpenAPI não importa enum TS, drift silencioso).

## Consequências

Ver ecos nos docs que citam `D-23` (`grep -r "D-23" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
