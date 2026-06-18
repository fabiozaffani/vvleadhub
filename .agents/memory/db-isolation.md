---
name: d-9-schema-isolation-connect-with-the-isolated-role-never-a-superuser
description: "Each runtime must use its own DATABASE_URL_{APP,PAYLOAD} role; connecting as a superuser defeats D-9 even with roles.sql correct"
metadata: 
  node_type: memory
  originSessionId: 3f276925-1a40-42cb-b9c6-ce008e34a905
---

D-9 (one Postgres, two schemas `payload`/`app`, one owner-role each) is only real at
runtime if **each runtime connects with its own isolated role**:
- api-server → `DATABASE_URL_APP` (role `vvf_app`, search_path=app, DENIED on `payload`)
- Payload    → `DATABASE_URL_PAYLOAD` (role `vvf_payload`, search_path=payload, DENIED on `app`)

`infra/db/roles.sql` creates the two schemas, transfers ownership, `REVOKE`s cross-access,
and sets per-role `search_path`. The SQL is correct and the isolation is provable (a role
writes its own schema but gets `permission denied for schema <other>`).

**The trap:** if a runtime connects as a **superuser / single generic `DATABASE_URL`** (a
managed provider's admin role sees BOTH schemas), the role-level guarantee is bypassed even
though `roles.sql` is perfect. A `schemaName`/`schemaFilter` setting mitigates accidental
writes but does NOT restore the permission boundary. This was a real bug: `admin/payload.config.ts`
read `DATABASE_URL` (a superuser) instead of `DATABASE_URL_PAYLOAD` — fixed under D-18.

**How to apply:** never wire a runtime to a generic/admin `DATABASE_URL`; use the exact
isolated names from `.env.example`. When standing up a managed Postgres (Fase 0b), confirm
`CREATE ROLE`/`REVOKE`/`ALTER SCHEMA OWNER` are permitted (some restrict them — e.g. Neon);
if not, stop and escalate (fallback options in `docs/tasks/WO-INFRA-001.md`).
