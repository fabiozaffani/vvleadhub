# Auditoria Pré-Build — Lacunas & Não-Validados

**Camada:** discovery · **Domínio:** discovery · **Origem:** 99-auditoria-pre-build.md · **Tom:** trabalho

**Status:** artefato histórico de validação (inventário de lacunas pré-build) · **Camada de tom:** trabalho
**Função:** inventário do que **não foi pensado ou não foi validado** no conjunto de specs/system. Cada item tem severidade e destino (qual doc absorve a resolução). Itens resolvidos migram para os docs donos e ficam aqui como registro histórico.

**Legenda:** 🔴 resolver **antes** da Fase 0 · 🟡 resolver **na fase indicada** do roadmap (`roadmap/fases.md`) · 🟢 paralelo/adiável sem risco estrutural

---

## 1. Overall — o formato serve para "entregar a uma IA e ela produzir o sistema"?

**Veredito honesto: o conjunto é necessário, mas não suficiente.** Ele resolve muito bem o **"o quê"** (modelo, arquitetura, contratos, fronteiras) — que é onde a maioria dos projetos falha. Mas uma IA construtora precisa de mais três camadas que hoje não existem:

| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 1.1 | ~~CLAUDE.md~~ — **ENTREGUE** (raiz do repo; registrado em `_index.md`). | ✅ | fechado |
| 1.2 | ~~Critérios de aceite por fase~~ — **ENTREGUE** (`roadmap/fases.md`, checklists verificáveis por fase). | ✅ | fechado |
| 1.3 | ~~O Contexto VVF não está no conjunto~~ — **RESOLVIDO:** camada de marca integrada no canon do vvcore (CONTEXTO-IA, System Context + Design Guidelines), entregue por @import no CLAUDE.md. *Pendente apenas:* anexar os mapas de growth (citados em `system/landing-pages.md`/`system/admin.md`). | 🟢 (restante) | CONTEXTO-IA ✓ |
| 1.4 | **Inventário de conteúdo inexistente** — a maior dependência não-técnica: a IA constrói a máquina, mas **não pode inventar** copy em tom de marca, fotos reais dos espaços (a identidade visual proíbe banco de imagens — CONTEXTO-IA §5), depoimentos, vídeos, textos institucionais. Sem um inventário (o que existe, o que falta, quem produz, até quando), a Fase 0 entrega um site lindo e vazio. **Mecanismo criado (auditoria growth jun/2026):** `roadmap/inventario-conteudo.md` estruturado + critério de aceite na Fase 0 (`roadmap/fases.md`: 5 espaços com galeria real seedada). **Falta: fundador preencher dono/prazo por item.** | 🔴 (só o preenchimento) | `roadmap/inventario-conteudo.md` |
| 1.5 | ~~Nenhuma referência visual~~ — **RESOLVIDO em grande parte:** o design system aplicado (`system/design-system.md` + specs `specs/design-system/`) cobre tokens, componentes, movimento, regras fazer/nunca, com implementação de referência em `artifacts/valeverde`. Resta apenas composição por Molde de LP (hierarquia de Blocos por página), que pode ser proposta pela IA e curada por você. | 🟢 | design-system ✓ |
| 1.6 | ~~Loop de validação humana~~ — **ENTREGUE** (preview como palco de validação — `specs/engenharia/ambientes-secrets.md`; promoção manual + aval obrigatório — AGENTS.md; critérios por fase — `roadmap/fases.md`). | ✅ | fechado |

---

## 2. Parte Técnica — não definido ou não validado

### 2.1 Engenharia & repositório (o seu exemplo "b" — confirmado: não existe)
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.1.1 | ~~Doc de engenharia~~ — **ENTREGUE** (`system/engenharia.md` + `specs/engenharia/monorepo.md`/`specs/engenharia/fronteiras.md`). | ✅ | fechado |
| 2.1.2 | ~~Testes + fiscal do CWV~~ — **ENTREGUE** (`specs/engenharia/testes.md` + `specs/engenharia/ci-gates.md`: pirâmide + Lighthouse CI como gate bloqueante). | ✅ | fechado |
| 2.1.3 | ~~Ambientes/secrets~~ — **ENTREGUE** (`specs/engenharia/ambientes-secrets.md`: dev/preview/prod + inventário de secrets). | ✅ | fechado |
| 2.1.4 | ~~Observabilidade~~ — **ENTREGUE** (`specs/engenharia/observabilidade.md`: Sentry + pino + correlação). | ✅ | fechado |

### 2.2 Decisões arquiteturais não resolvidas (descobertas pela auditoria)
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.2.1 | ~~Cache de CDN × A/B~~ — **RESOLVIDO (D-8):** opção (b) — LP sob experimento sai do full-page cache; evolução para (a) edge logic na etapa final. Aplicado em `system/arquitetura.md` e `specs/experimentacao/feature-flags.md`. | ✅ | fechado |
| 2.2.2 | ~~Propriedade do banco~~ — **RESOLVIDO (D-9):** um Postgres, dois schemas, dono de migração por schema, sem FK cruzando, comunicação por API. Aplicado em `system/arquitetura.md`. | ✅ | fechado |
| 2.2.3 | ~~Armazenamento de mídia~~ — **RESOLVIDO (D-10):** R2 (originais, plugin Payload) + Cloudflare Images (derivados on-the-fly). Aplicado em `system/arquitetura.md`. | ✅ | fechado |
| 2.2.4 | **Invalidação de cache na publicação** — publicar no Payload precisa derrubar o cache do Cloudflare/Astro das páginas afetadas (webhook → purge). Sem isso, conteúdo editado demora a aparecer e o time perde confiança no admin. | 🟡 F0 | `system/arquitetura.md` |
| 2.2.5 | ~~Auth service-to-service~~ — **RESOLVIDO (D-12):** JWT do Payload validado pelo api-server + tokens de serviço escopados; `/collect` público com rate-limit; usuário final fora do escopo v1 (Clerk designado p/ futuro). Aplicado em `specs/admin/rbac.md` e `specs/eventos/collector.md`. | ✅ | fechado |
| 2.2.6 | **Live preview cross-runtime** — o preview do Payload apontando para o site Astro exige rota de draft/preview no Astro. Citado como feature, mecânica não spec'ada. | 🟡 F0 | `system/admin.md` |
| 2.2.7 | ~~Proxy do collector~~ — **RESOLVIDO (D-15):** split de ingestão — analytics do SDK via proxy reverso no Cloudflare → PostHog Cloud (padrão suportado; CF já está na frente por D-2); `/collect` (api-server) fica só com eventos de negócio + cola Kommo. Analytics desacoplado da disponibilidade do Express/api-server. Aplicado em `specs/eventos/collector.md`/`specs/eventos/destinos.md` e `system/arquitetura.md`. | ✅ | fechado |

### 2.3 Dados, leads & integrações
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.3.1 | ~~Dedup/merge de lead~~ — **RESOLVIDO (D-11):** Kommo fonte de verdade; telefone E.164 como chave; upsert-e-anexar; loop por card. Aplicado em `specs/landing-pages/contrato-lead.md` e `specs/eventos/loop-fechado.md`. *Nuance de reativação a validar com a SDR na implementação.* | ✅ | fechado |
| 2.3.2 | **Leads off-site invisíveis ao painel** — os fluxos de Instagram DM → Kommo (mapas de growth) nunca tocam o site: não geram evento web. *Atenuado pela D-14: a criação de card emite `lead` em todos os caminhos (`specs/eventos/loop-fechado.md`), então leads de DM/CTWA aparecem no painel — sem contexto de página/jornada web.* Resta a nota explícita em `specs/eventos/painel.md`: funil web (page_view→handoff) ≠ funil de leads (cards) — não comparar como se fossem o mesmo denominador. | 🟡 F3 | `specs/eventos/painel.md` (nota) |
| 2.3.3 | **Tabela de roteamento WhatsApp** — qual número recebe o handoff de cada LP/espaço/campanha (por SDR? por espaço?). Os mapas dizem "WhatsApp da SDR"; a plataforma precisa da tabela como dado (admin). | 🟡 F2 | `specs/landing-pages/conversao-cta.md` + `specs/admin/links-campanha.md` |
| 2.3.4 | **Especificação formal do xcode** — a taxonomia `CP-X-GRL-SEG-…` é citada mas nunca spec'ada (gramática dos segmentos). O gerador de links (`specs/admin/links-campanha.md`) não pode ser construído sem ela. | 🟡 F2 | `specs/admin/links-campanha.md` (anexo) |
| 2.3.5 | **Webhooks do Kommo: confiabilidade** — entrega garantida? Reprocessamento se a cola estiver fora? (a fila/dead-letter cobre o lado nosso; falta validar o lado Kommo: re-tentativa, assinatura/segurança do webhook). | 🟡 F3 | `specs/eventos/loop-fechado.md` |
| 2.3.6 | **Notificação speed-to-lead: canal e provedor** — *requisito agora spec'ado em `specs/landing-pages/conversao-cta.md` (auditoria growth): ≤ 5 min, push do Kommo como default, salesbot fora de horário comercial.* Resta a escolha concreta de canal/provedor na implementação. | 🟡 F2 | `specs/landing-pages/conversao-cta.md` ✓ (requisito) |

### 2.4 Qualidade transversal
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.4.1 | ~~Acessibilidade~~ — **ENTREGUE** (`specs/engenharia/acessibilidade.md`: alvo WCAG 2.1 AA + regra do dourado formalizada + axe no CI). *Levar a regra do dourado também para o design system (edição da camada de marca — dono: fundador).* | ✅ | fechado |
| 2.4.2 | ~~SEO de migração~~ — **RESOLVIDO (resposta do fundador):** há site no ar com blog indexado de performance razoável → **mapa de 301 obrigatório, diferido para o cutover** (tarefa registrada em `system/arquitetura.md` e no log de diferidos de `_decisoes.md`). Baixa prioridade declarada. | ✅ (diferido c/ gancho) | fechado |
| 2.4.3 | ~~SEO local~~ — **RESOLVIDO (auditoria growth jun/2026):** elevado de 🟢 a estrutural — era a maior inversão de prioridade do conjunto (map pack decide mais que o orgânico para "espaço de casamento em <cidade>"). Spec em `specs/blog/seo-local.md` (GBP por espaço, NAP = structured data, reviews acoplados ao NPS/M-01) + critério de aceite na Fase 1 (`roadmap/fases.md`). Operação contínua segue pós-go-live (`_decisoes.md`). | ✅ | fechado |

---

## 3. Parte Estratégica — funciona nesse formato? O que deixamos passar

| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 3.1 | ~~Timing da campanha Retrofit~~ — **FORA DE ESCOPO (regra do fundador, `_decisoes.md`):** os mapas de growth serviram para entender o processo, não como restrição operacional. Operação/campanhas se resolvem pós-go-live. O roadmap segue como está. | ✅ | fechado |
| 3.2 | ~~Licença da Sloop Script Pro~~ — **RESOLVIDO por exceção registrada** (design system, `specs/design-system/tipografia.md`): corpo em **Work Sans** (open), Sloop **fora de uso**, decisão registrada que não se reverte invocando o brand guide. Docs `system/arquitetura.md`/`system/blog.md` corrigidos para refletir. *Só reabre se a marca decidir adotar a Sloop na web — aí a licença volta a ser pré-requisito.* | ✅ | fechado |
| 3.3 | **Capacidade de produção de conteúdo** — reclassificado **pós-go-live** (regra de escopo `_decisoes.md`). Permanece como aviso: estrutura sem conteúdo fica ociosa. | 🟢 pós-go-live | operação |
| 3.4 | **RACI dos papéis** — reclassificado **pós-go-live** (`_decisoes.md`). O RBAC (arquitetura) está em `specs/admin/rbac.md`; o mapeamento papel→pessoa é operação. | 🟢 pós-go-live | operação |
| 3.5 | **Custos operacionais** — nenhum modelo: PostHog (cloud por evento vs. self-host + ops), hospedagem do runtime (provedor a definir — D-18), Cloudflare (Workers/R2/Images se adotados), plano do Kommo com API/webhooks, custo por conversa do WhatsApp. *Acresce (D-17): connector/ELT de reporting (Funnel/Supermetrics/Windsor) é input da decisão build-vs-buy do Nível 2 do single pane — orçar na Fase 3.* Nada disso muda a arquitetura, mas muda o D-3 (cloud vs self-host) e o bolso. | 🟡 F1 | `_decisoes.md` (sub-decisões) |
| 3.6 | **Páginas legais no lançamento** — LGPD (build) está diferida, ok; mas política de privacidade/termos como *páginas* tendem a ser esperadas num site institucional desde o dia 1 (e exigidas por plataformas de ads para aprovar campanhas — Meta costuma checar política de privacidade no domínio). Conteúdo é jurídico, não técnico. | 🟡 F0 | conteúdo jurídico + `system/arquitetura.md` |
| 3.7 | **Métricas-alvo do site** — reclassificado **pós-go-live** (`_decisoes.md`): primeiro trimestre = coleta de baseline, decisão consciente. | 🟢 pós-go-live | operação |
| 3.8 | ~~Critério de "revisitar o hosting"~~ — **RESOLVIDO (auditoria growth jun/2026):** gatilho concreto registrado na D-2 (`_decisoes.md`): p95 de TTFB de LP > 600 ms por 7 dias · qualquer incidente de perda de eventos na ingestão · custo mensal fora do plano. | ✅ | fechado |

---

## 4. O que foi checado e está OK (para não reabrir)

Fronteiras de runtime e propriedade (`system/arquitetura.md`) · contrato único de evento com teste segregado (`system/eventos.md`) · ciclo de vida de Assunto sem página órfã (`specs/plataforma/ciclo-de-vida.md`) · guardrails de marca por construção (`system/landing-pages.md`/`system/admin.md`) · diferidos com gancho (LGPD, join key) · agnosticidade instância-vs-tipo com a emenda Payload (`specs/plataforma/primitivas.md`) · loop fechado Kommo→ads (`specs/eventos/loop-fechado.md`) · vocabulário sem colisões (`_lexico.md`, verificado por grep).

---

## 5. Revalidação pós-camada de marca — RESOLVIDA (decisão: greenfield)

**Decisão do fundador:** o build é **greenfield**. O implementado em `artifacts/valeverde` é **protótipo/implementação de referência**, não base de migração. Consequências (registradas em `_decisoes.md`, D-7):

| # | Achado original | Resolução |
|---|---|---|
| 6.1 | Payload × admin existente | **D-1 reconfirmada:** Payload. O admin do protótipo não é migrado. |
| 6.2 | Doc As-Is inexistente | **Dispensado** — não há migração; o protótipo serve só como referência visual/funcional. |
| 6.3 | Fase 0 como migração | **Mantida como build** (`roadmap/fases.md` vale como está). Paridade visual garantida pelo design system (spec), não por cópia de código. |
| 6.4 | replit.md vs CLAUDE.md | **Superado por D-16:** a fonte única tool-neutral é `AGENTS.md`; `CLAUDE.md`/`replit.md`/`.cursor/rules` são ponteiros com os invioláveis inline. O `replit.md` do repo novo é **pré-semeado** com o papel do Replit Agent (builder primário do app inteiro — D-16) + invioláveis (ele se reescreve como memória — não pode se auto-governar). *— posteriormente removido pela D-18 (jun/2026): Replit saiu da operação (builder e hospedagem); ponteiros remanescentes = `CLAUDE.md`/`.cursor/rules`; builder primário passou a ser o Cursor Composer e o Claude Code virou auxiliar.* |
| 6.5 | "Variant B" ad-hoc | **Moot** — variantes do protótipo não migram; o que valer a pena renasce dentro do motor de experimentação (`system/experimentacao.md`), medido. |
| 6.6 | Blog sem imagens de capa | **Permanece** — reforça 1.4 (inventário de conteúdo), independente de greenfield. |

**Nota sobre o design system em modo greenfield:** ele permanece fonte de verdade **visual** (tokens, componentes, movimento, regras), incluindo as exceções registradas (Work Sans). Os caminhos de arquivo citados nele (`artifacts/valeverde/src/index.css` e afins) leem-se como ponteiros para a **implementação de referência**, a reimplementar na stack nova (Astro/Payload) com paridade. *(O `replit.md`, antes citado como ponteiro, foi removido pela D-18.)*

## 6. Varredura competitiva (lead-gen multi-plataforma) — incorporada

Varredura de mercado contra o objetivo de maximizar geração de leads (Meta/IG, Google/YouTube, TikTok, Pinterest) validou a arquitetura (CAPI+loop fechado, CTWA, speed-to-lead, CWV = estado-da-arte) e identificou 5 gaps, todos incorporados via **D-13**: ingestão de lead forms nativos (`specs/eventos/loop-fechado.md`), sync de audiências (`specs/eventos/loop-fechado.md`), Objetivo `agendar_visita` (`specs/plataforma/primitivas.md`), `VideoObject` (`system/arquitetura.md`/`system/blog.md`), `origin_channel: marketplace` (`specs/landing-pages/propagacao-origem.md`).

## 6.1 Auditoria adversarial de growth (jun/2026) — incorporada

Segunda varredura adversarial (papel: especialista em lead gen/growth), com aval do fundador em 12/06/2026. Veredito: arquitetura validada (nenhuma D-1..D-13 reaberta); o padrão dos achados foi **plumbing de atribuição das plataformas subestimada** + 4 erros de sequenciamento. Tudo incorporado:

| Achado | Resolução |
|---|---|
| F1 — click IDs ausentes de evento/contrato (zero menções no repo; retrofit impossível) | **D-14(a)** — `specs/landing-pages/propagacao-origem.md`/`specs/landing-pages/contrato-lead.md`, `specs/eventos/schema-evento.md`, critério F1 |
| F2 — CTWA citado mas sem spec: `referral`/`ctwa_clid`, CAPI de business messaging | **D-14(b)** — `specs/eventos/ctwa.md` novo; Kommo validado em 12/06 (não expõe `ctwa_clid` — desenho v1: UTMs nativos + loop por telefone + gatilho de escalada) |
| F3 — loop sem dimensão tempo nem aritmética de volume (janelas de dias; ~90 leads/semana não sustentam evento raro por ad set) | **D-14(d)** — `specs/eventos/loop-fechado.md`: SLA ≤ 72h, otimização primária em `lead` |
| F4 — valores de conversão ausentes (INV-05 não se aplica: telemetria ≠ comunicação) | **D-14(c)** — `specs/eventos/loop-fechado.md`: faixas da matriz M-02; aval do fundador registrado |
| F5 — eventos de visita fora do catálogo (funil M-04 não fechava no painel) | **D-14(e)** — `specs/eventos/loop-fechado.md`/`specs/eventos/schema-evento.md`, critério F3 |
| F6 — vazamento handoff→conversa invisível no caminho A | `specs/landing-pages/conversao-cta.md` + `specs/eventos/loop-fechado.md`: card emite `lead`; funil mede clique vs card |
| S1 — Google Ads na F3 atrás de TikTok/Pinterest (demand capture depois de demand gen) | `roadmap/fases.md`: import GA4 no Google Ads na F1; nativo (EC4L/`gclid`) na F3; Pinterest rebaixado a opcional |
| S2 — A/B de LP cedo demais para o volume (~7,2k visitantes/teste ≈ meses) | `specs/experimentacao/guardrails-estatisticos.md`: gate de volume pré-arme (projeção > 8 semanas = não arma); flags mantidas na F2 |
| S3 — SEO local rebaixado a 🟢 (ver 2.4.3) | `specs/blog/seo-local.md` + critério F1 (GBP/NAP); reviews acoplados ao NPS |
| S4 — sync de audiências sem nenhum consentimento até a F4 | `specs/eventos/loop-fechado.md`: gated pelo opt-in mínimo desde o dia 1 (gancho D-5, sem antecipar o build) |
| R1 — conteúdo (1.4) sem dono/prazo/gate | `roadmap/inventario-conteudo.md` + critério F0; resta preenchimento (fundador) |
| R2 — `/collect` como proxy de tudo no Express/api-server (2.2.7) | **D-15** — split de ingestão via proxy CF |
| R3 — speed-to-lead sem requisito (2.3.6) | `specs/landing-pages/conversao-cta.md`: ≤ 5 min + salesbot fora de horário |
| Nit — canibalização LP × página institucional | `specs/landing-pages/seo-canonico.md`: um Assunto = uma página indexada (canônica) |
| Nit — `EventVenue` não é subtipo de LocalBusiness | skill `app-seo-schema-org`: multi-type `["EventVenue","LocalBusiness"]` |
| Nit — falta o formato âncora do nicho no blog | `specs/blog/clusters.md`: cluster "casamentos reais" (com termo de imagem) |
| Nit — portais sem webhook sem mecânica de ingestão | `specs/landing-pages/contrato-lead.md` + `specs/eventos/loop-fechado.md`: parse de e-mail ou manual etiquetado (decidir na F3) |
| Nit — gatilho de hosting vago (3.8) | D-2 emendada com gatilho concreto |
| Extensão (fundador, 13/06) — painel como single pane of glass: time não deve tabular entre Meta/Google/Pinterest/YouTube | **D-17** — `specs/eventos/painel.md`: L1 (nosso, por card) + L2 (reporting de plataforma, *pull*); Nível 1 (CAC por canal) na F3, Nível 2 via connector (build-vs-buy com custo, liga 3.5); guardrail de rótulo de fonte (liga 2.3.2) |

**Validações pendentes de implementação (não bloqueiam docs):** ~~suporte do Kommo ao `referral`/`ctwa_clid`~~ — **validado em 12/06/2026** (pesquisa do fundador na doc oficial: não expõe; desenho v1 registrado em `specs/eventos/ctwa.md`) · nuance do SLA ≤ 72h com a SDR (F3, como D-11; enforcement spec'ado — timer na cola fina/Digital Pipeline) · canal/provedor do speed-to-lead (2.3.6 — blocos da Kommo mapeados: webhook push + Salesbot + Digital Pipeline; a API de Events é pull/auditoria, não serve).

**Conteúdo × build (decisão do fundador, 12/06/2026):** conteúdo final **não bloqueia** o build — placeholders marcados valem em dev/preview e a troca por asset real é pré-condição do veredicto de fase, não do trabalho diário (política completa em `roadmap/inventario-conteudo.md`). Marketing acionado; prioridade de entrega: 1 espaço completo primeiro.

## 7. Resolução sugerida (ordem)

1. ~~Revalidações brownfield~~ ✓ resolvidas por decisão (greenfield — §5).
2. **Decisões 🔴 de uma sentada:** 2.2.1 (cache×A/B), 2.2.2 (banco), 2.2.3 (mídia/R2), 2.3.1 (dedup de lead), 2.4.2 (há site no ar no domínio? → mapa 301), 3.1 (Retrofit).
3. **Escrever o doc de engenharia** (`system/engenharia.md` + specs `specs/engenharia/`: estrutura do repo, fronteiras com trava, testes, CI/Lighthouse, ambientes, secrets, observabilidade) + **`CLAUDE.md`** + **critérios de aceite por fase** (`roadmap/fases.md`).
4. ~~Adicionar contexto ao docs/~~ ✓ feito (camada de marca). Abrir o **inventário de conteúdo** como workstream paralelo.
5. Itens 🟡 entram como notas nos docs donos com a fase marcada; 🟢 ficam aqui até a hora.

> **Regra do processo (definida pelo fundador):** preenchimento de lacunas = conhecimento de negócio dele + best practices de mercado, **sempre com aval final dele** antes de virar canônico. Nenhuma resolução entra nos docs de spec/system sem esse aval.
