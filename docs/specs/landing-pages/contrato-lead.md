# Contrato de lead → Kommo

**Camada:** spec · **Domínio:** landing-pages · **Origem:** 04-landing-pages.md · **Tom:** trabalho

O JSON canônico do lead que viaja da LP (ou de captura fora do site) até o card no Kommo, e a regra de identidade/dedup. **Materializado em `packages/contracts/src/lead.ts`** — esta spec é a fonte de verdade do shape; qualquer alteração passa por CODEOWNERS.

---

## O contrato

```json
{
  "name": "string|null",
  "phone": "E.164",
  "email": "string|null",
  "origin_channel": "meta|google|tiktok|pinterest|youtube|assessor|organic|bio|marketplace",
  "utm": { "source": "", "medium": "", "campaign": "", "content": "", "term": "" },
  "xcode": "CP-...",
  "click_ids": { "fbc": "", "fbp": "", "gclid": "", "ttclid": "", "epik": "" },
  "correlation_id": "reservado (diferido)",
  "event_type": "casamento|aniversario|debutante|corporativo",
  "subjects": [ { "ref": "acqua", "type": "espaço" } ],
  "lp": { "id": "", "molde": "", "variant": "a" },
  "objective": "handoff_whatsapp",
  "consent": "reservado (pass-through)",
  "page_url": "https://...",
  "device": "mobile|desktop",
  "timestamp": "ISO-8601"
}
```

Bidirecional: lead entra; desfecho (`Ganho`/`Perdido`+motivo) volta via api-server e alimenta o loop fechado (ver [`specs/eventos/loop-fechado.md`](../eventos/loop-fechado.md)).

> Os campos `xcode`/`utm`/`click_ids`/`correlation_id`/`consent` vêm da propagação de origem — detalhe em [`propagacao-origem.md`](propagacao-origem.md).

---

## Captura fora do site (D-13/D-14)

Leads de formulários nativos das plataformas entram pelo mesmo contrato via webhook→api-server (ver [`specs/eventos/collector.md`](../eventos/collector.md)), com `origin_channel` da plataforma e metadados do form no lugar do contexto de página. Leads de **CTWA** (anúncio→WhatsApp, sem tocar o site) entram pela integração WhatsApp↔Kommo com `referral`/`ctwa_clid` no lugar do xcode de página (ver [`specs/eventos/ctwa.md`](../eventos/ctwa.md)). Leads de marketplaces/portais (ex.: portais de casamento) usam `origin_channel: marketplace`; portais sem webhook (entrega por e-mail/painel) entram por parse de e-mail na cola fina **ou** entrada manual etiquetada no Kommo — mecânica decidida na Fase 3, até lá manual etiquetado.

---

## Identidade e dedup (D-11)

Kommo = fonte de verdade; `app.leads` = log operacional (toda conversão registrada, com seu xcode/UTM — atribuição first/last-touch preservada). Chave = telefone E.164. Upsert-e-anexar: card aberto recebe a nova interação como nota + notificação ao SDR (nunca card duplicado); card Perdido segue regra de reativação ("Pipeline Recuperável" — validar nuance com a SDR na implementação).
