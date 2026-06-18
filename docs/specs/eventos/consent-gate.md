# Consent gate (gancho LGPD — build diferido)

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§6) · **Tom:** trabalho

O gate de consentimento sobre o pipeline de eventos. Build diferido (D-5); o gancho está ativo desde o dia 1 — campo `consent` no contrato (ver [`schema-evento.md`](schema-evento.md)) e passo no intake.

---

- Eventos de **marketing** só seguem se `consent.marketing = true`.
- **Analytics interno** persiste sempre, anonimizado/agregado sob interesse legítimo, respeitando opt-out.
- Hoje **pass-through** (sem efeito) até o build de LGPD (D-5). Campo e passo já existem.

O sync de audiências (ver [`loop-fechado.md`](loop-fechado.md)) já usa o gancho da D-5 como gate desde o dia 1: exporta somente leads com o opt-in mínimo do form registrado. Isso **não** antecipa o build diferido — só usa o gancho existente; quando o consent gate pleno ativar (Fase 4), ele assume.
