# Travas de fronteira (CI)

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

As fronteiras entre runtimes e camadas não são convenção de estilo — são CI. Violá-las quebra o build. Esta spec lista as travas automatizadas.

## 2. Travas de fronteira (automatizadas — não são convenção, são CI)

| Regra | Trava |
|---|---|
| `site` nunca importa de `admin` ou `api-server` (e vice-versa) — só de `packages/*` | dependency-cruiser (ou ESLint boundaries) no CI; violação = build falha |
| Tipos **de domínio** cruzados só via `packages/contracts` | idem |
| Pipeline HTTP — quem importa o quê (D-22): `api-zod` **só** no api-server; `api-client` **só** no admin; `api-spec` em **nenhum** runtime | dependency-cruiser (`site-sem-api-zod`, `site-sem-api-client`, `admin-sem-api-zod`, `api-server-sem-api-client`, `api-spec-sem-import-runtime`, `api-zod-sem-api-client`) |
| `site` sem acesso a Postgres (D-9) | nenhuma lib de DB no `package.json` do site — lint de dependências |
| Schema `app` só migrado pelo Drizzle; `payload` só pelo Payload (D-9) | migrações vivem cada uma no seu runtime; CI roda `drizzle-kit check` |
| Segredos nunca no código | gitleaks no CI + Secrets do provedor de hospedagem como única fonte |
| OpenAPI é o contrato (D-22) | spec em `packages/api-spec/openapi.yaml`; codegen Orval → `@vvf/api-zod` + `@vvf/api-client`; **drift-check por lockfile SHA256** (`pnpm codegen:check`, no `verify`) — CI falha se o `openapi.yaml` mudar sem regenerar |
| Tipos do Payload é o contrato de conteúdo | `payload generate:types` → `packages/contracts/generated`; CI falha se o gerado divergir do commitado |

## Travas de camada interna ao `api-server`

Além das fronteiras entre runtimes, a arquitetura em camadas do `api-server` (ver [`monorepo.md`](monorepo.md) §1.1) é igualmente travada no dependency-cruiser:

- `routes` nunca importa `repositories`/`integrations` diretamente — sempre via `services`.
- `services` não conhecem HTTP nem Express.
- Side-effects (banco, APIs externas) vivem só em `repositories`/`integrations` e chegam aos services por parâmetro (injeção simples — é o que torna a lógica testável sem mock de framework).

> O isolamento de schema por runtime (D-9) e as roles isoladas que o sustentam estão detalhados em [`ambientes-secrets.md`](ambientes-secrets.md). A pipeline que executa estas travas está em [`ci-gates.md`](ci-gates.md).
