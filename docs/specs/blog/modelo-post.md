# Modelo de Post

**Camada:** spec · **Domínio:** blog · **Origem:** 07-blog.md · **Tom:** trabalho

> **Tom:** esta spec é trabalho. **Todo texto publicado no blog é tom de marca** (CONTEXTO-IA §4): sereno, acolhedor, segunda pessoa. Conteúdo de autoridade, sem perder a voz da marca.

---

## Estrutura do Post

```
Post{
  id,
  slug,
  título,
  subtítulo,
  hero (imagem colorida sangrada),
  corpo (rich-text),
  cluster_ref,
  assuntos_relacionados[],
  lps_relacionadas[],
  seo{ title, description, og, canonical },
  structured_data,
  status,
  publicado_em,
  atualizado_em
}
```

## Notas

- `assuntos_relacionados[]` aponta para Assuntos (espaço/serviço/campanha — ver `system/plataforma.md`) → habilita internal linking automático para as LPs daquele Assunto.
- `lps_relacionadas[]` define os CTAs de conversão do post (ver `system/blog.md` §9 e `specs/blog/clusters.md`).
- Imagens seguem as regras de imagem/fotografia do design system (`specs/design-system/imagem-fotografia.md`): coloridas, sangradas, sem banco genérico; P&B só para detalhe.

## Edição

Posts são criados/editados no admin (rich-text, mídia, campos de SEO, escolha de cluster e de Assuntos/LPs relacionados, preview, publish/versionamento). Detalhe do handoff em `system/blog.md` §10 e `system/admin.md`.
