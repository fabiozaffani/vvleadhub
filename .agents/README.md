# .agents/ — camada agnóstica de agentes (tool-neutral)

Memória, skills locais e contexto compartilhado que qualquer agente (Claude Code, Codex ou outro) pode consumir sem acoplar o repo a uma ferramenta. `.claude/` é adapter/thin wrapper quando existir; a fonte tool-neutral mora aqui.

| Subpasta | O que é |
|---|---|
| `memory/` | Auto-memória versionada do repo (store única, modelo Path 2). Ver `memory/README.md` quando existir. |
| `skills/` | Skills locais versionadas, quando o repo tiver skills próprias. Claude Code pode vê-las por link `.claude/skills → .agents/skills`, criado pelo `setup-links.sh`. |
| `context/` | Link por máquina → `vvcore/plugins/vvcore/context` (junction no Windows, symlink no macOS/Linux), criado pelo `setup-links.sh` quando o repo importa `.agents/context`. Disponibiliza `CONTEXTO-IA.md` e `ARQUITETURA-IA.md` por `@import`; `CONSTITUICAO-IA.md` entra aqui quando for promovida no vvcore. Não versionar. |

> `context/` é link local, não pasta real versionada: some num clone até `setup-links.sh` rodar no `SessionStart`. Conduta local fica em `../AGENTS.md`; contexto compartilhado fica em `.agents/context/`.
