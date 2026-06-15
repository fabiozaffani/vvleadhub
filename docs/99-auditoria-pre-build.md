# 99 · Auditoria Pré-Build — Lacunas & Não-Validados

**Status:** documento de trabalho (fora da sequência canônica de leitura — por isso `99`) · **Camada de tom:** trabalho
**Função:** inventário do que **não foi pensado ou não foi validado** no conjunto 00–08. Cada item tem severidade e destino (qual doc absorve a resolução). Itens resolvidos migram para os docs donos e saem daqui.

**Legenda:** 🔴 resolver **antes** da Fase 0 · 🟡 resolver **na fase indicada** do roadmap (03 §7) · 🟢 paralelo/adiável sem risco estrutural

---

## 1. Overall — o formato serve para "entregar a uma IA e ela produzir o sistema"?

**Veredito honesto: o conjunto é necessário, mas não suficiente.** Ele resolve muito bem o **"o quê"** (modelo, arquitetura, contratos, fronteiras) — que é onde a maioria dos projetos falha. Mas uma IA construtora precisa de mais três camadas que hoje não existem:

| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 1.1 | ~~CLAUDE.md~~ — **ENTREGUE** (raiz do repo; registrado no 00 §2). | ✅ | fechado |
| 1.2 | ~~Critérios de aceite por fase~~ — **ENTREGUE** (03 §7.1, checklists verificáveis por fase). | ✅ | fechado |
| 1.3 | ~~O Contexto VVF não está no conjunto~~ — **RESOLVIDO:** camada de marca integrada em `docs/brand/` (System Context + Design Guidelines), registrada no 00 §1. *Pendente apenas:* anexar os mapas de growth (citados no 04/06). | 🟢 (restante) | 00 §1 ✓ |
| 1.4 | **Inventário de conteúdo inexistente** — a maior dependência não-técnica: a IA constrói a máquina, mas **não pode inventar** copy em tom de marca, fotos reais dos espaços (o §5 do Contexto proíbe banco de imagens), depoimentos, vídeos, textos institucionais. Sem um inventário (o que existe, o que falta, quem produz, até quando), a Fase 0 entrega um site lindo e vazio. **Mecanismo criado (auditoria growth jun/2026):** `docs/conteudo/inventario.md` estruturado + critério de aceite na Fase 0 (03 §7.1: 5 espaços com galeria real seedada). **Falta: fundador preencher dono/prazo por item.** | 🔴 (só o preenchimento) | `docs/conteudo/inventario.md` |
| 1.5 | ~~Nenhuma referência visual~~ — **RESOLVIDO em grande parte:** o `vvf-design-guidelines.md` é o design system aplicado (tokens, componentes, movimento, regras fazer/nunca), com implementação de referência em `artifacts/valeverde`. Resta apenas composição por Molde (hierarquia de blocos por página), que pode ser proposta pela IA e curada por você. | 🟢 | brand layer ✓ |
| 1.6 | ~~Loop de validação humana~~ — **ENTREGUE** (preview como palco de validação — 09 §5; promoção manual + aval obrigatório — CLAUDE.md; critérios por fase — 03 §7.1). | ✅ | fechado |

---

## 2. Parte Técnica — não definido ou não validado

### 2.1 Engenharia & repositório (o seu exemplo "b" — confirmado: não existe)
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.1.1 | ~~Doc de engenharia~~ — **ENTREGUE** (`09-engenharia.md` §1–§2). | ✅ | fechado |
| 2.1.2 | ~~Testes + fiscal do CWV~~ — **ENTREGUE** (09 §3–§4: pirâmide + Lighthouse CI como gate bloqueante). | ✅ | fechado |
| 2.1.3 | ~~Ambientes/secrets~~ — **ENTREGUE** (09 §5: dev/preview/prod + inventário de secrets). | ✅ | fechado |
| 2.1.4 | ~~Observabilidade~~ — **ENTREGUE** (09 §6: Sentry + pino + correlação). | ✅ | fechado |

### 2.2 Decisões arquiteturais não resolvidas (descobertas pela auditoria)
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.2.1 | ~~Cache de CDN × A/B~~ — **RESOLVIDO (D-8):** opção (b) — LP sob experimento sai do full-page cache; evolução para (a) edge logic na etapa final. Aplicado em 03 §4 e 08 §5. | ✅ | fechado |
| 2.2.2 | ~~Propriedade do banco~~ — **RESOLVIDO (D-9):** um Postgres, dois schemas, dono de migração por schema, sem FK cruzando, comunicação por API. Aplicado em 03 §5. | ✅ | fechado |
| 2.2.3 | ~~Armazenamento de mídia~~ — **RESOLVIDO (D-10):** R2 (originais, plugin Payload) + Cloudflare Images (derivados on-the-fly). Aplicado em 03 §3/§4. | ✅ | fechado |
| 2.2.4 | **Invalidação de cache na publicação** — publicar no Payload precisa derrubar o cache do Cloudflare/Astro das páginas afetadas (webhook → purge). Sem isso, conteúdo editado demora a aparecer e o time perde confiança no admin. | 🟡 F0 | 03 |
| 2.2.5 | ~~Auth service-to-service~~ — **RESOLVIDO (D-12):** JWT do Payload validado pelo api-server + tokens de serviço escopados; `/collect` público com rate-limit; usuário final fora do escopo v1 (Clerk designado p/ futuro). Aplicado em 06 §6 e 05 §10. | ✅ | fechado |
| 2.2.6 | **Live preview cross-runtime** — o preview do Payload apontando para o site Astro exige rota de draft/preview no Astro. Citado como feature, mecânica não spec'ada. | 🟡 F0 | 06 |
| 2.2.7 | ~~Proxy do collector~~ — **RESOLVIDO (D-15):** split de ingestão — analytics do SDK via proxy reverso no Cloudflare → PostHog Cloud (padrão suportado; CF já está na frente por D-2); `/collect` (api-server) fica só com eventos de negócio + cola Kommo. Analytics desacoplado da disponibilidade do Express/api-server. Aplicado em 05 §2/§3 e 03 §2. | ✅ | fechado |

### 2.3 Dados, leads & integrações
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.3.1 | ~~Dedup/merge de lead~~ — **RESOLVIDO (D-11):** Kommo fonte de verdade; telefone E.164 como chave; upsert-e-anexar; loop por card. Aplicado em 04 §7 e 05 §9. *Nuance de reativação a validar com a SDR na implementação.* | ✅ | fechado |
| 2.3.2 | **Leads off-site invisíveis ao painel** — os fluxos de Instagram DM → Kommo (mapas de growth) nunca tocam o site: não geram evento web. *Atenuado pela D-14: a criação de card emite `lead` em todos os caminhos (05 §9), então leads de DM/CTWA aparecem no painel — sem contexto de página/jornada web.* Resta a nota explícita no 05 §12: funil web (page_view→handoff) ≠ funil de leads (cards) — não comparar como se fossem o mesmo denominador. | 🟡 F3 | 05 §12 (nota) |
| 2.3.3 | **Tabela de roteamento WhatsApp** — qual número recebe o handoff de cada LP/espaço/campanha (por SDR? por espaço?). Os mapas dizem "WhatsApp da SDR"; a plataforma precisa da tabela como dado (admin). | 🟡 F2 | 04 + 06 |
| 2.3.4 | **Especificação formal do xcode** — a taxonomia `CP-X-GRL-SEG-…` é citada mas nunca spec'ada (gramática dos segmentos). O gerador de links (06 §7) não pode ser construído sem ela. | 🟡 F2 | 06 §7 (anexo) |
| 2.3.5 | **Webhooks do Kommo: confiabilidade** — entrega garantida? Reprocessamento se a cola estiver fora? (a fila/dead-letter cobre o lado nosso; falta validar o lado Kommo: re-tentativa, assinatura/segurança do webhook). | 🟡 F3 | 05 §9 |
| 2.3.6 | **Notificação speed-to-lead: canal e provedor** — *requisito agora spec'ado no 04 §5 (auditoria growth): ≤ 5 min, push do Kommo como default, salesbot fora de horário comercial.* Resta a escolha concreta de canal/provedor na implementação. | 🟡 F2 | 04 §5 ✓ (requisito) |

### 2.4 Qualidade transversal
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.4.1 | ~~Acessibilidade~~ — **ENTREGUE** (09 §8: alvo WCAG 2.1 AA + regra do dourado formalizada + axe no CI). *Levar a regra do dourado também para as Design Guidelines (edição da camada de marca — dono: fundador).* | ✅ | fechado |
| 2.4.2 | ~~SEO de migração~~ — **RESOLVIDO (resposta do fundador):** há site no ar com blog indexado de performance razoável → **mapa de 301 obrigatório, diferido para o cutover** (tarefa registrada no 03 §4 e no log de diferidos do 00). Baixa prioridade declarada. | ✅ (diferido c/ gancho) | fechado |
| 2.4.3 | ~~SEO local~~ — **RESOLVIDO (auditoria growth jun/2026):** elevado de 🟢 a estrutural — era a maior inversão de prioridade do conjunto (map pack decide mais que o orgânico para "espaço de casamento em <cidade>"). Spec em 07 §5.1 (GBP por espaço, NAP = structured data, reviews acoplados ao NPS/M-01) + critério de aceite na Fase 1 (03 §7.1). Operação contínua segue pós-go-live (00 §4.9). | ✅ | fechado |

---

## 3. Parte Estratégica — funciona nesse formato? O que deixamos passar

| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 3.1 | ~~Timing da campanha Retrofit~~ — **FORA DE ESCOPO (regra do fundador, 00 §4.9):** os mapas de growth serviram para entender o processo, não como restrição operacional. Operação/campanhas se resolvem pós-go-live. O roadmap segue como está. | ✅ | fechado |
| 3.2 | ~~Licença da Sloop Script Pro~~ — **RESOLVIDO por exceção registrada** (Design Guidelines §3): corpo em **Work Sans** (open), Sloop **fora de uso**, decisão registrada que não se reverte invocando o brand guide. Docs 03/07 corrigidos para refletir. *Só reabre se a marca decidir adotar a Sloop na web — aí a licença volta a ser pré-requisito.* | ✅ | fechado |
| 3.3 | **Capacidade de produção de conteúdo** — reclassificado **pós-go-live** (regra de escopo 00 §4.9). Permanece como aviso: estrutura sem conteúdo fica ociosa. | 🟢 pós-go-live | operação |
| 3.4 | **RACI dos papéis** — reclassificado **pós-go-live** (00 §4.9). O RBAC (arquitetura) está no 06; o mapeamento papel→pessoa é operação. | 🟢 pós-go-live | operação |
| 3.5 | **Custos operacionais** — nenhum modelo: PostHog (cloud por evento vs. self-host + ops), hospedagem do runtime (provedor a definir — D-18), Cloudflare (Workers/R2/Images se adotados), plano do Kommo com API/webhooks, custo por conversa do WhatsApp. *Acresce (D-17): connector/ELT de reporting (Funnel/Supermetrics/Windsor) é input da decisão build-vs-buy do Nível 2 do single pane — orçar na Fase 3.* Nada disso muda a arquitetura, mas muda o D-3 (cloud vs self-host) e o bolso. | 🟡 F1 | 00 §6 (sub-decisões) |
| 3.6 | **Páginas legais no lançamento** — LGPD (build) está diferida, ok; mas política de privacidade/termos como *páginas* tendem a ser esperadas num site institucional desde o dia 1 (e exigidas por plataformas de ads para aprovar campanhas — Meta costuma checar política de privacidade no domínio). Conteúdo é jurídico, não técnico. | 🟡 F0 | conteúdo jurídico + 03 |
| 3.7 | **Métricas-alvo do site** — reclassificado **pós-go-live** (00 §4.9): primeiro trimestre = coleta de baseline, decisão consciente. | 🟢 pós-go-live | operação |
| 3.8 | ~~Critério de "revisitar o hosting"~~ — **RESOLVIDO (auditoria growth jun/2026):** gatilho concreto registrado na D-2 (00 §7): p95 de TTFB de LP > 600 ms por 7 dias · qualquer incidente de perda de eventos na ingestão · custo mensal fora do plano. | ✅ | fechado |

---

## 4. O que foi checado e está OK (para não reabrir)

Fronteiras de runtime e propriedade (03 §2) · contrato único de evento com teste segregado (05) · ciclo de vida de Assunto sem página órfã (02 §5) · guardrails de marca por construção (04/06) · diferidos com gancho (LGPD, join key) · agnosticidade instância-vs-tipo com a emenda Payload (02 §2.2) · loop fechado Kommo→ads (05 §9) · vocabulário sem colisões (00 §5, verificado por grep).

---

## 5. Revalidação pós-camada de marca — RESOLVIDA (decisão: greenfield)

**Decisão do fundador:** o build é **greenfield**. O implementado em `artifacts/valeverde` é **protótipo/implementação de referência**, não base de migração. Consequências (registradas em 00 §7, D-7):

| # | Achado original | Resolução |
|---|---|---|
| 6.1 | Payload × admin existente | **D-1 reconfirmada:** Payload. O admin do protótipo não é migrado. |
| 6.2 | Doc As-Is inexistente | **Dispensado** — não há migração; o protótipo serve só como referência visual/funcional. |
| 6.3 | Fase 0 como migração | **Mantida como build** (03 §7 vale como está). Paridade visual garantida pelas Design Guidelines (spec), não por cópia de código. |
| 6.4 | replit.md vs CLAUDE.md | **Superado por D-16:** a fonte única tool-neutral é `AGENTS.md`; `CLAUDE.md`/`replit.md`/`.cursor/rules` são ponteiros com os invioláveis inline. O `replit.md` do repo novo é **pré-semeado** com o papel do Replit Agent (builder primário do app inteiro — D-16) + invioláveis (ele se reescreve como memória — não pode se auto-governar). *— posteriormente removido pela D-18 (jun/2026): Replit saiu da operação (builder e hospedagem); ponteiros remanescentes = `CLAUDE.md`/`.cursor/rules`; builder primário passou a ser o Cursor Composer e o Claude Code virou auxiliar.* |
| 6.5 | "Variant B" ad-hoc | **Moot** — variantes do protótipo não migram; o que valer a pena renasce dentro do motor do 08, medido. |
| 6.6 | Blog sem imagens de capa | **Permanece** — reforça 1.4 (inventário de conteúdo), independente de greenfield. |

**Nota sobre as Design Guidelines em modo greenfield:** elas permanecem fonte de verdade **visual** (tokens, componentes, movimento, regras), incluindo as exceções registradas (Work Sans). Os caminhos de arquivo citados nelas (`artifacts/valeverde/src/index.css` e afins) leem-se como ponteiros para a **implementação de referência**, a reimplementar na stack nova (Astro/Payload) com paridade. *(O `replit.md`, antes citado como ponteiro, foi removido pela D-18.)*

## 6. Varredura competitiva (lead-gen multi-plataforma) — incorporada

Varredura de mercado contra o objetivo de maximizar geração de leads (Meta/IG, Google/YouTube, TikTok, Pinterest) validou a arquitetura (CAPI+loop fechado, CTWA, speed-to-lead, CWV = estado-da-arte) e identificou 5 gaps, todos incorporados via **D-13**: ingestão de lead forms nativos (05 §9.1), sync de audiências (05 §9.2), Objetivo `agendar_visita` (02), `VideoObject` (03/07), `origin_channel: marketplace` (04).

## 6.1 Auditoria adversarial de growth (jun/2026) — incorporada

Segunda varredura adversarial (papel: especialista em lead gen/growth), com aval do fundador em 12/06/2026. Veredito: arquitetura validada (nenhuma D-1..D-13 reaberta); o padrão dos achados foi **plumbing de atribuição das plataformas subestimada** + 4 erros de sequenciamento. Tudo incorporado:

| Achado | Resolução |
|---|---|
| F1 — click IDs ausentes de evento/contrato (zero menções no repo; retrofit impossível) | **D-14(a)** — 04 §6/§7, 05 §3/§4, critério F1 |
| F2 — CTWA citado (§6) mas sem spec: `referral`/`ctwa_clid`, CAPI de business messaging | **D-14(b)** — 05 §9.3 novo; Kommo validado em 12/06 (não expõe `ctwa_clid` — desenho v1: UTMs nativos + loop por telefone + gatilho de escalada) |
| F3 — loop sem dimensão tempo nem aritmética de volume (janelas de dias; ~90 leads/semana não sustentam evento raro por ad set) | **D-14(d)** — 05 §9: SLA ≤ 72h, otimização primária em `lead` |
| F4 — valores de conversão ausentes (INV-05 não se aplica: telemetria ≠ comunicação) | **D-14(c)** — 05 §9: faixas da matriz M-02; aval do fundador registrado |
| F5 — eventos de visita fora do catálogo (funil M-04 não fechava no painel) | **D-14(e)** — 05 §9/§13, critério F3 |
| F6 — vazamento handoff→conversa invisível no caminho A | 04 §5 + 05 §9: card emite `lead`; funil mede clique vs card |
| S1 — Google Ads na F3 atrás de TikTok/Pinterest (demand capture depois de demand gen) | 03 §7: import GA4 no Google Ads na F1; nativo (EC4L/`gclid`) na F3; Pinterest rebaixado a opcional |
| S2 — A/B de LP cedo demais para o volume (~7,2k visitantes/teste ≈ meses) | 08 §7: gate de volume pré-arme (projeção > 8 semanas = não arma); flags mantidas na F2 |
| S3 — SEO local rebaixado a 🟢 (ver 2.4.3) | 07 §5.1 + critério F1 (GBP/NAP); reviews acoplados ao NPS |
| S4 — sync de audiências sem nenhum consentimento até a F4 | 05 §9.2: gated pelo opt-in mínimo desde o dia 1 (gancho D-5, sem antecipar o build) |
| R1 — conteúdo (1.4) sem dono/prazo/gate | `docs/conteudo/inventario.md` + critério F0; resta preenchimento (fundador) |
| R2 — `/collect` como proxy de tudo no Express/api-server (2.2.7) | **D-15** — split de ingestão via proxy CF |
| R3 — speed-to-lead sem requisito (2.3.6) | 04 §5: ≤ 5 min + salesbot fora de horário |
| Nit — canibalização LP × página institucional | 04 §9: um Assunto = uma página indexada (canônica) |
| Nit — `EventVenue` não é subtipo de LocalBusiness | skill `seo-schema-org`: multi-type `["EventVenue","LocalBusiness"]` |
| Nit — falta o formato âncora do nicho no blog | 07 §4: cluster "casamentos reais" (com termo de imagem) |
| Nit — portais sem webhook sem mecânica de ingestão | 04 §7 + 05 §9.1: parse de e-mail ou manual etiquetado (decidir na F3) |
| Nit — gatilho de hosting vago (3.8) | D-2 emendada com gatilho concreto |
| Extensão (fundador, 13/06) — painel como single pane of glass: time não deve tabular entre Meta/Google/Pinterest/YouTube | **D-17** — 05 §12.1: L1 (nosso, por card) + L2 (reporting de plataforma, *pull*); Nível 1 (CAC por canal) na F3, Nível 2 via connector (build-vs-buy com custo, liga 3.5); guardrail de rótulo de fonte (liga 2.3.2) |

**Validações pendentes de implementação (não bloqueiam docs):** ~~suporte do Kommo ao `referral`/`ctwa_clid`~~ — **validado em 12/06/2026** (pesquisa do fundador na doc oficial: não expõe; desenho v1 registrado no 05 §9.3) · nuance do SLA ≤ 72h com a SDR (F3, como D-11; enforcement spec'ado — timer na cola fina/Digital Pipeline) · canal/provedor do speed-to-lead (2.3.6 — blocos da Kommo mapeados: webhook push + Salesbot + Digital Pipeline; a API de Events é pull/auditoria, não serve).

**Conteúdo × build (decisão do fundador, 12/06/2026):** conteúdo final **não bloqueia** o build — placeholders marcados valem em dev/preview e a troca por asset real é pré-condição do veredicto de fase, não do trabalho diário (política completa em `docs/conteudo/inventario.md`). Marketing acionado; prioridade de entrega: 1 espaço completo primeiro.

## 7. Resolução sugerida (ordem)

1. ~~Revalidações brownfield~~ ✓ resolvidas por decisão (greenfield — §5).
2. **Decisões 🔴 de uma sentada:** 2.2.1 (cache×A/B), 2.2.2 (banco), 2.2.3 (mídia/R2), 2.3.1 (dedup de lead), 2.4.2 (há site no ar no domínio? → mapa 301), 3.1 (Retrofit).
3. **Escrever o doc `09-engenharia.md`** (estrutura do repo, fronteiras com trava, testes, CI/Lighthouse, ambientes, secrets, observabilidade) + **`CLAUDE.md`** + **critérios de aceite por fase** (emenda no 03).
4. ~~Adicionar contexto ao docs/~~ ✓ feito (camada de marca). Abrir o **inventário de conteúdo** como workstream paralelo.
5. Itens 🟡 entram como notas nos docs donos com a fase marcada; 🟢 ficam aqui até a hora.

> **Regra do processo (definida pelo fundador):** preenchimento de lacunas = conhecimento de negócio dele + best practices de mercado, **sempre com aval final dele** antes de virar canônico. Nenhuma resolução entra nos docs 00–08 sem esse aval.
