# Experimentação & Feature Flags — visão de domínio

**Camada:** system · **Domínio:** experimentacao · **Origem:** 08-experimentacao.md · **Tom:** trabalho

**Status:** draft v1 · **Depende de:** `system/plataforma.md` (Fundação), `system/arquitetura.md`, `system/eventos.md` (event hub); aplicada no domínio de landing pages (`system/landing-pages.md`) e configurada no admin (`system/admin.md`).

**Responsabilidade única:** o modelo de experimentação (A/B) e de feature flags — como variantes são decididas, expostas, medidas e decididas. Landing pages *usa*; o event hub *registra exposição e conversão*; o admin *configura*. Aqui está o motor.

---

## §0 — Motor agnóstico a ferramenta

Este domínio descreve **capacidade e contrato, não produto** (GrowthBook, PostHog Experiments, etc. — D-1/D-3). O comportamento server-side é requisito; a ferramenta é implementação. As decisões D-1/D-3 estão **fechadas** (Payload / PostHog) e são rastreadas em `decisoes.md`; o modelo permanece agnóstico — o requisito é o comportamento server-side (avaliação local de flag para não custar TTFB nas LPs sob teste), não o produto.

## §1 — Princípios

1. **Server-side, sem flicker.** O bucket é decidido no edge/servidor; a variante é renderizada já no HTML. Zero layout shift, SEO-safe — pré-requisito por causa do orçamento de CWV (ver `system/arquitetura.md`). Detalhe da atribuição em `specs/experimentacao/atribuicao-bucket.md`.
2. **Métrica = lead, não clique.** Para LPs, a métrica primária é `lead`/handoff — idealmente o **lead qualificado** do loop fechado (ver `specs/eventos/loop-fechado.md`), não o preenchimento.
3. **Decisão por evidência, não por ruído.** Amostra e duração mínimas; sem "peeking" para declarar vencedor cedo. Guardrails em `specs/experimentacao/guardrails-estatisticos.md`.
4. **Variante não escapa da marca.** Ambas as versões de um teste passam pelos guardrails de Bloco/copy do domínio de landing pages. Não se testa copy "fora da marca".
5. **Sem testar preço (INV-05).** Preço/promoção nunca são variável de experimento (ver CONTEXTO-IA §2).

---

## Como as specs compõem o todo

O detalhe vive nas specs irmãs; este documento agrega e linka:

- **`specs/experimentacao/modelo-experimento.md`** — tipos de teste (página/LP, Bloco, funcionalidade) e a estrutura de `Experimento`/`Variante`.
- **`specs/experimentacao/feature-flags.md`** — on/off, rollout gradual e kill switch, separados de experimentos e lidos server-side.
- **`specs/experimentacao/atribuicao-bucket.md`** — bucket determinístico por `anonymous_id` e a interação com o full-page cache (D-8).
- **`specs/experimentacao/guardrails-estatisticos.md`** — exposição/mensuração, guardrails estatísticos e o gate de volume (D-14) que decide se o experimento arma.

---

## §8 — Relação com os outros domínios

- **Landing pages (`system/landing-pages.md`):** define variantes de página/Bloco; referencia o experimento.
- **Event hub (`system/eventos.md`):** registra `experiment_exposure` e computa conversão/significância.
- **Admin (`system/admin.md`):** onde experimentos e flags são criados, alocados e decididos.
- **Blog (`system/blog.md`):** pode testar CTAs/variações de post pelo mesmo motor.

---

## §9 — Edição no admin (handoff)

Criar experimento a partir de uma base (LP/Bloco), definir variantes, alocação, segmento, métrica e significância; acompanhar resultado; promover vencedora. RBAC: Marketing cria/decide experimentos; flags sensíveis (kill switch) podem exigir Admin. Detalhe da edição e do RBAC no domínio de admin (`system/admin.md`).

---

## §10 — Decisões & diferidos

- **D-1 / D-3** — **fechadas** (Payload / PostHog). O modelo permanece agnóstico à ferramenta: o requisito é o comportamento server-side (avaliação local de flag para não custar TTFB nas LPs sob teste — ver §1), não o produto.
- Significância e amostra mínima default — `[a definir]` no setup do primeiro experimento.

Ledger completo de decisões em `decisoes.md`.

---

## §11 — Validação contra invariantes VVF (nota)

- **Tom:** spec = trabalho ✓ · variantes de copy = marca, brand-locked ✓
- **INV-05 (sem preço):** preço nunca é variável de teste ✓
- **INV-08 (sem surpresas):** bucket determinístico + guardrails = experiência consistente, decisão por evidência ✓
- **Performance:** A/B server-side, zero flicker, SEO-safe ✓
- **Loop fechado:** métrica ancora no lead qualificado (ver `specs/eventos/loop-fechado.md`), não no clique ✓

Invariantes INV-05/INV-08 canônicas em CONTEXTO-IA §2.
