# infra/db — isolamento de schema (D-9)

`roles.sql` cria os dois schemas (`payload`, `app`) e dois roles Postgres que **não enxergam o schema um do outro**. É a trava de fronteira no nível do banco — complementa (não substitui) o `schemaFilter: ["app"]` do `api-server/drizzle.config.ts` e as travas de import do dependency-cruiser.

## Aplicar (uma vez, no provisionamento — Fase 0a)
1. Trocar `CHANGE_ME_*` por senhas reais geradas e guardadas em Secrets.
2. `psql "$ADMIN_DATABASE_URL" -f infra/db/roles.sql` (com um superuser/owner do banco).
3. Apontar `DATABASE_URL_APP` (role `vvf_app`) e `DATABASE_URL_PAYLOAD` (role `vvf_payload`) nos Secrets — ver `.env.example`.

## Invariante (D-9)
- Payload migra **só** `payload`; Drizzle/api-server migra **só** `app`.
- Nenhuma FK atravessa schemas; referência por id, validada na aplicação.
- Nenhum runtime lê tabela do outro — dado alheio sempre via API (OpenAPI/Payload API).
