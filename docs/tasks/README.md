# docs/tasks — work-orders

Um **roadmap não é um prompt.** "Construa a Fase 0" é como nasce espaguete bem documentado: o agente "ajuda" refatorando o que não pediu. Cada tarefa entregue a um agente vive aqui como um **work-order** com escopo cercado.

## Anatomia de um work-order
- **Quem executa** (D-16): o **Replit Agent** (builder primário) por padrão. Cursor/Claude Code só em tarefa de auditoria/correção pontual, não em WO de build.
- **Objetivo:** 1–2 frases.
- **Arquivos permitidos:** o agente não escreve fora disso sem novo work-order. Tocar `packages/contracts`/`docs` exige aval do fundador (CODEOWNERS).
- **Critérios de aceite:** subconjunto verificável do 03 §7.1.
- **Refs:** os docs donos a ler antes.
- **Restrições de build:** as armadilhas conhecidas (ver `fase-0.md`).

## Regras (AGENTS.md)
- Tudo por **branch + PR** (convenção; sem branch protection mecânica — decisão do fundador); CI roda em todo PR (check vermelho = bloqueio); `pnpm verify` verde antes de "pronto".
- `/code-review` em todo PR (papel do Claude Code) antes do merge.
- Faixa = arquivo permitido. **Dois agentes nunca tocam o mesmo pacote na mesma fase.**

## Os papéis são ajustáveis
O modelo corrente (D-16): **Replit Agent é o builder primário** (app inteiro); **Cursor Composer e Claude Code são auxiliares** (auditoria, revisão, melhoria, debug, commits). Mudar é editar este diretório + os ponteiros (`.cursor/rules/`, `replit.md`, `CLAUDE.md`) — não improvisar no meio de uma tarefa.
