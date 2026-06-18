# Admin/CMS — visão de domínio

**Camada:** system · **Domínio:** admin · **Origem:** 06-admin-cms.md · **Tom:** trabalho

## 0. Responsabilidade única

O **control plane** — onde tudo é criado, editado, configurado, observado e testado **sem deploy**. Seu núcleo é o **Tracker Hub**. Consome as primitivas da plataforma (`system/plataforma.md`); **renderiza/opera** capacidades dos eventos (`system/eventos.md`); handoff para Blog (`system/blog.md`) e Experimentação (`system/experimentacao.md`).

O admin é o **Payload CMS** (D-1, fechado), Next-hosted, no monorepo (`system/arquitetura.md`). Payload entrega pronto o commodity: collections code-first, **editor block-based** (o modelo de Bloco da plataforma mapeia direto nos blocks do Payload), versionamento/draft/publish, live preview, RBAC, mídia, APIs. O **Tracker Hub** entra como **views custom (React)** dentro do admin do Payload, consumindo PostHog (API/embed) e a cola fina do api-server.

**Governança:** o Tracker Hub é superfície de operação — renderiza/invoca capacidades donas de outros domínios (eventos = `system/eventos.md`; registros = `system/plataforma.md` / `business/comercial/_dominio.md`; status = `system/arquitetura.md`). Não redefine nada.

## 1. Princípios

1. **Tudo é dado.** LPs, posts, registros (TipoDeAssunto/Assunto/Objetivo/Molde), experimentos, flags, destinos e textos de consentimento são editáveis — não código. (Emenda da Fundação: **TipoDeAssunto novo = collection nova = código**, PR pequeno e evento raro — ver `specs/admin/registros.md`.)
2. **Edição brand-locked.** O editor não permite sair dos tokens de design (`system/design-system.md`) nem dos guardrails de copy (CONTEXTO-IA §4). Marca por construção.
3. **RBAC.** Marketing edita conteúdo; observabilidade/sistema/teste de integração ficam com Admin (ver `specs/admin/rbac.md`).
4. **Fonte única com o domínio.** O registro de Assuntos espelha o Modelo de Domínio (`business/comercial/_dominio.md`) — não inventa vocabulário.
5. **Um olhar, três perguntas.** O Tracker Hub responde: *o que está publicado?* (conteúdo), *o que está implementado e saudável?* (sistema), *o que está acontecendo agora?* (eventos).

## 2. O que se administra (inventário)

| Área | Conteúdo | Origem/handoff |
|---|---|---|
| **Registros** | TipoDeAssunto, Assunto, Objetivo, Molde de LP | base da plataforma / espelho do domínio — `specs/admin/registros.md` |
| **LPs & Bio Pages** | editor block-based, variantes, publish | `specs/admin/editor-lp.md` · spec da LP em `system/landing-pages.md` |
| **Blog** | posts, clusters, SEO | `system/blog.md` |
| **Experimentos & Flags** | A/B, feature flags | `system/experimentacao.md` |
| **Integrações** | credenciais + toggles + modo teste | config dos eventos — `system/eventos.md` |
| **Links de campanha** | `xcode`/UTM + redirect WhatsApp | `specs/admin/links-campanha.md` |
| **Consentimento** | textos e categorias (LGPD) | diferido (D-5) |
| **Usuários & papéis** | RBAC | `specs/admin/rbac.md` |
| **Tracker Hub** | console: conteúdo + sistema + eventos realtime/teste | `specs/admin/tracker-hub.md` |

O **Tracker Hub** é um painel único com três áreas, cada uma declarando de quem são os dados/ações: Conteúdo & Operação (gestão), Sistema & Observabilidade (o que está implementado), Eventos & Integrações (o que está acontecendo agora / teste). Detalhe em `specs/admin/tracker-hub.md`.

## 9. Relação com os outros domínios

- **Consome plataforma (`system/plataforma.md`):** Molde/Assunto/Objetivo/Bloco são as primitivas que o admin instancia.
- **Opera eventos (`system/eventos.md`):** inspetor realtime, modo teste, saúde de integração e replay são capacidades dos eventos; o admin renderiza saúde/status.
- **Renderiza arquitetura (`system/arquitetura.md`):** status de sistema, CWV, infra.
- **Reflete comercial (`business/comercial/_dominio.md`):** registro de Assuntos = espelho do domínio.
- **Handoff blog/experimentação (`system/blog.md` / `system/experimentacao.md`):** posts e experimentos têm specs próprias; o admin é o ponto de edição.

## 10. Decisões & diferidos

Ledger completo em `_decisoes.md`.

- **D-1** — fechado: Payload CMS como admin/CMS; Tracker Hub como views custom dentro dele.
- **D-12** — papéis pelo access control nativo do Payload (sem provedor externo de auth); ver `specs/admin/rbac.md`.
- **D-5** (LGPD) — textos/categorias de consentimento no admin; build diferido.

## 11. Validação contra invariantes VVF

- **Tom:** spec = trabalho · edição de copy do site = marca, brand-locked.
- **INV-09 (replicável entre unidades):** criar/descontinuar Assunto por dado.
- **INV-05/03/07/04:** lint + editor brand-locked protegem os eixos de copy (ver `specs/admin/links-campanha.md` e CONTEXTO-IA §4).
- **INV-08 (sem surpresas):** Tracker Hub dá visibilidade e teste de integração antes de confiar — reduz surpresa operacional.
- **Agnosticidade:** tudo é dado; CMS plugável; Hub opera capacidades, não as redefine.
- **Cornerstone #3:** RBAC + auditoria + consentimento editável.
