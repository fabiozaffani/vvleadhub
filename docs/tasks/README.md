# docs/tasks — work-orders

Um **roadmap não é um prompt.** "Construa a Fase 0" é como nasce espaguete bem documentado: o agente "ajuda" refatorando o que não pediu. Cada tarefa entregue a um agente vive aqui como um **work-order** com escopo cercado.

## Anatomia de um work-order
- **Quem executa** (D-16/D-18): o **Cursor Composer** (builder primário) por padrão, dirigido pelo fundador na IDE. O Claude Code entra em auditoria/review/gates e em WO de build escopada quando delegado.
- **Objetivo:** 1–2 frases.
- **Arquivos permitidos:** o agente não escreve fora disso sem novo work-order. Tocar `packages/contracts`/`docs` exige aval do fundador (CODEOWNERS).
- **Critérios de aceite:** subconjunto verificável de [`../roadmap/fases.md`](../roadmap/fases.md) §7.1.
- **Refs:** os docs donos a ler antes (system/specs).
- **Restrições de build:** as armadilhas conhecidas (ver [`../roadmap/fases.md`](../roadmap/fases.md) §7.2).
- **Frontmatter (ARQUITETURA-IA §5.4):** `id: WO-<AREA>-<NNN>` + `status: draft | pending | in_progress | done | cancelled` + `traces: [...]` (docs de system/spec que originam a WO) + **`deps: [...]`** (WOs pré-requisito; `[]` se não houver) + **`skills: [...]`** (as donas §6.1 — `work-order` para implementação, doc-*/`sync-governanca` para doc/governança — mais ferramentas task-specific; `[]` é inválido se a cerca toca artefato canônico). Relatório por status: `bash ../../../vvcore/bin/tasks-report.sh`. WO sugerida (pré-promoção) fica em [`../tasks-drafts/`](../tasks-drafts/) com `status: draft`; promover = mover para `tasks/` + `status: pending`.

## Inventário atual
Contagem viva por status (sem lista manual a driftar): `bash ../../../vvcore/bin/tasks-report.sh`.

## Regras (AGENTS.md)
- Tudo por **branch + PR**; a `main` tem **branch protection** (checks de CI obrigatórios) + **auto-merge** (PR de código mescla no verde via `pnpm ship`; PR de caminho CODEOWNERS fica pro aval do fundador); `pnpm verify` verde antes de "pronto".
- `/code-review` em todo PR (papel do Claude Code) antes do merge.
- Faixa = arquivo permitido. **Dois agentes nunca tocam o mesmo pacote na mesma fase.**

## Os papéis são ajustáveis
O modelo corrente (D-16, emendada pela D-18): **Cursor Composer é o builder primário** (o fundador desenvolve na IDE); **Claude Code é auxiliar** (auditoria, revisão, gates, build escopado quando delegado). O Replit foi removido da operação. Mudar é editar este diretório + os ponteiros (`.cursor/rules/`, `CLAUDE.md`) — não improvisar no meio de uma tarefa.
