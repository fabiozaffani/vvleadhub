# Design System — Regras rígidas (FAZER / NUNCA FAZER)

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Regras rígidas do sistema visual aplicado. A visão coesa está em [`system/design-system.md`](../../system/design-system.md). O detalhe de cada regra vive nas specs irmãs: cor/layout em [`tokens.md`](tokens.md), tipografia em [`tipografia.md`](tipografia.md), componentes em [`componentes.md`](componentes.md), movimento em [`movimento.md`](movimento.md), imagem em [`imagem-fotografia.md`](imagem-fotografia.md).

---

## Fazer

- Usar creme/off-white como fundo dominante; verde e dourado como destaque.
- Manter no máximo 3 cores por seção.
- Botões em pílula (~30px de raio).
- Headings em Playfair Display; corpo em Work Sans.
- Espaço em branco generoso; separadores finos ou por cor de fundo.
- Mobile-first em tudo que é público.
- Fotografia colorida, sangrada, sem distorção.
- Itálico para descrições e nomes de espaços.
- Sempre fornecer indicador de foco visível (`.vv-focus` / `-dark` / `-light`) em CTAs e links.
- Respeitar `prefers-reduced-motion` (e dar override de transform a stills animadas).

## Nunca fazer

- **Emojis** em qualquer lugar da UI.
- **Ícones** representativos (garfo, taça, coração) — a marca não usa ícones decorativos desse tipo.
- **Ilustrações ou desenhos.**
- **Texturas artificiais ou padrões geométricos.**
- **Bordas decorativas complexas.**
- **Cores vibrantes/saturadas.**
- Mais de **3 cores na mesma seção**.
- Fundos fora de **creme/off-white ou verde**.
- **Negrito excessivo** no corpo de texto.
- **Grades complexas/assimétricas** ou elementos sobrepostos sem intenção.
- **Margens muito apertadas.**
- **Filtros artificiais** nas fotos.
- **Imagens de banco genéricas.**
- Preto como cor base (só em contexto de elegância/nightlife).
- Itálico em informações funcionais (preços, datas, botões, labels).
- Alterar as fontes de `index.css` invocando a versão original do guia de marca (Playfair Display + Work Sans é o canon — ver [`tipografia.md`](tipografia.md) e CONTEXTO-IA §5).
