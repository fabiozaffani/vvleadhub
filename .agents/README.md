# .agents/ — camada agnóstica de agentes (tool-neutral)

Memória, skills e contexto que **qualquer** agente (Cursor Composer, Claude Code, Codex…) consome — sem nada específico de uma ferramenta. [`../.claude`](../.claude/README.md) e [`../.cursor`](../.cursor/README.md) são thin wrappers que apontam para cá; a fonte mora aqui.

| Subpasta | O que é |
|---|---|
| `memory/` | Auto-memória versionada do repo (store única, modelo Path 2). Ver [`memory/README.md`](memory/README.md). |
| `skills/` | Skills **locais** deste app (fonte versionada). O Claude as vê via junction `.claude/skills → .agents/skills`. Ver [`skills/README.md`](skills/README.md). |
| `context/` | **Junction per-máquina** → `vvcore/plugins/vvcore/context` (criada pelo `setup-links.sh`). Entrega o canon (`CONTEXTO-IA.md`, `ARQUITETURA-IA.md`) por `@import`. **Não versionada** (gitignored) — é link, não cópia. |

> `context/` é junction (não pasta real): **some num clone** até o `setup-links.sh` rodar no `SessionStart`. Conduta no [`../AGENTS.md`](../AGENTS.md); doutrina em `ARQUITETURA-IA.md` §1.
