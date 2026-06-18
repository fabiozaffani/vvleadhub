# Feature flags

**Camada:** spec · **Domínio:** experimentacao · **Origem:** 08-experimentacao.md · **Tom:** trabalho

Feature flags são separadas de experimentos: não há hipótese nem leitura de significância, é rollout/kill switch. A visão coesa do domínio está em `system/experimentacao.md`; o modelo de experimento A/B em `modelo-experimento.md`.

---

## Capacidades

Separadas de experimentos:

- **On/off** por funcionalidade/Bloco/CTA.
- **Rollout gradual** (% de tráfego).
- **Kill switch** para desligar algo problemático sem deploy.
- Geridas no admin (ver `system/admin.md`); lidas **server-side** como os experimentos.

A leitura server-side é o mesmo requisito de comportamento do motor de experimentos (avaliação local da flag para não custar TTFB nas LPs sob teste) — detalhe em `system/experimentacao.md` e em `atribuicao-bucket.md`. O handoff de criação/gestão no admin (incluindo a regra de RBAC para kill switch) está descrito em `system/experimentacao.md` e detalhado no domínio de admin.
