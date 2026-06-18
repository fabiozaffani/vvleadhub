# Observabilidade

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Erros, logs e saúde dos três runtimes — o que se reporta, como se correlaciona e onde se checa.

## 6. Observabilidade

- **Erros:** Sentry (free tier cobre; um projeto por runtime). Toda exceção não tratada reporta.
- **Logs:** pino (JSON estruturado) nos três runtimes; correlação por `request_id` e, quando houver, `event_id`/`correlation_id`.
- **Saúde:** endpoints `/health` por runtime; a saúde de integração de negócio é a do Tracker Hub (ver `specs/eventos/teste-realtime-saude.md` e `specs/eventos/painel.md`).

> O `request_id` é o mesmo id de correlação ecoado no envelope de erro — ver [`contrato-http.md`](contrato-http.md). Os ganchos `correlation_id`/`click_ids` de evento vivem em `system/eventos.md`.
