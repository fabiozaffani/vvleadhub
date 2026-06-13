# Fase 0 — work-orders

Fase 0 partida em **0a (guardrails como código)** e **0b (fundação delegável)**. **Só a 0b é delegada** — a 0a é o pré-requisito que monta a gaiola antes de qualquer agente escrever feature (D-16). Critérios canônicos: 03 §7.1.

---

## Fase 0a — Guardrails como código ✅ (entregue neste PR `chore/fase-0a-guardrails`)

Monorepo + enforcement por máquina. **Não delegar — é a base.**

- Monorepo pnpm: `site/` · `admin/` · `api-server/` · `packages/contracts` (keystone real: schema de evento 05 §4 + contrato de lead 04 §7, com click IDs/visit events da D-14) + `packages/contracts/generated/` (drift-check).
- `pnpm verify` = typecheck · lint · **boundaries (dependency-cruiser)** · test · build. DoD mecânico.
- Travas de fronteira (09 §2) em `.dependency-cruiser.cjs`: runtime↔runtime proibido; `site` sem libs de banco (D-9); camadas do api-server.
- CI (`.github/workflows/ci.yml`): verify + gitleaks + commitlint + job de CWV/axe (ativa quando o site tiver rotas).
- Isolamento de schema **no nível do banco** (`infra/db/roles.sql`, D-9) + `schemaFilter:["app"]` no drizzle.config.
- Tooling: tsconfig `strict`, ESLint flat + prettier, `.gitattributes` (eol=lf), renovate, `.env.example`, CODEOWNERS, PR template, lighthouserc.

### Passos manuais da 0a (fundador — fora do alcance do agente)
- [x] ~~Branch protection na `main`~~ — **decisão do fundador: não usar.** Disciplina branch+PR é convenção; o CI roda em todo PR e check vermelho é bloqueio (sem trava mecânica de merge).
- [ ] Rodar `infra/db/roles.sql` no Postgres provisionado (trocar `CHANGE_ME_*` por Secrets).
- [ ] Confirmar `@fabiozaffani` como usuário dos CODEOWNERS (ajustar se o handle for outro).
- [ ] gitleaks-action: repo pessoal não exige licença; se migrar para org, setar `GITLEAKS_LICENSE`.

---

## Fase 0b — Fundação (build pelo Replit Agent)

> **Restrições de build (armadilhas conhecidas — recomendação da auditoria; algumas viram emenda de doc P1 com aval):**
> 1. Astro em **`output: 'server'`** (adapter Node) + cache no Cloudflare + **purge por URL** no publish. NÃO `output:'static'`/"SSG-ISR" (Astro não tem ISR; "publicar reflete no site" depende de purge).
> 2. **Sem Framer Motion no site** para reveal/entrada — CSS + IntersectionObserver. Framer só em ilha já interativa.
> 3. **shadcn/ui só no `admin/`.** No site, componente próprio com tokens.
> 4. Imagens com `astro:assets` + pipeline D-10 (R2 + Cloudflare Images) — não `next/image`. Fontes self-hosted (`@fontsource`), preload, fallback métrico.
> 5. Tipos de resposta do Payload vêm de `packages/contracts/generated` (`payload generate:types`) — não escrever à mão. `transpilePackages: ['@vvf/contracts']` no `next.config`.
> 6. Preview de draft = rota `/preview` no Astro SSR + **token assinado** (segredo compartilhado) + `noindex` — nunca draft por query param aberto.
> 7. Hospedagem: três deployments + subdomínios (`www`, `admin.`, `api.`/`t.`) no DNS Cloudflare — não path-proxy.
> 8. `api-server`: definir CORS explícito (origem do site/admin), nunca `*` reflexivo; CSP no site com origens de script declaradas.

### Work-orders de build — Replit Agent (builder primário, todas as WO abaixo)

> **Cursor Composer e Claude Code não recebem WO de build** (D-16). Entram como auxiliares: Claude Code roda `/code-review` em cada PR do Replit + `/audit-quality`/`/checklist-fase` nos gates; Cursor para debug/leitura/correção pontual. Auditoria e melhoria são tarefas escopadas à parte, não WOs do roadmap. Cada WO continua com `Arquivos:` enxutos — é disciplina de PR focado, mesmo com um único builder.

**WO-01 · admin — Payload base + registros do 02** _(Replit Agent)_
- **Objetivo:** Payload (Next-hosted) no schema `payload` (D-9), com as collections do registro do 02 e RBAC (D-12).
- **Arquivos:** `admin/**` (não tocar `site/`, `api-server/`, `packages/contracts`).
- **Aceite (03 §7.1):** registros seedados (3 TiposDeAssunto; 5 espaços com `categoria`; serviços com `papel: padrão|adicional`; Objetivos incl. `agendar_visita`); `payload generate:types` desaguando em `packages/contracts/generated` (via PR gated, ou script que o fundador aprova).
- **Refs:** 06, 02, D-1/D-9/D-12. **Atenção vocabulário:** `papel: padrão|adicional` (00 §6) — o 06 §5 tem um resíduo `mínimo`; o canônico é `padrão`.

**WO-02 · site — Astro base + design system + institucional/blog** _(Replit Agent)_
- **Objetivo:** site `output:'server'`, tokens espelho das Design Guidelines, layouts, páginas institucionais + blog base renderizando da API do Payload.
- **Arquivos:** `site/**`.
- **Aceite (03 §7.1):** páginas renderizando do Payload; paridade visual (tokens, Playfair+Work Sans, foco/skip-link/reduced-motion). Restrições de build 1–4.
- **Refs:** 03 §4, 04, 07, Design Guidelines, skill `react-best-practices` (ilhas).

**WO-03 · site — SEO/CWV baseline + ligar o gate de qualidade** _(Replit Agent)_
- **Pré-passo (firewall do Replit):** smoke-test de instalação de `playwright` (+ download de browser), `@lhci/cli` e `@axe-core/playwright`. Se algum for bloqueado (403, como o vitest), **pare e escale** — o gate não pode depender de ferramenta que o ambiente não instala (09 §3).
- **Objetivo:** JSON-LD, sitemap/robots/canonical/OG; Lighthouse + axe verdes; ativar o job `quality` do CI (adicionar `site` rotas ao `lighthouserc`, script `test:a11y`).
- **Arquivos:** `site/**`, `lighthouserc.json`.
- **Aceite (03 §7.1):** Lighthouse CI verde (home, 1 espaço, 1 post) no orçamento §4; axe sem violações; structured data validando (Rich Results Test).
- **Refs:** skills `seo-schema-org`, `a11y-axe`, `audit-quality`; 03 §4.

**WO-04 · site+admin — publish→purge + preview de draft** _(Replit Agent)_
- **Objetivo:** hook de publish do Payload lista URLs afetadas → purge no Cloudflare (resolve 2.2.4); rota `/preview` no Astro com token assinado (resolve 2.2.6).
- **Arquivos:** `admin/src/hooks/**`, `site/src/pages/preview/**`, `site/src/lib/**`.
- **Aceite (03 §7.1):** publicar no Payload reflete no site; preview de draft funcionando. Restrição de build 6.

**WO-05 · conteúdo — páginas legais + inventário** _(Replit Agent / fundador)_
- **Aceite (03 §7.1):** páginas legais publicadas (placeholder jurídico **aprovado pelo fundador**); inventário (`docs/conteudo/inventario.md`) com dono/prazo; 5 espaços com **galeria real** (sem banco — §5 do Contexto). _O 🔴 remanescente é o preenchimento do inventário (fundador)._

### (continuação — infra & api-server, mesmo builder)

**WO-06 · infra — provisionamento + isolamento de banco (D-9)** _(Replit Agent)_
- **Objetivo:** provisionar Postgres + os 3 deployments sob subdomínios (Cloudflare na frente), configurar Secrets, e **aplicar e verificar o isolamento de schema do D-9**.
- **Arquivos:** `infra/**`, configs de deploy/Secrets do Replit. **Não tocar código de produto.**
- **Secrets:** nomes EXATOS do `.env.example` (`DATABASE_URL_APP`, `DATABASE_URL_PAYLOAD`, `PAYLOAD_SECRET`, `R2_*`, `CF_API_TOKEN`, `SERVICE_TOKEN_SECRET`, …). Não inventar variações.
- **Isolamento D-9 — CRÍTICO (passo destrutivo se errado):** "banco provisionado" **não conta como pronto** sem isto:
  1. Aplicar `infra/db/roles.sql` (dois schemas `payload`/`app`; dois roles que não enxergam o schema um do outro).
  2. **Provar:** conectar com o role do api-server (`DATABASE_URL_APP`) e confirmar que `app` é acessível e `payload` **não** é (ex.: ler/criar tabela em `payload` deve falhar por permissão); o mesmo cruzado para o role do Payload. **Anexar a saída como evidência.**
- **Fallback (Postgres gerenciado do Replit é Neon — pode restringir `CREATE ROLE`/`REVOKE`/`ALTER SCHEMA OWNER`):** se o `roles.sql` não aplicar, **pare e escale ao fundador**. Opções: (a) um Postgres/dois schemas com isolamento só no nível de app (`schemaFilter` + dependency-cruiser) — registrar que a trava de banco não pôde ser aplicada; (b) dois bancos separados (um por schema) — **desvia de "um Postgres" (D-9) → exige aval do fundador**. Não decidir sozinho.
- **Defesa-em-profundidade (independe do role):** o `schemaFilter: ["app"]` do `api-server/drizzle.config.ts` já impede o `drizzle-kit` de gerar migração destrutiva contra `payload`. Manter, mesmo com o role funcionando.
- **Gate humano:** o isolamento é verificado pelo fundador (ou pelo `/code-review` do Claude Code) antes de confiar — o agente **não** se auto-certifica aqui.
- **Aceite:** monorepo sobe no Replit; CI verde; subdomínios roteando (restrição de build 7); **isolamento D-9 provado (passo 2 com evidência) — ou fallback escalado ao fundador**.

**WO-07 · api-server — esqueleto + observabilidade + OpenAPI** _(Replit Agent)_
- **Objetivo:** Express 5 em camadas (09 §1.1); `/health` por runtime; Sentry + pino; `openapi.yaml` como fonte + codegen → `packages/contracts/generated` com drift-check no CI. (`/collect` e cola Kommo são F1.)
- **Arquivos:** `api-server/**`; `packages/contracts/generated/**` só por PR gated.
- **Aceite (parcial F0/F1):** `/health` ok; Sentry nos 3 runtimes (um projeto por runtime — 09 §6); OpenAPI gerando sem drift. Restrição de build 8.

---

## Mapa WO → critério 03 §7.1 (Fase 0)
| Critério 03 §7.1 | WO |
|---|---|
| Monorepo + travas de fronteira no CI | 0a ✅ |
| Banco provisionado + isolamento D-9 verificado | WO-06 |
| Registros do 02 seedados | WO-01 |
| Institucional + blog do Payload; paridade visual | WO-02 |
| Lighthouse CI verde + axe | WO-03 |
| sitemap/robots/canonical/OG + structured data | WO-03 |
| publish→site (purge) + preview de draft | WO-04 |
| páginas legais (aval) | WO-05 |
| inventário + galerias reais | WO-05 |
