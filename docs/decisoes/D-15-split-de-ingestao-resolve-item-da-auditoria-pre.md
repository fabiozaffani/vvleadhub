# D-15 — Split de ingestão (PostHog proxy vs /collect)

**Status:** fechada · **Data:** jun/2026 · **Tags:** stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Split de ingestão** (resolve item da auditoria pré-build): analytics do PostHog entra por **proxy reverso no Cloudflare** (domínio first-party → PostHog Cloud, padrão suportado pelo PostHog), **sem passar pelo api-server**; o `/collect` (api-server) fica com **eventos de negócio** (lead, conversões, server-side) e a cola Kommo. Disponibilidade do analytics desacoplada do runtime Express/api-server (INV-08).

## Consequências

Ver ecos nos docs que citam `D-15` (`grep -r "D-15" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
