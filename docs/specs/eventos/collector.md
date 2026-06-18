# Collector, intake e enrich

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§3, §5) · **Tom:** trabalho

A captura de eventos no site (client SDK) e o intake/enrich que a recebe e completa. O contrato do evento produzido está em [`schema-evento.md`](schema-evento.md); o split de ingestão decidido pela D-15 (analytics × negócio) é detalhado abaixo.

---

## 1. Collector (client SDK)

Captura sem bloquear render:
- `page_view`, `route_change`, `page_enter`/`page_exit`, tempo na página
- `scroll_depth` (25/50/75/100%)
- `cta_click` e cliques rastreáveis (heatmap-lite)
- `form_start`, `form_field`, `form_submit`, `lead`, `whatsapp_handoff`
- `experiment_exposure`

Características: **batched**, `navigator.sendBeacon`, `event_id` por evento (dedupe), `anonymous_id`/`session_id` em cookie first-party, carregamento deferido.

---

## 2. Split de ingestão (D-15)

O tráfego de analytics do SDK vai por **proxy reverso no Cloudflare** (domínio first-party → PostHog Cloud — padrão suportado pelo PostHog; o Cloudflare já está na frente por D-2), **sem tocar o api-server**. O `/collect` fica com o que é de negócio: `lead`, conversões, eventos server-side e tudo que alimenta Kommo/loop.

Beacon de analytics nunca depende da disponibilidade do api-server — perda silenciosa de evento é "surpresa" (INV-08; ver CONTEXTO-IA §2).

---

## 3. Click IDs (D-14)

O collector persiste, junto de UTM/xcode, os click IDs das plataformas (`fbclid`→`fbc` + `fbp` do pixel, `gclid`, `ttclid`, `epik`) em cookie first-party — eles viajam no contexto do evento (ver [`schema-evento.md`](schema-evento.md)) e no contrato de lead (ver [`../landing-pages/contrato-lead.md`](../landing-pages/contrato-lead.md)).

Sem eles, o match quality do CAPI/EC4L despenca; e click ID não tem retrofit.

---

## 4. Intake & enrich

1. **Intake:** recebe lotes no endpoint first-party, valida schema, responde rápido (não espera terceiros).
2. **Enrich:** timestamp de servidor, IP→geo, parse de user-agent, stitching de sessão, **hash de PII** para Advanced/Enhanced Matching.

O realtime tap (stream ao vivo dos eventos no intake) é descrito em [`teste-realtime-saude.md`](teste-realtime-saude.md).
