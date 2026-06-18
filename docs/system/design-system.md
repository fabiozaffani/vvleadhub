# Design System — visão coesa

**Camada:** system · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Visão fina e coesa do sistema visual aplicado do VVLEADHUB: o que ele é, como as specs compõem o todo e onde está cada detalhe. **Agrega — não recopia.** O detalhe carregado vive nas specs de `specs/design-system/`. A identidade de marca conceitual (tom de voz, invariantes, paleta HEX canônica, tipografia da marca) é canon do vvcore, entregue por @import — ver CONTEXTO-IA §5.

---

## 1. Essência e look-and-feel

A interface traduz a marca VVF: **serena, calma, acolhedora, elegante e segura**. Toda decisão visual reforça curadoria e intencionalidade — nada parece acidental ou apressado. Princípio orientador: na dúvida, escolha a opção mais calma, mais clara e com mais espaço.

Os pilares do sistema visual e onde cada um se detalha:

- **Paleta restrita** — creme/off-white dominante; verde e dourado/champanhe como destaque; máximo de **3 cores por seção**. Cores canônicas, tokens HSL, cores fixas, dark mode, raio e layout em [`../specs/design-system/tokens.md`](../specs/design-system/tokens.md).
- **Tipografia** — Playfair Display (títulos) + Work Sans (corpo) como padrão canônico do app. Carregamento, hierarquia e a nota histórica da migração em [`../specs/design-system/tipografia.md`](../specs/design-system/tipografia.md).
- **Respiração** — espaço em branco generoso; nada de margens apertadas ou grades complexas. Regras de layout em [`../specs/design-system/tokens.md`](../specs/design-system/tokens.md).
- **Movimento sutil** — animações lentas e quase imperceptíveis (hover suave, Ken Burns de 28s); a marca é serena, nunca agitada. Ken Burns, reduced-motion e sticky CTA em [`../specs/design-system/movimento.md`](../specs/design-system/movimento.md).
- **Mobile-first** em todas as partes públicas (tudo exceto `/admin`): projetar para telas pequenas primeiro e progressivamente melhorar para breakpoints maiores. O admin é a exceção a esta regra.
- **Cantos arredondados e generosos** — botões em pílula (raio de 30px), conferindo suavidade. Componentes (botões, cards, foco, skip-link, Tiptap) em [`../specs/design-system/componentes.md`](../specs/design-system/componentes.md).

**Idioma da UI:** português brasileiro (pt-BR) em tudo. **Sem emojis** em nenhum lugar da UI. As regras rígidas de FAZER / NUNCA FAZER consolidadas estão em [`../specs/design-system/regras-fazer-nunca.md`](../specs/design-system/regras-fazer-nunca.md).

### Como as specs compõem o todo

| Spec | Carrega |
|---|---|
| [`tokens.md`](../specs/design-system/tokens.md) | Paleta canônica, tokens HSL (`:root`), cores fixas, dark mode, raio e layout |
| [`tipografia.md`](../specs/design-system/tipografia.md) | Famílias (Playfair + Work Sans), carregamento, hierarquia, nota histórica Arial → Work Sans |
| [`componentes.md`](../specs/design-system/componentes.md) | Base shadcn/ui, botões, cards, indicadores de foco, skip-link, editor Tiptap |
| [`movimento.md`](../specs/design-system/movimento.md) | Princípio de movimento, Ken Burns, Framer Motion, reduced-motion, CTA sticky mobile |
| [`imagem-fotografia.md`](../specs/design-system/imagem-fotografia.md) | Tratamento de fotografia, enquadramento, filtros, fallback de capa de blog |
| [`regras-fazer-nunca.md`](../specs/design-system/regras-fazer-nunca.md) | Lista consolidada de FAZER / NUNCA FAZER |

## 2. Fronteiras com outros domínios

- **Marca/negócio** — tom de voz, invariantes (INV-xx), identidade visual conceitual e paleta HEX original são canon do vvcore: ver CONTEXTO-IA §5. O design system aplica essa identidade em tokens/componentes; não a redefine.
- **Landing pages** — os Blocos de LP consomem este sistema visual (cor, tipografia, foco, movimento); ver [`landing-pages.md`](landing-pages.md).
- **Admin** — o admin é a exceção ao mobile-first; o editor de texto rico (Tiptap) e o accent de sidebar pertencem ao admin; ver [`admin.md`](admin.md). O fallback de capa de gradiente é consumido pelo modelo de post; ver [`blog.md`](blog.md).
- **Engenharia/acessibilidade** — os indicadores de foco e o respeito a `prefers-reduced-motion` materializam os gates de acessibilidade; ver [`engenharia.md`](engenharia.md).

## 3. Referências

- **Implementação de referência do protótipo** — os tokens, foco, skip-link, cards, Ken Burns e reduced-motion aplicados (originalmente em `index.css` e `components.json` do protótipo) vivem na implementação de referência do protótipo, **externa a este repo** (D-7 greenfield: o app nasce do zero, sem importar a base do protótipo). Tratar como referência conceitual, não como arquivo deste repo.
- **Identidade de marca** — CONTEXTO-IA §5 (canon vvcore via @import): estratégia, invariantes (§2), tom de voz (§1.1/§4.2) e identidade visual (§5). Fonte de verdade conceitual.
