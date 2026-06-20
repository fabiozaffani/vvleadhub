# Contrato HTTP (api-server)

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Padrão de forma das respostas do `api-server`: envelope de erro tipado, paginação/filtro e idempotência. A forma é fixada no `openapi.yaml` (em `packages/api-spec` — fonte de verdade → codegen Orval p/ `@vvf/api-zod`, D-22), não em prosa — esta seção define o padrão que o spec implementa.

## 1.2 Convenções de contrato HTTP (api-server)

### Erro — envelope tipado

Não RFC 7807; consumidores são first-party.

```json
{ "error": { "code": "VALIDATION_FAILED", "message": "…", "details": [{ "path": "phone", "message": "…" }] }, "request_id": "req_…" }
```

- `code` = enum estável com **fonte única em `packages/contracts/src/http-errors.ts`** (`errorCodeSchema`/`ErrorCode` + mapa `ERROR_STATUS`); o cliente ramifica por `code`, não pelo status: `VALIDATION_FAILED`(422) · `UNAUTHORIZED`(401) · `FORBIDDEN`(403) · `NOT_FOUND`(404) · `CONFLICT`(409 — ex.: dedup D-11) · `RATE_LIMITED`(429) · `INTERNAL`(500). Status HTTP sempre correto. **No `openapi.yaml` o `error.code` é `string`** (sem enum gerado) — as rotas validam o shape do envelope com `@vvf/api-zod` e o valor de `code` com `errorCodeSchema` de `@vvf/contracts` (D-23, evita enum duplicado sem sync).
- `message` é **dev-facing** (log/Sentry); a copy do usuário é do site (skill `app-copy-marca`), que traduz `code`→texto. A API nunca emite copy de marca.
- `request_id` ecoa o id de correlação (ver [`observabilidade.md`](observabilidade.md)) → rastreio no Sentry/pino.
- `details` carrega os erros de campo do Zod quando `VALIDATION_FAILED`.

### Listagens — paginação/filtro

Envelope estável `{ "data": [...], "page": { "limit", "offset", "total" } }` (offset no v1; cursor só se a escala exigir). Filtros explícitos por query param.

### Idempotência

`/collect` e webhooks são idempotentes (fila + retry + dead-letter via pg-boss em `src/jobs/`) — reprocessar não duplica conversão (liga D-11/D-15).

> O contrato de evento que trafega por `/collect` está em `system/eventos.md`; o contrato de lead em `specs/landing-pages/contrato-lead.md`. Ambos vivem como tipos em `packages/contracts`.
