# Monorepo & arquitetura interna dos runtimes

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Como o código é fisicamente organizado: a árvore do monorepo (pnpm workspaces) e a estrutura interna de cada runtime. O *quê* construir vive nas specs de domínio; aqui está o esqueleto físico do *como*.

## 1. Estrutura do monorepo (pnpm workspaces)

```
/
├── AGENTS.md                  ← manual de conduta do agente (fonte única — D-16/D-27; CLAUDE.md é adapter)
├── docs/                      ← este conjunto de docs + tasks/ (work-orders)
├── infra/                     ← provisionamento (db/roles.sql — isolamento de schema D-9)
├── site/                      ← Astro (público; output:'server'; zero credencial de banco)
├── admin/                     ← Payload + Next (conteúdo + Tracker Hub views)
├── api-server/                ← Express 5 + Drizzle (cola fina: /collect, Kommo, loop, links)
└── packages/                 ← pacotes compartilhados (cada um com `package.json` + `tsconfig.json`)
    ├── contracts/             ← contratos de DOMÍNIO: schema de evento (`system/eventos.md`), contrato de
    │                            lead (`specs/landing-pages/contrato-lead.md`), `http-errors.ts` (ErrorCode,
    │                            D-23) + `generated/` (SÓ `payload generate:types`) — gated por CODEOWNERS
    ├── api-spec/              ← `openapi.yaml` (fonte de verdade do contrato HTTP) + `orval.config.ts`;
    │                            NÃO importado em runtime — só insumo do codegen (D-22)
    ├── api-zod/               ← Zod de borda gerado (Orval) — consumido SÓ pelo api-server
    └── api-client/            ← hooks React Query gerados (Orval) + `custom-fetch.ts` — consumidos SÓ pelo admin
```

Regras: nomes de pasta exatamente estes; cada runtime/pacote tem `package.json` próprio; nada fora do workspace pnpm. **Pipeline HTTP em 3 pacotes (D-22):** o contrato OpenAPI vive em `packages/api-spec` (desacoplado do runtime) e o codegen Orval desagua em `api-zod`/`api-client` — **não** mais em `contracts/generated/`, que ficou só para o Payload. **`packages/ui` foi cortado da v1** (auditoria de delegação jun/2026): site Astro e admin React mal compartilham UI real, e "(opcional)" para um agente lê-se "construa". Criar só com dor dupla comprovada — mesma régua para um eventual `packages/cms-types`.

## 1.1 Arquitetura interna dos runtimes (estrutura e camadas)

### `api-server/` — arquitetura em camadas (routes → services → repositories/integrations)

```
api-server/
└── src/                     ← o contrato OpenAPI vive em `packages/api-spec` (D-22), não aqui
    ├── routes/              ← HTTP fino: valida entrada (Zod), chama service, responde. ZERO lógica de negócio
    ├── services/            ← lógica de negócio pura e testável (dedup D-11, loop fechado, xcode, ingestão D-13)
    ├── repositories/        ← acesso ao schema `app` (Drizzle). ÚNICO lugar que toca o banco
    ├── integrations/        ← clientes de sistemas externos, 1 pasta por sistema (kommo/, posthog/, ads/meta/, ads/google/, …)
    ├── db/                  ← schema Drizzle + migrações (dono do schema `app` — D-9)
    └── lib/                 ← utilitários transversais sem estado
```

Regras de camada (travadas no dependency-cruiser; detalhe em [`fronteiras.md`](fronteiras.md)): `routes` nunca importa `repositories`/`integrations` diretamente — sempre via `services`; `services` não conhecem HTTP nem Express; side-effects (banco, APIs externas) vivem só em `repositories`/`integrations` e chegam aos services por parâmetro (injeção simples — é o que torna a lógica testável sem mock de framework).

### `site/` (Astro)

```
site/src/
├── pages/         ← rotas (arquivo = URL): institucional, /lp/[slug], /blog/[slug], bio
├── layouts/       ← cascas de página (base, LP, post)
├── blocks/        ← a biblioteca de Blocos (ver specs/landing-pages) — 1 pasta por bloco (.astro + props Zod + capacidades)
├── components/    ← UI menor reutilizável que NÃO é bloco editorial
├── lib/           ← cliente de conteúdo (Payload), collector de eventos, seo/ (schema.org), ab/ (variante D-8)
└── styles/        ← tokens/base do design system (espelho fiel — ver specs/design-system)
```

Distinção dura: **Bloco ≠ component.** Bloco é a unidade editorial das primitivas da plataforma e das landing pages (registrada, com capacidades por TipoDeAssunto, montável no admin); component é detalhe interno de implementação. Um component nunca aparece no editor.

**Páginas são finas:** uma `page` compõe `layouts`/`blocks`/`components` e delega dados/SEO a `lib/` — sem lógica de negócio nem fetch espalhado na página.

**Sem camada `features/`** (decisão jun/2026): em Astro + CMS a "feature" se expressa em `pages/` + `blocks/` + `lib/`, não numa pasta `features/` (que duplicaria a `pages/`). Composição específica-de-área **não-editorial** mora em `components/<área>/` (ex.: `components/blog/`). Criar `features/` só com dor dupla comprovada — mesma régua que cortou `packages/ui`.

### `admin/` (Payload)

Segue a **convenção nativa do framework** — `collections/` (1 arquivo por entidade das primitivas da plataforma: subjects, subject-types via código, lps, templates, posts, media…), `blocks/` (espelho 1:1 dos blocos do site), `access/` (RBAC — D-12), `views/` (Tracker Hub), `hooks/` (purge de cache no publish, webhooks). Regra: onde o framework tem convenção, não se inventa estrutura própria.

### `packages/contracts/` (contratos de domínio)

`events.ts` (schema canônico de evento — ver `system/eventos.md`) · `lead.ts` (contrato de lead — ver `specs/landing-pages/contrato-lead.md`) · `http-errors.ts` (`errorCodeSchema`/`ErrorCode` — fonte única do code do envelope HTTP, D-23) · `generated/` (**só** os tipos do `payload generate:types`, consumidos pelo `site` — nunca editados à mão). Gated por CODEOWNERS.

### `packages/api-spec/` · `api-zod/` · `api-client/` (pipeline HTTP — D-22)

Fluxo de codegen, espelhando o `lib/` do ERPVVF adaptado a `packages/`:

```
packages/api-spec/openapi.yaml   ← fonte de verdade (sem import em runtime)
        │  pnpm codegen:api  (Orval 8.9.1)
        ├─► packages/api-zod/src/generated/      → @vvf/api-zod   (validação de borda; SÓ api-server)
        └─► packages/api-client/src/generated/   → @vvf/api-client (hooks React Query; SÓ admin)
```

Regra de ouro: **gerado do OpenAPI → `api-zod`/`api-client`; authored de domínio → `contracts`; gerado do Payload → `contracts/generated`.** Tudo sob `src/generated/` é saída do Orval — nunca editado à mão; as únicas partes hand-written são os barrels `src/index.ts` e o `custom-fetch.ts`. Editar o contrato = editar `openapi.yaml` + `pnpm codegen:api` (drift travado no CI por lockfile SHA256 — ver [`fronteiras.md`](fronteiras.md)/[`ci-gates.md`](ci-gates.md)).

### Testes

Colocalizados (`arquivo.test.ts` ao lado do `arquivo.ts`); e2e em `/e2e` na raiz do monorepo. Detalhe da pirâmide em [`testes.md`](testes.md).
