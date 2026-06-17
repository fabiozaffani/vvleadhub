# CLAUDE.md — ponteiro para AGENTS.md

**A fonte única de conduta do agente neste repositório é [`AGENTS.md`](AGENTS.md). Leia-o antes de qualquer código.** Este arquivo existe porque o Claude Code lê `CLAUDE.md` automaticamente — mas o conteúdo canônico, tool-neutral, vive no `AGENTS.md` (decisão D-16, emendada pela D-18; 00 §7). Em qualquer conflito, o `AGENTS.md` vence.

## Doutrina VV-wide (fonte única no vvcore)

@../vvcore/plugins/vvcore/context/ARQUITETURA-IA.md

> **Tipo de repo: `app`.** Engenharia/tooling VV-wide (core compartilhado, memória, config/hooks, git/PR multi-agente) carregada via `@import` do vvcore — editar lá. O específico do VVLEADHUB vive no `AGENTS.md`.

Papel do Claude Code na governança multi-agente (D-16, emendada pela D-18): **auxiliar/backup** — auditoria, revisão e melhoria. O **builder primário é o Cursor Composer** (o fundador desenvolve o app na IDE); o Claude Code revisa os PRs com `/code-review` antes do merge, roda `/audit-quality` e `/checklist-fase` nos gates, faz `/security-review` quando couber, assume build escopado quando delegado, e toca trabalho de maior volume onde tokens mais baratos/contexto longo ajudam. O **Replit foi removido da operação (D-18)** — não há mais builder na nuvem.

## Contexto da empresa (fonte única no vvcore)

@../vvcore/plugins/vvcore/context/CONTEXTO-IA.md

> Carregado automaticamente (`@import`) da **fonte única** no vvcore. O antigo `docs/brand/vvf-system-context.md` virou **ponteiro** — editar o canônico **só no vvcore**. As Design Guidelines (`docs/brand/vvf-design-guidelines.md`) continuam locais (específicas do site).

## Invioláveis (resumo — texto completo no AGENTS.md)

- **Leitura obrigatória antes de codar:** `docs/brand/*` → `00` → `01` → `02` → `03` → spec da tarefa (04–09) → work-order em `docs/tasks/`.
- **Decisões fechadas (D-1..D-18) e invariantes não se rediscutem** — implementam-se; dúvida real → pergunte ao fundador.
- **Fronteiras (travadas no CI):** `site` não importa de `admin`/`api-server`; tipos cruzados só via `packages/contracts`; `site` jamais toca Postgres; cada schema migrado só pelo dono (D-9).
- **Sem preço em copy público (INV-05); sem componente isolado (INV-03); exclusividade pela história (INV-07).**
- **Marca:** tokens + Playfair/Work Sans, sem emojis, sem ícones decorativos, pt-BR (Design Guidelines).
- **Segredos só em Secrets**; nada na `main` sem PR; `pnpm verify` verde antes de "pronto".
- **Diferidos com gancho** (LGPD `consent`, `correlation_id`, opt-in mínimo): mantenha, não implemente antes da hora nem remova.
- **Vocabulário (00 §6):** `Arquétipo` é só da marca; no código `subject`/`subjectType`/`objective`/`template`.
