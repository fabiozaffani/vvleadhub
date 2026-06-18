# Arquitetura de Conteúdo — Clusters

**Camada:** spec · **Domínio:** blog · **Origem:** 07-blog.md · **Tom:** trabalho

---

## Clusters

- **Cluster = dado** (não enum): um tema-pilar + N posts satélite.
- **Pilar:** página/post abrangente sobre o tema (ex.: "como planejar um casamento no interior").
- **Satélites:** posts específicos que linkam de volta ao pilar e entre si.
- **Internal linking** orienta autoridade para os pilares e dos pilares para as LPs (via `assuntos_relacionados`).
- **Formato âncora: "casamentos reais"** (auditoria growth — ver `discovery/auditoria-pre-build.md`) — um casamento real por post: o espaço, a história do casal, a experiência conduzida. É simultaneamente o melhor conteúdo de busca do segmento (casais pesquisam o espaço pelo nome + "casamento real"), prova social viva e matéria-prima de nutrição via Kommo. Cada post referencia o Assunto `espaço` correspondente (internal linking automático para a LP). **Exige termo de uso de imagem do casal** — item do inventário de conteúdo (`roadmap/inventario-conteudo.md`); sem termo, não publica.

---

## Relação Blog ↔ Assunto ↔ LP

O blog é a camada de descoberta; a LP é a de conversão. A ligação é dado:

- Post sobre gastronomia → `assuntos_relacionados: [Gastronomia (serviço)]` → CTA/links para a LP de Gastronomia.
- Post sobre um espaço → linka a LP daquele espaço.
- Quando um Assunto é descontinuado (ver `specs/plataforma/ciclo-de-vida.md`), links para ele entram em redirect — sem link quebrado.

O modelo de dados que sustenta essas ligações (`assuntos_relacionados[]`, `lps_relacionadas[]`) está em `specs/blog/modelo-post.md`. A conversão a partir desses CTAs está descrita em `system/blog.md` §9.
