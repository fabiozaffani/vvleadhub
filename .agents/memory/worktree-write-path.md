---
name: worktree-write-path
description: Escrever via C:\Github\VVLEADHUB\... cai no checkout MAIN (branch main), não no worktree da sessão; use o caminho com prefixo do worktree para o trabalho ficar no branch.
metadata:
  node_type: memory
  type: feedback
---

Nas sessões em **git worktree** deste repo, o checkout principal (`C:\Github\VVLEADHUB`, em
`main`) e o worktree da sessão (`C:\Github\VVLEADHUB\.claude\worktrees\<nome>`) são **diretórios
de trabalho separados**. Ler/escrever por caminhos `C:\Github\VVLEADHUB\docs\...` (ou
`.agents\memory\...`) sem o prefixo do worktree mexe no **main**, não no branch da sessão — então
`git status` no worktree fica limpo e o trabalho não entra no commit/PR.

**Why:** numa sessão a WO-INTEL-001 passo B (5 arquivos do business doc) foi escrita em
`C:\Github\VVLEADHUB\docs\business\...` e caiu no main; precisei copiar pro worktree, commitar lá
e limpar a cópia stray do main. O main ainda tinha WIP de governança **de outra origem** (não
mexer no que não é seu).

**How to apply:** ao escrever/editar arquivos do repo numa sessão de worktree, use o caminho
**com** o prefixo do worktree (`C:\Github\VVLEADHUB\.claude\worktrees\<nome>\...`). Confirme com
`git -C <worktree> status` antes de commitar. Se algo caiu no main, copie pro worktree, commite no
branch e remova **só os seus** arquivos do main (preserve WIP alheio). Ver [[pr-auto-merge-armar]].
