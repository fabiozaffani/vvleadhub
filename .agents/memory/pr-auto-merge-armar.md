---
name: pr-auto-merge-armar
description: Auto-merge — armar em docs/código, NUNCA em caminhos sensíveis (main sem required review, D-21)
metadata: 
  node_type: memory
  status: draft
  type: project
  verified: 2026-06-20
  originSessionId: ed7625de-7cc9-4402-be23-6181725428da
---

A `main` tem branch protection com auto-merge habilitado **no repo**, mas **cada PR precisa
ter o auto-merge armado explicitamente** — senão fica parado em `mergeStateStatus: CLEAN`
esperando merge manual (validado no PR #20, jun/2026).

**Padrão:** armar auto-merge ao criar o PR — **mas só em `docs/` e código** (D-21).

```
gh pr create ...
gh pr merge <n> --auto --squash --delete-branch
```

Dispara sozinho quando os checks fecharem.

⚠️ **CORREÇÃO (D-21, 20/jun/2026):** a `main` **NÃO tem required review** — só checks de CI.
Então `--auto` **mescla no CI verde SEM aprovação**, mesmo em caminho de CODEOWNERS (provado:
PRs #49/#50 de `docs/` auto-mergearam sem review; `reviewDecision` vazio). O claim antigo — "o
`--auto` só dispara após a review obrigatória do fundador" — era **FALSO**. Logo: armar livre em
`docs/`/código; **NUNCA armar** em caminhos sensíveis (`packages/contracts`, `.claude`,
`AGENTS.md`/`CLAUDE.md`, `.github`, `infra`) — nesses, **deixar p/ o merge manual
do fundador** (a convenção é o gate, já que o branch protection não trava; preserva a D-1). Ver
`AGENTS.md` §Como trabalhar + D-21 no `_decisoes.md`.

**Acompanhar CI por snapshot:** `gh pr checks <n>`.

**Promoção:** o fluxo de PR/branch protection/CODEOWNERS já está no `AGENTS.md` (§Como
trabalhar). Falta lá só este detalhe operacional do `--auto`; promover para o AGENTS.md
quando for revisar aquela seção. O resto da antiga memória `review-pr-nao-depender-bugbot`
(Bugbot removido, etc.) já está coberto no AGENTS.md.
