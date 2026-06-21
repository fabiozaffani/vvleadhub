# D-12 — Auth — Payload nativo + JWT serviço-a-serviço

**Status:** fechada · **Data:** — · **Tags:** stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Auth:** admin = **auth nativa do Payload** (users collection + RBAC — incluída na D-1, sem provedor externo). Serviço-a-serviço = JWT do Payload validado pelo api-server (segredo via secrets) para chamadas com contexto de usuário + tokens de serviço escopados para jobs. `/collect` = público com rate-limit (by design). **Auth de usuário final: fora do escopo v1**; se nascer portal de assessores / área do casal, **Clerk** é o candidato designado (gerenciado ou externo) — staff e clientes permanecem domínios de identidade separados.

## Consequências

Ver ecos nos docs que citam `D-12` (`grep -r "D-12" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
