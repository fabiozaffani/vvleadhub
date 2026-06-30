---
id: WO-INFRA-001
status: pending
traces: [system/arquitetura.md, specs/engenharia/ambientes-secrets.md, _decisoes.md]
deps: [WO-CORE-001]
skills: [work-order]
---
# WO-INFRA-001 · Provisionamento + prova do isolamento D-9

**Quem executa:** Claude Code / fundador. **Camada de tom:** trabalho. **Origem:** ex-WO-06.

## Objetivo
Provisionar Postgres + os 3 deployments sob subdomínios (Cloudflare na frente), Secrets, e **aplicar e provar** o isolamento de schema D-9.

## Arquivos permitidos (a cerca)
`infra/**`, configs de deploy/Secrets do provedor (a definir na Fase 0b — D-18). **Não tocar código de produto.**

## Aceite
- 3 runtimes sobem; subdomínios roteando (`www`/`admin.`/`api.`/`t.` — restrição de build 7); CI verde.
- **Isolamento D-9 PROVADO (crítico):** (1) aplicar `infra/db/roles.sql` (schemas `payload`/`app`, dois roles que não enxergam o schema um do outro); (2) conectar como `DATABASE_URL_APP` e confirmar que `payload` é **negado** (e o cruzado) — **anexar a saída como evidência**. Defesa-em-profundidade `schemaFilter:['app']` mantida.
- Secrets com nomes EXATOS do `.env.example` (`DATABASE_URL_APP`/`_PAYLOAD`, `PAYLOAD_SECRET`, `R2_*`, `CF_API_TOKEN`, `SERVICE_TOKEN_SECRET`, …).

## Fallback (escalar ao fundador, não decidir sozinho)
Postgres gerenciado pode restringir `CREATE ROLE`/`REVOKE` (ex.: Neon). Se `roles.sql` não aplicar: (a) isolamento só no nível de app (registrar) **ou** (b) dois bancos — desvia de "um Postgres" (D-9) → exige aval.

## Refs
[`system/arquitetura.md`](../system/arquitetura.md) (modelo de dados/D-9), [`specs/engenharia/ambientes-secrets.md`](../specs/engenharia/ambientes-secrets.md), [`_decisoes.md`](../_decisoes.md) (D-9/D-18).
