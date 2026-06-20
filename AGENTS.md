# AGENTS.md — Manual de conduta do agente construtor (VVF)

<!-- vvcore:preamble:start --><!-- GERADO de vvcore/plugins/vvcore/context/AGENTS-PREAMBLE.md — nao editar entre os marcadores; rode bin/sync-agents-preamble.sh -->
## ⚠️ LEIA PRIMEIRO — parte do contexto canônico NÃO está neste arquivo

A fundação obrigatória são **dois arquivos que vivem no vvcore** (fonte única, sem cópia):
- **`CONTEXTO-IA.md`** — negócio, marca e as **invariantes INV-01..INV-10 (§2)** contra as quais toda recomendação é validada.
- **`ARQUITETURA-IA.md`** — doutrina VV-wide de engenharia/tooling: core, memória, git/PR, **estrutura de repo (§1–§5)** e **roteamento de skills / ato canônico (§6)**.

Eles entram no contexto via **`@import` de `.agents/context/`** — uma junction por máquina para o vvcore, criada pelo `setup-links.sh` (`link_repo_context`), que **só o Claude Code expande**. **Não** use o caminho externo `../vvcore/...`: ele resolve fora da raiz do repo e o Claude o descarta **em silêncio** (sem aprovação manual). Não há cópia local — é decisão de fonte única.

**Auto-checagem (antes de qualquer coisa):** você está vendo o texto **completo** desses dois arquivos agora — as INV-01..INV-10, os três arquétipos (§4.1 do CONTEXTO-IA), a §4 (Git & PR) e a §5 (estrutura de repo) da Arquitetura?

- ✅ **Sim** → você é o Claude Code (ou recebeu o contexto de outra forma). Prossiga.
- 🛑 **Não** → você está com instruções **PARCIAIS** e vai violar invariantes sem perceber. **PARE, não produza nada** e avise o usuário, literalmente:
  > "Sou um agente diferente do Claude Code e **não tenho o contexto canônico do VV** (CONTEXTO-IA + ARQUITETURA-IA) — entregue por um `@import` que só o Claude expande. Antes de eu continuar, configure a entrega desse contexto pra mim."

**2ª trava — roteamento de skills (Arquitetura §6).** Antes de **editar qualquer artefato canônico** em `docs/` (espinha `_lexico`/`_decisoes`, business/specs/system, `_domain-map`) ou de **executar uma implementação**, carregue a **skill dona** primeiro — é ela que traz o `preflight-protocol` e os guardrails (tabela em `ARQUITETURA-IA §6.1`). Implementação **nasce como work-order** (rascunho em `docs/tasks-drafts/`, promovido após aval — §6.5). Tocar artefato canônico por fora da skill dona é falha de processo, não atalho.

Assim qualquer agente novo **se auto-denuncia** em vez de rodar cego — validamos a entrega caso a caso, sem cópia.
<!-- vvcore:preamble:end -->

---

**Fonte única, tool-neutral, de instruções de qualquer agente neste repositório** (Cursor Composer, Claude Code, ou outro). Promovido do antigo `CLAUDE.md` por decisão **D-16**, emendada pela **D-18** (ver [`docs/_decisoes.md`](docs/_decisoes.md)). Se algo aqui conflitar com outro arquivo de instruções de agente, **este vence**. `CLAUDE.md` (que carrega este arquivo via `@import`) e `.cursor/rules/*` são ponteiros para cá — em conflito, o texto completo aqui prevalece.

**Tipo de repo: `app`.** A doutrina **VV-wide** de engenharia/tooling (core compartilhado, memória, config/hooks, fluxo git/PR multi-agente) vive em `.agents/context/ARQUITETURA-IA.md` (junction por máquina → vvcore) — **leia-a junto com este arquivo** (o Claude Code carrega via `@import` no `CLAUDE.md`; demais agentes — ver o alerta no topo). Aqui fica só o que é **específico do VVLEADHUB**.

## Antes de qualquer código

1. Leia, nesta ordem: o canon de marca (`CONTEXTO-IA`, vvcore, via `@import`) → [`docs/_index.md`](docs/_index.md) → [`docs/_lexico.md`](docs/_lexico.md) → [`docs/_decisoes.md`](docs/_decisoes.md) → [`docs/business/comercial/_dominio.md`](docs/business/comercial/_dominio.md) → [`docs/specs/plataforma/`](docs/specs/plataforma/) → [`docs/system/arquitetura.md`](docs/system/arquitetura.md) → a spec do domínio da tarefa em `docs/specs/<domínio>/` → o work-order em `docs/tasks/`.
2. O controle do repo vive na espinha de `docs/`: [`_index.md`](docs/_index.md) (índice/ordem), [`_lexico.md`](docs/_lexico.md) (glossário canônico) e [`_decisoes.md`](docs/_decisoes.md) (log de decisões D-1..D-23 + diferidos). **Decisões fechadas não se rediscutem** — implementam-se. Se uma decisão parecer errada na prática, pare e pergunte ao fundador; não contorne em silêncio.
3. Em conflito entre docs: a camada de marca (CONTEXTO-IA) vence em marca/estratégia; no resto, vence o **dono único** do conceito (business → specs → system; ver [`docs/_index.md`](docs/_index.md)).
4. Leia o work-order da sua tarefa em `docs/tasks/` antes de escrever qualquer linha. Não existe "construa a Fase N" — existe um work-order por tarefa, com escopo, arquivos permitidos e critérios de aceite.

## Memória do agente

Conhecimento durável e específico deste repo (gotchas técnicos, convenções, decisões operacionais) vive em **`.agents/memory/`** — store única, tool-neutral, versionada. Comece pelo índice [`.agents/memory/MEMORY.md`](.agents/memory/MEMORY.md) e abra o arquivo do fato quando for relevante à tarefa; **não substitui esta doc, alimenta-a**.

- **Claude Code** lê e escreve a pasta nativamente (auto-memória via `autoMemoryDirectory`) — drafta fatos sozinho durante o trabalho.
- **Cursor e outros** leem o índice por aqui e pelo ponteiro em `.cursor/rules`; registre à mão um fato durável que descobrir (formato nativo `name`/`description`/`type`; detalhe no README da pasta).
- **Promoção:** fato que vira conduta sobe para este `AGENTS.md` (ou `docs/`); fato que vale em todo repo VV sobe para o **vvcore**.

## Regras invioláveis

- **Marca:** nenhum copy voltado ao público sai do tom de marca (CONTEXTO-IA §4); nenhuma UI sai do design-system ([`docs/specs/design-system/`](docs/specs/design-system/): tokens, tipografia Playfair+Work Sans, sem emojis, sem ícones decorativos, pt-BR). Exceções registradas no design-system não se revertem.
- **Vocabulário:** use o glossário [`docs/_lexico.md`](docs/_lexico.md). `Arquétipo` é só da marca. No código: `subject`/`subjectType`/`objective`/`template` mapeiam Assunto/TipoDeAssunto/Objetivo/Molde.
- **Fronteiras e estrutura ([`specs/engenharia/monorepo.md`](docs/specs/engenharia/monorepo.md) · [`specs/engenharia/fronteiras.md`](docs/specs/engenharia/fronteiras.md)):** `site` não importa de `admin`/`api-server`; **tipos de domínio** cruzados só via `packages/contracts`; o **contrato HTTP é gerado do OpenAPI** (`packages/api-spec` → `@vvf/api-zod` no api-server / `@vvf/api-client` no admin — D-22); `site` jamais acessa Postgres; cada schema é migrado só pelo seu dono (D-9); dados de outro runtime sempre via API. **Essas fronteiras são travadas no CI (dependency-cruiser) — violá-las quebra o build, não é estilo.**
- **Sem preço:** nenhuma LP, post ou copy usa preço/promoção como argumento (INV-05) — nem como placeholder.
- **Segredos:** só em Secrets do ambiente (secret store do provedor de hospedagem / GitHub Actions secrets). Nunca em código, log ou doc. `gitleaks` roda no CI.
- **Diferidos ([`docs/_decisoes.md`](docs/_decisoes.md)):** LGPD, value-mapping do join key, mapa 301, edge-cache de variante são de etapa final — **mantenha os ganchos** (`consent` pass-through, `correlation_id`, opt-in mínimo no form), não os implemente antes nem os remova.

## Como trabalhar

- Construa **pela ordem do roadmap** ([`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7) e declare pronto **somente** pelos critérios de aceite da fase ([`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7.1). Não pule de fase.
- PRs pequenos e temáticos; conventional commits (validados por `commitlint` no CI); todo bug corrigido ganha teste ([`docs/specs/engenharia/testes.md`](docs/specs/engenharia/testes.md)).
- **Todo trabalho entra por branch + Pull Request**, com `/code-review` antes do merge. A `main` tem **branch protection** (jun/2026): os checks do CI (`verify`/`gitleaks`/`conventional commits`/`CWV+a11y`) são **obrigatórios** — nada entra vermelho. **Não há required review na `main` (D-21):** o CODEOWNERS auto-solicita revisor, mas **não barra o merge**. **Auto-merge:** PR de **código** (`site`/`admin`/`api-server`) **e de `docs/`** mescla sozinho ao ficar verde (`pnpm ship`) — docs **sem cerimônia de review**. **Caminhos sensíveis gated por CODEOWNERS** (`packages/contracts`, `packages/api-{spec,zod,client}`, `.claude/`, `AGENTS.md`/`CLAUDE.md`, `.cursor/rules`, `.github/`, `infra/`; ver §Instanciação) **não recebem auto-merge — por convenção, o agente não arma `--auto` neles** (a branch protection não trava), ficando para o **merge explícito do fundador** — preserva o aval da **D-1**. Nunca commitar direto na `main`.
- **Definition of done mecânico:** antes de declarar qualquer tarefa pronta, rode `pnpm verify` na raiz (typecheck + lint + codegen:check + boundaries + test + build) e ele precisa passar. "Parece ok" não existe.
- **Qualidade de diff:** todo PR passa por `/code-review` antes do merge — sem exceção de tamanho. Quem dispara depende do harness (ver §Governança multi-agente). `/simplify` roda quando o diff atender a qualquer um: > 150 linhas líquidas de código real (excluindo lockfile, seeds, migrações geradas e snapshots) · 5+ arquivos de código tocados · abstração nova criada (componente, helper, tipo em `contracts`) · o PR cresceu além do escopo planejado. Pequenas correções dispensam o `/simplify`.
- Tudo que é business-concreto é **dado, não código** ([`specs/plataforma/primitivas.md`](docs/specs/plataforma/primitivas.md)) — espaços, serviços, campanhas, moldes e objetivos entram por registro/seed, nunca hardcoded. Exceção registrada: TipoDeAssunto novo = collection nova.
- Blocos conhecem **capacidades, nunca instâncias** ([`specs/plataforma/resolucao-conteudo.md`](docs/specs/plataforma/resolucao-conteudo.md)): zero `switch` por nome de Assunto.
- Eventos seguem o schema canônico (`packages/contracts`, [`specs/eventos/schema-evento.md`](docs/specs/eventos/schema-evento.md)) sem campos ad-hoc; novo destino = novo adapter puro + testes.
- Teste de integração externa só com `test:true` e endpoints de sandbox ([`specs/eventos/teste-realtime-saude.md`](docs/specs/eventos/teste-realtime-saude.md)) — nunca polua dados/ads reais.

## Instanciação do VVLEADHUB (app)

A doutrina multi-agente e o fluxo git/PR são **VV-wide** (ARQUITETURA-IA §4 · `app`, no vvcore). Aqui fica só o concreto deste repo:

- **Módulos e papéis:** o app é `site/` · `admin/` · `api-server/`; o **Cursor Composer** é o builder primário na IDE, o **Claude Code** o auxiliar (`/code-review` em todo PR, `/security-review` quando couber, build escopado quando delegado; nos gates, `/app-audit-quality`·`/app-checklist-fase`·`/app-auditar <área>` — impl × spec dona, read-only — **disparados por você**, pois são `disable-model-invocation`). Quem editar código segue fronteiras/marca/`pnpm verify` em branch + PR própria.
- **CODEOWNERS (caminhos gated):** `packages/contracts`, `packages/api-{spec,zod,client}`, `docs/`, `AGENTS.md`/`CLAUDE.md`, `.claude/`, `.cursor/rules`, `.github/`, `infra/` — auto-solicitam o fundador como revisor. **Sem required review na `main` (D-21):** `docs/` **auto-mescla no verde** (sem cerimônia); os **sensíveis** (todos os demais acima) **não recebem auto-merge por convenção** (o agente não arma `--auto`) → **merge explícito do fundador**. (`.claude/` gated por D-1 — gate de merge do `settings.json` editado pelo agente; o aval é preservado pela convenção + a aprovação Bash em tempo de edição, já que a branch protection não trava.)
- **Deploy/runtime:** alvo a definir na Fase 0b (D-18). Cloudflare no edge (site SSR, R2, proxy de analytics — D-2/D-10/D-15 intactos); serviços Node (`admin`/`api-server`) + Postgres gerenciado num host a escolher; deploy desacoplado do GitHub. (D-18 aposentou o builder na nuvem — sem `replit/work` nem "Publish ≠ push".)
- Ajustar os papéis = editar [`docs/roadmap/fases.md`](docs/roadmap/fases.md) e o README de [`docs/tasks/`](docs/tasks/) (e os ponteiros), não improvisar no meio de uma tarefa.

### Skills a criar por fase (backlog)
Skills locais deste app a criar **quando a fase abrir a lacuna** (nascem em `.agents/skills/`):
- **`eventos-tracking`** (Fase 1) — schema canônico de eventos ([`specs/eventos/schema-evento.md`](docs/specs/eventos/schema-evento.md)) incluindo `click_ids` (D-14, sem retrofit), catálogo completo, split de ingestão D-15 (analytics via proxy CF × `/collect`), caminho CTWA ([`specs/eventos/ctwa.md`](docs/specs/eventos/ctwa.md)), "novo destino = adapter puro + testes", `test:true`/sandbox ([`specs/eventos/teste-realtime-saude.md`](docs/specs/eventos/teste-realtime-saude.md)).
- **`nova-lp`** (Fase 2) — procedimento de LP por campanha: Molde + Assunto + Objetivo, capacidades dos Blocos ([`specs/plataforma/resolucao-conteudo.md`](docs/specs/plataforma/resolucao-conteudo.md)), eventos com `correlation_id` + `click_ids`, regra de canônico ([`specs/landing-pages/seo-canonico.md`](docs/specs/landing-pages/seo-canonico.md) — um Assunto = uma página indexada; LP extra = `noindex`/canonical), checklist (sem preço, opt-in mínimo, consent pass-through).
- **`intel-competitiva`** (Fase 3, L3 do Tracker Hub — D-19) — coleta de anúncios/orgânico de concorrentes via Apify pago + YouTube Data API no `api-server`, indexação no banco (schema do dono, D-9) e render como **L3** no Tracker Hub. Precedida pela **`discovery-radar`** (v0, já em [`.agents/skills/`](.agents/skills/)): coleta assistida + síntese de findings em [`docs/discovery/radar/`](docs/discovery/radar/), com handoff de ideias ao `doc-discovery-mapper`. Não-objetivos: Pinterest pago, TikTok per-concorrente.

## Quando perguntar ao fundador (aval obrigatório)

- Qualquer mudança em decisão fechada (D-1..D-23) ou em invariante.
- Trade-off não coberto pelos docs (registre a pergunta + recomendação; não decida sozinho).
- Promoção de preview → produção (loop de validação humana).
- Qualquer alteração em `packages/contracts`, `packages/api-{spec,zod,client}` ou `docs/` (gated por CODEOWNERS).

## Autonomia com revisão a posteriori

- **Copy voltado ao cliente:** o agente produz com autonomia, seguindo rigorosamente a camada de marca (tom CONTEXTO-IA §4 + guardrails dos Blocos em [`specs/landing-pages/blocos.md`](docs/specs/landing-pages/blocos.md)). Mantém um **inventário de copy** por fase (`docs/copy/inventario-fase-<n>.md`) para o fundador revisar na validação do preview — correção entra como ajuste, não como bloqueio prévio. Invariantes seguem invioláveis mesmo com autonomia (sem preço, sem componente isolado, exclusividade pela história).

## Definition of done (resumo; detalhe em [`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7.1)

Código tipado e lintado, fronteiras respeitadas (dependency-cruiser verde), `pnpm verify` passando, testes verdes, **Lighthouse CI dentro do orçamento**, axe sem violações novas, secrets fora do código, e a funcionalidade demonstrável no preview com os critérios da fase marcados.
