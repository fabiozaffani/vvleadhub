---
id: WO-CORE-005
status: done
traces: [docs/_decisoes.md]
deps: []
skills: [sync-governanca]
---
# WO-CORE-005 · Sincroniza o claim auto-merge × CODEOWNERS à realidade da branch protection (D-21)

**Executor:** Claude Code. **Camada de tom:** trabalho. **Origem:** descoberta jun/2026 de que a `main` não tem required review configurado (PRs #49/#50 de `docs/` auto-mergearam no verde sem aprovação; `reviewDecision` vazio) — o claim "PR que toca CODEOWNERS nunca é auto-mergeado / aval do fundador" é **convenção, não enforcement**. Decisão do fundador (opção 2): `docs/` sem cerimônia; sensíveis manual por convenção. Registra **D-21**.

## Objetivo
Propagar a correção pela superfície de governança: registrar **D-21** no ledger e sincronizar os ecos editáveis à mão (`AGENTS.md` + `.cursor/rules/00-inviolaveis.mdc` + memória) — sem rediscutir D-1/D-16, só emendar.

## Dependências
**Nenhuma** (`deps: []`).

## Restrições de design
- `AGENTS.md` é a fonte; os ponteiros ecoam (AGENTS vence).
- **Não rediscutir D-1/D-16 — só emendar** (padrão emenda §6.3): D-16 ganha "(emendada pela D-21)"; o aval da D-1 é preservado pela convenção (agente não arma auto-merge em `.claude`).
- `.cursor/rules/00-canon-vvf.mdc` é **GERADO do vvcore** (`sync-cursor-rules.sh`) — **não editar à mão**; seus claims (mirror de `ARQUITETURA-IA §3/§4`) corrigem-se no **vvcore via `/sync-core`**.
- Superfície gated → PR **sem auto-merge**, aval do fundador (a própria convenção em ação).

## Passos
1. `docs/_decisoes.md`: + D-21; D-16 status → "(emendada pela D-18, D-21)".
2. `AGENTS.md`: reescreve o claim de auto-merge/CODEOWNERS (§Como trabalhar + §Instanciação).
3. `.cursor/rules/00-inviolaveis.mdc`: sincroniza o eco do claim de auto-merge (o range D-1..D-N fica para o WO-INTEL-001).
4. `.agents/memory/pr-auto-merge-armar.md` + `MEMORY.md`: corrige o claim falso da "review obrigatória".

## Arquivos permitidos (a cerca)
- `docs/_decisoes.md`
- `AGENTS.md`
- `.cursor/rules/00-inviolaveis.mdc`
- `.agents/memory/pr-auto-merge-armar.md`
- `.agents/memory/MEMORY.md`
- `docs/tasks/WO-CORE-005.md`

## Fora de escopo
- `.cursor/rules/00-canon-vvf.mdc` (gerado do vvcore — não tocar à mão).
- `ARQUITETURA-IA §3/§4` no vvcore (claim VV-wide "armar é seguro porque review obrigatória fecha" + "CODEOWNERS barra o merge") → corrige-se via `/sync-core`; **handoff registrado**.
- Ligar required review na branch protection (registrado em D-21, não escolhido).

## Skills obrigatórias
- **`sync-governanca`** — dona da superfície de governança.

## Critérios de aceite
- D-21 no ledger; D-16 marcada emendada. *Prova:* `git diff docs/_decisoes.md`.
- `AGENTS.md` + `.cursor/00-inviolaveis` + memória sem o claim falso. *Prova:* `git grep "review obrigatória"` não acha mais o claim em superfície editável à mão (resta só no `00-canon-vvf` gerado, pendente do vvcore).
- WO entra `done` no próprio PR (D-3 done-no-PR). PR gated, **sem auto-merge**.

## Refs
- D-21, D-16, D-1 (`docs/_decisoes.md`); ARQUITETURA-IA §3/§4/§6.3.
