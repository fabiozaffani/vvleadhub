# Travas de fronteira (CI)

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

As fronteiras entre runtimes e camadas não são convenção de estilo — são CI. Violá-las quebra o build. Esta spec lista as travas automatizadas.

## 2. Travas de fronteira (automatizadas — não são convenção, são CI)

| Regra | Trava |
|---|---|
| `site` nunca importa de `admin` ou `api-server` (e vice-versa) — só de `packages/*` | dependency-cruiser (ou ESLint boundaries) no CI; violação = build falha |
| Tipos cruzados só via `packages/contracts` | idem |
| `site` sem acesso a Postgres (D-9) | nenhuma lib de DB no `package.json` do site — lint de dependências |
| Schema `app` só migrado pelo Drizzle; `payload` só pelo Payload (D-9) | migrações vivem cada uma no seu runtime; CI roda `drizzle-kit check` |
| Segredos nunca no código | gitleaks no CI + Secrets do provedor de hospedagem como única fonte |
| OpenAPI é o contrato | spec em `api-server/openapi.yaml`; codegen para `packages/contracts`; CI falha se o gerado divergir do commitado |

## Travas de camada interna ao `api-server`

Além das fronteiras entre runtimes, a arquitetura em camadas do `api-server` (ver [`monorepo.md`](monorepo.md) §1.1) é igualmente travada no dependency-cruiser:

- `routes` nunca importa `repositories`/`integrations` diretamente — sempre via `services`.
- `services` não conhecem HTTP nem Express.
- Side-effects (banco, APIs externas) vivem só em `repositories`/`integrations` e chegam aos services por parâmetro (injeção simples — é o que torna a lógica testável sem mock de framework).

> O isolamento de schema por runtime (D-9) e as roles isoladas que o sustentam estão detalhados em [`ambientes-secrets.md`](ambientes-secrets.md). A pipeline que executa estas travas está em [`ci-gates.md`](ci-gates.md).
