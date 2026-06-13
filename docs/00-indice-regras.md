# 00 · Índice & Regras

**Status:** canônico · **Camada de tom:** trabalho · **Função:** documento de controle. É o **primeiro** arquivo que a IA construtora lê. Define a ordem, o status, as regras e o vocabulário de todo o conjunto.
**Regra-mãe:** se uma informação aparece em dois documentos, ela **vai divergir**. Cada conceito tem **um** dono. Os demais referenciam, nunca recopiam.

---

## 1. Camada de marca (referência canônica — lida ANTES da sequência)

Dois documentos pré-existem a este conjunto, são **donos da marca** e ficam em `docs/brand/` com seus nomes nativos do repositório (exceção registrada à convenção §2 — a camada de marca tem dono e nomenclatura próprios):

| Arquivo | Papel | Autoridade |
|---|---|---|
| `brand/vvf-system-context.md` | **Contexto VVF** — estratégia, invariantes (§2), tom (§1.1/§4.2), produto, métricas, gates. Toda referência "Contexto VVF §x" nos docs 01–08 aponta para ele. | fonte de verdade **conceitual** — prevalece sobre 01–08 em matéria de marca/estratégia |
| `brand/vvf-design-guidelines.md` | **Design Guidelines** — sistema visual aplicado: tokens, tipografia (com exceções registradas, ex.: Work Sans no corpo; Sloop fora de uso), componentes, movimento, foco/a11y, regras fazer/nunca. **Leitura em modo greenfield (D-7):** a spec prevalece; caminhos de arquivo citados nela apontam para o protótipo (implementação de referência), a reimplementar com paridade na stack nova. | fonte de verdade **visual aplicada** — prevalece sobre 01–08 em matéria de UI; suas "decisões registradas" não são revertidas invocando o brand guide |

## 2. Sequência canônica (ordem de leitura = ordem de dependência)

| Nº | Documento | Arquivo | Responsabilidade (única) | Depende de | Status |
|---|---|---|---|---|---|
| 00 | **Índice & Regras** (este) | `00-indice-regras.md` | controle: ordem, regras, glossário, decisões | — | canônico |
| 01 | **Modelo de Domínio** | `01-modelo-dominio.md` | verdade do negócio: entidades, atributos (tech-neutral) | — | **v1 final** |
| 02 | **Fundação da Plataforma** | `02-fundacao-plataforma.md` | primitivas abstratas: Molde · Assunto · Objetivo · Bloco · LP | 01 | **v2** |
| 03 | **Arquitetura do Sistema** | `03-arquitetura-sistema.md` | stack (Replit: site Astro · admin Payload · api-server), hosting, SEO/perf, segurança, dados, roadmap | 01, 02 | **v2** |
| 04 | **Landing Pages & Conversão** | `04-landing-pages.md` | blocos, conversão, contrato de lead→Kommo, propagação de origem, marca | 01, 02, 03 | **v2** |
| 05 | **Event HUB & Mensuração** | `05-event-hub-mensuracao.md` | PostHog (store/análise/Destinations) + cola fina (collect, Kommo, loop fechado), teste/realtime/saúde, painel | 02, 03 | **v2** |
| 06 | **Admin/CMS & Tracker Hub** | `06-admin-cms.md` | control plane (Payload): Tracker Hub, registros, editor de LP, RBAC, integrações, links | 02, 03, 05 | **v2** |
| 07 | **Blog** | `07-blog.md` | motor de conteúdo/SEO: clusters, structured data, modelo de post | 02, 03, 06 | draft v1 |
| 08 | **Experimentação & Feature Flags** | `08-experimentacao.md` | A/B server-side, flags, exposição, significância | 02, 03, 05 | draft v1 |
| 09 | **Engenharia & Convenções** | `09-engenharia.md` | monorepo, travas de fronteira (CI), testes, gates (Lighthouse/axe), ambientes/secrets, observabilidade, manutenção, a11y | 02, 03 | draft v1 |
| — | **AGENTS.md** (raiz do repo) | `AGENTS.md` | manual de conduta do agente construtor (tool-neutral, fonte única — D-16): ordem de leitura, regras invioláveis, governança multi-agente, quando perguntar, definition of done. `CLAUDE.md`/`replit.md`/`.cursor/rules/*` são ponteiros | todos | v1 |

> Regra de leitura: um documento só pode depender dos que estão **acima** dele. Nunca o inverso.

---

## 3. Convenção de nomenclatura & reemissão

**Padrão de nome de arquivo:** `NN-titulo-kebab.md`
- `NN` = posição na sequência (dois dígitos).
- **Sem prefixo de marca** ("VVF" é redundante — todo o conjunto é VVF).
- **Sem versão no nome** — a versão vive no header (`Status:`). Nome estável entre versões.
- minúsculas, kebab-case, **sem palavras de enchimento** (`spec`, `camada`, `web`, `derivacao`, `modelo-abstrato`, conectores). Cada palavra carrega significado.

**Reemissão concluída.** Todo o conjunto (00–08) está no vocabulário canônico (§5) e reflete as decisões fechadas (§6). Não há resíduo de `venue`, "Foco", "Arquétipo" (sentido plataforma) ou "intenção × unidade".

---

## 4. Regras de governança

1. **Glossário manda (§5).** Um conceito = um termo. Colisão de nome é **defeito**, não estilo.
2. **Uma responsabilidade por doc.** Nenhum conceito é definido em dois lugares. Docs de baixo referenciam os de cima.
3. **Ordem de dependência = ordem de leitura** (§1).
4. **Status e versão declarados** no topo de cada doc (`canônico` / `draft` / `aberto`).
5. **Enquadramento superado é removido**, não deixado apodrecer (ex.: "intenção × unidade", `venue`).
6. **Decisões e diferidos vivem só aqui (§6)**, referenciados pelos demais — nunca repetidos.
7. **Tom (§1.1 do Contexto VVF):** todos estes docs são tom de **trabalho**. Copy voltado ao cliente (dentro do site) é tom de **marca** — marcado como tal onde aparece.
8. **Nomenclatura (§2).** Arquivos seguem `NN-titulo-kebab.md`: sem marca, sem versão no nome, sem enchimento. Cada palavra carrega significado.
9. **Escopo da documentação (regra do fundador):** este conjunto cobre **arquitetura, lógica e estratégia**. Preocupações **operacionais** (quem opera, cadências, rotinas, campanhas em curso) ficam explicitamente fora — resolvem-se depois que o sistema estiver no ar e rodando 100%. Itens operacionais identificados em auditoria são registrados como pós-go-live, não como bloqueadores.

---

## 5. Como a IA construtora usa este conjunto

- Lê na ordem: **camada de marca (§1)** → 00 → 01 → 02 → 03 → 04 → specs 05–08 conforme a tarefa.
- 01 e 02 dão o **modelo** (o que existe e como é representado); 03 dá a **arquitetura**; 04+ dão as **specs executáveis**.
- Constrói pelo **roadmap faseado do 03**, não tudo de uma vez.
- Diante de conflito entre docs: vence o de **camada mais alta** (01 > 02 > 03 > 04) e o que este índice marcar como canônico.
- Ambientes de build (D-16): **Cursor Composer** (`site/`+`admin/`) e **Replit Agent** (`api-server/`+infra) constroem; **Claude Code** revisa/roda gates. Todos leem a mesma conduta via `AGENTS.md` (ponteiros em `CLAUDE.md`/`replit.md`/`.cursor/rules/*`). Conjunto de docs em `docs/` no repositório.

---

## 6. Glossário canônico (mata as colisões)

**Termos da plataforma:**

| Termo canônico | Significa | Antes era (PROIBIDO) |
|---|---|---|
| **Molde de LP** | esqueleto reaproveitável de uma LP (composição default de blocos + tipos de Assunto aceitos + objetivo default) | ~~Arquétipo~~ |
| **Assunto** | sobre o quê a LP fala (polimórfico) | ~~Foco~~ |
| **TipoDeAssunto** | registro extensível de tipos de Assunto | ~~TipoDeFoco~~ |
| **Objetivo de conversão** | o que a LP quer que a pessoa faça | — |
| **Bloco** | pedaço visual da LP; puxa conteúdo do Assunto | — |
| **LP** | a página = Molde + Assunto + Objetivo + variante | — |
| **Event HUB / Dispatcher** | endpoint first-party que recebe eventos, aplica consentimento e despacha | — |

**Termo da MARCA — não tocar, não reusar:**

| Termo | Significa | Onde |
|---|---|---|
| **Arquétipo** | a voz da marca: **Herói da retaguarda · Cuidador · Romântico** | Contexto VVF §4.1 |

> `Arquétipo` é **exclusivamente** da marca. O esqueleto de LP é **Molde**. Nunca usar "arquétipo" para falar de estrutura de página.

**Termos do domínio (do doc 01):**

| Termo | Significa |
|---|---|
| **Tipo de Evento** | Casamento (núcleo) · Aniversário · Debutante · Corporativo |
| **Pacote** | o que se vende; espectro locação pura → completo |
| **Serviço** | componente do pacote; atributo `papel: padrão \| adicional` |
| **Espaço** | local; atributo `categoria: festa \| hospedagem` |
| **Hospedagem** | produto ortogonal ligado a Espaços `hospedagem` |

**Depreciados (não usar em nenhum doc):** `venue` (→ Assunto tipo `espaço` / `subjects[]`); "intenção × unidade" (→ "Molde × Assunto × Objetivo").

---

## 7. Log de decisões & diferidos (fonte única)

**Decisões (todas fechadas, exceto diferidos):**

| ID | Decisão | Status |
|---|---|---|
| D-1 | Build **híbrido**: custom no diferencial (site, cola Kommo/loop, Tracker Hub); plataforma madura no commodity — **Payload CMS** (admin/conteúdo; emenda 02 §2.2: tipo novo = código, instância = dado). **Revalidada 2×**: contra Sanity (SaaS/Content Lake, teto de uso, assento) e contra o mercado 2026 (Strapi, Directus, Storyblok, SaaS estruturados) — Payload confirmado em definitivo | **fechada** |
| D-2 | **Replit** como base (protótipo e produção inicial) + **Cloudflare** na frente; **site público server-rendered em Astro** (artifact próprio; `api-server` intacto); revisita-se na escala — gatilho de revisita definido (auditoria growth jun/2026, fecha 99 §3.8): p95 de TTFB de LP > 600 ms por 7 dias · qualquer incidente de perda de eventos na ingestão · custo mensal fora do plano | **fechada** |
| D-3 | **PostHog Cloud**: captura, store, funis, replay, flags/experimentos **e Destinations** (dispatcher). Cloud (não self-host): o self-host exige stack ClickHouse/Kafka e só é recomendado até ~300k eventos/mês — incompatível com o perfil de operação. Captura permanece **first-party** via proxy pelo domínio próprio. **Self-host fica como fallback documentado** se o build de LGPD (D-5) exigir dado em casa. Revalidada contra o mercado 2026 (Amplitude/Mixpanel, Matomo/OpenPanel, Clarity/Hotjar, GrowthBook/Statsig, Segment/RudderStack): nenhum entrega o pacote com identidade única; frankenstack rejeitado. Catálogo de Destinations a confirmar na implementação; fallback via webhook→api-server (05 §8) | **fechada** |
| D-4 | CRM = **Kommo** (bidirecional + loop fechado) | **fechada** |
| D-5 | LGPD/consentimento | **diferida** (build na etapa final; ganchos ativos) |
| D-6 | WhatsApp via **Kommo** (Business API) | **fechada** |
| D-7 | **Greenfield:** o implementado em `artifacts/valeverde` é protótipo/implementação de referência, não base de migração. D-1 reconfirmada; Fase 0 = build; ~~`CLAUDE.md` é a fonte única de instruções do agente~~ **(emendado por D-16: a fonte única passa a ser `AGENTS.md`; `CLAUDE.md`/`replit.md`/`.cursor/rules` são ponteiros)** | **fechada** |
| D-8 | **Cache × A/B:** LPs **com experimento ativo** ficam fora do full-page cache (SSR a cada hit; assets sempre no CDN); LPs sem experimento = cache total. **Evolução de etapa final:** edge logic (Worker) com variante na chave de cache | **fechada** |
| D-13 | **Captura multi-plataforma (varredura competitiva):** (a) **ingestão de lead forms nativos** — Meta Instant Forms/Lead Ads, TikTok Lead Generation, Google Lead Form assets, Pinterest Lead Ads entram por webhook → api-server → dedup D-11 → card no Kommo com origem etiquetada; o loop fechado os cobre automaticamente (dispara por card). (b) **sync de audiências** — exportação de segmentos do funil (ex.: Ganho, lead qualificado) como custom audiences com PII hasheada (Meta/Google/TikTok) para semear lookalikes. Adições menores: Objetivo `agendar_visita` no registro (02), `VideoObject` no structured data (03/07), `origin_channel: marketplace` (04) | **fechada** |
| D-12 | **Auth:** admin = **auth nativa do Payload** (users collection + RBAC do 06 — incluída na D-1, sem provedor externo). Serviço-a-serviço = JWT do Payload validado pelo api-server (segredo via secrets) para chamadas com contexto de usuário + tokens de serviço escopados para jobs. `/collect` = público com rate-limit (by design). **Auth de usuário final: fora do escopo v1**; se nascer portal de assessores / área do casal, **Clerk** é o candidato designado (Replit-managed ou externo) — staff e clientes permanecem domínios de identidade separados | **fechada** |
| D-11 | **Identidade e dedup de lead:** Kommo é a **fonte de verdade** do lead (`app.leads` é log operacional para atribuição/painel/loop). Chave = **telefone E.164**. Política **upsert-e-anexar**: telefone novo → cria card; card aberto → anexa interação (nota com LP/xcode) + notifica SDR, sem card novo; card Perdido/antigo → reabre ou recria conforme estágio (≙ "Pipeline Recuperável" — comportamento exato a validar com a SDR na implementação). Log guarda todas as conversões (first/last-touch preservados). **Loop fechado dispara por card, não por interação** (sem conversão duplicada para os ads) | **fechada** |
| D-10 | **Mídia/imagem:** originais em **Cloudflare R2** (S3-compatível, sem egress fee, via plugin de storage do Payload — nunca no filesystem do Replit); derivados via **Cloudflare Images** (resize/AVIF/WebP on-the-fly na URL — foto subida no admin está otimizada no site sem rebuild). Zero provedor novo: tudo no edge que já está na frente do site (D-2) | **fechada** |
| D-9 | **Banco:** um Postgres, **dois schemas** (`payload` = conteúdo, dono Payload; `app` = operacional, dono api-server/Drizzle). Cada ferramenta migra só o próprio schema; **nenhuma FK atravessa schemas** (referência por id, validada na aplicação). Comunicação entre runtimes é por API (OpenAPI), nunca lendo tabela alheia | **fechada** |
| D-14 | **Atribuição de plataforma** (auditoria growth jun/2026): (a) **click IDs** (`fbclid`→`fbc`/`fbp`, `gclid`, `ttclid`, `epik`) capturados em cookie first-party junto de UTM/xcode e presentes no schema de evento (05 §4) e no contrato de lead (04 §7) **desde a Fase 1** — click ID não tem retrofit; (b) **CTWA como caminho de primeira classe** (05 §9.3) — **validado em 12/06/2026** (doc oficial Kommo): a Kommo não expõe `ctwa_clid`; desenho v1 = UTMs nativos no Tracking data (mesmo Business Manager) + loop casado por telefone + Conversion API da Kommo avaliada em sandbox; captura própria do `referral` (Cloud API/BSP) só atrás de gatilho de escalada; (c) **valores de conversão por faixa** (matriz M-02) em `lead_qualificado`/`ganho` p/ value-based bidding — telemetria server-side às plataformas, não comunicação: **INV-05 intacto** (aval do fundador); (d) **SLA de qualificação ≤ 72h** (nuance a validar com a SDR) p/ o sinal cair na janela de otimização; otimização primária em `lead` (volume), qualificado como sinal secundário; (e) **eventos de visita** (`visita_agendada` · `visita_realizada` · `no_show`) no catálogo (05 §13) — funil M-04 mensurável ponta a ponta | **fechada** |
| D-15 | **Split de ingestão** (resolve 99 §2.2.7): analytics do PostHog entra por **proxy reverso no Cloudflare** (domínio first-party → PostHog Cloud, padrão suportado pelo PostHog), **sem passar pelo api-server**; o `/collect` (api-server) fica com **eventos de negócio** (lead, conversões, server-side) e a cola Kommo. Disponibilidade do analytics desacoplada do runtime Express/Replit (INV-08) | **fechada** |
| D-16 | **Governança multi-agente (emenda à D-7):** o build inicial é delegado a **Cursor Composer 2.5** e **Replit Agent**, com Claude Code em revisão/gates. A fonte única de conduta deixa de ser o `CLAUDE.md` e passa a ser o **`AGENTS.md`** (tool-neutral, padrão aberto lido nativamente pelo Cursor; o Replit lê por `replit.md`, que se reescreve sozinho — pré-semeado para não se auto-governar). `CLAUDE.md`, `replit.md` e `.cursor/rules/*` são **ponteiros** com resumo dos invioláveis inline — em conflito, o `AGENTS.md` vence. **Faixas:** Composer = `site/`+`admin/`; Replit Agent = `api-server/`+infra; encontro só em `packages/contracts` (gated por CODEOWNERS). **Enforcement por máquina, não por prosa:** monorepo + CI em todo PR (typecheck/lint/dependency-cruiser/test/build/Lighthouse/axe) + `pnpm verify` como DoD — Fase 0a "guardrails como código", entregue **antes** de delegar features (0b). **Sem branch protection mecânica** (decisão do fundador): branch+PR é convenção, check de CI vermelho é bloqueio. Faixas ajustáveis em `docs/tasks/fase-0.md` | **fechada** |
| D-17 | **Painel como single pane of glass — ingestão de reporting de plataforma (auditoria growth jun/2026):** o Tracker Hub é o **ponto único de leitura**; o time não tabula entre Meta/Google/Pinterest/TikTok/YouTube pra cruzar número. Duas camadas distintas: **(L1) diferencial, já nosso** — atribuição closed-loop *por card* (lead→qualificado→visita→ganho + valor) por canal/UTM (05 §12), custom, nada off-the-shelf faz; **(L2) commodity, novo** — reporting das plataformas (investimento, impressões, cliques, conversas iniciadas, lacuna de abandono CTWA) puxado via API de cada plataforma (*pull* — oposto das Destinations, que são *push*). **Escopo faseado (D-1 vale — não hand-buildar o commodity):** Fase 3 = a fatia fina que se junta ao diferencial — **investimento por canal/dia** blendado com qualificado+valor → **CAC e custo-por-lead-qualificado por canal** no painel (slice pequeno e estável de cada API, vale possuir porque cruza com o que é nosso); a superfície completa de reporting = preferir **connector/ELT** (Funnel/Supermetrics/Windsor) ou reporting nativo, **nunca N integrações mantidas à mão** — build-vs-buy decidido na Fase 3 com **custo como input** (liga 99 §3.5). **Guardrail (liga 2.3.2):** número reportado pela plataforma ≠ número nosso (modelos/janelas de atribuição diferentes) — o painel **rotula a fonte** de cada métrica; jamais somar "conversões" entre plataformas nem comparar com nossos cards como mesmo denominador. **Inclinação do fundador (13/06, não travada):** Nível 2 **PostHog-first** — convergir reporting no PostHog (já D-3), com **check de cobertura de ingestão de custo na Fase 1** (especialmente Pinterest/TikTok no Brasil); se furar, **Windsor.ai** como connector barato canalizado ao pane, e Looker Studio como stopgap grátis no lado Google. A decisão fecha na Fase 3 com o custo na mão. Spec em 05 §12.1; render no Tracker Hub (06 §3.2) | **fechada** |

**Diferidos (com gancho reservado):**
- **Join key — value-mapping:** diferido p/ implementação final. Campo `correlation_id`/`xcode` **reservado** no evento e no contrato de lead.
- **LGPD:** build diferido. Ganchos reservados: campo `consent` (pass-through) + opt-in mínimo no form.
- **Mapa 301 (migração do site atual):** o domínio tem site no ar com posts de blog indexados e com performance razoável. Diferido para a **migração final/cutover**: inventariar URLs indexadas (foco no blog) e publicar o mapa de 301 junto da virada. Baixa prioridade declarada pelo fundador; o gancho é a tarefa registrada no 03 §4.
- **Migração cache (a):** edge logic com variante na chave de cache (D-8) — etapa final.

**Perguntas de domínio — todas resolvidas (respostas incorporadas ao 01):**
1. Camada `Tipo de Evento ▸ Pacote ▸ Serviços ▸ Espaço` — **confirmada**.
2. `Espaço.categoria: festa|hospedagem` — **cobre os 5**.
3. `papel` é atributo **do Serviço**; valores **`padrão | adicional`** (terminologia validada); relação Pacote×Serviço fora da plataforma.
4. **Autoral não é nível de Pacote** — formato excepcional, vendável como campanha (ex.: "Festas totalmente customizadas").
5. Tipos de evento **todos vendáveis hoje** (registro ativo); verticalização é organizacional/futura, atrás de gate.
6. Sem Domain Map formal a reconciliar; a camada estrutural fica registrada como input (01 §2).

---

## 8. Estado

Conjunto 00–08 consistente + camada de marca integrada (§1). **Documentação completa para build** (pendente apenas o veto do fundador sobre 09/AGENTS.md/critérios de aceite): decisões D-1..D-17 fechadas, varredura competitiva incorporada, critérios de aceite por fase no 03 §7.1, engenharia no 09, conduta do agente no AGENTS.md (D-16). Diferidos de etapa final com gancho: LGPD, join key, mapa 301, edge-cache de variante. Próximo passo: commitar `docs/` + `AGENTS.md` no repositório e iniciar a Fase 0 no agente construtor.

**Jun/2026 — auditoria adversarial de growth incorporada (99 §8):** D-14 (atribuição de plataforma) e D-15 (split de ingestão) no log; roadmap resequenciado (Google antecipado via import GA4, Pinterest rebaixado a opcional, experimentos de LP atrás de gate de volume — 08 §7); SEO local elevado a critério de fase (03 §7.1); sync de audiências condicionado ao opt-in mínimo desde o dia 1 (05 §9.2); regra de canônico anti-canibalização (04 §9); inventário de conteúdo aberto em `docs/conteudo/inventario.md` com critério de Fase 0; **D-17 (single pane of glass — painel ingere reporting de plataforma, inclinação PostHog-first)** e desenho v1 do CTWA validado com a doc da Kommo (05 §9.3). Único 🔴 remanescente: preenchimento de dono/prazo do inventário de conteúdo (fundador).

**Jun/2026 — auditoria adversarial de delegação multi-agente incorporada (D-16):** build delegado a Cursor Composer + Replit Agent; `AGENTS.md` vira fonte única tool-neutral (ponteiros em `CLAUDE.md`/`replit.md`/`.cursor/rules/*`); faixas por runtime; **Fase 0a "guardrails como código"** (monorepo + CI com travas de fronteira + `packages/contracts` keystone + isolamento de schema no nível do banco) entregue antes de delegar features (0b); sem branch protection mecânica (convenção + CI como bloqueio). Work-orders por tarefa em `docs/tasks/`. Decisões D-1..D-17 fechadas.
