# Diferidos — ganchos de etapa final

**Camada:** roadmap · **Domínio:** governança · **Tom:** trabalho

Itens deliberadamente adiados. **Mantenha os ganchos** — não implemente antes nem os remova. Decisões correlatas no índice [`../_decisoes.md`](../_decisoes.md) (ex.: D-5, D-8).

| Item | Decisão | Gancho reservado | Dono |
|---|---|---|---|
| Join key — value-mapping | D-5 correlato | Campo `correlation_id`/`xcode` no evento e no contrato de lead | [`specs/landing-pages/contrato-lead.md`](../specs/landing-pages/contrato-lead.md) |
| LGPD / consentimento | [D-5](../decisoes/D-5-lgpd-consentimento-build-na-etapa-final-ganch.md) | Campo `consent` (pass-through) + opt-in mínimo no form | [`specs/eventos/consent-gate.md`](../specs/eventos/consent-gate.md) |
| Mapa 301 (migração do site atual) | — | Inventariar URLs indexadas (blog) e publicar 301 no cutover | [`system/arquitetura.md`](../system/arquitetura.md) |
| Edge-cache de variante A/B | [D-8](../decisoes/D-8-cache-a-b.md) | Worker com variante na chave de cache | [`system/experimentacao.md`](../system/experimentacao.md) |

Perguntas de domínio comercial **já incorporadas** em [`business/comercial/_dominio.md`](../business/comercial/_dominio.md) — não repetir aqui.
