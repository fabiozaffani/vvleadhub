# .claude/memory — memórias versionadas do agente

Rascunhos de conhecimento durável do projeto, **versionados em git** (viajam com o
repo, valem em qualquer máquina e em qualquer agente que leia esta pasta).

## Modelo: rascunho → promoção por validação

1. **draft** — um fato entra aqui assim que se mostra durável (gotcha técnico,
   convenção, decisão de arquitetura). É a área de estágio.
2. **promoted** — quando o fato se confirma ao longo do tempo, ele é **promovido**
   para a documentação permanente (`AGENTS.md`, `CLAUDE.md` ou `docs/`) e o rascunho
   aqui vira `status: promoted` com um ponteiro para onde virou doc — ou é removido.
3. **obsolete** — fato superado pelo HEAD; remover (não deixar memória stale).

A fonte de verdade de conduta continua sendo o `AGENTS.md`. Esta pasta é o caderno
de campo que alimenta a doc, não a substitui.

## Frontmatter

```yaml
---
name: kebab-case
description: uma linha
status: draft        # draft | promoted | obsolete
type: project        # project | reference | feedback
verified: 2026-06-16 # data da última verificação contra a realidade/HEAD
---
```

Não versiona `settings.local.json` (gitignored — permissions/caminhos da máquina).
