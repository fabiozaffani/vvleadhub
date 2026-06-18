# SEO On-Page

**Camada:** spec · **Domínio:** blog · **Origem:** 07-blog.md · **Tom:** trabalho

---

## Structured data, canonical e sitemap

- **Structured data (JSON-LD):** `BlogPosting`/`Article`, `BreadcrumbList`, `ImageObject`; `FAQPage` quando houver FAQ; `VideoObject` quando houver vídeo (D-13 — ver `_decisoes.md`).
- Canonical em todo post · OG/Twitter cards · `sitemap.xml` e `robots.txt` automáticos.
- URLs limpas e estáveis: `/blog/{slug}` (slug não muda após publicar; mudança gera `301`).
- `hreflang` pt-BR (preparado para futuro internacional).
- Heading hierarchy semântica; alt text descritivo nas imagens.

A regra de canônico aqui é a do blog (um post = uma URL estável); a regra de canônico das LPs (um Assunto = uma página indexada) vive em `specs/landing-pages/seo-canonico.md`. SEO local (map pack, GBP, NAP) está em `specs/blog/seo-local.md`.
