---
id: WO-CORE-002
status: done
traces: [_decisoes.md]
deps: []
skills: [sync-governanca]
---
# WO-CORE-002 · Sync da superfície de governança: dedup CODEOWNERS + gate do `.claude/` — RASCUNHO

**Pré-promoção.** Executor: Claude Code (auxiliar). **Camada de tom:** trabalho. **Origem:** auditoria de redundância do `AGENTS.md` (jun/2026) + achado do `sync-governanca`. Decisão de escopo do fundador via pergunta direta (jun/2026).

## Objetivo
Sincronizar a superfície de governança em dois atos: (1) eliminar a **duplicação interna** da lista de caminhos gated no `AGENTS.md` (a 57 recola a 70); (2) **fechar um furo de gate** — a D-1 + `ARQUITETURA-IA §4` mandam `.claude/` ser gated por CODEOWNERS, mas o `.github/CODEOWNERS` real e os espelhos em prosa do app omitem, então hoje `.claude/settings.json` **não é barrado no merge**. Alinhar a máquina e os espelhos à decisão fechada.

## Dependências
**Nenhuma** (`deps: []`).

## Restrições de design
- **Decisão fechada (D-1) — não se rediscute, só se alinha.** O ato é implementar o que a D-1 e a `ARQUITETURA-IA §4` já decidiram (`.claude` gated, "gate de merge do `settings.json` editado pelo agente"), não reabrir o mérito.
- **`AGENTS.md` é a fonte;** a lista canônica em prosa vive na **linha 70** (rótulo "CODEOWNERS (caminhos gated)"). Os demais pontos ecoam/apontam.
- **`.cursor/rules/00-canon-vvf.mdc` é GERADO** do vvcore (`sync-cursor-rules.sh`) e **já contém `.claude`** — **não tocar à mão**.
- **Sem mudança de semântica:** a lista não muda de significado; só deixa de ser duplicada (57) e ganha `.claude`, que a regra já exigia.
- **Superfície gated por CODEOWNERS** → branch + PR, **sem auto-merge** (não armar `gh pr merge --auto`), aval do fundador.

## Passos
1. `AGENTS.md:57` — trocar a lista recolada por ponteiro ao lar canônico: *"PR que toca caminho gated por CODEOWNERS (ver Instanciação) nunca é auto-mergeado"*.
2. `AGENTS.md:70` — inserir `.claude` na lista (entre `AGENTS.md`/`CLAUDE.md` e `.cursor/rules`), espelhando a `ARQUITETURA-IA §4`.
3. `.github/CODEOWNERS` — adicionar a linha `/.claude/   @fabiozaffani` (após `/CLAUDE.md`, antes de `/.cursor/rules/`).
4. `.cursor/rules/00-inviolaveis.mdc:15` — inserir `.claude` na lista em prosa, igual ao `AGENTS.md:70`.
5. Conferência final: `grep` por CODEOWNERS confirma nenhuma outra cópia divergente da lista; `git diff --name-only` não lista `00-canon-vvf.mdc`.

## Arquivos permitidos (a cerca)
- `AGENTS.md`
- `.github/CODEOWNERS`
- `.cursor/rules/00-inviolaveis.mdc`

## Fora de escopo
- `.cursor/rules/00-canon-vvf.mdc` — gerado do vvcore, já correto.
- `docs/_index.md:27` — resumo parcial em vocabulário de camadas (não a lista de caminhos); **achado menor, não corrigir aqui**.
- Qualquer mudança no **vvcore** (a doutrina §4 já está certa).
- Cortes #2/#3 da auditoria (encolher "Memória do agente"; aparar eco doutrinário de git/PR) — WO próprio se e quando o fundador pedir.

## Skills obrigatórias (ordem)
- **`sync-governanca`** (dona da superfície de governança, §6.1) — já carregada; conduz a propagação dos ecos e a consistência dos ponteiros. Como a cerca toca artefato canônico, `skills:[]` seria inválido.

## Critérios de aceite (done looks like)
- **Lista única em prosa no `AGENTS.md`:** a 70 mantém a lista; a 57 é ponteiro, sem recolar caminhos. *Prova:* inspeção das linhas 57 e 70.
- **`.claude/` gated na máquina:** *Prova:* `grep -n "\.claude" .github/CODEOWNERS` retorna a nova linha.
- **`.claude` nos dois espelhos em prosa:** AGENTS.md:70 e `00-inviolaveis.mdc:15`. *Prova:* `grep -n "\.claude" AGENTS.md .cursor/rules/00-inviolaveis.mdc`.
- **Sem cópia divergente restante** e **`00-canon-vvf.mdc` intacto.** *Prova:* `git diff --name-only` lista só os 3 arquivos da cerca.
- **CI verde no PR** (conventional commits + gitleaks); `pnpm verify` não aplica (sem código).

## Refs (ler antes)
- [`_decisoes.md`](../_decisoes.md) — **D-1** (gate do `settings.json` por CODEOWNERS) e D-16/D-18 (governança multi-agente).
- `ARQUITETURA-IA §4` (Git & PR · app) e **§6.3** (passe de fecho da governança) — via `@import`/junction.
- [`AGENTS.md`](../../AGENTS.md) — seções "Como trabalhar" (linha 57) e "Instanciação do VVLEADHUB" (linha 70).
