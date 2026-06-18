---
id: WO-CORE-001
status: done
traces: [specs/engenharia/monorepo.md, specs/engenharia/fronteiras.md, specs/engenharia/ci-gates.md, specs/engenharia/ambientes-secrets.md, decisoes.md]
---
# WO-CORE-001 · Guardrails como código (Fase 0a)

**Quem executou:** fundador — base não delegada (D-16: a 0a monta a gaiola antes de qualquer agente escrever feature). **Camada de tom:** trabalho.

## Objetivo
Enforcement por máquina antes das features: monorepo + travas + CI + keystone de contratos.

## Entregue (evidência no repo)
- Monorepo pnpm: `site/` · `admin/` · `api-server/` · `packages/contracts`.
- `pnpm verify` (typecheck · lint · boundaries · test · build) e `pnpm ship` (auto-merge de PR de código).
- Travas de fronteira no `.dependency-cruiser.cjs` (runtime↔runtime proibido; `site` sem libs de banco — D-9; camadas do api-server — [`specs/engenharia/fronteiras.md`](../specs/engenharia/fronteiras.md)).
- CI (`.github/workflows/ci.yml`): `verify` · `gitleaks` · `commitlint` · `quality` (CWV/axe, route-gated).
- Keystone `packages/contracts`: schema de evento, contrato de lead, click_ids/visit events (D-14), vocabulário canônico.
- Isolamento D-9 no nível do banco (`infra/db/roles.sql`) + `schemaFilter:['app']`.
- Tooling: tsconfig strict, ESLint+Prettier, renovate, `.gitattributes`, `.env.example`, CODEOWNERS, PR template, lighthouserc.

## Refs
[`specs/engenharia/*`](../specs/engenharia/), [`decisoes.md`](../decisoes.md) (D-16/D-18).

## Pendência manual (fundador)
Branch protection LIGADA ✅. Aplicar `roles.sql` no Postgres provisionado + provar isolamento → [`WO-INFRA-001`](WO-INFRA-001.md).
