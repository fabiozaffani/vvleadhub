# CLAUDE.md — ponteiro para AGENTS.md

**A fonte única de conduta do agente neste repositório é [`AGENTS.md`](AGENTS.md). Leia-o antes de qualquer código.** Este arquivo existe porque o Claude Code lê `CLAUDE.md` automaticamente — mas o conteúdo canônico, tool-neutral, vive no `AGENTS.md` (decisão D-16, 00 §7). Em qualquer conflito, o `AGENTS.md` vence.

Papel do Claude Code na governança multi-agente (D-16): **revisão e gates** dos PRs do Cursor Composer (`site/`+`admin/`) e do Replit Agent (`api-server/`+infra) — `/code-review` em todo PR antes do merge, `/checklist-fase` no fim de fase, `/audit-quality` nos gates de CWV/a11y.

## Invioláveis (resumo — texto completo no AGENTS.md)

- **Leitura obrigatória antes de codar:** `docs/brand/*` → `00` → `01` → `02` → `03` → spec da tarefa (04–09) → work-order em `docs/tasks/`.
- **Decisões fechadas (D-1..D-16) e invariantes não se rediscutem** — implementam-se; dúvida real → pergunte ao fundador.
- **Fronteiras (travadas no CI):** `site` não importa de `admin`/`api-server`; tipos cruzados só via `packages/contracts`; `site` jamais toca Postgres; cada schema migrado só pelo dono (D-9).
- **Sem preço em copy público (INV-05); sem componente isolado (INV-03); exclusividade pela história (INV-07).**
- **Marca:** tokens + Playfair/Work Sans, sem emojis, sem ícones decorativos, pt-BR (Design Guidelines).
- **Segredos só em Secrets**; nada na `main` sem PR; `pnpm verify` verde antes de "pronto".
- **Diferidos com gancho** (LGPD `consent`, `correlation_id`, opt-in mínimo): mantenha, não implemente antes da hora nem remova.
- **Vocabulário (00 §6):** `Arquétipo` é só da marca; no código `subject`/`subjectType`/`objective`/`template`.
