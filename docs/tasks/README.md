# docs/tasks — work-orders

Um **roadmap não é um prompt.** "Construa a Fase 0" é como nasce espaguete bem documentado: o agente "ajuda" refatorando o que não pediu. Cada tarefa entregue a um agente vive aqui como um **work-order** com escopo cercado.

## Anatomia de um work-order
- **Quem executa** (D-16/D-18): o **Cursor Composer** (builder primário) por padrão, dirigido pelo fundador na IDE. O Claude Code entra em auditoria/review/gates e em WO de build escopada quando delegado.
- **Objetivo:** 1–2 frases.
- **Arquivos permitidos:** o agente não escreve fora disso sem novo work-order. Tocar `packages/contracts`/`docs` exige aval do fundador (CODEOWNERS).
- **Critérios de aceite:** subconjunto verificável do 03 §7.1.
- **Refs:** os docs donos a ler antes.
- **Restrições de build:** as armadilhas conhecidas (ver `fase-0.md`).

## Regras (AGENTS.md)
- Tudo por **branch + PR**; a `main` tem **branch protection** (checks de CI obrigatórios) + **auto-merge** (PR de código mescla no verde via `pnpm ship`; PR de caminho CODEOWNERS fica pro aval do fundador); `pnpm verify` verde antes de "pronto".
- `/code-review` em todo PR (papel do Claude Code) antes do merge.
- Faixa = arquivo permitido. **Dois agentes nunca tocam o mesmo pacote na mesma fase.**

## Os papéis são ajustáveis
O modelo corrente (D-16, emendada pela D-18): **Cursor Composer é o builder primário** (o fundador desenvolve na IDE); **Claude Code é auxiliar** (auditoria, revisão, gates, build escopado quando delegado). O Replit foi removido da operação. Mudar é editar este diretório + os ponteiros (`.cursor/rules/`, `CLAUDE.md`) — não improvisar no meio de uma tarefa.
