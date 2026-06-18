# Gestão de registros (Assuntos, Tipos, Moldes)

**Camada:** spec · **Domínio:** admin · **Origem:** 06-admin-cms.md (§5) · **Tom:** trabalho

O registro de Assuntos é a superfície do admin onde se instanciam as primitivas da plataforma (`specs/plataforma/primitivas.md`) como dado, sem deploy. É **fonte única com o domínio**: espelha o Modelo de Domínio (`business/comercial/_dominio.md`) — não inventa vocabulário.

---

## 5. Gestão

- **Criar/editar** Assunto = preencher o schema do seu TipoDeAssunto. Sem deploy.
- **Descontinuar** Assunto = `status: descontinuado` → LPs vinculadas em despublish/redirect automático (`specs/plataforma/ciclo-de-vida.md`). Nunca página órfã indexada.
- **TipoDeAssunto** novo exige schema + comportamento distintos (guardrail anti-sopa — `specs/plataforma/primitivas.md`). Emenda da Fundação (`specs/plataforma/primitivas.md`): instâncias = dados (sem deploy); **TipoDeAssunto novo = collection nova = código** (PR pequeno, evento raro — trade-off aceito).
- **Fonte de verdade:** reflete o domínio (`business/comercial/_dominio.md`). "Buffet" no admin é a representação do domínio Buffet.
- Registro inicial (`business/comercial/_dominio.md`): `espaço` (`categoria: festa|hospedagem`), `serviço` (`papel: padrão|adicional`), `campanha` (`período` + `relacionados[]`).
