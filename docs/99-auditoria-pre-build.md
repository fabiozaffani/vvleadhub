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
| 1.4 | **Inventário de conteúdo inexistente** — a maior dependência não-técnica: a IA constrói a máquina, mas **não pode inventar** copy em tom de marca, fotos reais dos espaços (o §5 do Contexto proíbe banco de imagens), depoimentos, vídeos, textos institucionais. Sem um inventário (o que existe, o que falta, quem produz, até quando), a Fase 0 entrega um site lindo e vazio. | 🔴 | workstream paralelo (não é doc técnico) |
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
| 2.2.7 | **Proxy do collector** — o desenho manda eventos a `/collect` (api-server) que repassa ao PostHog. Validar: proxy reverso simples ou SDK apontado a host próprio? Carga no api-server? | 🟡 F1 | 05 |

### 2.3 Dados, leads & integrações
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.3.1 | ~~Dedup/merge de lead~~ — **RESOLVIDO (D-11):** Kommo fonte de verdade; telefone E.164 como chave; upsert-e-anexar; loop por card. Aplicado em 04 §7 e 05 §9. *Nuance de reativação a validar com a SDR na implementação.* | ✅ | fechado |
| 2.3.2 | **Leads off-site invisíveis ao painel** — os fluxos de Instagram DM → Kommo (mapas de growth) nunca tocam o site: não geram evento web. O funil M-04 no painel (05 §12) vai **subnotificar** por desenho. Não é defeito, mas precisa estar explícito para ninguém comparar números errados. | 🟡 F3 | 05 §12 (nota) |
| 2.3.3 | **Tabela de roteamento WhatsApp** — qual número recebe o handoff de cada LP/espaço/campanha (por SDR? por espaço?). Os mapas dizem "WhatsApp da SDR"; a plataforma precisa da tabela como dado (admin). | 🟡 F2 | 04 + 06 |
| 2.3.4 | **Especificação formal do xcode** — a taxonomia `CP-X-GRL-SEG-…` é citada mas nunca spec'ada (gramática dos segmentos). O gerador de links (06 §7) não pode ser construído sem ela. | 🟡 F2 | 06 §7 (anexo) |
| 2.3.5 | **Webhooks do Kommo: confiabilidade** — entrega garantida? Reprocessamento se a cola estiver fora? (a fila/dead-letter cobre o lado nosso; falta validar o lado Kommo: re-tentativa, assinatura/segurança do webhook). | 🟡 F3 | 05 §9 |
| 2.3.6 | **Notificação speed-to-lead: canal e provedor** — "notificação instantânea ao SDR" sem definir o meio (WhatsApp? e-mail? push do Kommo?) nem provedor de e-mail transacional, se houver. | 🟡 F2 | 04 §5 |

### 2.4 Qualidade transversal
| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 2.4.1 | ~~Acessibilidade~~ — **ENTREGUE** (09 §8: alvo WCAG 2.1 AA + regra do dourado formalizada + axe no CI). *Levar a regra do dourado também para as Design Guidelines (edição da camada de marca — dono: fundador).* | ✅ | fechado |
| 2.4.2 | ~~SEO de migração~~ — **RESOLVIDO (resposta do fundador):** há site no ar com blog indexado de performance razoável → **mapa de 301 obrigatório, diferido para o cutover** (tarefa registrada no 03 §4 e no log de diferidos do 00). Baixa prioridade declarada. | ✅ (diferido c/ gancho) | fechado |
| 2.4.3 | **SEO local** — nada sobre Google Business Profile por espaço, NAP consistente, reviews — para "espaço de casamento em <região>", o pack local pode valer mais que o orgânico tradicional. | 🟢 | 07 (ou doc de SEO ops) |

---

## 3. Parte Estratégica — funciona nesse formato? O que deixamos passar

| # | Lacuna | Sev | Destino |
|---|---|---|---|
| 3.1 | ~~Timing da campanha Retrofit~~ — **FORA DE ESCOPO (regra do fundador, 00 §4.9):** os mapas de growth serviram para entender o processo, não como restrição operacional. Operação/campanhas se resolvem pós-go-live. O roadmap segue como está. | ✅ | fechado |
| 3.2 | ~~Licença da Sloop Script Pro~~ — **RESOLVIDO por exceção registrada** (Design Guidelines §3): corpo em **Work Sans** (open), Sloop **fora de uso**, decisão registrada que não se reverte invocando o brand guide. Docs 03/07 corrigidos para refletir. *Só reabre se a marca decidir adotar a Sloop na web — aí a licença volta a ser pré-requisito.* | ✅ | fechado |
| 3.3 | **Capacidade de produção de conteúdo** — reclassificado **pós-go-live** (regra de escopo 00 §4.9). Permanece como aviso: estrutura sem conteúdo fica ociosa. | 🟢 pós-go-live | operação |
| 3.4 | **RACI dos papéis** — reclassificado **pós-go-live** (00 §4.9). O RBAC (arquitetura) está no 06; o mapeamento papel→pessoa é operação. | 🟢 pós-go-live | operação |
| 3.5 | **Custos operacionais** — nenhum modelo: PostHog (cloud por evento vs. self-host + ops), Replit produção, Cloudflare (Workers/R2/Images se adotados), plano do Kommo com API/webhooks, custo por conversa do WhatsApp. Nada disso muda a arquitetura, mas muda o D-3 (cloud vs self-host) e o bolso. | 🟡 F1 | 00 §6 (sub-decisões) |
| 3.6 | **Páginas legais no lançamento** — LGPD (build) está diferida, ok; mas política de privacidade/termos como *páginas* tendem a ser esperadas num site institucional desde o dia 1 (e exigidas por plataformas de ads para aprovar campanhas — Meta costuma checar política de privacidade no domínio). Conteúdo é jurídico, não técnico. | 🟡 F0 | conteúdo jurídico + 03 |
| 3.7 | **Métricas-alvo do site** — reclassificado **pós-go-live** (00 §4.9): primeiro trimestre = coleta de baseline, decisão consciente. | 🟢 pós-go-live | operação |
| 3.8 | **Critério de "revisitar o hosting"** — D-2 diz "revisita-se na escala" sem definir o gatilho (tráfego? p95 de latência? custo?). Gatilho vago = decisão adiada para sempre. | 🟢 | 00 §6 |

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
| 6.4 | replit.md vs CLAUDE.md | **CLAUDE.md é a fonte única** de instruções do agente no repo novo. Se o protótipo continuar existindo em paralelo, o `replit.md` dele não governa o build. |
| 6.5 | "Variant B" ad-hoc | **Moot** — variantes do protótipo não migram; o que valer a pena renasce dentro do motor do 08, medido. |
| 6.6 | Blog sem imagens de capa | **Permanece** — reforça 1.4 (inventário de conteúdo), independente de greenfield. |

**Nota sobre as Design Guidelines em modo greenfield:** elas permanecem fonte de verdade **visual** (tokens, componentes, movimento, regras), incluindo as exceções registradas (Work Sans). Os caminhos de arquivo citados nelas (`artifacts/valeverde/src/index.css`, `replit.md`) leem-se como ponteiros para a **implementação de referência**, a reimplementar na stack nova (Astro/Payload) com paridade.

## 6. Varredura competitiva (lead-gen multi-plataforma) — incorporada

Varredura de mercado contra o objetivo de maximizar geração de leads (Meta/IG, Google/YouTube, TikTok, Pinterest) validou a arquitetura (CAPI+loop fechado, CTWA, speed-to-lead, CWV = estado-da-arte) e identificou 5 gaps, todos incorporados via **D-13**: ingestão de lead forms nativos (05 §9.1), sync de audiências (05 §9.2), Objetivo `agendar_visita` (02), `VideoObject` (03/07), `origin_channel: marketplace` (04).

## 7. Resolução sugerida (ordem)

1. ~~Revalidações brownfield~~ ✓ resolvidas por decisão (greenfield — §5).
2. **Decisões 🔴 de uma sentada:** 2.2.1 (cache×A/B), 2.2.2 (banco), 2.2.3 (mídia/R2), 2.3.1 (dedup de lead), 2.4.2 (há site no ar no domínio? → mapa 301), 3.1 (Retrofit).
3. **Escrever o doc `09-engenharia.md`** (estrutura do repo, fronteiras com trava, testes, CI/Lighthouse, ambientes, secrets, observabilidade) + **`CLAUDE.md`** + **critérios de aceite por fase** (emenda no 03).
4. ~~Adicionar contexto ao docs/~~ ✓ feito (camada de marca). Abrir o **inventário de conteúdo** como workstream paralelo.
5. Itens 🟡 entram como notas nos docs donos com a fase marcada; 🟢 ficam aqui até a hora.

> **Regra do processo (definida pelo fundador):** preenchimento de lacunas = conhecimento de negócio dele + best practices de mercado, **sempre com aval final dele** antes de virar canônico. Nenhuma resolução entra nos docs 00–08 sem esse aval.
