# Decisões — vvleadhub

**Camada:** system · **Domínio:** governança · **Origem:** 00 §7 · **Tom:** trabalho

> ⚠️ Decisões fechadas não se rediscutem — só se emendam, via `/sync-governanca` (ARQUITETURA-IA §6.3).

Índice canônico de IDs `D-N`. **Corpo de cada decisão** em [`decisoes/`](decisoes/). O que está **fechado não se rediscute** — implementa-se; dúvida real → pergunte ao fundador.

> Numeração preservada exata — referenciada em todo o repo. Glossário em [`_lexico.md`](_lexico.md). Invariantes (INV-xx), escada de produto, gates e métricas (M-xx) são canon de marca em CONTEXTO-IA (vvcore). **Diferidos** (ganchos de etapa final): [`roadmap/deferidos.md`](roadmap/deferidos.md).

| ID | Data | Título | Status | Tags | ADR |
|---|---|---|---|---|---|
| D-1 | — | Build híbrido — Payload CMS no commodity | fechada | stack | [D-1](decisoes/D-1-build-hibrido.md) |
| D-2 | jun/2026 | Cloudflare + Astro no edge (runtime TBD Fase 0b) | fechada · emendada por D-18 | stack | [D-2](decisoes/D-2-removido-pela-d-18-cloudflare-na-frente-sit.md) |
| D-3 | — | PostHog Cloud (analytics + Destinations) | fechada | stack, produto | [D-3](decisoes/D-3-posthog-cloud.md) |
| D-4 | — | CRM Kommo (bidirecional + loop fechado) | fechada | stack | [D-4](decisoes/D-4-crm-kommo-bidirecional-loop-fechado.md) |
| D-5 | — | LGPD/consentimento — build etapa final | diferida | deferido, compliance | [D-5](decisoes/D-5-lgpd-consentimento-build-na-etapa-final-ganch.md) |
| D-6 | — | WhatsApp via Kommo Business API | fechada | stack | [D-6](decisoes/D-6-whatsapp-via-kommo-business-api.md) |
| D-7 | — | Greenfield — protótipo é referência, não migração | fechada · emendada por D-16 | arquitetura | [D-7](decisoes/D-7-greenfield.md) |
| D-8 | — | Cache × A/B — LPs com experimento fora do full-page cache | fechada | arquitetura | [D-8](decisoes/D-8-cache-a-b.md) |
| D-9 | — | Postgres — dois schemas (`payload` + `app`) | fechada | stack | [D-9](decisoes/D-9-banco.md) |
| D-10 | — | Mídia — Cloudflare R2 + Images | fechada | stack | [D-10](decisoes/D-10-midia-imagem.md) |
| D-11 | — | Identidade e dedup de lead (E.164, Kommo SoT) | fechada | produto | [D-11](decisoes/D-11-identidade-e-dedup-de-lead.md) |
| D-12 | — | Auth — Payload nativo + JWT serviço-a-serviço | fechada | stack | [D-12](decisoes/D-12-auth.md) |
| D-13 | — | Captura multi-plataforma (lead forms + audiências) | fechada | produto | [D-13](decisoes/D-13-captura-multi-plataforma-varredura-competitiva.md) |
| D-14 | jun/2026 | Atribuição de plataforma (click IDs, CTWA, visitas) | fechada | produto | [D-14](decisoes/D-14-atribuicao-de-plataforma-auditoria-growth-jun-2.md) |
| D-15 | jun/2026 | Split de ingestão (PostHog proxy vs /collect) | fechada | stack | [D-15](decisoes/D-15-split-de-ingestao-resolve-item-da-auditoria-pre.md) |
| D-16 | jun/2026 | Governança multi-agente — AGENTS.md fonte única | fechada · emendada por D-18, D-21 | gov | [D-16](decisoes/D-16-governanca-multi-agente-emenda-a-d-7-emendada.md) |
| D-17 | jun/2026 | Tracker Hub — single pane (L1 + L2 faseado) | fechada · estendida por D-19 | produto | [D-17](decisoes/D-17-painel-como-single-pane-of-glass-ingestao-de-r.md) |
| D-18 | jun/2026 | Replit removido — builder local + host TBD | fechada | gov, stack | [D-18](decisoes/D-18-replit-removido-da-operacao-emenda-a-d-2-e-a-d.md) |
| D-19 | jun/2026 | Inteligência competitiva — L3 do single pane | fechada · emendada por D-20, D-24 | produto | [D-19](decisoes/D-19-inteligencia-competitiva-como-l3-do-single-pane.md) |
| D-20 | jun/2026 | Casa-de-dados do radar descongelada (Payload) | fechada | produto | [D-20](decisoes/D-20-casa-de-dados-do-radar-descongelada-emenda-a-d.md) |
| D-21 | jun/2026 | Auto-merge × CODEOWNERS — enforcement real | fechada | gov | [D-21](decisoes/D-21-auto-merge-codeowners-enforcement-real-emen.md) |
| D-22 | jun/2026 | Pipeline HTTP — api-spec → api-zod + api-client | fechada | stack | [D-22](decisoes/D-22-estrutura-de-packages-pipeline-http-em-3-pa.md) |
| D-23 | jun/2026 | ErrorCode — fonte única em @vvf/contracts | fechada | stack | [D-23](decisoes/D-23-sincronizacao-do-errorcode-envelope-de-erro-h.md) |
| D-24 | jun/2026 | Coleta ampliada — mystery shopping no escopo | fechada | produto | [D-24](decisoes/D-24-coleta-ampliada-da-inteligencia-competitiva-eme.md) |
