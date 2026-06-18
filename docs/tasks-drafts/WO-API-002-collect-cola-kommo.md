---
id: WO-API-002
status: pending
traces: [system/eventos.md, specs/eventos/schema-evento.md, specs/eventos/collector.md, specs/landing-pages/contrato-lead.md]
---
# WO-API-002 · Collector + `/collect` + cola fina Kommo (Fase 1) — RASCUNHO

**Pré-promoção.** Builder: Cursor Composer. **Fase:** 1 (Eventos).

## Objetivo (proposto)
Ligar a mensuração first-party: collector batched no site (analytics via proxy CF — D-15), endpoint `/collect` no api-server para eventos de negócio, e a cola bidirecional com Kommo (lead in / desfecho out → loop fechado).

## Escopo proposto
`site/src/lib/` (collector), `api-server/src/{routes,services,integrations/kommo}`. Click IDs/UTM/xcode em cookie first-party (D-14, sem retrofit). Consent pass-through (gancho D-5).

## Critério de aceite (de `roadmap/fases.md` §7.1 — Fase 1)
Catálogo de eventos emitido; round-trip de teste Meta/GA4 verde via `test:true`; rate-limit + validação de schema no `/collect`.

## Refs
[`../specs/eventos/`](../specs/eventos/), [`../specs/landing-pages/contrato-lead.md`](../specs/landing-pages/contrato-lead.md). Depende de [`WO-API-001`](../tasks/WO-API-001.md).
