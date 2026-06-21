# D-20 — Casa-de-dados do radar descongelada (Payload)

**Status:** fechada · **Data:** jun/2026 · **Tags:** stack, produto, compliance

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Casa-de-dados do radar descongelada (emenda à D-19):** a fatia de **registro curado** de inteligência competitiva — collections no **Payload** (`payload` schema, D-9) + **seed bootstrap** versionado, entrada manual/curada no admin — **sai do congelamento** e é mapeada (business→specs→system) e construída **agora**. Motivação: captura de pesquisa de mercado é **dado de produto**, não doc versionada em git — `_raw`/registro do radar migram para o banco (curáveis no admin); o git guarda só o seed inicial que bootstrapa produção. **Seguem congelados** atrás do gate original da D-19 (admin/Tracker Hub existir + radar v0 com ≥3 ideias usáveis): a **coleta automatizada** (jobs Apify/Meta Ad Library/YouTube no `api-server`) e o **render L3 no Tracker Hub**. **Dono do schema = Payload** (resolve a lacuna "a definir na spec" da D-19; ref a Espaço VVF por id, sem FK cruzando). **Guardrails D-19 intactos e agora escritos na spec:** LGPD/PII mínima, INV-01/03, preço = inteligência interna (INV-05 só no copy público).

## Consequências

Ver ecos nos docs que citam `D-20` (`grep -r "D-20" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
