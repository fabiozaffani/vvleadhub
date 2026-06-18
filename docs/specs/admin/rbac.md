# RBAC (papéis e access control)

**Camada:** spec · **Domínio:** admin · **Origem:** 06-admin-cms.md (§6) · **Tom:** trabalho

Marketing edita conteúdo; observabilidade/sistema/teste de integração ficam com Admin. O access control é nativo do Payload (D-12) — sem provedor externo de auth.

---

## 6. Papéis

| Papel | Pode | Não pode |
|---|---|---|
| **Marketing** | LPs, posts, experimentos, links de campanha, inspetor de eventos | credenciais; observabilidade de sistema; modo teste/replay |
| **Admin** | tudo + credenciais/integrações + usuários + Sistema/Observabilidade + modo teste/replay | — |
| **Editor de conteúdo** | posts e blocos | publicar integrações, flags |
| **Leitura** | painel de mensuração (`specs/eventos/painel.md`) e visão de publicado | editar |

Auditoria de ações sensíveis (credencial, integração, flag, replay).

---

## 6.1 Mecanismo (D-12)

Os papéis acima são o access control nativo do Payload (users collection própria — sem provedor externo de auth). Views do Tracker Hub chamam o api-server encaminhando o JWT do Payload, validado lá via segredo compartilhado; jobs usam tokens de serviço escopados.

Auth de usuário final (portal de assessores, área do casal) está **fora do escopo v1** — Clerk é o candidato designado se/quando nascer, mantendo staff e clientes em domínios de identidade separados.
