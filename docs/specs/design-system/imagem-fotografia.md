# Design System — Imagem e fotografia

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Regras de tratamento de imagem e fotografia. A visão coesa do sistema visual está em [`system/design-system.md`](../../system/design-system.md). As regras rígidas de FAZER / NUNCA FAZER que tocam imagem estão consolidadas em [`regras-fazer-nunca.md`](regras-fazer-nunca.md).

---

- **Cores:** sempre coloridas para estrutura, natureza e gastronomia. **P&B apenas** para detalhes/momentos estéticos específicos.
- **Enquadramento:** imagens sangradas (full-bleed), **sem distorção** (sem esticar/achatar).
- **Sem filtros artificiais.** O hero usa apenas ajuste sutil de saturação/brilho (`saturate(0.84) brightness(1.02)`) — ver Ken Burns em [`movimento.md`](movimento.md).
- **Sem imagens de banco genéricas** — usar apenas as fornecidas.
- Posts de blog não têm imagem de capa nos dados (`coverImage` null); o front-end renderiza um **fallback em gradiente verde/dourado da marca**. O modelo de post vive em [`system/blog.md`](../../system/blog.md).
