# Schema canônico de evento — o contrato

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§4, §13) · **Tom:** trabalho

O contrato único de evento da mensuração. Todo destino mapeia a partir deste schema (`Destino.map(event)`); nova plataforma = novo adapter — ver [`destinos.md`](destinos.md). O collector que produz o evento está em [`collector.md`](collector.md); o intake/enrich que o completa, idem.

---

## 1. Schema canônico (o contrato)

Vocabulário pós-rename ([`../plataforma/primitivas.md`](../plataforma/primitivas.md)): `subjects[]` + `objective`, **nunca** `venue`.

```json
{
  "event_id": "uuid-v4",
  "event_name": "scroll_depth",
  "timestamp_client": "2026-06-10T14:03:11.221Z",
  "anonymous_id": "first-party-id",
  "session_id": "session-id",
  "brand": "VVF",
  "test": false,
  "consent": { "analytics": true, "marketing": false },
  "context": {
    "url": "https://valeverdefestas.com.br/lp/...",
    "referrer": "...",
    "utm": { "source": "", "medium": "", "campaign": "", "content": "" },
    "xcode": "CP-...",
    "click_ids": { "fbc": "", "fbp": "", "gclid": "", "ttclid": "", "epik": "" },
    "correlation_id": "reservado (join key — value-mapping diferido)",
    "lp": { "id": "", "molde": "", "variant": "a" },
    "subjects": [ { "ref": "acqua", "type": "espaço" } ],
    "objective": "handoff_whatsapp",
    "experiment": { "key": "", "variant": "" }
  },
  "params": { "depth_pct": 75 }
}
```

O evento é definido **uma vez**. Adicionar destino = escrever `Destino.map(event)` — nunca redefinir o evento.

---

## 2. Campos transversais

- **`test`** (ver [`teste-realtime-saude.md`](teste-realtime-saude.md)): quando `true`, o evento atravessa todo o pipeline mas é roteado para endpoints de teste/sandbox e **excluído** do store de produção.
- **`consent`**: gate de marketing/analytics — regra em [`consent-gate.md`](consent-gate.md).
- **`context.click_ids`** (D-14): `fbc`/`fbp`, `gclid`, `ttclid`, `epik` — persistidos pelo collector e propagados ao contrato de lead (ver [`../landing-pages/contrato-lead.md`](../landing-pages/contrato-lead.md)). Sem eles, o match quality do CAPI/EC4L despenca; e click ID não tem retrofit.
- **`context.correlation_id`**: reservado como join key; value-mapping **diferido** (ver `decisoes.md`).
- **`context.subjects[]` / `context.objective`**: o vocabulário canônico do domínio comercial — mapeia Assunto/Objetivo (ver [`../plataforma/primitivas.md`](../plataforma/primitivas.md)).

---

## 3. Catálogo de eventos canônicos

18 eventos canônicos:

`page_view` · `route_change` · `page_enter` · `page_exit` · `scroll_depth` · `cta_click` · `whatsapp_handoff` · `form_start` · `form_field` · `form_submit` · `lead` · `experiment_exposure` · `lead_qualificado` · `visita_agendada` · `visita_realizada` · `no_show` · `ganho` · `perdido`.

Os sete últimos do funil têm origem **Kommo** (criação de card e marcos do funil) — detalhe em [`loop-fechado.md`](loop-fechado.md). Os de captura no site são produzidos pelo collector — ver [`collector.md`](collector.md).
