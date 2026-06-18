# .claude/ — wrapper específico do Claude Code (thin)

Só o que o Claude Code precisa; **nenhum conhecimento mora aqui**. A fonte agnóstica é [`../.agents`](../.agents/README.md) e a conduta é o [`../AGENTS.md`](../AGENTS.md) (carregado por `@import` no [`../CLAUDE.md`](../CLAUDE.md)).

| Item | Versionado? | O que é |
|---|---|---|
| `settings.json` | ✅ sim | Config de time: hook `SessionStart` (pull do repo + bootstrap do vvcore + `setup-links.sh`), `shell: bash`. |
| `settings.local.json` | ❌ gitignored | Per-máquina: `autoMemoryDirectory` (caminho absoluto → `.agents/memory`) + permissions locais. Escrito pelo `setup-links.sh`. |
| `skills/` | ❌ gitignored | **Junction** → `.agents/skills` (skills locais do app). Recriada por máquina pelo `setup-links.sh`. |

> Tudo que vive **só** aqui ou que **só funciona via junction** está documentado nesta tabela (exigência do spec). Em conflito de conduta, o `AGENTS.md` vence.
