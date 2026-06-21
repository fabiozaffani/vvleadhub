# D-14 — Atribuição de plataforma (click IDs, CTWA, visitas)

**Status:** fechada · **Data:** jun/2026 · **Tags:** stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Atribuição de plataforma** (auditoria growth jun/2026): (a) **click IDs** (`fbclid`→`fbc`/`fbp`, `gclid`, `ttclid`, `epik`) capturados em cookie first-party junto de UTM/xcode e presentes no schema de evento (`specs/eventos/schema-evento.md`) e no contrato de lead (`specs/landing-pages/contrato-lead.md`) **desde a Fase 1** — click ID não tem retrofit; (b) **CTWA como caminho de primeira classe** (`specs/eventos/ctwa.md`) — **validado em 12/06/2026** (doc oficial Kommo): a Kommo não expõe `ctwa_clid`; desenho v1 = UTMs nativos no Tracking data (mesmo Business Manager) + loop casado por telefone + Conversion API da Kommo avaliada em sandbox; captura própria do `referral` (Cloud API/BSP) só atrás de gatilho de escalada; (c) **valores de conversão por faixa** (matriz M-02) em `lead_qualificado`/`ganho` p/ value-based bidding — telemetria server-side às plataformas, não comunicação: **INV-05 intacto** (aval do fundador); (d) **SLA de qualificação ≤ 72h** (nuance a validar com a SDR) p/ o sinal cair na janela de otimização; otimização primária em `lead` (volume), qualificado como sinal secundário; (e) **eventos de visita** (`visita_agendada` · `visita_realizada` · `no_show`) no catálogo (`specs/eventos/schema-evento.md`) — funil M-04 mensurável ponta a ponta.

## Consequências

Ver ecos nos docs que citam `D-14` (`grep -r "D-14" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
