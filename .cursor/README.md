# .cursor/ — wrapper específico do Cursor (thin)

Ponteiros para a fonte agnóstica ([`../.agents`](../.agents/README.md) + [`../AGENTS.md`](../AGENTS.md)); nenhum conhecimento canônico nasce aqui. Como o Cursor é o **builder primário** deste app (repo tipo `app`), e **não expande `@import`**, o canon do vvcore é entregue como **cópia gerada** em `rules/00-canon-vvf.mdc`.

| Item | O que é |
|---|---|
| `rules/00-canon-vvf.mdc` | Canon (`CONTEXTO-IA` + `ARQUITETURA-IA`) embutido verbatim, `alwaysApply: true`. **GERADO** por `vvcore/bin/sync-cursor-rules.sh` — **não editar à mão**. |
| `rules/00-inviolaveis.mdc` | Ponteiro: aponta o `AGENTS.md` como fonte única de conduta. |
| `rules/*.mdc` | Regras por módulo (admin / api-server / site / contracts). |

> ⚠️ **Drift conhecido:** o `sync-cursor-rules.sh` hoje **só roda à mão**. Após editar o canon no vvcore, rode-o para o Cursor não ficar stale. (Melhoria planejada: automatizar via hook/CI.)
