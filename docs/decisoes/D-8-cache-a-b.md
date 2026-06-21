# D-8 — Cache × A/B — LPs com experimento fora do full-page cache

**Status:** fechada · **Data:** — · **Tags:** arquitetura

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Cache × A/B:** LPs **com experimento ativo** ficam fora do full-page cache (SSR a cada hit; assets sempre no CDN); LPs sem experimento = cache total. **Evolução de etapa final:** edge logic (Worker) com variante na chave de cache.

## Consequências

Ver ecos nos docs que citam `D-8` (`grep -r "D-8" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
