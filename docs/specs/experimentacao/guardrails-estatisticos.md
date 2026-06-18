# Guardrails estatísticos — exposição, mensuração e gate de volume

**Camada:** spec · **Domínio:** experimentacao · **Origem:** 08-experimentacao.md · **Tom:** trabalho

Como a exposição é emitida e medida, e as regras estatísticas que blindam a decisão por evidência — incluindo o gate de volume que decide se um experimento sequer arma. A visão coesa do domínio está em `system/experimentacao.md`.

---

## Exposição e mensuração

- Cada exposição emite `experiment_exposure` ao event hub (ver `system/eventos.md` — schema e catálogo de eventos) com `experiment.key` + `variant`.
- O painel de eventos (ver `system/eventos.md`) calcula **conversão por variante** e a **significância**.
- Conversão casa com o evento `lead`/`lead_qualificado` — fechando do clique ao resultado real (loop fechado; ver `specs/eventos/loop-fechado.md`).

---

## Guardrails estatísticos

- **Amostra mínima** e **duração mínima** antes de declarar vencedor (configurável por experimento).
- **Significância-alvo** definida no setup (ex.: 95%).
- Sem decisão em ciclo incompleto; sem "peeking" repetido como gatilho de parada.
- Variantes perdedoras são desligadas; a vencedora vira o novo default no admin (ver `system/admin.md`).

---

## Gate de volume — pré-arme (auditoria growth / D-14)

Antes de armar, projetar a duração com o tráfego real da LP:

```
n ≈ 16·p(1−p)/δ²   por variante
```

Exemplo: baseline 10% de conversão e MDE de +20% relativo ⇒ ~3,6k visitantes/variante ≈ 7,2k no teste.

**Projeção acima de ~8 semanas = experimento não arma.** A alavanca de otimização vai para teste de criativo/oferta dentro da plataforma de mídia (onde há volume de impressão) e para CRO qualitativo via session replay (que o PostHog já entrega). O motor existe para quando o tráfego sustentar; a cultura de teste não pode queimar ciclos onde a matemática não fecha.

## Métrica primária × volume (D-14)

`lead_qualificado` como primária só é viável com volume; com tráfego de nicho, a primária é `lead` e o qualificado entra como guardrail/leitura secundária.

A decisão D-14 é rastreada em `_decisoes.md`.
