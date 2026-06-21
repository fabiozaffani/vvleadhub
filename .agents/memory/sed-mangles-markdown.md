---
name: sed-mangles-markdown
description: "Não use `sed -i` em markdown neste repo — um linter de fundo reformata o arquivo escrito por sed e corrompe (reposiciona backticks em links, dropa o"
metadata: 
  node_type: memory
  originSessionId: 1f0fd1a9-ee26-445d-a6fe-10c02eb28e56
---

do frontmatter). Use as tools Write/Edit.
metadata:
  node_type: memory
  type: project
---

Editar markdown via `sed -i` (ex.: promover WO, virar `status`) dispara um formatter/linter de fundo (o mesmo que gera "modified since read … or by a linter" nas tools Edit) que reescreve o arquivo e o **corrompe**: `[\`code\`](url)` vira `\`[code](url)\``, headings ganham linha em branco, e o `---` de fechamento do frontmatter **some** (`id:` vira `## id:`). Visto em jun/2026 ao mexer numa WO com `sed -i` — o corpo inteiro mangleou; os arquivos editados pelas tools **Write/Edit** no mesmo lote ficaram limpos.

Regras:
- Para mutar markdown, use **Edit/Write**, nunca `sed -i`.
- `docs/tasks/` é deny ao **Write de arquivo novo** (promoção é do fundador — `mv` via Bash), mas **permite Edit/Write em arquivo existente** (o hook só barra `Write && !exists`). Então status/lifecycle de WO já promovida edita-se pela tool Edit, sem sed.
- Se precisar mesmo de Bash, `git add` **antes** de o linter mexer e commitar: `git commit` usa o índice (staged), então a versão limpa entra mesmo que o working tree seja remangleado depois — confira com `git show :<path> | grep -n '\`\['`.

Ver [[wo-fence-allowlist-heading]] · [[worktree-write-path]].
