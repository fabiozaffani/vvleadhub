# Eventos & Mensuração — visão de domínio

**Camada:** system · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§0, §1, §2, §14, §15) · **Tom:** trabalho

A espinha de captura, persistência e distribuição de eventos — incluindo modo de teste, realtime e saúde de integração — e o painel interno de mensuração. O Tracker Hub (ver [`admin.md`](admin.md)) **opera** estas capacidades, não as redefine.

Esta é a visão coesa do domínio: o que é, como as specs compõem o todo, as fronteiras. O **detalhe** mora nas specs de [`../specs/eventos/`](../specs/eventos/) — esta página agrega e linka, não recopia.

> **Decisão fechada (D-3):** o pipeline **não é construído — é composto**: **PostHog** = captura, store, análise, replay, flags/experimentos **e fan-out a plataformas de mídia via Destinations**. O que é nosso é a **cola fina no api-server**: endpoint `/collect`, integração bidirecional com Kommo, **loop fechado** de conversão qualificada e consent gate. O catálogo de Destinations deve ser confirmado na implementação; canal sem conector nativo entra por webhook → api-server → API do canal.

---

## 1. Princípios

1. **First-party.** Captura por domínio próprio (ex.: `t.valeverdefestas.com.br`). Resiliência a ad-blocker, cookies longevos.
2. **Server-side nos destinos.** Conversões via APIs server-side; pixel client-side só como complemento com dedupe.
3. **Contrato único.** Um schema canônico (ver [`../specs/eventos/schema-evento.md`](../specs/eventos/schema-evento.md)). Todo destino mapeia a partir dele. Nova plataforma = novo **adapter**.
4. **Consentimento é gate** (ver [`../specs/eventos/consent-gate.md`](../specs/eventos/consent-gate.md)). Build diferido; gancho ativo.
5. **Não bloquear a página.** Captura assíncrona/batched; nunca degrada CWV.
6. **Loop fechado** (ver [`../specs/eventos/loop-fechado.md`](../specs/eventos/loop-fechado.md)). O desfecho do Kommo retorna e alimenta os canais pagos.
7. **Teste nunca contamina produção** (ver [`../specs/eventos/teste-realtime-saude.md`](../specs/eventos/teste-realtime-saude.md)). Eventos de teste são segregados de ponta a ponta.
8. **Compor, não construir.** PostHog cobre o commodity; código próprio só na cola que nenhuma plataforma entrega (Kommo, loop fechado, consent na nossa regra).

---

## 2. Arquitetura do HUB

```mermaid
flowchart TB
    C["Collector first-party<br/>(SDK PostHog + eventos custom, batched)"]
    I["/collect (api-server, domínio próprio)"]
    G{"Consent gate (api-server)"}
    PH["PostHog<br/>store · análise · replay · flags/exp"]
    DST["PostHog Destinations<br/>(fan-out server-side)"]
    ADS["Meta · Google · TikTok · Pinterest"]
    KM["Kommo (lead in / desfecho out)"]
    GLUE["Cola fina (api-server)<br/>loop fechado · conversão qualificada"]
    RT["Realtime → Tracker Hub"]

    C -->|analytics: proxy CF first-party (D-15)| PH
    C -->|eventos de negócio| I
    I --> G
    G -->|sempre, anonimiza se preciso| PH
    PH -->|se consent.marketing| DST --> ADS
    PH -.live events.-> RT
    I -->|lead| KM
    KM -->|webhook desfecho| GLUE --> ADS
    GLUE --> PH
```

### Como as peças compõem o domínio

- **Captura** — o collector (client SDK first-party) emite os eventos de site e o split de ingestão D-15 separa analytics (proxy CF→PostHog) de negócio (`/collect`). Ver [`../specs/eventos/collector.md`](../specs/eventos/collector.md).
- **Contrato** — um schema canônico único define o evento uma vez; click IDs (D-14) e o `correlation_id` reservado viajam no contexto. Ver [`../specs/eventos/schema-evento.md`](../specs/eventos/schema-evento.md).
- **Intake/enrich + consent gate** — o `/collect` valida, enriquece (geo, UA, sessão, hash de PII) e passa pelo gate de consentimento (pass-through hoje). Ver [`../specs/eventos/collector.md`](../specs/eventos/collector.md) e [`../specs/eventos/consent-gate.md`](../specs/eventos/consent-gate.md).
- **Store + fan-out** — PostHog Cloud é store e análise; Destinations fazem o fan-out server-side aos canais, com fallback por webhook→api-server. Ver [`../specs/eventos/destinos.md`](../specs/eventos/destinos.md).
- **Loop fechado** — o desfecho comercial no Kommo retorna pela cola fina, alimenta o painel e dispara conversão qualificada com valor por faixa às plataformas; inclui ingestão de lead forms nativos, sync de audiências e o caso CTWA. Ver [`../specs/eventos/loop-fechado.md`](../specs/eventos/loop-fechado.md) e [`../specs/eventos/ctwa.md`](../specs/eventos/ctwa.md).
- **Confiabilidade** — fila própria (`pg-boss`/Postgres), idempotência por `event_id`, retries e dead-letter sustentam a estabilidade do pipeline. Ver [`../specs/eventos/confiabilidade.md`](../specs/eventos/confiabilidade.md).
- **Teste/realtime/saúde** — as três capacidades que o Tracker Hub opera sobre o pipeline. Ver [`../specs/eventos/teste-realtime-saude.md`](../specs/eventos/teste-realtime-saude.md).
- **Painel** — lê do store (L1, atribuição por card) e ingere reporting de plataforma (L2, D-17) no single pane of glass. Ver [`../specs/eventos/painel.md`](../specs/eventos/painel.md).

### Fronteiras com outros domínios

- **Landing Pages** ([`landing-pages.md`](landing-pages.md)): o site emite os eventos de captura e o contrato de lead carrega click IDs/`correlation_id`; o funil `whatsapp_handoff` vs `lead` expõe o vazamento de CTA.
- **Admin/Tracker Hub** ([`admin.md`](admin.md)): opera modo de teste, realtime, saúde e replay; é o único ponto de leitura de marketing.
- **Experimentação** ([`experimentacao.md`](experimentacao.md)): o `experiment_exposure` e a conversão por variante alimentam a significância estatística.
- **Engenharia** ([`engenharia.md`](engenharia.md)): jobs em `api-server/src/jobs/`, schema `app` no Postgres (isolamento D-9), fronteiras de módulo.

---

## 3. Decisões & diferidos

Numeração de decisões preservada; o ledger é [`../_decisoes.md`](../_decisoes.md).

- **D-3** — **fechado: PostHog** (incl. Destinations). Catálogo de conectores a confirmar na implementação; fallback definido (ver [`../specs/eventos/destinos.md`](../specs/eventos/destinos.md)).
- **D-5** (LGPD) — diferido; consent gate como pass-through. Sync de audiências gated pelo opt-in mínimo desde o dia 1 (ver [`../specs/eventos/consent-gate.md`](../specs/eventos/consent-gate.md) e [`../specs/eventos/loop-fechado.md`](../specs/eventos/loop-fechado.md)).
- **D-14** — **fechado: atribuição de plataforma** — click IDs no contrato (ver [`../specs/eventos/collector.md`](../specs/eventos/collector.md) / [`../specs/eventos/schema-evento.md`](../specs/eventos/schema-evento.md)), CTWA (ver [`../specs/eventos/ctwa.md`](../specs/eventos/ctwa.md)), valores por faixa e SLA ≤ 72h no loop (ver [`../specs/eventos/loop-fechado.md`](../specs/eventos/loop-fechado.md)), eventos de visita (ver [`../specs/eventos/schema-evento.md`](../specs/eventos/schema-evento.md)).
- **D-15** — **fechado: split de ingestão** — analytics via proxy CF→PostHog; `/collect` para eventos de negócio (ver [`../specs/eventos/collector.md`](../specs/eventos/collector.md)).
- **D-17** — **fechado: single pane of glass** — painel ingere reporting de plataforma (ver [`../specs/eventos/painel.md`](../specs/eventos/painel.md)); Nível 1 (CAC por canal) na Fase 3, superfície completa via connector com build-vs-buy na Fase 3.
- **Join key** — `correlation_id` reservado; value-mapping diferido.

---

## 4. Validação contra invariantes VVF

Invariantes e tom: canon no CONTEXTO-IA (§1.1 tom, §2 invariantes).

- **Tom:** spec = trabalho ✓
- **INV-08 (sem surpresas, operação):** fila + idempotência + retries + dead-letter + modo de teste = mensuração estável e verificável ✓
- **Performance:** captura assíncrona/batched, server-side nos destinos ✓
- **Agnosticidade:** contrato único + adapters; store e plataforma plugáveis ✓
- **Cornerstone #3 (transparência):** consent gate de primeira classe; teste segregado de dados reais ✓
