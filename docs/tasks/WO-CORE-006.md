---
id: WO-CORE-006
status: done
traces: [.agents/context/ARQUITETURA-IA.md]
deps: []
skills: [sync-governanca]
---
# WO-CORE-006 · Propaga regen do 00-canon (§3/§4 auto-merge, vvcore 857ec5e) p/ o espelho `.cursor`

**done-no-PR.** Executor: Claude Code. **Tom:** trabalho. **Origem:** vvcore main `857ec5e` (WO-CORE-005 do core — §3/§4 auto-merge/CODEOWNERS: enforcement real). Espelha a **D-21** local.

## Objetivo
Committar a regen do `.cursor/rules/00-canon-vvf.mdc` (gerada pelo `sync-cursor-rules.sh` pós-merge do vvcore `857ec5e`), tirando do espelho o claim falso ("armar `--auto` é seguro porque a review obrigatória fecha" / "CODEOWNERS ainda barra o merge").

## Dependências
**Nenhuma** (`deps: []`). O canon-fonte (vvcore `857ec5e`) já está na `main` do core.

## Restrições de design
- `00-canon-vvf.mdc` é **GERADO** por `sync-cursor-rules.sh` — committar o gerado, **nunca editar à mão**.
- `.cursor/rules` é gated → PR gated, **sem auto-merge** (D-21), aval do fundador.

## Passos
1. Regen já no working tree (rodado o `sync-cursor-rules.sh`).
2. Commit: a regen do `00-canon` + este WO (done-no-PR, D-3).
3. PR gated, **sem auto-merge**.

## Arquivos permitidos (a cerca)
- `.cursor/rules/00-canon-vvf.mdc`
- `docs/tasks/WO-CORE-006.md`

## Fora de escopo
- Editar o `00-canon` à mão (é gerado).
- Range `D-1..D-N` / índices (WO-INTEL-001).

## Skills obrigatórias
- **`sync-governanca`** — dona da superfície de governança.

## Critérios de aceite
- `00-canon-vvf.mdc` reflete o §3/§4 corrigido (vvcore `857ec5e`); claim falso ausente. PR gated, sem auto-merge. WO `done` no PR.

## Refs
- vvcore `857ec5e` (WO-CORE-005); VVLEADHUB **D-21**.
