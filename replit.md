# replit.md — ponteiro para AGENTS.md (NÃO sobrescrever os invioláveis)

**Leia [`AGENTS.md`](AGENTS.md) antes de qualquer código. É a fonte única de conduta deste repositório (D-16).** Este arquivo é a memória do Replit Agent; você pode anexar notas de ambiente abaixo da linha marcada, mas **não apague nem contradiga os invioláveis** desta seção — eles vêm do `AGENTS.md` e vencem qualquer coisa que você escreva aqui.

## ⚠️ Sync com o GitHub — NUNCA na `main` (D-16, modelo A — decisão do fundador jun/2026)

**O checkpoint / "Publish" / git do Replit NÃO pode commitar nem empurrar para a `main` do GitHub.** Publicar o app direto na main (fora de PR) já quebrou a CI e gerou duplicatas — não repetir. Regra:

- Configure o Git do Replit para a **branch de trabalho `replit/work`** (não `main`). Todo commit/checkpoint do Replit vai pra lá.
- Quando uma work-order fechar: abra um **PR de `replit/work` → `main`** (via `gh` no shell do Replit, ou a UI do GitHub). `pnpm verify` verde antes.
- A `main` só recebe **merge de PR verde** (o Claude Code revisa com `/code-review` e mergeia).
- O **"Publish" do Replit é só deploy** do app no Replit — desacoplado do GitHub. Deployar ≠ empurrar pra main.

## Papel do Replit Agent (D-16) — builder primário

Você é o **builder primário**: desenvolve o **app inteiro** — `site/` (Astro), `admin/` (Payload/Next), `api-server/` (Express 5 + Drizzle) e a infraestrutura/deploy/secrets no Replit, em todas as fases do roadmap (03 §7). Cursor Composer e Claude Code são **auxiliares** (auditoria, revisão, melhoria, debug) — eles não constroem em paralelo; quando entram, é em tarefa escopada / PR própria.

Construa **pela ordem das work-orders** (`docs/tasks/fase-0.md`), uma de cada vez — não tudo num prompt só. `packages/contracts` e `docs/` são **gated por CODEOWNERS** (aval do fundador): precisa de campo novo no contrato? pare e proponha. Trabalhe sempre por branch + PR (convenção; sem branch protection mecânica) — não commitar direto na `main`; o CI roda em todo PR e check vermelho é bloqueio.

## Invioláveis (resumo — texto completo no AGENTS.md; você constrói os 3 runtimes)

- **Fronteiras (travadas no CI — dependency-cruiser):** `site`/`admin`/`api-server` **não se importam** entre si — só de `packages/*`; tipos cruzados **só** via `packages/contracts`. O `site` **jamais** acessa Postgres (D-9): consome a API do Payload e manda eventos ao `/collect`.
- **Banco (D-9):** dois schemas no mesmo Postgres — Payload migra `payload`, Drizzle migra `app`. Nunca rode migração/`push` que toque o schema alheio. Os roles do banco bloqueiam isso (`infra/db/roles.sql`) + `schemaFilter:["app"]` no drizzle.config — se um `drizzle-kit` quiser dropar tabela do `payload`, está errado: pare.
- **`site/` (Astro):** `output:'server'` + prerender + cache de edge (sem ISR); **zero JS por default**, ilha só com interação real; **sem Framer Motion** (use CSS/IntersectionObserver); **shadcn só no `admin/`**; imagens via `astro:assets` (não `next/image`); tokens das Design Guidelines, sem emojis, sem ícones decorativos, pt-BR.
- **`admin/` (Payload):** convenção nativa; tipo de Assunto novo = collection (código), instância = dado; tipos para o site via `payload generate:types` → `packages/contracts/generated`.
- **`api-server/`:** camadas (09 §1.1) `routes` → `services` (lógica pura/testável) → `repositories`/`integrations`; fila = pg-boss no schema `app`.
- **Contratos:** schema de evento e contrato de lead vêm de `packages/contracts` (05 §4 / 04 §7) — não redefina campos ad-hoc.
- **Segredos só em Replit Secrets** (nomes em `.env.example`); nunca em código/log/commit. **Sem preço** em copy público (INV-05); experiência integrada (INV-03); exclusividade pela história (INV-07).
- **Diferidos com gancho:** `consent` pass-through, `correlation_id` reservado, opt-in mínimo — mantenha, não implemente antes da hora.
- **Testes = `node:test`** (built-in, zero download); **não reintroduza vitest** — o firewall do Replit o bloqueia (403). Ambiente já preparado no repo: `.npmrc` com `manage-package-manager-versions=false` (pnpm 10 do Replit lê o lockfile v9), eslint ignora `.local`/`.cache`/`.upm`.
- **DoD mecânico:** `pnpm verify` verde antes de declarar pronto; bug corrigido = teste junto no PR.

---
<!-- Notas de ambiente do Replit Agent abaixo desta linha. Não edite o que está acima. -->

## Ambiente Replit (setup do import)

- **Node 24** (módulo `nodejs-24` no `.replit`) — obrigatório: o `.nvmrc` pede 24 e o teste do `packages/contracts` usa `node --test "dist/**/*.test.js"`, cujo glob só é expandido a partir do Node 21+. No Node 20 o teste falha por não achar o arquivo.
- **pnpm 10** (ship do Replit) lê o lockfile v9 — ok por causa do `.npmrc` (`manage-package-manager-versions=false`). Não fixar/rebaixar.
- Estado atual = scaffold da Fase 0a (guardrails + `packages/contracts`). Os runtimes `site/` (Astro), `admin/` (Payload/Next) e `api-server/` (Express) ainda são stubs — entram na Fase 0b por work-order (`docs/tasks/fase-0.md`). **Ainda não há servidor/frontend para rodar nem workflow/porta a configurar.**
- DoD do ambiente: `pnpm install` && `pnpm verify` verde (typecheck · lint · boundaries · test · build).
