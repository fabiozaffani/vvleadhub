# 08 · Experimentação & Feature Flags

**Status:** draft v1 · **Camada de tom:** trabalho · **Depende de:** 02 (Fundação), 03 (Arquitetura), 05 (HUB); aplicada no 04 (LP) e configurada no 06 (Admin).
**Responsabilidade única:** o modelo de experimentação (A/B) e de feature flags — como variantes são decididas, expostas, medidas e decididas. O 04 *usa*; o 05 *registra exposição e conversão*; o 06 *configura*. Aqui está o motor.

> **Agnóstico a ferramenta.** Descreve capacidade e contrato, não produto (GrowthBook, PostHog Experiments, etc. — D-1/D-3). O comportamento server-side é requisito; a ferramenta é implementação.

---

## 1. Princípios

1. **Server-side, sem flicker.** O bucket é decidido no edge/servidor; a variante é renderizada já no HTML. Zero layout shift, SEO-safe — pré-requisito por causa do orçamento de CWV (03).
2. **Métrica = lead, não clique.** Para LPs, a métrica primária é `lead`/handoff — idealmente o **lead qualificado** do loop fechado (05 §9), não o preenchimento.
3. **Decisão por evidência, não por ruído.** Amostra e duração mínimas; sem "peeking" para declarar vencedor cedo.
4. **Variante não escapa da marca.** Ambas as versões de um teste passam pelos guardrails §4. Não se testa copy "fora da marca".
5. **Sem testar preço (INV-05).** Preço/promoção nunca são variável de experimento.

---

## 2. Tipos de teste

- **Página/LP:** LP A vs LP B (mesmo Molde, conteúdo/estrutura diferentes).
- **Bloco:** um bloco em duas versões (ex.: Hero v1 vs v2) dentro da mesma LP.
- **Funcionalidade:** ligar/desligar comportamento via **feature flag** (não é A/B — é rollout/kill switch).

---

## 3. Modelo de experimento

`Experimento{ key, hipótese, métrica_primária, métricas_secundárias[], variantes[], alocação_tráfego, segmento, status, início, fim, significância_alvo }`

`Variante{ key, peso, referência (LP/bloco/flag) }`

Regras:
- `métrica_primária` definida antes de iniciar (evita escolher a métrica que "deu certo" depois).
- `segmento` opcional (ex.: só mobile, só origem Meta).
- `status`: rascunho · rodando · pausado · concluído.

---

## 4. Feature flags

Separadas de experimentos:
- **On/off** por funcionalidade/bloco/CTA.
- **Rollout gradual** (% de tráfego).
- **Kill switch** para desligar algo problemático sem deploy.
- Geridas no 06; lidas server-side como os experimentos.

---

## 5. Atribuição de bucket

- Decidida no edge/servidor por `anonymous_id` — **determinística** (mesmo usuário → mesma variante na sessão e entre sessões enquanto o experimento roda).
- Renderização da variante acontece no HTML inicial (sem flash de conteúdo).
- **Interação com cache (D-8):** ativar um experimento numa LP a tira do full-page cache (SSR por hit) até o experimento encerrar; na etapa final, edge logic com variante na chave de cache devolve o cache total mesmo sob teste. Criar/encerrar experimento deve alternar esse estado automaticamente — nunca manual.

---

## 6. Exposição e mensuração

- Cada exposição emite `experiment_exposure` ao HUB (05 §4/§13) com `experiment.key` + `variant`.
- O painel (05 §12) calcula **conversão por variante** e a **significância**.
- Conversão casa com o evento `lead`/`lead_qualificado` — fechando do clique ao resultado real (loop fechado, 05 §9).

---

## 7. Guardrails estatísticos

- **Amostra mínima** e **duração mínima** antes de declarar vencedor (configurável por experimento).
- **Significância-alvo** definida no setup (ex.: 95%).
- Sem decisão em ciclo incompleto; sem "peeking" repetido como gatilho de parada.
- Variantes perdedoras são desligadas; a vencedora vira o novo default no 06.
- **Gate de volume — pré-arme (auditoria growth/D-14):** antes de armar, projetar a duração com o tráfego real da LP: n ≈ 16·p(1−p)/δ² por variante (ex.: baseline 10% de conversão e MDE de +20% relativo ⇒ ~3,6k visitantes/variante ≈ 7,2k no teste). **Projeção acima de ~8 semanas = experimento não arma** — a alavanca de otimização vai para teste de criativo/oferta dentro da plataforma de mídia (onde há volume de impressão) e para CRO qualitativo via session replay (que o PostHog já entrega). O motor existe para quando o tráfego sustentar; a cultura de teste não pode queimar ciclos onde a matemática não fecha.
- **Métrica primária × volume (D-14):** `lead_qualificado` como primária só é viável com volume; com tráfego de nicho, a primária é `lead` e o qualificado entra como guardrail/leitura secundária.

---

## 8. Relação com os outros docs

- **04 (LP):** define variantes de página/bloco; referencia o experimento.
- **05 (HUB):** registra `experiment_exposure` e computa conversão/significância.
- **06 (Admin):** onde experimentos e flags são criados, alocados e decididos.
- **07 (Blog):** pode testar CTAs/variações de post pelo mesmo motor.

---

## 9. Edição no admin (handoff 06)

Criar experimento a partir de uma base (LP/bloco), definir variantes, alocação, segmento, métrica e significância; acompanhar resultado; promover vencedora. RBAC: Marketing cria/decide experimentos; flags sensíveis (kill switch) podem exigir Admin.

---

## 10. Decisões & diferidos (fonte: 00 §6)

- **D-1 / D-3** — **fechadas** (Payload / PostHog — 00 §7). O modelo permanece agnóstico à ferramenta: o requisito é o comportamento server-side (avaliação local de flag p/ não custar TTFB nas LPs sob teste — ver §1), não o produto.
- Significância e amostra mínima default — `[a definir]` no setup do primeiro experimento.

---

## 11. Validação contra invariantes VVF

- **Tom:** spec = trabalho ✓ · variantes de copy = marca, brand-locked ✓
- **INV-05 (sem preço):** preço nunca é variável de teste ✓
- **INV-08 (sem surpresas):** bucket determinístico + guardrails = experiência consistente, decisão por evidência ✓
- **Performance:** A/B server-side, zero flicker, SEO-safe ✓
- **Loop fechado:** métrica ancora no lead qualificado (05 §9), não no clique ✓
