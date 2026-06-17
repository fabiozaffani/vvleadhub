---
name: pr-auto-merge-armar
description: "Auto-merge não arma sozinho — abrir todo PR já com gh pr merge --auto"
status: draft
type: project
verified: 2026-06-16
---

A `main` tem branch protection com auto-merge habilitado **no repo**, mas **cada PR precisa
ter o auto-merge armado explicitamente** — senão fica parado em `mergeStateStatus: CLEAN`
esperando merge manual (validado no PR #20, jun/2026).

**Padrão pedido pelo fundador:** criar todo PR já armando o auto-merge.

```
gh pr create ...
gh pr merge <n> --auto --squash --delete-branch
```

Aí ele dispara sozinho quando os checks fecharem. Seguro até para PR que toca CODEOWNERS:
o `--auto` só dispara quando TODOS os requisitos (incl. review obrigatória do fundador)
forem satisfeitos — não fura a regra de aprovação.

**Acompanhar CI por snapshot:** `gh pr checks <n>`.

**Promoção:** o fluxo de PR/branch protection/CODEOWNERS já está no `AGENTS.md` (§Como
trabalhar). Falta lá só este detalhe operacional do `--auto`; promover para o AGENTS.md
quando for revisar aquela seção. O resto da antiga memória `review-pr-nao-depender-bugbot`
(Bugbot removido, etc.) já está coberto no AGENTS.md.
