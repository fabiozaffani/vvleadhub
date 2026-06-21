# D-13 — Captura multi-plataforma (lead forms + audiências)

**Status:** fechada · **Data:** — · **Tags:** stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Captura multi-plataforma (varredura competitiva):** (a) **ingestão de lead forms nativos** — Meta Instant Forms/Lead Ads, TikTok Lead Generation, Google Lead Form assets, Pinterest Lead Ads entram por webhook → api-server → dedup D-11 → card no Kommo com origem etiquetada; o loop fechado os cobre automaticamente (dispara por card). (b) **sync de audiências** — exportação de segmentos do funil (ex.: Ganho, lead qualificado) como custom audiences com PII hasheada (Meta/Google/TikTok) para semear lookalikes. Adições menores: Objetivo `agendar_visita` no registro (`specs/plataforma/primitivas.md`), `VideoObject` no structured data (`system/arquitetura.md`/`specs/blog/seo-on-page.md`), `origin_channel: marketplace` (`specs/landing-pages/propagacao-origem.md`).

## Consequências

Ver ecos nos docs que citam `D-13` (`grep -r "D-13" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
