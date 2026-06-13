---
name: D-9 schema isolation on Replit Postgres
description: Whether/how the two-schema, two-role D-9 isolation works on Replit's managed Postgres
---

Replit's managed Postgres for this project is a FULL superuser instance
(`current_user=postgres`, `is_superuser=on`, PostgreSQL 16.x) — NOT the restricted
Neon role the WO-06 work-order warned about. Therefore `infra/db/roles.sql` applies
in full: `CREATE ROLE`, `ALTER SCHEMA ... OWNER`, `REVOKE`, per-role `search_path`.

**Proven (WO-06 evidence):** connecting as `vvf_app` (search_path=app) can write to
`app` but is DENIED on `payload` (`permission denied for schema payload`, no USAGE);
symmetric for `vvf_payload`. Custom roles CAN log in through the Replit PG endpoint,
but only WITHOUT ssl (local endpoint: "server does not support SSL connections" — use
`ssl:false`). pg lives in `api-server`; run probe scripts from that dir so it resolves.

**Operational frictions (why this needed founder sign-off, not silent improvisation):**
1. The agent CANNOT set Replit Secrets directly (env-secrets skill) — the founder must
   add DATABASE_URL_APP / DATABASE_URL_PAYLOAD / PAYLOAD_SECRET / SERVICE_TOKEN_SECRET.
2. Custom-role connection strings carry credentials → must be founder-stored secrets;
   the role password and the secret value must match (chicken-and-egg if not leaked).
3. Replit's Publish flow manages the PRODUCTION schema by diffing dev↔prod via the
   MANAGED role (`postgres`/DATABASE_URL). Runtimes connecting as custom roles interacts
   with that model — a production-promotion concern (a stop-and-ask gate).

**Why:** D-9 is a closed decision; it IS enforceable on Replit, but the dev-vs-prod
wiring (which role each runtime uses, how secrets are set) is infra the founder owns.
