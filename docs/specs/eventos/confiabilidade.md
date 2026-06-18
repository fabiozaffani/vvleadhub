# Confiabilidade do HUB

**Camada:** spec · **Domínio:** eventos · **Origem:** 05-event-hub-mensuracao.md (§10) · **Tom:** trabalho

Fila, idempotência, dedupe e dead-letter da cola fina — o que garante mensuração estável e verificável (INV-08; ver CONTEXTO-IA §2). A saúde de integração que expõe esses sinais está em [`teste-realtime-saude.md`](teste-realtime-saude.md).

---

- **Fila/retries:** no caminho Destinations, a entrega/retry é do PostHog (ver [`destinos.md`](destinos.md)); na cola fina (Kommo, loop fechado, fallbacks), fila própria com **idempotência** por `event_id`, retries com backoff e **dead-letter** (exposto na saúde — ver [`teste-realtime-saude.md`](teste-realtime-saude.md)). **Tecnologia (auditoria de delegação jun/2026): `pg-boss` sobre o Postgres existente (schema `app`)** — zero infra nova (sem Redis), dead-letter consultável pelo Tracker Hub; jobs em `api-server/src/jobs/` (ver [`../engenharia/fronteiras.md`](../engenharia/fronteiras.md)).
- **Dedupe** pixel↔server por `event_id`.
- Observabilidade do HUB e da fila; rate-limit no endpoint de coleta (`/collect` é público por design — D-12; proteção é rate-limit + validação de schema + WAF, não auth).
