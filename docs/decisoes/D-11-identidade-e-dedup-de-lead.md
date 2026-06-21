# D-11 — Identidade e dedup de lead (E.164, Kommo SoT)

**Status:** fechada · **Data:** — · **Tags:** stack, produto

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Identidade e dedup de lead:** Kommo é a **fonte de verdade** do lead (`app.leads` é log operacional para atribuição/painel/loop). Chave = **telefone E.164**. Política **upsert-e-anexar**: telefone novo → cria card; card aberto → anexa interação (nota com LP/xcode) + notifica SDR, sem card novo; card Perdido/antigo → reabre ou recria conforme estágio (≙ "Pipeline Recuperável" — comportamento exato a validar com a SDR na implementação). Log guarda todas as conversões (first/last-touch preservados). **Loop fechado dispara por card, não por interação** (sem conversão duplicada para os ads).

## Consequências

Ver ecos nos docs que citam `D-11` (`grep -r "D-11" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| _(nenhuma)_ | — |
