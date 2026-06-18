# Engenharia (system)

**Camada:** system · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Visão coesa de como o código deste app é organizado, protegido e verificado — o *como construir sem apodrecer*. O *quê* construir vive nas specs de domínio (landing-pages, eventos, admin, blog, experimentação, plataforma); esta página agrega a disciplina de engenharia que atravessa todas elas e aponta para o detalhe. Não recopia o detalhe — linka.

## O que este domínio é

Engenharia não é um domínio de produto; é a malha que segura os domínios de produto de pé. Quatro forças, nesta ordem de leitura:

1. **Organização física** — onde cada coisa mora.
2. **Travas** — o que o CI proíbe, sem espaço para opinião.
3. **Verificação** — testes e gates que provam que ainda funciona.
4. **Operação durável** — ambientes, observabilidade e manutenção, para não apodrecer no médio prazo.

## Como as specs compõem o todo

**Organização física**
- [`specs/engenharia/monorepo.md`](../specs/engenharia/monorepo.md) — a árvore do pnpm workspace (`site`/`admin`/`api-server`/`packages/contracts`/`infra`) e a arquitetura interna de cada runtime: camadas `routes → services → repositories/integrations` no `api-server`, `pages/blocks/components/lib` no `site` (sem `features/`), convenção nativa do Payload no `admin`. Fixa a distinção dura **Bloco ≠ component**.
- [`specs/engenharia/contrato-http.md`](../specs/engenharia/contrato-http.md) — a forma das respostas do `api-server`: envelope de erro tipado (enum `code` estável, `message` dev-facing, `request_id`, `details` do Zod), paginação por offset e idempotência de `/collect`/webhooks.

**Travas (o que o CI não negocia)**
- [`specs/engenharia/fronteiras.md`](../specs/engenharia/fronteiras.md) — as fronteiras entre runtimes e entre camadas, travadas no dependency-cruiser/gitleaks/`drizzle-kit check`/codegen. `site` não importa `admin`/`api-server`; tipos cruzados só por `contracts`; `site` sem Postgres; cada schema migrado só pelo seu dono (D-9); OpenAPI é o contrato. Violar = build vermelho.

**Verificação**
- [`specs/engenharia/testes.md`](../specs/engenharia/testes.md) — pirâmide pragmática: unit em `node:test` (zero dependência), integração com mocks, e2e mínimo vital no Playwright, axe nas rotas-chave. Bug corrigido = teste que o reproduz.
- [`specs/engenharia/ci-gates.md`](../specs/engenharia/ci-gates.md) — a pipeline por PR e o **Lighthouse CI como fiscal do orçamento de CWV** (estourou = PR bloqueado). Trunk-based; preview no merge, promoção a prod manual.
- [`specs/engenharia/acessibilidade.md`](../specs/engenharia/acessibilidade.md) — alvo WCAG 2.1 AA e a ordem de resolução do conflito estética × contraste (estética nunca embarca reprovada; ajusta-se o uso, nunca a paleta).

**Operação durável**
- [`specs/engenharia/ambientes-secrets.md`](../specs/engenharia/ambientes-secrets.md) — dev/preview/prod e o inventário canônico de secrets, com as roles isoladas por schema que dão dente ao D-9.
- [`specs/engenharia/observabilidade.md`](../specs/engenharia/observabilidade.md) — Sentry (um projeto por runtime), pino com correlação por `request_id`, `/health` por runtime.
- [`specs/engenharia/manutencao.md`](../specs/engenharia/manutencao.md) — Renovate com prioridade de segurança (patch ≤ 14 dias), política de upgrades e o gotcha `next build --webpack` no `admin` (Payload).

## Fronteiras com outros domínios

- **Plataforma** (`system/plataforma.md`) e **landing-pages** (`system/landing-pages.md`): definem o que é Bloco (unidade editorial) vs component (detalhe de implementação) — distinção que a engenharia trava fisicamente. O contrato de lead vive em `specs/landing-pages/contrato-lead.md` como tipo de `packages/contracts`.
- **Eventos** (`system/eventos.md`): o schema canônico de evento é o tipo `events.ts` em `contracts`; a idempotência de `/collect`, a saúde de integração (Tracker Hub) e os ganchos `correlation_id`/`click_ids` são desse domínio — a engenharia só fornece o transporte e a observabilidade.
- **Admin** (`system/admin.md`): o RBAC (D-12) e o Tracker Hub vivem nas convenções nativas do Payload; a engenharia trava só a fronteira e o isolamento de schema.
- **Design system** (`system/design-system.md`): os tokens em `site/src/styles/` são espelho fiel da spec de design; o gate de contraste vive na spec de acessibilidade desta engenharia.
- **Arquitetura** (`system/arquitetura.md`): o orçamento de CWV que o Lighthouse CI fiscaliza nasce ali; a engenharia o transforma em máquina.
- **Roadmap** (`roadmap/fases.md`): a sequência de fases e os critérios de aceite consomem os gates desta engenharia como definition of done.

## §10 Validação contra invariantes VVF (nota)

- **INV-08 (sem surpresas):** travas automatizadas + gates + testes = operação previsível.
- **INV-09 (replicável):** fronteiras e contratos tornam cada peça substituível/replicável.
- **Performance como gate** (ver `system/arquitetura.md`): Lighthouse CI dá dente à regra.
- **Escopo:** este domínio é arquitetura/método; rotina de operação fica fora dele.

> Invariantes INV-xx são canon de negócio — fonte em CONTEXTO-IA §2. Decisões D-N no ledger `_decisoes.md`; termos canônicos em `_lexico.md`.
