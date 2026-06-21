# D-22 — Pipeline HTTP — api-spec → api-zod + api-client

**Status:** fechada · **Data:** jun/2026 · **Tags:** gov, stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Estrutura de `packages/` — pipeline HTTP em 3 pacotes (emenda a `specs/engenharia/monorepo.md` §1, espelhando o `lib/` do ERPVVF adaptado a `packages/`):** o contrato HTTP deixa de ser um único pacote `@vvf/contracts` com `generated/` misto e passa a um pipeline explícito. **`@vvf/contracts`** = só **contratos de domínio** (evento, lead, primitivas) + **enums estáveis de runtime** (ex.: `ErrorCode` de cliente — D-23). **Pipeline HTTP:** **`@vvf/api-spec`** (`openapi.yaml` = fonte de verdade; **nenhum import em runtime** — só Orval dev) → codegen **Orval 8.9.1** → **`@vvf/api-zod`** (validação de borda, **só** api-server) + **`@vvf/api-client`** (hooks React Query, **só** admin; o `site` é Astro e consome **tipos** de `@vvf/contracts`, não hooks). **OpenAPI sai de `api-server/` para `packages/api-spec/`** (contrato desacoplado do runtime). **Codegen Orval NÃO desagua mais em `contracts/generated/`** — esse dir fica **só** para `payload generate:types`. **Payload types permanecem em `contracts/generated/`** até dor dupla provar `@vvf/cms-types` (mesma régua que cortou `packages/ui`). **Regra de ouro:** gerado do OpenAPI → `api-zod`/`api-client`; authored de domínio → `contracts`; gerado do Payload → `contracts/generated`. **Enforcement por máquina:** novas travas no dependency-cruiser (`site`/`api-server` não importam `api-client`; `site` não importa `api-zod`) + **drift-check por lockfile SHA256** (`codegen:check`) no `pnpm verify`; código gerado fica fora de eslint/prettier. Governança: os 4 pacotes `packages/*` são gated por CODEOWNERS.

## Consequências

Ver ecos nos docs que citam `D-22` (`grep -r "D-22" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
