---
id: WO-CORE-004
status: done
traces: [.agents/context/ARQUITETURA-IA.md]
deps: []
skills: [sync-governanca]
---
# WO-CORE-004 · Propaga regen do 00-canon (D-3 done-no-PR) p/ o espelho `.cursor` — RASCUNHO

**Pré-promoção.** Executor: Claude Code. **Camada de tom:** trabalho. **Origem:** fechamento da propagação do vvcore #5 (D-3 / done-no-PR, mesclado em `e25a9d6`) para o espelho `.cursor` deste repo. **Primeira aplicação da convenção done-no-PR.**

## Objetivo
Committar a regen do `.cursor/rules/00-canon-vvf.mdc` (gerada pelo `sync-cursor-rules.sh` pós-merge do vvcore #5), alinhando o espelho ao canon atual: `ARQUITETURA-IA §5.4/§6.5` (finalização done-no-PR) + a decisão `D-3`.

## Dependências
**Nenhuma** (`deps: []`). O canon-fonte (vvcore #5) já está mesclado.

## Restrições de design
- `00-canon-vvf.mdc` é **GERADO** por `sync-cursor-rules.sh` — committar o gerado, **nunca editar à mão**.
- `.cursor/rules` é gated → PR gated, **sem auto-merge**, aval do fundador.
- **Aplica a convenção D-3 (done-no-PR):** este WO promove `pending` (o gate valida `deps`/`skills`) e o commit de execução já o marca `done`.

## Passos
1. Promover (commit 1): `pending`.
2. Commit 2: a regen do `00-canon` (já no working tree) + marcar este WO `done`.
3. PR gated.

## Arquivos permitidos (a cerca)
- `.cursor/rules/00-canon-vvf.mdc`
- `docs/tasks/WO-CORE-004-sync-canon-d3.md` (o próprio WO)

## Fora de escopo
- Editar o `00-canon` à mão (é gerado).
- Outros repos app (ex.: `vvleadhub-radar`) — propagam na própria frente.
- `WO-CORE-002`/`003` retroativos.

## Skills obrigatórias (ordem)
- **`sync-governanca`** — dona da superfície de governança (`.cursor/rules`).

## Critérios de aceite (done looks like)
- `00-canon-vvf.mdc` committed reflete o canon pós-#5 (D-3 / §5.4–§6.5). *Prova:* `git diff` mostra as adições.
- Este WO entra `done` no próprio PR (D-3 aplicado a si mesmo). *Prova:* `status: done` no commit de execução.
- PR gated, sem auto-merge.

## Refs
- vvcore `e25a9d6` (#5, D-3).
- `ARQUITETURA-IA §5.4/§6.5`.
