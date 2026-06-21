# D-7 — Greenfield — protótipo é referência, não migração

**Status:** fechada · **Data:** — · **Tags:** gov

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Greenfield:** o implementado em `artifacts/valeverde` é protótipo/implementação de referência, não base de migração. D-1 reconfirmada; Fase 0 = build; ~~`CLAUDE.md` é a fonte única de instruções do agente~~ **(emendado por D-16: a fonte única passa a ser `AGENTS.md`; `CLAUDE.md`/`.cursor/rules` são ponteiros — `replit.md` removido pela D-18).**

## Consequências

Ver ecos nos docs que citam `D-7` (`grep -r "D-7" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-16 | Fonte única passa de `CLAUDE.md` a `AGENTS.md`; `CLAUDE.md`/`.cursor/rules` viram ponteiros (`replit.md` removido pela D-18). |
