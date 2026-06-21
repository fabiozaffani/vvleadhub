# D-3 — PostHog Cloud (analytics + Destinations)

**Status:** fechada · **Data:** — · **Tags:** stack, produto, compliance

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**PostHog Cloud**: captura, store, funis, replay, flags/experimentos **e Destinations** (dispatcher). Cloud (não self-host): o self-host exige stack ClickHouse/Kafka e só é recomendado até ~300k eventos/mês — incompatível com o perfil de operação. Captura permanece **first-party** via proxy pelo domínio próprio. **Self-host fica como fallback documentado** se o build de LGPD (D-5) exigir dado em casa. Revalidada contra o mercado 2026 (Amplitude/Mixpanel, Matomo/OpenPanel, Clarity/Hotjar, GrowthBook/Statsig, Segment/RudderStack): nenhum entrega o pacote com identidade única; frankenstack rejeitado. Catálogo de Destinations a confirmar na implementação; fallback via webhook→api-server (ver `specs/eventos/destinos.md`).

## Consequências

Ver ecos nos docs que citam `D-3` (`grep -r "D-3" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
