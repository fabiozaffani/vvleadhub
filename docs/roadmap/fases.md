# Roadmap faseado do app (Fases 0–4)

**Camada:** system · **Domínio:** arquitetura · **Origem:** 03-arquitetura-sistema.md · **Tom:** trabalho

Roadmap de build do VVLEADHUB. A sequência de tasks segue esta ordem; cada fase só se declara pronta pelos critérios de aceite (§7.1), que são a definition of done verificável. A topologia que estas fases constroem está em [`system/arquitetura.md`](../system/arquitetura.md); as decisões citadas (D-N) vivem em [`_decisoes.md`](../_decisoes.md). Os critérios da Fase 0 são a base de rastreabilidade (`traces`) das WO em `tasks/`.

---

## §7 — Roadmap faseado (sequência de build)

- **Fase 0 — Fundação:** monorepo (site Astro + admin Payload + api-server) · registros da plataforma no Payload · design system (ver `CONTEXTO-IA §5` e [`system/design-system.md`](../system/design-system.md)) · páginas institucionais + blog base · baseline SEO/CWV. *Entrega: site no ar, performante, indexável.*
- **Fase 1 — Eventos:** collector (analytics via proxy CF — D-15) + `/collect` + PostHog + Destinations (Meta, GA4) · **click IDs/UTM/xcode em cookie first-party (D-14 — sem retrofit possível)** · conversão GA4 importada no Google Ads (demand capture apto desde já) · **GBP por espaço, NAP = structured data** (pré-requisito de mídia, como as páginas legais) · consent pass-through. *Entrega: mensuração first-party + Meta e Google aptos.*
- **Fase 2 — Leads & LPs:** editor block-based · LP Retrofit (campanha viva) · contrato de lead → Kommo · speed-to-lead · links xcode no admin · feature flags server-side + motor de A/B instalado, **experimentos de LP atrás do gate de volume** (ver [`system/experimentacao.md`](../system/experimentacao.md)). *Entrega: máquina de lead.*
- **Fase 3 — Cobertura & loop:** Google Ads nativo (EC4L/OCI com `gclid`) + YouTube + TikTok · **CTWA com atribuição** (ver [`system/eventos.md`](../system/eventos.md)) · **loop fechado Kommo→ads** com valores por faixa e eventos de visita (D-14) · **ingestão de lead forms nativos + sync de audiências (D-13)** · Tracker Hub completo (realtime, teste, saúde) **+ inteligência competitiva como L3 (D-19) — condicional ao gate de congelamento** · Pinterest: opcional, avaliado no fim da fase (não bloqueia). *Entrega: mídia completa + console.*
- **Fase 4 — Escala & diferidos:** hardening de performance · build LGPD (CMP, gating real) · value-mapping do join key · revisitar hosting se a escala apertar.

> **Inteligência competitiva (D-19) — discovery roda agora; build fica para a Fase 3 atrás do gate.** O **radar de findings** ([`../discovery/radar/`](../discovery/radar/)) roda **agora** como atividade de **discovery** (assistida, custo zero), paralela às fases — não é build de app. O **módulo intel L3** (coleta Apify/YouTube no `api-server` + render L3 no Tracker Hub) é **Fase 3-adjacente e CONGELADO** atrás de gate duplo: **(a)** admin/Tracker Hub existir (Fase 2–3) **e (b)** o radar v0 provar **≥3 ideias usáveis** sobreviventes ao `doc-discovery-mapper`. Sem o gate, mapeia-se (business→specs→system) mas **não** se constrói.

---

## §7.1 — Critérios de aceite por fase (definition of done — verificáveis)

**Fase 0 — Fundação:**
- [ ] Monorepo com os 3 runtimes + `packages/contracts` builda e sobe no runtime de deploy (provedor a definir na Fase 0b — D-18); travas de fronteira ativas no CI (ver [`system/engenharia.md`](../system/engenharia.md))
- [ ] Registros da plataforma seedados (3 TiposDeAssunto; Assuntos: 5 espaços com `categoria`, serviços com `papel`; Objetivos)
- [ ] Páginas institucionais + blog base renderizando do Payload via API; paridade visual com o design system (tokens, Playfair+Work Sans, foco/skip-link/reduced-motion — ver [`system/design-system.md`](../system/design-system.md))
- [ ] **Lighthouse CI verde** (home, 1 página de espaço, 1 post) dentro do orçamento de CWV (ver [`system/arquitetura.md`](../system/arquitetura.md) §4); axe sem violações
- [ ] sitemap/robots/canonical/OG gerados; structured data validando (Rich Results Test)
- [ ] Publicar no Payload reflete no site (purge/revalidação funcionando); preview de draft funcionando (ver [`system/admin.md`](../system/admin.md))
- [ ] Páginas legais publicadas (placeholder jurídico aprovado pelo fundador — exigência de aprovação de ads)
- [ ] Inventário de conteúdo ativo (ver [`roadmap/inventario-conteudo.md`](inventario-conteudo.md)) com dono e prazo por item; os 5 espaços seedados com **galeria real** (fotos próprias — `CONTEXTO-IA §5` proíbe banco)

**Fase 1 — Eventos:**
- [ ] Collector batched emitindo o catálogo (ver [`system/eventos.md`](../system/eventos.md)); analytics via proxy CF → PostHog e eventos de negócio → `/collect` (D-15); `subjects[]`/`objective` presentes; campo `consent` pass-through e `correlation_id` reservado
- [ ] **Click IDs (D-14)**: `fbc`/`fbp`, `gclid`, `ttclid` capturados em cookie first-party e presentes no evento e no contrato de lead
- [ ] Round-trip de teste Meta (Test Events) e GA4 (debug) verde via modo `test:true` — sem tocar produção
- [ ] Conversão GA4 importada/marcada como conversão no Google Ads (Google Search apto a otimizar por lead)
- [ ] GBP dos espaços reivindicado/criado; NAP idêntico ao structured data do site (ver [`system/blog.md`](../system/blog.md) — SEO local)
- [ ] **Check de cobertura PostHog-first (D-17)**: verificar se o PostHog ingere custo/ads das plataformas usadas (esp. Pinterest/TikTok no BR); resultado documentado — define se o Nível 2 vai por PostHog ou por connector na Fase 3 (não é build, é validação)
- [ ] Rate-limit + validação de schema no `/collect`; Sentry capturando nos 3 runtimes

**Fase 2 — Leads & LPs:**
- [ ] Editor block-based: criar LP = Molde + Assunto(s) + Objetivo; validação de capacidades; publish/expiração
- [ ] LP publicada converte: deep-link WhatsApp com xcode E form → card no Kommo com contrato completo (ver [`system/landing-pages.md`](../system/landing-pages.md) — contrato de lead)
- [ ] **Dedup D-11 demonstrado**: 2ª conversão do mesmo telefone anexa ao card (não duplica) + notificação SDR
- [ ] Gerador de links xcode/UTM + redirect WhatsApp no admin
- [ ] A/B server-side: variantes renderizadas sem flicker (CLS = 0 na troca), `experiment_exposure` no PostHog; ativar experimento tira a LP do full-page cache automaticamente e encerrar devolve (D-8); **gate de volume implementado** (ver [`system/experimentacao.md`](../system/experimentacao.md) — experimento só arma com projeção de duração viável)

**Fase 3 — Cobertura & loop:**
- [ ] Google Ads (EC4L/OCI com `gclid`) e TikTok com round-trip de teste verde; dedupe pixel↔server por `event_id`; Pinterest somente se aprovado na avaliação da fase
- [ ] **Loop fechado demonstrado**: desfecho no Kommo (sandbox) → conversão qualificada disparada por card (1×) aos canais, **com valor por faixa (M-02) no payload** (D-14)
- [ ] **CTWA (D-14, desenho v1 — ver [`system/eventos.md`](../system/eventos.md))**: WABA + conta de anúncios no mesmo Business Manager com permissão de metadados concedida; UTMs de anúncio CTWA visíveis no Tracking data do card; loop de volta testado em sandbox (Conversion API da Kommo avaliada × eventos próprios casados por telefone, sem duplicação)
- [ ] **Eventos de visita (D-14)**: `visita_agendada`/`visita_realizada`/`no_show` fluindo do Kommo ao painel — funil M-04 completo
- [ ] SLA de qualificação ≤ 72h acordado com a SDR e refletido no pipeline (D-14)
- [ ] Ingestão de lead form nativo (Meta sandbox) → card no Kommo com origem correta (D-13)
- [ ] Sync de audiência (segmento de teste, PII hasheada, **somente leads com opt-in registrado** — ver [`system/eventos.md`](../system/eventos.md)) aceito por ao menos 1 plataforma (D-13)
- [ ] Tracker Hub: inspetor realtime filtra por `test`; saúde por destino; replay restrito a Admin
- [ ] **Single pane of glass — Nível 1 (D-17, ver [`system/eventos.md`](../system/eventos.md) — painel)**: investimento por canal/dia puxado de ≥ 1 plataforma e blendado com qualificado+valor → **CAC e custo-por-lead-qualificado por canal** no painel, com **fonte de cada métrica rotulada**; build-vs-buy do reporting completo (Nível 2) decidido com custo como input (ver [`discovery/auditoria-pre-build.md`](../discovery/auditoria-pre-build.md) §3.5)
- [ ] **Inteligência competitiva L3 (D-19) — SÓ se o gate de congelamento abriu** (admin/Tracker Hub no ar + radar v0 com ≥3 ideias usáveis sobreviventes ao `doc-discovery-mapper`): coleta de ≥1 concorrente (Apify/YouTube) indexada e renderizada como **L3** no Tracker Hub, com **fonte rotulada**. Senão, permanece em discovery (`../discovery/radar/`) — não bloqueia a fase.
- [ ] **Casa-de-dados do radar (D-20, emenda à D-19) — descongelada, fora do gate L3:** o **registro curado** (Concorrente/Canal/Estética em collections Payload + seed bootstrap) é mapeado (business→specs→system) e construído **agora** (WO-INTEL-001), independente do gate acima. A **coleta automatizada** (Apify/YouTube) e o **render L3** seguem congelados.

**Fase 4 — Escala & diferidos (etapa final):**
- [ ] Build LGPD: CMP, consent gate ativo (de pass-through a efetivo), Consent Mode, retenção/mascaramento
- [ ] Value-mapping do join key preenchido e validado ponta-a-ponta
- [ ] Mapa 301 do site antigo publicado no cutover; monitoramento de 404 pós-corte
- [ ] Edge logic de cache por variante (D-8 evolução) — LPs sob teste voltam ao cache total

---

## §7.2 — Restrições de build conhecidas (Fase 0b) — recomendação da auditoria

> A Fase 0 parte em **0a (guardrails como código)** e **0b (fundação delegável)**. A 0a é pré-requisito (monta a gaiola antes de qualquer feature — D-16) e está entregue ([`../tasks/WO-CORE-001.md`](../tasks/WO-CORE-001.md)). As armadilhas abaixo valem para as WO de build da 0b:

1. Astro em **`output: 'server'`** (adapter Node) + cache no Cloudflare + **purge por URL** no publish. NÃO `output:'static'`/"SSG-ISR" (Astro não tem ISR). Ver [`../system/arquitetura.md`](../system/arquitetura.md).
2. **Sem Framer Motion no site** para reveal/entrada — CSS + IntersectionObserver. Framer só em ilha já interativa ([`../specs/design-system/movimento.md`](../specs/design-system/movimento.md)).
3. **shadcn/ui só no `admin/`.** No site, componente próprio com tokens.
4. Imagens com `astro:assets` + pipeline D-10 (R2 + Cloudflare Images) — não `next/image`. Fontes self-hosted (`@fontsource`), preload, fallback métrico.
5. Tipos de resposta do Payload vêm de `packages/contracts/generated` (`payload generate:types`) — não escrever à mão. `transpilePackages: ['@vvf/contracts']` no `next.config`.
6. Preview de draft = rota `/preview` no Astro SSR + **token assinado** + `noindex` — nunca draft por query param aberto ([`../tasks/WO-SITE-003.md`](../tasks/WO-SITE-003.md)).
7. Hospedagem: três deployments + subdomínios (`www`, `admin.`, `api.`/`t.`) no DNS Cloudflare — não path-proxy ([`../tasks/WO-INFRA-001.md`](../tasks/WO-INFRA-001.md)).
8. `api-server`: CORS explícito (allowlist do site/admin), nunca `*` reflexivo; CSP no site com origens de script declaradas ([`../tasks/WO-API-001.md`](../tasks/WO-API-001.md)).

### Passos manuais da 0a (fundador — fora do alcance do agente)
- [x] **Branch protection na `main` — LIGADA (jun/2026).** Checks obrigatórios (`verify`/`gitleaks`/`conventional commits`/`CWV+a11y`) + auto-merge para PR de código; PR de caminho CODEOWNERS não é auto-mergeado.
- [ ] Rodar `infra/db/roles.sql` no Postgres provisionado (trocar `CHANGE_ME_*` por Secrets) — [`../tasks/WO-INFRA-001.md`](../tasks/WO-INFRA-001.md).
- [ ] Confirmar `@fabiozaffani` como usuário dos CODEOWNERS.
- [ ] gitleaks-action: repo pessoal não exige licença; se migrar para org, setar `GITLEAKS_LICENSE`.
