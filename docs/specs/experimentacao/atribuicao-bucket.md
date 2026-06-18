# Atribuição de bucket

**Camada:** spec · **Domínio:** experimentacao · **Origem:** 08-experimentacao.md · **Tom:** trabalho

Como um usuário é atribuído deterministicamente a uma Variante e como isso interage com o full-page cache (D-8). A visão coesa do domínio — o princípio server-side sem flicker — está em `system/experimentacao.md`.

---

## Atribuição determinística

- Decidida no edge/servidor por `anonymous_id` — **determinística** (mesmo usuário → mesma Variante na sessão e entre sessões enquanto o experimento roda).
- Renderização da Variante acontece no HTML inicial (sem flash de conteúdo).

## Interação com cache (D-8)

- Ativar um experimento numa LP **a tira do full-page cache** (SSR por hit) até o experimento encerrar.
- Na etapa final, edge logic com a Variante na chave de cache devolve o cache total mesmo sob teste.
- Criar/encerrar experimento deve **alternar esse estado automaticamente** — nunca manual.

A decisão D-8 (e demais decisões fechadas) é rastreada em `decisoes.md`. A propagação da Variante até a exposição emitida ao event hub está em `guardrails-estatisticos.md` (exposição e mensuração) e em `system/eventos.md`.
