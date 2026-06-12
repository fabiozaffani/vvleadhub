# 06 · Spec — Admin/CMS

**Status:** v2 (D-1 fechado: Payload CMS) · **Camada de tom:** trabalho · **Depende de:** 02 (Fundação), 03 (Arquitetura), 05 (HUB)
**Responsabilidade única:** o **control plane** — onde tudo é criado, editado, configurado, observado e testado **sem deploy**. Seu núcleo é o **Tracker Hub** (§3). Consome as primitivas do 02; **renderiza/opera** capacidades do 05; handoff para 07 (Blog) e 08 (Experimentação).

> **Decisão fechada (00 §6):** o admin é o **Payload CMS** (Next-hosted, no monorepo — 03 §2). Payload entrega pronto o commodity: collections code-first, **editor block-based** (o modelo de Bloco do 02 mapeia direto nos blocks do Payload), versionamento/draft/publish, live preview, RBAC, mídia, APIs. O **Tracker Hub** entra como **views custom (React)** dentro do admin do Payload, consumindo PostHog (API/embed) e a cola fina do api-server.
> **Emenda da Fundação (02 §2.2):** instâncias = dados (sem deploy); **TipoDeAssunto novo = collection nova = código** (PR pequeno, evento raro — trade-off aceito).
> **Governança:** o Tracker Hub é superfície de operação — renderiza/invoca capacidades donas de outros docs (eventos = 05; registros = 02/01; status = 03). Não redefine nada.

---

## 1. Princípios

1. **Tudo é dado.** LPs, posts, registros (TipoDeAssunto/Assunto/Objetivo/Molde), experimentos, flags, destinos e textos de consentimento são editáveis — não código.
2. **Edição brand-locked.** O editor não permite sair dos tokens de design (§5 do Contexto) nem dos guardrails de copy (§4). Marca por construção.
3. **RBAC.** Marketing edita conteúdo; observabilidade/sistema/teste de integração ficam com Admin (§6).
4. **Fonte única com o domínio.** O registro de Assuntos espelha o Modelo de Domínio (01) — não inventa vocabulário.
5. **Um olhar, três perguntas.** O Tracker Hub responde: *o que está publicado?* (conteúdo), *o que está implementado e saudável?* (sistema), *o que está acontecendo agora?* (eventos).

---

## 2. O que se administra (inventário)

| Área | Conteúdo | Origem/handoff |
|---|---|---|
| **Registros** | TipoDeAssunto, Assunto, Objetivo, Molde de LP | base do 02 / espelho do 01 |
| **LPs & Bio Pages** | editor block-based, variantes, publish | spec no 04 |
| **Blog** | posts, clusters, SEO | spec no 07 |
| **Experimentos & Flags** | A/B, feature flags | spec no 08 |
| **Integrações** | credenciais + toggles + modo teste | config do 05 |
| **Links de campanha** | `xcode`/UTM + redirect WhatsApp | §7 |
| **Consentimento** | textos e categorias (LGPD) | diferido (D-5) |
| **Usuários & papéis** | RBAC | §6 |
| **Tracker Hub** | console: conteúdo + sistema + eventos realtime/teste | §3 |

---

## 3. Tracker Hub (console central)

O coração do admin. Um painel único com três áreas. Cada área declara **de quem** são os dados/ações (governança).

### 3.1 Conteúdo & Operação — *gestão*
Ponto de entrada para criar/editar e ver o estado do que é publicado:
- atalhos para o **editor de LP** (§4), **posts/blog** (07), **registros de Assunto** (§5), **experimentos/flags** (08), **links de campanha** (§7);
- visão do publicado: LPs ativas/expiradas, posts, Assuntos por tipo, experimentos rodando.
- *Dono:* 04/05/07/08 (o Hub agrega e linka).

### 3.2 Sistema & Observabilidade — *o que está implementado*
Visualização do estado real do sistema (read-only, sensível → Admin):
- **Estado dos dados:** contagem e listagem dos registros atuais (quantos Assuntos por tipo, LPs publicadas, posts, experimentos ativos, leads no período) — views sobre o modelo de dados (01/02/03).
- **Status do sistema:** saúde do site, do HUB, da fila e dos jobs; uptime; **CWV atual** vs. orçamento (03).
- **Usuários:** quem existe, papéis, sessões ativas, trilha de auditoria (§6).
- **Inventário de integrações:** cada destino conectado/erro/última sincronização (vem da saúde do 05 §11.3).
- *Dono:* 03 (infra/status) e 05 (saúde de integração); o Hub renderiza.

### 3.3 Eventos & Integrações — *o que está acontecendo agora / teste*
A parte "tracker" propriamente dita, operando as capacidades do 05 §11:
- **Inspetor de eventos em tempo real:** stream ao vivo dos eventos chegando no HUB (realtime tap — 05 §11.2), com filtro por tipo, sessão, Assunto, LP e flag `test`. É como você *vê* o rastreamento do site acontecendo.
- **Validação de integração (modo teste):** disparar um evento sintético (`test:true`) e acompanhar o **round-trip por destino** (Meta/GA4/TikTok/Pinterest/Kommo) — chegou? foi aceito? — **sem poluir dados reais** (05 §11.1). É o que valida uma integração antes de confiar nela.
- **Saúde dos destinos:** sucesso/erro de dispatch, latência, fila, retry, dead-letter (05 §11.3).
- **Replay/depuração:** reenviar um `event_id` para depurar (05 §11.4). Restrito a Admin.
- *Dono:* 05 (pipeline); o Hub opera via as capacidades expostas.

> Eventos de teste são **segregados de ponta a ponta** (flag `test` + endpoints de sandbox + namespace separado). Nunca entram em métricas, funis ou otimização de mídia.

---

## 4. Editor de LP (block-based)

- Adicionar/reordenar/preencher **Blocos**; vincular **Assunto(s)** (N:N) e **Objetivo**.
- **Preview** fiel mobile + desktop.
- **Variantes A/B** a partir de uma LP base (referência ao experimento no 08).
- **Publish/unpublish** com versionamento; **expiração** para Molde de campanha.
- Validação ao salvar: bloco só renderiza capacidade que o Assunto tem (02 §4); avisa slot com conteúdo ausente.
- **Níveis de edição visual (escopo declarado):** (1) **composição por blocos** — adicionar/reordenar por drag-and-drop: nativo, **na v1**; (2) **live preview** — iframe da página real (Astro, rota de draft/preview) atualizando durante a edição: **na v1**, critério de aceite da Fase 2; (3) **click-to-edit in-place** (overlay estilo Storyblok): **fora da v1** — no Payload é feature Enterprise; replicar custom só se a dor justificar, como evolução. Os níveis 1+2 são suficientes para o modelo brand-locked: marketing compõe a partir de blocos aprovados e vê o resultado real — liberdade visual total não é objetivo, é risco de marca.

---

## 5. Gestão de registros (Assuntos, Tipos, Moldes)

- **Criar/editar** Assunto = preencher o schema do seu TipoDeAssunto. Sem deploy.
- **Descontinuar** Assunto = `status: descontinuado` → LPs vinculadas em despublish/redirect automático (02 §5). Nunca página órfã indexada.
- **TipoDeAssunto** novo exige schema + comportamento distintos (guardrail anti-sopa — 02 §10).
- **Fonte de verdade:** reflete o domínio (01). "Buffet" no admin é a representação do domínio Buffet.
- Registro inicial (01): `espaço` (`categoria: festa|hospedagem`), `serviço` (`papel: mínimo|adicional`), `campanha` (`período` + `relacionados[]`).

---

## 6. RBAC (papéis)

| Papel | Pode | Não pode |
|---|---|---|
| **Marketing** | LPs, posts, experimentos, links de campanha, inspetor de eventos | credenciais; observabilidade de sistema; modo teste/replay |
| **Admin** | tudo + credenciais/integrações + usuários + Sistema/Observabilidade + modo teste/replay | — |
| **Editor de conteúdo** | posts e blocos | publicar integrações, flags |
| **Leitura** | painel de mensuração (05 §12) e visão de publicado | editar |

Auditoria de ações sensíveis (credencial, integração, flag, replay).

**Mecanismo (D-12):** os papéis acima são o access control nativo do Payload (users collection própria — sem provedor externo de auth). Views do Tracker Hub chamam o api-server encaminhando o JWT do Payload, validado lá via segredo compartilhado; jobs usam tokens de serviço escopados. Auth de usuário final (portal de assessores, área do casal) está fora do escopo v1 — Clerk é o candidato designado se/quando nascer, mantendo staff e clientes em domínios de identidade separados.

---

## 7. Geração de links de campanha

Resolve a pendência dos mapas de growth ("definir quem gera os links UTM"):
- Gera links com **`xcode`/UTM consistentes** (taxonomia `CP-X-GRL-SEG-…`) + **mensagem de redirect pro WhatsApp** da SDR.
- O `xcode`/`correlation_id` viaja LP → HUB (05) → Kommo. Automatiza o manual.

---

## 8. Lint de marca (futuro)

Checagem leve do copy contra os guardrails §4 (sem preço — INV-05; exclusividade pela história — INV-07; experiência integrada — INV-03; confiabilidade sem soar operacional — INV-04) ao salvar. Aviso, não bloqueio rígido na v1.

---

## 9. Relação com os outros docs

- **Consome 02:** Molde/Assunto/Objetivo/Bloco são as primitivas que o admin instancia.
- **Opera 05:** inspetor realtime, modo teste, saúde de integração e replay (§3.3) são capacidades do 05; renderiza saúde/status.
- **Renderiza 03:** status de sistema, CWV, infra.
- **Reflete 01:** registro de Assuntos = espelho do domínio.
- **Handoff 07/08:** posts e experimentos têm specs próprias; o admin é o ponto de edição.

---

## 10. Decisões & diferidos (fonte: 00 §6)

- **D-1** — **fechado: Payload CMS** como admin/CMS; Tracker Hub como views custom dentro dele.
- **D-5** (LGPD) — textos/categorias de consentimento no admin; build diferido.

---

## 11. Validação contra invariantes VVF

- **Tom:** spec = trabalho ✓ · edição de copy do site = marca, brand-locked ✓
- **INV-09 (replicável entre unidades):** criar/descontinuar Assunto por dado ✓
- **INV-05/03/07/04:** lint + editor brand-locked protegem os eixos de copy ✓
- **INV-08 (sem surpresas):** Tracker Hub dá visibilidade e teste de integração antes de confiar — reduz surpresa operacional ✓
- **Agnosticidade:** tudo é dado; CMS plugável; Hub opera capacidades, não as redefine ✓
- **Cornerstone #3:** RBAC + auditoria + consentimento editável ✓
