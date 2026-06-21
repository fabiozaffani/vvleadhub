# D-19 — Inteligência competitiva — L3 do single pane

**Status:** fechada (emendada pela D-20, D-24) · **Data:** jun/2026 · **Tags:** produto, compliance

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Inteligência competitiva como L3 do single pane (estende D-17):** vigília contínua de anúncios pagos + orgânico de concorrentes locais, indexada no banco do app e renderizada no **Tracker Hub como L3** (ao lado de L1 — atribuição closed-loop nossa — e L2 — reporting das nossas campanhas). **Acesso (pesquisa jun/2026):** não há API oficial de anúncio comercial de concorrente p/ BR (Meta API = político/UE; Google/TikTok/Pinterest idem/inexistente) — é web/scraping. **Coleta = extrator pago confiável (Apify REST: Meta Ad Library + Instagram, `country=BR`) + YouTube Data API (orgânico, único caminho oficial limpo) + Google Transparency via SerpApi/Apify**, em **job no `api-server`** (não scraping caseiro); dado no schema do dono (D-9, a definir na spec). **Faseamento:** mapeia-se (business→specs→system) + roda-se o **radar de findings** ([`discovery/radar/`](discovery/radar/)) agora; **build do módulo no app congelado** atrás de gate de capacidade (admin/Tracker Hub existir — Fase 2–3) **+** evidência (radar v0 com ≥3 ideias usáveis sobreviventes ao `doc-discovery-mapper`). Build-vs-buy do reporting completo com custo na mão (espelha D-17). **Guardrails:** sem me-too/caça-tendência (INV-01), sem guerra de componente (INV-03). **Preço (distinção §1.1):** preço de concorrente e disposição-a-pagar do mercado **são inteligência interna de 1ª classe** (alimenta M-02) — coletar é central; **INV-05 restringe só o copy público** (nada de preço/desconto como argumento em LP/post). **LGPD:** legítimo interesse + LIA curta + minimizar PII + uso interno + retenção; nunca reusar criativo alheio nos nossos ads. **Fora:** Pinterest pago (beco BR), TikTok per-concorrente (Creative Center não indexa venue local).

## Consequências

Ver ecos nos docs que citam `D-19` (`grep -r "D-19" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-20 | Ver índice e ADR correspondente |
| D-24 | Ver índice e ADR correspondente |
