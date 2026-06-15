# 09 · Engenharia & Convenções

**Status:** draft v1 (recomendações para veto do fundador) · **Camada de tom:** trabalho · **Depende de:** 02, 03
**Responsabilidade única:** como o código é organizado, protegido e verificado — estrutura do monorepo, travas de fronteira, testes, CI/gates, ambientes, observabilidade e disciplina de manutenção. O *quê* construir está em 01–08; aqui está o *como construir sem apodrecer*.

---

## 1. Estrutura do monorepo (pnpm workspaces)

```
/
├── AGENTS.md                  ← manual de conduta do agente (fonte única — D-16; CLAUDE.md/.cursor/rules são ponteiros)
├── docs/                      ← este conjunto (00–09, 99, brand/) + tasks/ (work-orders)
├── infra/                     ← provisionamento (db/roles.sql — isolamento de schema D-9)
├── site/                      ← Astro (público; output:'server'; zero credencial de banco)
├── admin/                     ← Payload + Next (conteúdo + Tracker Hub views)
├── api-server/                ← Express 5 + Drizzle (cola fina: /collect, Kommo, loop, links)
└── packages/
    └── contracts/             ← schema de evento (05 §4), contrato de lead (04 §7),
                                 tipos gerados (OpenAPI + payload generate:types) — ÚNICA fonte de tipos cruzados
```

Regras: nomes de pasta exatamente estes; cada runtime tem `package.json` próprio; nada fora do workspace pnpm. **`packages/ui` foi cortado da v1** (auditoria de delegação jun/2026): site Astro e admin React mal compartilham UI real, e "(opcional)" para um agente lê-se "construa". Criar só com dor dupla comprovada.

### 1.1 Arquitetura interna dos runtimes (estrutura e camadas)

**`api-server/` — arquitetura em camadas (routes → services → repositories/integrations):**

```
api-server/
├── openapi.yaml             ← contrato (fonte de verdade; codegen p/ contracts)
└── src/
    ├── routes/              ← HTTP fino: valida entrada (Zod), chama service, responde. ZERO lógica de negócio
    ├── services/            ← lógica de negócio pura e testável (dedup D-11, loop fechado, xcode, ingestão D-13)
    ├── repositories/        ← acesso ao schema `app` (Drizzle). ÚNICO lugar que toca o banco
    ├── integrations/        ← clientes de sistemas externos, 1 pasta por sistema (kommo/, posthog/, ads/meta/, ads/google/, …)
    ├── db/                  ← schema Drizzle + migrações (dono do schema `app` — D-9)
    └── lib/                 ← utilitários transversais sem estado
```

Regras de camada (travadas no dependency-cruiser): `routes` nunca importa `repositories`/`integrations` diretamente — sempre via `services`; `services` não conhecem HTTP nem Express; side-effects (banco, APIs externas) vivem só em `repositories`/`integrations` e chegam aos services por parâmetro (injeção simples — é o que torna a lógica testável sem mock de framework).

**`site/` (Astro):**

```
site/src/
├── pages/         ← rotas (arquivo = URL): institucional, /lp/[slug], /blog/[slug], bio
├── layouts/       ← cascas de página (base, LP, post)
├── blocks/        ← a biblioteca de Blocos do 04 — 1 pasta por bloco (.astro + props Zod + capacidades)
├── components/    ← UI menor reutilizável que NÃO é bloco editorial
├── lib/           ← cliente de conteúdo (Payload), collector de eventos, seo/ (schema.org), ab/ (variante D-8)
└── styles/        ← tokens/base das Design Guidelines (espelho fiel de brand/)
```

Distinção dura: **Bloco ≠ component.** Bloco é a unidade editorial do 02/04 (registrada, com capacidades por TipoDeAssunto, montável no admin); component é detalhe interno de implementação. Um component nunca aparece no editor.

**`admin/` (Payload):** segue a **convenção nativa do framework** — `collections/` (1 arquivo por entidade do 02: subjects, subject-types via código, lps, templates, posts, media…), `blocks/` (espelho 1:1 dos blocos do site), `access/` (RBAC — D-12), `views/` (Tracker Hub), `hooks/` (purge de cache no publish, webhooks). Regra: onde o framework tem convenção, não se inventa estrutura própria.

**`packages/contracts/`:** `events.ts` (schema canônico 05 §4) · `lead.ts` (contrato 04 §7) · `generated/` (tipos do OpenAPI — nunca editados à mão).

**Testes:** colocalizados (`arquivo.test.ts` ao lado do `arquivo.ts`); e2e em `/e2e` na raiz do monorepo.

## 2. Travas de fronteira (automatizadas — não são convenção, são CI)

| Regra | Trava |
|---|---|
| `site` nunca importa de `admin` ou `api-server` (e vice-versa) — só de `packages/*` | dependency-cruiser (ou ESLint boundaries) no CI; violação = build falha |
| Tipos cruzados só via `packages/contracts` | idem |
| `site` sem acesso a Postgres (D-9) | nenhuma lib de DB no `package.json` do site — lint de dependências |
| Schema `app` só migrado pelo Drizzle; `payload` só pelo Payload (D-9) | migrações vivem cada uma no seu runtime; CI roda `drizzle-kit check` |
| Segredos nunca no código | gitleaks no CI + Secrets do provedor de hospedagem como única fonte |
| OpenAPI é o contrato | spec em `api-server/openapi.yaml`; codegen para `packages/contracts`; CI falha se o gerado divergir do commitado |

## 3. Testes (pirâmide pragmática)

- **Unit (obrigatório):** funções puras da cola fina — adapters `map(event)`, normalização de lead, dedup D-11, geração de xcode. **Runner: `node:test` (built-in, zero dependência)** — escolha deliberada: roda em qualquer Node sem adicionar dependência de tooling à árvore. (Nota histórica: a escolha também evitou, no setup original em Replit, um firewall que bloqueava o vitest — restrição não mais vigente após a D-18; o runner permanece por mérito próprio, não há razão para reintroduzir o Vitest.) Para TS, compila antes e roda o emitido (`tsc` → `node --test "dist/**/*.test.js"`), como em `packages/contracts`.
- **Integração:** contrato lead→Kommo (Kommo mockado), webhook de desfecho→loop, ingestão de lead form nativo (D-13), purge de cache no publish.
- **E2E (mínimo vital, Playwright):** caminho de conversão — LP renderiza → CTA → form → card mock criado com xcode; e A/B sem flicker (asserção de zero CLS na variante).
- **A11y:** axe-core nas rotas-chave do site (home, 1 LP, 1 post) no CI.
- **Validar tooling pesado no ambiente de CI/runtime cedo:** Playwright (baixa browsers), `@lhci/cli` e `@axe-core/playwright` podem esbarrar em restrições de rede/sandbox do ambiente de execução. Fazer o smoke-test de instalação na primeira WO que os usa (WO-03) — se falhar, escalar/achar alternativa antes do gate depender deles.
- Regra: bug corrigido = teste que o reproduz, junto no PR.

## 4. CI/CD e gates (o fiscal das regras)

Pipeline por PR: `typecheck → lint+boundaries → unit/integração → build → Lighthouse CI → axe → e2e`.

- **Lighthouse CI = o fiscal do orçamento de CWV (03 §4):** budgets declarados em `lighthouserc` (LCP < 2,5s, CLS < 0,1, INP proxy via TBT, JS inicial); rota da home + 1 LP + 1 post. **Estourou = PR bloqueado** — o gate deixa de ser frase e vira máquina.
- Deploy: trunk-based; merge na main → deploy de preview; promoção a produção manual (loop de validação humana — auditoria 1.6).
- Conventional commits (`feat:`, `fix:`, `docs:`...) — habilita changelog automático.

## 5. Ambientes & secrets

| Ambiente | O quê | Notas |
|---|---|---|
| **dev** | ambiente de dev local | Postgres de dev; chaves de teste (Clerk-like pattern: `test` keys); PostHog projeto de dev; destinos em modo teste (05 §11) |
| **preview** | deploy de branch/main | onde o fundador valida cada fase (auditoria 1.6) |
| **prod** | publicado em valeverdefestas.com.br | chaves live; purge/CDN ativos |

Inventário de secrets (Secrets do provedor de hospedagem, por ambiente): `DATABASE_URL_APP` (role do api-server) · `DATABASE_URL_PAYLOAD` (role do Payload) — roles isolados por schema (D-9); nunca um `DATABASE_URL` único de superuser · `PAYLOAD_SECRET` · `POSTHOG_KEY/HOST` · `KOMMO_TOKEN/WEBHOOK_SECRET` · `META_CAPI_TOKEN` · `GOOGLE_ADS_*` · `TIKTOK_*` · `PINTEREST_*` · `R2_*` · `CF_API_TOKEN` (purge) · `SERVICE_TOKEN_*` (D-12). Inventário canônico em `.env.example`. Rotação documentada; nenhum segredo em `.env` commitado.

## 6. Observabilidade

- **Erros:** Sentry (free tier cobre; um projeto por runtime). Toda exceção não tratada reporta.
- **Logs:** pino (JSON estruturado) nos três runtimes; correlação por `request_id` e, quando houver, `event_id`/`correlation_id`.
- **Saúde:** endpoints `/health` por runtime; a saúde de integração de negócio é a do 05 §11.3 (Tracker Hub).

## 7. Disciplina de manutenção (obrigatória — não opcional)

- **Renovate/Dependabot ativo** com prioridade de segurança. Racional registrado: o Payload teve CVE crítico (SQLi 9.8) em adapters Postgres — corrigido, mas self-host sem disciplina de patch é exposição real. Janela: patch de segurança aplicado em **≤ 14 dias** (validado pelo fundador).
- Upgrades de minor agrupados quinzenais; major com changelog lido e teste de regressão.
- **Build do `admin/` (Payload) usa `next build --webpack`, não Turbopack** (descoberto no 1º build, jun/2026): o Turbopack — default do `next build` no Next 16 — entra em crash-loop na stack do Payload. Não é bug de código. **Regra de upgrade:** a cada bump de Next ou Payload, re-testar o `next build` puro (Turbopack); quando compilar limpo, remover o `--webpack`. Não reverter o `--webpack` sem esse teste passar.

## 8. Acessibilidade & contraste (formaliza auditoria 2.4.1)

- Alvo: **WCAG 2.1 AA** no site público; axe no CI fiscaliza.
- **Princípio (abstrato — vale para qualquer elemento, atual ou futuro):** estética de marca **nunca embarca reprovada em contraste nem às custas de UX**. Quando paleta e legibilidade conflitarem, ajusta-se o **uso** — jamais se publica abaixo do mínimo e jamais se inventa cor fora da paleta.
- **Ordem de resolução do conflito:** (1) inverter o papel do par (texto da cor escura sobre superfície da cor clara — ex.: verde sobre dourado, que o token `secondary-foreground` já induz); (2) elevar tamanho/peso até o limiar AA de texto grande; (3) usar a variante mais escura da própria família (ex.: dourado escuro `#7D5900` no lugar do claro); (4) se nada resolver, o elemento muda de design.
- Caso conhecido que originou o princípio: dourado claro `#C69F3F` sobre creme reprova como texto pequeno — resolvido pelos passos acima.
- Foco visível, skip-link e reduced-motion: já especificados nas Guidelines.

## 9. Convenções de código

TypeScript `strict` em tudo · ESLint + Prettier compartilhados na raiz · Zod para validação de borda (props de Bloco, payloads de webhook, contrato de lead) · datas sempre ISO-8601/UTC no armazenamento, exibição em `America/Sao_Paulo` · UI em pt-BR, sem emojis (Guidelines) · nomes de código em inglês, domínio em português conforme glossário (00 §6) — ex.: `subject`, `subjectType`, `objective` no código mapeiam Assunto/TipoDeAssunto/Objetivo.

## 10. Validação contra invariantes VVF

- **INV-08 (sem surpresas):** travas automatizadas + gates + testes = operação previsível ✓
- **INV-09 (replicável):** fronteiras e contratos tornam cada peça substituível/replicável ✓
- **Performance como gate (03):** Lighthouse CI dá dente à regra ✓
- **Escopo (00 §4.9):** este doc é arquitetura/método; rotina de operação fica fora ✓
