---
name: commitlint-hash-no-corpo
description: "#N no corpo do commit vira issue-reference no commitlint → footer-max-line-length pode estourar; use o hash ou 'PR N' e quebre o corpo em linhas curtas."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2c6c3e14-d4f9-4386-b158-8face9edc41c
---

O check `conventional commits` (commitlint) do CI pode falhar com **`footer-max-line-length`** (linha de footer > 100 chars) **mesmo com o corpo aparentemente ok**. Causa: um **`#N`** no corpo (ex.: "vvcore #5") é parseado como **issue-reference**, e o conventional-commits-parser passa a tratar aquele parágrafo como **footer** — aí o limite de 100 chars/linha do footer pega o parágrafo longo. (Por isso commits anteriores com corpo longo passaram: não tinham `#N`.)

**Evitar:** no corpo do commit, **não** referenciar PR/issue como `#N`; use o **hash** (`e25a9d6`) ou "PR N". E quebre o corpo em linhas ≤ ~72 chars por garantia.

**Fix quando já aconteceu:** `git commit --amend -F -` (heredoc com corpo curto, sem `#N`) + `git push --force-with-lease` na branch do PR — o auto-merge re-avalia e dispara no verde, sem re-armar. Precedente: WO-CORE-004 (#47). Ver [[pr-auto-merge-armar]].
