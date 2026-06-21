# D-2 — Cloudflare + Astro no edge (runtime TBD Fase 0b)

**Status:** fechada (emendada pela D-18) · **Data:** jun/2026 · **Tags:** gov, stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

~~**Replit** como base (protótipo e produção inicial)~~ **— removido pela D-18** + **Cloudflare** na frente; **site público server-rendered em Astro** (artifact próprio; `api-server` intacto). **Runtime/hospedagem a definir na Fase 0b (D-18); Cloudflare permanece no edge.** Gatilhos de revisita de escala (mantidos como SLO; ver `system/engenharia.md`): p95 de TTFB de LP > 600 ms por 7 dias · qualquer incidente de perda de eventos na ingestão · custo mensal fora do plano.

## Consequências

Ver ecos nos docs que citam `D-2` (`grep -r "D-2" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-18 | Ver índice e ADR correspondente |
