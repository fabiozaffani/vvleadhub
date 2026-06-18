# AGENTS.md — Manual de conduta do agente construtor (VVF)

<!-- vvcore:preamble:start --><!-- GERADO de vvcore/plugins/vvcore/context/AGENTS-PREAMBLE.md — nao editar entre os marcadores; rode bin/sync-agents-preamble.sh -->
## ⚠️ LEIA PRIMEIRO — parte do contexto canônico NÃO está neste arquivo

A fundação obrigatória são **dois arquivos que vivem no vvcore** (fonte única, sem cópia):
- **`CONTEXTO-IA.md`** — negócio, marca e as **invariantes INV-01..INV-10 (§2)** contra as quais toda recomendação é validada.
- **`ARQUITETURA-IA.md`** — doutrina VV-wide de engenharia/tooling: core, memória, git/PR e **estrutura de repo (§1–§5)**.

Eles entram no contexto via **`@import` de `.agents/context/`** — uma junction por máquina para o vvcore, criada pelo `setup-links.sh` (`link_repo_context`), que **só o Claude Code expande**. **Não** use o caminho externo `../vvcore/...`: ele resolve fora da raiz do repo e o Claude o descarta **em silêncio** (sem aprovação manual). Não há cópia local — é decisão de fonte única.

**Auto-checagem (antes de qualquer coisa):** você está vendo o texto **completo** desses dois arquivos agora — as INV-01..INV-10, os três arquétipos (§4.1 do CONTEXTO-IA), a §4 (Git & PR) e a §5 (estrutura de repo) da Arquitetura?

- ✅ **Sim** → você é o Claude Code (ou recebeu o contexto de outra forma). Prossiga.
- 🛑 **Não** → você está com instruções **PARCIAIS** e vai violar invariantes sem perceber. **PARE, não produza nada** e avise o usuário, literalmente:
  > "Sou um agente diferente do Claude Code e **não tenho o contexto canônico do VV** (CONTEXTO-IA + ARQUITETURA-IA) — entregue por um `@import` que só o Claude expande. Antes de eu continuar, configure a entrega desse contexto pra mim."

Assim qualquer agente novo **se auto-denuncia** em vez de rodar cego — validamos a entrega caso a caso, sem cópia.
<!-- vvcore:preamble:end -->

---

**Fonte única, tool-neutral, de instruções de qualquer agente neste repositório** (Cursor Composer, Claude Code, ou outro). Promovido do antigo `CLAUDE.md` por decisão **D-16**, emendada pela **D-18** (ver [`docs/decisoes.md`](docs/decisoes.md)). Se algo aqui conflitar com outro arquivo de instruções de agente, **este vence**. `CLAUDE.md` (que carrega este arquivo via `@import`) e `.cursor/rules/*` são ponteiros para cá — em conflito, o texto completo aqui prevalece.

**Tipo de repo: `app`.** A doutrina **VV-wide** de engenharia/tooling (core compartilhado, memória, config/hooks, fluxo git/PR multi-agente) vive em `.agents/context/ARQUITETURA-IA.md` (junction por máquina → vvcore) — **leia-a junto com este arquivo** (o Claude Code carrega via `@import` no `CLAUDE.md`; demais agentes — ver o alerta no topo). Aqui fica só o que é **específico do VVLEADHUB**.

## Antes de qualquer código

1. Leia, nesta ordem: o canon de marca (`CONTEXTO-IA`, vvcore, via `@import`) → [`docs/_index.md`](docs/_index.md) → [`docs/_lexico.md`](docs/_lexico.md) → [`docs/decisoes.md`](docs/decisoes.md) → [`docs/business/comercial/_dominio.md`](docs/business/comercial/_dominio.md) → [`docs/specs/plataforma/`](docs/specs/plataforma/) → [`docs/system/arquitetura.md`](docs/system/arquitetura.md) → a spec do domínio da tarefa em `docs/specs/<domínio>/` → o work-order em `docs/tasks/`.
2. O controle do repo vive na espinha de `docs/`: [`_index.md`](docs/_index.md) (índice/ordem), [`_lexico.md`](docs/_lexico.md) (glossário canônico) e [`decisoes.md`](docs/decisoes.md) (log de decisões D-1..D-18 + diferidos). **Decisões fechadas não se rediscutem** — implementam-se. Se uma decisão parecer errada na prática, pare e pergunte ao fundador; não contorne em silêncio.
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
- **Fronteiras e estrutura ([`specs/engenharia/monorepo.md`](docs/specs/engenharia/monorepo.md) · [`specs/engenharia/fronteiras.md`](docs/specs/engenharia/fronteiras.md)):** `site` não importa de `admin`/`api-server`; tipos cruzados só via `packages/contracts`; `site` jamais acessa Postgres; cada schema é migrado só pelo seu dono (D-9); dados de outro runtime sempre via API. **Essas fronteiras são travadas no CI (dependency-cruiser) — violá-las quebra o build, não é estilo.**
- **Sem preço:** nenhuma LP, post ou copy usa preço/promoção como argumento (INV-05) — nem como placeholder.
- **Segredos:** só em Secrets do ambiente (secret store do provedor de hospedagem / GitHub Actions secrets). Nunca em código, log ou doc. `gitleaks` roda no CI.
- **Diferidos ([`docs/decisoes.md`](docs/decisoes.md)):** LGPD, value-mapping do join key, mapa 301, edge-cache de variante são de etapa final — **mantenha os ganchos** (`consent` pass-through, `correlation_id`, opt-in mínimo no form), não os implemente antes nem os remova.

## Como trabalhar

- Construa **pela ordem do roadmap** ([`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7) e declare pronto **somente** pelos critérios de aceite da fase ([`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7.1). Não pule de fase.
- PRs pequenos e temáticos; conventional commits (validados por `commitlint` no CI); todo bug corrigido ganha teste ([`docs/specs/engenharia/testes.md`](docs/specs/engenharia/testes.md)).
- **Todo trabalho entra por branch + Pull Request**, com `/code-review` antes do merge. A `main` tem **branch protection** (jun/2026): os checks do CI (`verify`/`gitleaks`/`conventional commits`/`CWV+a11y`) são **obrigatórios** — nada entra vermelho. **Auto-merge ligado:** PR de **código** (`site`/`admin`/`api-server`) mescla sozinho ao ficar verde (`pnpm ship`). **PR que toca caminho do CODEOWNERS** (contracts, `docs/`, `AGENTS.md`/`CLAUDE.md`, `.cursor/rules`, `.github/`, `infra/`) **nunca** é auto-mergeado — fica para o aval do fundador. Nunca commitar direto na `main`.
- **Definition of done mecânico:** antes de declarar qualquer tarefa pronta, rode `pnpm verify` na raiz (typecheck + lint + boundaries + test + build) e ele precisa passar. "Parece ok" não existe.
- **Qualidade de diff:** todo PR passa por `/code-review` antes do merge — sem exceção de tamanho. Quem dispara depende do harness (ver §Governança multi-agente). `/simplify` roda quando o diff atender a qualquer um: > 150 linhas líquidas de código real (excluindo lockfile, seeds, migrações geradas e snapshots) · 5+ arquivos de código tocados · abstração nova criada (componente, helper, tipo em `contracts`) · o PR cresceu além do escopo planejado. Pequenas correções dispensam o `/simplify`.
- Tudo que é business-concreto é **dado, não código** ([`specs/plataforma/primitivas.md`](docs/specs/plataforma/primitivas.md)) — espaços, serviços, campanhas, moldes e objetivos entram por registro/seed, nunca hardcoded. Exceção registrada: TipoDeAssunto novo = collection nova.
- Blocos conhecem **capacidades, nunca instâncias** ([`specs/plataforma/resolucao-conteudo.md`](docs/specs/plataforma/resolucao-conteudo.md)): zero `switch` por nome de Assunto.
- Eventos seguem o schema canônico (`packages/contracts`, [`specs/eventos/schema-evento.md`](docs/specs/eventos/schema-evento.md)) sem campos ad-hoc; novo destino = novo adapter puro + testes.
- Teste de integração externa só com `test:true` e endpoints de sandbox ([`specs/eventos/teste-realtime-saude.md`](docs/specs/eventos/teste-realtime-saude.md)) — nunca polua dados/ads reais.

## Instanciação do VVLEADHUB (app)

A doutrina multi-agente e o fluxo git/PR são **VV-wide** (ARQUITETURA-IA §4 · `app`, no vvcore). Aqui fica só o concreto deste repo:

- **Módulos e papéis:** o app é `site/` · `admin/` · `api-server/`; o **Cursor Composer** é o builder primário na IDE, o **Claude Code** o auxiliar (`/code-review` em todo PR, `/security-review` quando couber, build escopado quando delegado; nos gates, `/audit-quality`·`/checklist-fase`·`/auditar <área>` — impl × spec dona, read-only — **disparados por você**, pois são `disable-model-invocation`). Quem editar código segue fronteiras/marca/`pnpm verify` em branch + PR própria.
- **CODEOWNERS (caminhos gated):** `packages/contracts`, `docs/`, `AGENTS.md`/`CLAUDE.md`, `.cursor/rules`, `.github/`, `infra/` — aval do fundador, nunca auto-mergeado.
- **Deploy/runtime:** alvo a definir na Fase 0b (D-18). Cloudflare no edge (site SSR, R2, proxy de analytics — D-2/D-10/D-15 intactos); serviços Node (`admin`/`api-server`) + Postgres gerenciado num host a escolher; deploy desacoplado do GitHub. (D-18 aposentou o builder na nuvem — sem `replit/work` nem "Publish ≠ push".)
- Ajustar os papéis = editar [`docs/roadmap/fases.md`](docs/roadmap/fases.md) e o README de [`docs/tasks/`](docs/tasks/) (e os ponteiros), não improvisar no meio de uma tarefa.

### Skills a criar por fase (backlog)
Skills locais deste app a criar **quando a fase abrir a lacuna** (nascem em `.agents/skills/`):
- **`eventos-tracking`** (Fase 1) — schema canônico de eventos ([`specs/eventos/schema-evento.md`](docs/specs/eventos/schema-evento.md)) incluindo `click_ids` (D-14, sem retrofit), catálogo completo, split de ingestão D-15 (analytics via proxy CF × `/collect`), caminho CTWA ([`specs/eventos/ctwa.md`](docs/specs/eventos/ctwa.md)), "novo destino = adapter puro + testes", `test:true`/sandbox ([`specs/eventos/teste-realtime-saude.md`](docs/specs/eventos/teste-realtime-saude.md)).
- **`nova-lp`** (Fase 2) — procedimento de LP por campanha: Molde + Assunto + Objetivo, capacidades dos Blocos ([`specs/plataforma/resolucao-conteudo.md`](docs/specs/plataforma/resolucao-conteudo.md)), eventos com `correlation_id` + `click_ids`, regra de canônico ([`specs/landing-pages/seo-canonico.md`](docs/specs/landing-pages/seo-canonico.md) — um Assunto = uma página indexada; LP extra = `noindex`/canonical), checklist (sem preço, opt-in mínimo, consent pass-through).

## Quando perguntar ao fundador (aval obrigatório)

- Qualquer mudança em decisão fechada (D-1..D-18) ou em invariante.
- Trade-off não coberto pelos docs (registre a pergunta + recomendação; não decida sozinho).
- Promoção de preview → produção (loop de validação humana).
- Qualquer alteração em `packages/contracts` ou `docs/` (gated por CODEOWNERS).

## Autonomia com revisão a posteriori

- **Copy voltado ao cliente:** o agente produz com autonomia, seguindo rigorosamente a camada de marca (tom CONTEXTO-IA §4 + guardrails dos Blocos em [`specs/landing-pages/blocos.md`](docs/specs/landing-pages/blocos.md)). Mantém um **inventário de copy** por fase (`docs/copy/inventario-fase-<n>.md`) para o fundador revisar na validação do preview — correção entra como ajuste, não como bloqueio prévio. Invariantes seguem invioláveis mesmo com autonomia (sem preço, sem componente isolado, exclusividade pela história).

## Definition of done (resumo; detalhe em [`docs/roadmap/fases.md`](docs/roadmap/fases.md) §7.1)

Código tipado e lintado, fronteiras respeitadas (dependency-cruiser verde), `pnpm verify` passando, testes verdes, **Lighthouse CI dentro do orçamento**, axe sem violações novas, secrets fora do código, e a funcionalidade demonstrável no preview com os critérios da fase marcados.
