# ADRs — decisões arquiteturais

Corpo das decisões referenciadas pelo índice [`../_decisoes.md`](../_decisoes.md).

## Convenção

- **`_decisoes.md`** = índice fino (ID · data · título · status · tags · link). Grepável; load-first.
- **`decisoes/D-N-slug.md`** = ADR completo (contexto, decisão, consequências, ecos, emendas).
- Numeração **`D-N` preservada exata** — referenciada em todo o repo.
- Decisão fechada **não se rediscute** — só se emenda (nova D-N + status no índice). Ver `/sync-governanca`.

## Template

Copie [`_template.md`](_template.md) ao registrar uma decisão nova.

## Status

| Status | Significado |
|---|---|
| `proposta` | Debate aberto (raro no ledger) |
| `fechada` | Implementar; não rediscutir |
| `fechada · emendada por D-X` | Original válida; ver emenda |
| `supersedida por D-X` | Não usar; ID preservado p/ histórico |
| `diferida` | Gancho reservado; link p/ roadmap ou domínio |
