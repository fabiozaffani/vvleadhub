# D-9 — Postgres — dois schemas (`payload` + `app`)

**Status:** fechada · **Data:** — · **Tags:** stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Banco:** um Postgres, **dois schemas** (`payload` = conteúdo, dono Payload; `app` = operacional, dono api-server/Drizzle). Cada ferramenta migra só o próprio schema; **nenhuma FK atravessa schemas** (referência por id, validada na aplicação). Comunicação entre runtimes é por API (OpenAPI), nunca lendo tabela alheia.

## Consequências

Ver ecos nos docs que citam `D-9` (`grep -r "D-9" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
