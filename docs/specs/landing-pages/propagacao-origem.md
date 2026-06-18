# Propagação de origem (xcode/UTM/click_ids)

**Camada:** spec · **Domínio:** landing-pages · **Origem:** 04-landing-pages.md · **Tom:** trabalho

Como a origem do tráfego viaja da URL até o card no Kommo, sem se perder no caminho. Origem viaja sempre — é princípio, não nice-to-have.

---

## Fluxo

1. LP lê `utm_*` + `xcode` da URL (taxonomia `CP-…` em uso) **+ click IDs das plataformas** (`fbclid`→`fbc` + `fbp` do pixel, `gclid`, `ttclid`, `epik` — D-14) e persiste tudo em cookie first-party. Click ID não tem retrofit: o clique que não foi capturado está perdido para sempre — por isso nasce na Fase 1, junto do collector.
2. Injeta no deep-link (Modelo A) e no payload do form (Modelo B) — ver [`conversao-cta.md`](conversao-cta.md).
3. Persiste no contrato de lead (ver [`contrato-lead.md`](contrato-lead.md)) e no card.
4. **Links gerados no admin** (xcode/UTM + redirect WhatsApp — ver [`specs/admin/links-campanha.md`](../admin/links-campanha.md)) — resolve a pendência dos mapas de growth.

---

## Diferido

`correlation_id` reservado; value-mapping na implementação final (ver [`_lexico.md`](../../_lexico.md)).
