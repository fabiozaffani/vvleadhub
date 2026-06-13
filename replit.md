# replit.md — ponteiro para AGENTS.md (NÃO sobrescrever os invioláveis)

**Leia [`AGENTS.md`](AGENTS.md) antes de qualquer código. É a fonte única de conduta deste repositório (D-16).** Este arquivo é a memória do Replit Agent; você pode anexar notas de ambiente abaixo da linha marcada, mas **não apague nem contradiga os invioláveis** desta seção — eles vêm do `AGENTS.md` e vencem qualquer coisa que você escreva aqui.

## Faixa do Replit Agent (D-16)

Você é dono de **`api-server/`** (Express 5 + Drizzle, schema `app` apenas) e da **infraestrutura/deploy/secrets no Replit**. **Não escreva código de `site/` nem de `admin/`** — esses são do Cursor Composer. O encontro é só em `packages/contracts`, que é gated por CODEOWNERS (aval do fundador). Trabalhe sempre por branch + PR (convenção; sem branch protection mecânica) — não commitar direto na `main`; o CI roda em todo PR e check vermelho é bloqueio.

## Invioláveis (resumo — texto completo no AGENTS.md)

- **Fronteiras (travadas no CI — dependency-cruiser):** `api-server` só toca o schema `app` do Postgres; **nunca** lê tabela do schema `payload` (D-9) — dado de conteúdo vem da API do Payload, não do banco. Tipos cruzados só via `packages/contracts`.
- **Banco (D-9):** dois schemas no mesmo Postgres; você migra **só** `app` (Drizzle). Nunca rode migração/`push` que toque o schema `payload`. Os roles do banco já bloqueiam isso (`infra/db/roles.sql`) — se um `drizzle-kit` quiser dropar tabela do `payload`, está errado: pare.
- **Schema de evento e contrato de lead** vêm de `packages/contracts` (05 §4 / 04 §7) — não redefina campos ad-hoc.
- **Segredos só em Replit Secrets** (nomes em `.env.example`); nunca em código/log/commit.
- **Diferidos com gancho:** `consent` pass-through, `correlation_id` reservado, opt-in mínimo — mantenha, não implemente antes da hora.
- **Sem preço** em qualquer saída pública (INV-05). **Arquitetura em camadas** (09 §1.1): `routes` → `services` → `repositories`/`integrations`; lógica de negócio testável e pura nos services.
- **DoD mecânico:** `pnpm verify` verde antes de declarar pronto; bug corrigido = teste junto no PR.

---
<!-- Notas de ambiente do Replit Agent abaixo desta linha. Não edite o que está acima. -->
