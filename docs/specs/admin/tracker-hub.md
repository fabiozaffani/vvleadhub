# Tracker Hub — console central do admin

**Camada:** spec · **Domínio:** admin · **Origem:** 06-admin-cms.md (§3) · **Tom:** trabalho

O coração do admin. Um painel único com três áreas. Cada área declara **de quem** são os dados/ações (governança) — o Hub é superfície de operação: renderiza/invoca capacidades donas de outros domínios, não redefine nenhuma.

O Tracker Hub entra como **views custom (React)** dentro do admin do Payload (D-1), consumindo PostHog (API/embed) e a cola fina do api-server. Ele responde, num só olhar, a três perguntas: *o que está publicado?* (conteúdo), *o que está implementado e saudável?* (sistema), *o que está acontecendo agora?* (eventos).

---

## 3.1 Conteúdo & Operação — *gestão*

Ponto de entrada para criar/editar e ver o estado do que é publicado:

- atalhos para o **editor de LP** (ver `editor-lp.md`), **posts/blog** (`system/blog.md`), **registros de Assunto** (ver `registros.md`), **experimentos/flags** (`system/experimentacao.md`), **links de campanha** (ver `links-campanha.md`);
- visão do publicado: LPs ativas/expiradas, posts, Assuntos por tipo, experimentos rodando.
- **Dono:** `system/landing-pages.md` / `system/eventos.md` / `system/blog.md` / `system/experimentacao.md` (o Hub agrega e linka).

---

## 3.2 Sistema & Observabilidade — *o que está implementado*

Visualização do estado real do sistema (read-only, sensível → Admin):

- **Estado dos dados:** contagem e listagem dos registros atuais (quantos Assuntos por tipo, LPs publicadas, posts, experimentos ativos, leads no período) — views sobre o modelo de dados (`business/comercial/_dominio.md` / `system/plataforma.md` / `system/arquitetura.md`).
- **Status do sistema:** saúde do site, do HUB, da fila e dos jobs; uptime; **CWV atual** vs. orçamento (`system/arquitetura.md`).
- **Usuários:** quem existe, papéis, sessões ativas, trilha de auditoria (ver `rbac.md`).
- **Inventário de integrações:** cada destino conectado/erro/última sincronização (vem da saúde — `specs/eventos/teste-realtime-saude.md`).
- **Marketing — single pane of glass (D-17, `specs/eventos/painel.md`):** painel unificado que **rotula a fonte de cada métrica** — L1 (nosso, por card: CAC e custo-por-lead-qualificado por canal, funil M-04) ao lado de L2 (reporting puxado das plataformas: investimento, impressões, cliques, abandono CTWA). Nunca soma conversões entre plataformas nem as compara com nossos cards como mesmo denominador. Tira o time do tab-hopping entre Meta/Google/Pinterest/YouTube.
- **Dono:** `system/arquitetura.md` (infra/status) e `system/eventos.md` (saúde de integração + reporting do painel); o Hub renderiza.

---

## 3.3 Eventos & Integrações — *o que está acontecendo agora / teste*

A parte "tracker" propriamente dita, operando as capacidades de confiabilidade/teste dos eventos:

- **Inspetor de eventos em tempo real:** stream ao vivo dos eventos chegando no HUB (realtime tap — `specs/eventos/teste-realtime-saude.md`), com filtro por tipo, sessão, Assunto, LP e flag `test`. É como você *vê* o rastreamento do site acontecendo.
- **Validação de integração (modo teste):** disparar um evento sintético (`test:true`) e acompanhar o **round-trip por destino** (Meta/GA4/TikTok/Pinterest/Kommo) — chegou? foi aceito? — **sem poluir dados reais** (`specs/eventos/teste-realtime-saude.md`). É o que valida uma integração antes de confiar nela.
- **Saúde dos destinos:** sucesso/erro de dispatch, latência, fila, retry, dead-letter (`specs/eventos/confiabilidade.md`).
- **Replay/depuração:** reenviar um `event_id` para depurar (`specs/eventos/confiabilidade.md`). Restrito a Admin.
- **Dono:** `system/eventos.md` (pipeline); o Hub opera via as capacidades expostas.

> Eventos de teste são **segregados de ponta a ponta** (flag `test` + endpoints de sandbox + namespace separado). Nunca entram em métricas, funis ou otimização de mídia.
