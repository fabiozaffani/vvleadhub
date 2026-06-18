# Ambientes & secrets

**Camada:** spec · **Domínio:** engenharia · **Origem:** 09-engenharia.md · **Tom:** trabalho

Os três ambientes do app e o inventário canônico de secrets, com as roles isoladas por schema que sustentam o D-9.

## 5. Ambientes & secrets

| Ambiente | O quê | Notas |
|---|---|---|
| **dev** | ambiente de dev local | Postgres de dev; chaves de teste (Clerk-like pattern: `test` keys); PostHog projeto de dev; destinos em modo teste (ver `specs/eventos/teste-realtime-saude.md`) |
| **preview** | deploy de branch/main | onde o fundador valida cada fase (ver `discovery/auditoria-pre-build.md` item 1.6) |
| **prod** | publicado em valeverdefestas.com.br | chaves live; purge/CDN ativos |

Inventário de secrets (Secrets do provedor de hospedagem, por ambiente): `DATABASE_URL_APP` (role do api-server) · `DATABASE_URL_PAYLOAD` (role do Payload) — roles isolados por schema (D-9); nunca um `DATABASE_URL` único de superuser · `PAYLOAD_SECRET` · `POSTHOG_KEY/HOST` · `KOMMO_TOKEN/WEBHOOK_SECRET` · `META_CAPI_TOKEN` · `GOOGLE_ADS_*` · `TIKTOK_*` · `PINTEREST_*` · `R2_*` · `CF_API_TOKEN` (purge) · `SERVICE_TOKEN_*` (D-12). Inventário canônico em `.env.example`. Rotação documentada; nenhum segredo em `.env` commitado.

> A trava de CI que garante "segredos nunca no código" (gitleaks) está em [`fronteiras.md`](fronteiras.md). A trava de migração por runtime (D-9) — schema `app` só pelo Drizzle, `payload` só pelo Payload — também vive lá.
