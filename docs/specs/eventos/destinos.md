# Event Store e fan-out (destinos)

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§7, §8) · **Tom:** trabalho

Onde os eventos persistem (PostHog Cloud) e como saem para os canais de mídia (fan-out via Destinations + fallback). O contrato que cada destino mapeia está em [`schema-evento.md`](schema-evento.md).

---

## 1. Event Store (decidido: PostHog Cloud)

O PostHog **Cloud** (com captura first-party via proxy pelo domínio próprio; região a definir no setup, com olho na LGPD) é o store e a camada de análise. Self-host fica como **fallback documentado** caso o build de LGPD (D-5) exija dado em casa — o contrato de evento ([`schema-evento.md`](schema-evento.md)) é idêntico nos dois, então a troca não é rebuild — funis, replay, heatmap, flags/experimentos prontos.

O painel executivo (ver [`painel.md`](painel.md)) e o Tracker Hub (ver [`../admin/tracker-hub.md`](../admin/tracker-hub.md)) consomem via API/embed. Eventos `test:true` ficam em namespace/projeto segregado (ver [`teste-realtime-saude.md`](teste-realtime-saude.md)).

---

## 2. Destinos (fan-out)

**Default: PostHog Destinations** faz o envio server-side aos canais de mídia. **Fallback** para canal sem conector: webhook PostHog → api-server → API do canal (um `map(event)` puro + testes). Kommo e a conversão qualificada do loop fechado são sempre da cola fina (api-server) — ver [`loop-fechado.md`](loop-fechado.md).

| Destino | Caminho default | Complemento client (dedupe) | Endpoint de teste |
|---|---|---|---|
| Meta | Destinations → Conversions API | Pixel | Test Events (`test_event_code`) |
| Google | Destinations → GA4/Ads (ou fallback) | Google Tag | Validation/Debug |
| TikTok | Destinations → Events API (ou fallback) | Pixel | `test_event_code` |
| Pinterest | Destinations/fallback → Conversions API | Tag | modo teste |
| **Kommo** | cola fina: API (lead in) + webhook (desfecho out) | — | pipeline/lead de teste |
| WhatsApp | via Kommo (D-6) | — | sandbox |

Os endpoints de teste por destino são consumidos pelo round-trip do modo de teste — ver [`teste-realtime-saude.md`](teste-realtime-saude.md).
