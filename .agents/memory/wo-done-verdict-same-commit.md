---
name: wo-done-verdict-same-commit
description: Gate D-4 — WO high-stakes→done exige review:pass + reviewed_sha (hash da cerca STAGED) no MESMO commit da cerca; commitar o canon separado e o flip pra done é bloqueado.
metadata: 
  node_type: memory
  type: project
  originSessionId: 40d2bc0f-9fad-453c-a49f-ab5afd509bad
---

O `validate-wo` (pre-commit) **bloqueia** uma WO **high-stakes** (cerca toca canon/contracts/infra, ou `closes_phase`) indo pra `status: done` sem veredito válido no frontmatter: precisa de **`review: pass`** + **`reviewed_sha`** casando `vv_fence_sha(<wo>, --staged)` = `git hash-object` do **diff staged** dos arquivos da cerca (excluindo o próprio WO).

**Consequência prática (o gotcha):** o veredito + `status: done` têm que entrar **no mesmo commit que faz stage da cerca**. Se você commitar a mudança da cerca primeiro (ex.: a edição do canon) e depois tentar flipar a WO pra `done` num commit separado, o diff staged da cerca fica **vazio** → o hash não casa → o flip é **bloqueado**.

**Enforcement assimétrico:** o pre-commit do **VVLEADHUB bloqueia** (commit abortado); o do **vvcore** foi **advisory** nesta fundação (imprime o aviso mas o commit passa) — mas faça certo nos dois.

**Como consertar quando travar** (foi o que rodou em D-26):
1. `git reset --soft <commit antes da cerca>` — re-stage a cerca (canon) + a WO.
2. `git restore --staged <stray>` se algum arquivo alheio veio junto (ex.: commit concorrente de outro agente no checkout compartilhado).
3. `source vvcore/bin/_canon-lib.sh && vv_fence_sha <wo-path> --staged` → pega o hash.
4. Edit na WO: `status: done` + `review: pass` + `reviewed_by: ...` + `reviewed_sha: <hash>`.
5. `git add <wo>` (cerca já staged) → `git commit` (cerca + done + veredito juntos) → passa.
6. `git push --force-with-lease`.

O **PASS** vem de um **revisor independente de contexto fresco** (subagente read-only, ancorado no aceite do WO); você só **registra** o veredito mecanicamente. Ver [[pr-auto-merge-armar]] (caminho sensível = sem auto-merge; merge do fundador). Doutrina do gate no canon ARQUITETURA-IA §5.4/§6.5 (v1.4).
