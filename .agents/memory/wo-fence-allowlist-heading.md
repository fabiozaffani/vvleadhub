---
name: wo-fence-allowlist-heading
description: "O hook wo-fence só lê a cerca do WO se o heading for exatamente \"## Arquivos permitidos\" (sem número) — numerar zera a extração e bloqueia todo edit de artefato canônico."
metadata: 
  node_type: memory
  type: project
  originSessionId: 1f0fd1a9-ee26-445d-a6fe-10c02eb28e56
---

O `allowlist()` em `vvcore/bin/_canon-lib.sh` extrai a cerca com `sed -n '/^##[[:space:]]*Arquivos permitidos/,/^## /p'`. Se o heading for **numerado** (`## 5. Arquivos permitidos`), o regex não casa → allowlist **vazia** → o `hook-wo-fence` (e o `validate-wo`) concluem que nenhum WO cobre o caminho → **bloqueiam toda escrita em artefato canônico** com "nenhum WO promovido cobre na cerca". Os outros headings do WO **podem** ser numerados (## 1, ## 2…); só o da cerca tem de ser `## Arquivos permitidos` cru (WO-INTEL-001 já segue isso — o número 5 é "pulado").

Duas regras de parsing da cerca:
- **Um único token em backtick por linha:** `- \`docs/decisoes/\`` e **não** `- \`docs/decisoes/\` (… \`_template.md\`)` — o parser (`tr -d '\`*'` + grep) pega o **último** token, então uma anotação com outro backtick rouba o path.
- Match por **prefixo de diretório** (entrada com `/` final cobre arquivos dentro) **ou** path exato; o hook lê o WO **commitado**, não o working tree — fence corrigida só vale após `git commit`.

Ver [[wo-fence-edicao-governanca]] · [[sed-mangles-markdown]].
