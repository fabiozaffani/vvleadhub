# D-18 — Replit removido — builder local + host TBD

**Status:** fechada (emendada pela D-27) · **Data:** jun/2026 · **Tags:** gov, stack

## Contexto

Decisão registrada no ledger legado; corpo migrado na reestruturação índice + ADR (2026-06-20).

## Decisão

**Replit removido da operação (emenda à D-2 e à D-16 — decisão do fundador, jun/2026; emendada pela D-27).** O Replit sai como **builder** e como **base de hospedagem**. **Papéis atuais:** **Claude Code é o ambiente primário atual**; outro agente pode atuar via `AGENTS.md` + contextos canônicos. **Fonte única segue `AGENTS.md`;** `replit.md` removido; `CLAUDE.md` é adapter; `.cursor` não é wrapper vivo. **Runtime/deploy a definir na Fase 0b:** Cloudflare permanece no edge (site SSR, R2, proxy de analytics — D-2/D-10/D-15 nessa parte intactos); serviços Node (`admin`/`api-server`) + Postgres gerenciado vão para um host a escolher (candidatos: DigitalOcean App Platform, Railway/Fly; Postgres em Neon/Supabase/DO Managed). **Código construído sob o Replit é mantido e reavaliado por auditoria dirigida** (sem rollback — preserva app + decisões), com acoplamentos ao Replit neutralizados (SSL/env/domínio/proxy). **`node:test` mantido** por escolha deliberada (zero-dependência), não mais pelo firewall do Replit. Fluxo: código local → branch + PR → CI verde → `main`; deploy desacoplado do GitHub.

## Consequências

Ver ecos nos docs que citam `D-18` (`grep -r "D-18" docs/`).

## Histórico de emendas

| ID | O que mudou |
|---|---|
| D-27 | Removeu Cursor como builder/wrapper vivo; manteve `AGENTS.md` canônico e Claude Code como ambiente primário atual. |
