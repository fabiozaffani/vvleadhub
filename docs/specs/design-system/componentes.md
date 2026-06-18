# Design System — Componentes

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Base de componentes, botões, cards, indicadores de foco, skip-link e editor de texto rico. A visão coesa do sistema visual está em [`system/design-system.md`](../../system/design-system.md). Tokens de cor/raio em [`tokens.md`](tokens.md); movimento e timeline de hovers em [`movimento.md`](movimento.md).

---

## 1. Base

Base: **shadcn/ui** (estilo `new-york`, `baseColor: neutral`, CSS variables ativadas — ver `components.json`). Componentes em `src/components/ui`.

## 2. Botões

- CTAs primários: fundo verde (`--primary`), texto branco, formato pílula.
- CTAs de destaque: dourado (`--secondary`/`--accent`).
- **Botão dourado (`.vv-btn-gold`):** no hover, eleva levemente e ganha sombra dourada.
  - `transition: box-shadow .5s ease, transform .5s ease`
  - `:hover` → `box-shadow: 0 14px 34px rgba(198,159,63,0.42); transform: translateY(-1px)`

## 3. Cards (`.vv-card`)

- `transition: box-shadow .8s ease, transform .8s ease`
- `:hover` → `transform: translateY(-4px); box-shadow: 0 30px 70px rgba(20,60,55,0.14)` (elevação suave com sombra verde)
- Imagem interna (`.vv-card img`): `transition: transform 1.6s cubic-bezier(.2,.7,.2,1), filter 1.2s ease`; no `:hover` faz zoom leve (`scale(1.03)`) e dessatura sutilmente (`saturate(0.96)`).

## 4. Indicadores de foco (acessibilidade)

Três padrões coexistem para garantir visibilidade em qualquer fundo:

| Classe | Estilo | Quando usar |
|---|---|---|
| `.vv-focus` | `outline: 2px solid #143C37; outline-offset: 2px;` + halo `box-shadow 0 0 0 4px rgba(225,180,72,0.65) !important` | CTAs públicos, links e trigger do menu Espaços — verde lê em fundo claro/dourado, o halo dourado lê em fundo escuro |
| `.vv-focus-dark` | `outline: 2px solid #7D5900; outline-offset: 3px;` | CTA sobre fundo escuro/imagem (hero) |
| `.vv-focus-light` | `outline: 2px solid #FFFBF7; outline-offset: 3px;` | CTA sobre fundo claro (creme/branco) |

Todos disparam em `:focus-visible` (foco por teclado), não em clique de mouse. O `!important` do `.vv-focus` só atua enquanto focado, sobrepondo drop-shadows inline de botões dourados.

Os HEX desses indicadores estão catalogados como cores fixas em [`tokens.md`](tokens.md).

## 5. Skip-link (`.vv-skip-link`)

Link "pular para o conteúdo": visualmente oculto (posicionado fora da tela em `top: -3rem`) até receber foco por teclado, quando desce para `top: 1rem` como primeiro elemento interativo. Pílula verde (`#143C37`) com texto creme (`#FFFBF7`), caixa alta, `letter-spacing: 0.12em`, transição `top 0.2s ease`.

## 6. Editor de texto rico (Tiptap, admin)

Conteúdo em `.rich-text-content .tiptap`. Placeholder do parágrafo vazio via `::before` usando `hsl(var(--muted-foreground))`. Links com `cursor: pointer`.
