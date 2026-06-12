# Vale Verde — Design Guidelines (sistema aplicado)

**Uso:** referência obrigatória para qualquer trabalho visual/front-end no site (landing pages, blog, componentes públicos e admin). Carregar antes de criar ou alterar qualquer interface.

**Escopo:** Para a estratégia de marca, tom de voz e invariantes, ver `docs/brand/vvf-system-context.md` (canônico).

**Idioma da UI:** português brasileiro (pt-BR) em tudo. Sem emojis em nenhum lugar da UI.

---

## 1. Essência e look-and-feel

A interface traduz a marca VVF: **serena, calma, acolhedora, elegante e segura**. Toda decisão visual reforça curadoria e intencionalidade — nada parece acidental ou apressado.

- **Paleta restrita:** creme/off-white dominante; verde e dourado/champanhe como destaque. Máximo de **3 cores por seção**.
- **Respiração:** espaço em branco generoso; nada de margens apertadas ou grades complexas.
- **Movimento sutil:** animações lentas e quase imperceptíveis (hover suave, Ken Burns de 28s). A marca é serena, nunca agitada.
- **Mobile-first** em todas as partes públicas (tudo exceto `/admin`): projetar para telas pequenas primeiro e progressivamente melhorar para breakpoints maiores. O admin é exceção a esta regra.
- **Cantos arredondados e generosos:** botões em pílula (raio de 30px), conferindo suavidade.

Princípio orientador: na dúvida, escolha a opção mais calma, mais clara e com mais espaço.

---

## 2. Paleta de cores

### 2.1 Cores canônicas da marca (HEX — §5 do brand guide)

| Nome | HEX | Uso |
|---|---|---|
| Verde principal | `#143C37` | Cor de marca primária: texto, fundos verdes, CTAs primários |
| Gradiente verde | `#143C37` → `#031916` | Heros, rodapé e superfícies escuras imersivas |
| Dourado claro | `#C69F3F` | Destaque/accent principal (champanhe) |
| Dourado escuro | `#7D5900` | Variante de destaque, foco em superfície clara |
| Gradiente dourado | `#E1B448` → `#644700` | Detalhes/realces dourados |
| Fundo claro (creme) | `#FFFBF7` | Fundo dominante do site |
| Branco | `#FFFFFF` | Cards e superfícies elevadas |
| Cinza de texto | `#323333` | Texto neutro quando o verde não se aplica |

**Preto:** permitido apenas em contexto de elegância/balada (nightlife). Não usar como cor base.

### 2.2 Tokens aplicados em `index.css` (`:root`, tema claro)

Os tokens são definidos em **HSL** (formato Tailwind `H S% L%`) e consumidos via `hsl(var(--token))`. O HEX abaixo é o equivalente do token — quando há pequena diferença em relação ao HEX canônico da marca, o token é uma aproximação consciente; o HEX canônico §5 prevalece como referência da marca.

| Token | Valor HSL | HEX equivalente | Mapeia para | Uso |
|---|---|---|---|---|
| `--background` | `30 100% 98%` | `#FFFBF7` (≈ `#FFFAF5`) | Creme | Fundo geral da página |
| `--foreground` | `173 50% 16%` | `#143C37` (≈ `#143D38`) | Verde principal | Texto e ícones sobre creme |
| `--primary` | `173 50% 16%` | `#143C37` | Verde principal | CTAs primários, ênfase |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Branco | Texto sobre primário |
| `--secondary` | `43 54% 51%` | `#C69F3F` | Dourado claro | Destaque secundário |
| `--secondary-foreground` | `173 50% 16%` | `#143C37` | Verde principal | Texto sobre dourado |
| `--accent` | `43 54% 51%` | `#C69F3F` | Dourado claro | Realces/accent |
| `--accent-foreground` | `173 50% 16%` | `#143C37` | Verde principal | Texto sobre accent |
| `--card` | `0 0% 100%` | `#FFFFFF` | Branco | Fundo de cards |
| `--card-foreground` | `166 53% 16%` | `≈ #133E34` | Verde | Texto em cards |
| `--card-border` | `166 53% 90%` | `≈ #DBF1EB` | Verde claríssimo | Borda de cards |
| `--border` / `--input` | `166 53% 85%` | `≈ #C4EDE4` | Verde claríssimo | Bordas e inputs |
| `--ring` | `166 53% 16%` | `≈ #133E34` | Verde | Anel de foco padrão (shadcn) |
| `--muted` | `166 20% 90%` | `≈ #E0EBE8` | Verde dessaturado claro | Fundos sutis |
| `--muted-foreground` | `166 20% 40%` | `≈ #527A71` | Verde dessaturado | Texto secundário |
| `--destructive` | `0 84% 60%` | `≈ #F04444` | Vermelho | Ações destrutivas (admin) |
| `--popover` | `0 0% 100%` | `#FFFFFF` | Branco | Popovers/menus |
| `--sidebar-accent` | `42 62% 67%` | `≈ #DFC077` | Dourado claro | Accent da sidebar (admin) |

### 2.3 Cores fixas (hardcoded) usadas em CSS de marca

Alguns indicadores de foco e o skip-link usam HEX da marca diretamente (não tokens), porque precisam ler de forma garantida sobre fundos claros E escuros:

| HEX | Onde |
|---|---|
| `#143C37` | Outline de foco `.vv-focus`; fundo do skip-link |
| `#C69F3F` | Outline de foco do skip-link |
| `#FFFBF7` | Texto do skip-link; outline `.vv-focus-light` |
| `#7D5900` | Outline `.vv-focus-dark` |
| `rgba(225,180,72,0.65)` | Halo dourado (`#E1B448` @ 65%) do `.vv-focus` |

### 2.4 Tema escuro (`.dark`)

O dark mode existe como **alternativa verde-escura** e não é estritamente necessário hoje. Inverte para fundo verde profundo (`166 53% 10%`) com texto/realce dourado (`42 62% 80%`). Não projetar features assumindo dark mode; manter compatível por padrão.

---

## 3. Tipografia

| Papel | Família aplicada (token) | Observação |
|---|---|---|
| Títulos e subtítulos (`h1`–`h6`) | **Playfair Display** (serifada) — `--app-font-serif` | Aplicada automaticamente a todos os headings via `@layer base` |
| Corpo de texto | **Work Sans** (sans-serif) — `--app-font-sans` | Aplicada ao `body` |
| Mono | Menlo, monospace — `--app-font-mono` | Uso técnico raro |

**Carregamento:** Playfair Display e Work Sans são carregadas de forma não bloqueante via `<link>` diferido em `index.html` (preconnect + stylesheet deferida), não por `@import` em CSS. Ao mudar famílias, sincronizar com aquele `<link>`.

### Exceção de tipografia registrada (importante)

O brand guide (§5) pede **Arial** no corpo de texto e **Sloop Script Pro** para detalhes/acentos. O projeto adota conscientemente uma exceção:

- O corpo de texto usa **Work Sans** (não Arial).
- **Sloop Script Pro não está em uso** ainda.

**Não alterar as fontes em `index.css` por causa do brand guide** — esta é uma decisão registrada. (Ver `replit.md` → User preferences / Brand.)

### Regras de hierarquia (do brand guide §5)

- Hierarquia em **3 níveis**.
- Caixa alta para categorias principais (não sempre).
- Itálico para **descrições e nomes de espaços** — nunca para informações funcionais (preços, datas, botões, labels).
- Evitar negrito excessivo no corpo de texto.

---

## 4. Espaçamento, raio e layout

### Raio (`--radius: 30px`)

| Token | Cálculo | Valor |
|---|---|---|
| `--radius-sm` | `radius - 4px` | 26px |
| `--radius-md` | `radius - 2px` | 28px |
| `--radius-lg` | `radius` | 30px |
| `--radius-xl` | `radius + 4px` | 34px |

- **Botões em pílula:** raio ~30px é a assinatura visual. Botões de ação devem ter cantos bem arredondados.
- O skip-link usa `border-radius: 9999px` (pílula total).

### Layout (brand guide §5)

- **Espaço em branco com respiração** — generoso, nunca apertado.
- **Separadores:** linha horizontal fina OU divisão por cor de fundo. Evitar bordas decorativas complexas.
- **Arcos/círculos** como moldura apenas em pouca quantidade.
- Padrão de **duas colunas**: categoria à esquerda (negrito menor) + itens à direita.
- **Grades simples e simétricas.** Nada de grids complexos/assimétricos ou elementos sobrepostos sem intenção.

---

## 5. Componentes

Base: **shadcn/ui** (estilo `new-york`, `baseColor: neutral`, CSS variables ativadas — ver `components.json`). Componentes em `src/components/ui`.

### Botões

- CTAs primários: fundo verde (`--primary`), texto branco, formato pílula.
- CTAs de destaque: dourado (`--secondary`/`--accent`).
- **Botão dourado (`.vv-btn-gold`):** no hover, eleva levemente e ganha sombra dourada.
  - `transition: box-shadow .5s ease, transform .5s ease`
  - `:hover` → `box-shadow: 0 14px 34px rgba(198,159,63,0.42); transform: translateY(-1px)`

### Cards (`.vv-card`)

- `transition: box-shadow .8s ease, transform .8s ease`
- `:hover` → `transform: translateY(-4px); box-shadow: 0 30px 70px rgba(20,60,55,0.14)` (elevação suave com sombra verde)
- Imagem interna (`.vv-card img`): `transition: transform 1.6s cubic-bezier(.2,.7,.2,1), filter 1.2s ease`; no `:hover` faz zoom leve (`scale(1.03)`) e dessatura sutilmente (`saturate(0.96)`).

### Indicadores de foco (acessibilidade)

Três padrões coexistem para garantir visibilidade em qualquer fundo:

| Classe | Estilo | Quando usar |
|---|---|---|
| `.vv-focus` | `outline: 2px solid #143C37; outline-offset: 2px;` + halo `box-shadow 0 0 0 4px rgba(225,180,72,0.65) !important` | CTAs públicos, links e trigger do menu Espaços — verde lê em fundo claro/dourado, o halo dourado lê em fundo escuro |
| `.vv-focus-dark` | `outline: 2px solid #7D5900; outline-offset: 3px;` | CTA sobre fundo escuro/imagem (hero) |
| `.vv-focus-light` | `outline: 2px solid #FFFBF7; outline-offset: 3px;` | CTA sobre fundo claro (creme/branco) |

Todos disparam em `:focus-visible` (foco por teclado), não em clique de mouse. O `!important` do `.vv-focus` só atua enquanto focado, sobrepondo drop-shadows inline de botões dourados.

### Skip-link (`.vv-skip-link`)

Link "pular para o conteúdo": visualmente oculto (posicionado fora da tela em `top: -3rem`) até receber foco por teclado, quando desce para `top: 1rem` como primeiro elemento interativo. Pílula verde (`#143C37`) com texto creme (`#FFFBF7`), caixa alta, `letter-spacing: 0.12em`, transição `top 0.2s ease`.

### Editor de texto rico (Tiptap, admin)

Conteúdo em `.rich-text-content .tiptap`. Placeholder do parágrafo vazio via `::before` usando `hsl(var(--muted-foreground))`. Links com `cursor: pointer`.

---

## 6. Movimento e animação

A marca é serena — **todo movimento é lento e discreto**. Timeline de hovers: cards `.8s`, botão dourado `.5s`, imagem de card `1.2s–1.6s`.

### Ken Burns (`.vv-kenburns`)

Zoom/pan lento e contínuo sobre a imagem still do hero. É o movimento do hero no mobile (sem baixar vídeo de fundo no celular) e o pôster do hero no desktop antes/sob o vídeo.

- `animation: vv-kenburns 28s ease-in-out infinite alternate`
- `transform-origin: 50% 45%`; `will-change: transform`
- Keyframes: `from { scale(1.02) translate3d(0,0,0) }` → `to { scale(1.12) translate3d(0,-2%,0) }` — zoom + deriva ascendente quase imperceptível.
- A still mantém seu filtro próprio `.vv-hero-img { filter: saturate(0.84) brightness(1.02) }`; o Ken Burns anima apenas o `transform`.

### Entradas com Framer Motion

Animações de entrada / `whileInView` usam Framer Motion, controladas globalmente por `MotionConfig reducedMotion="user"`.

### Reduced motion (`prefers-reduced-motion: reduce`)

Regra global neutraliza animações e transições CSS no site público:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Cuidado (decisão registrada):** a regra global apenas *quase-zera* a duração, o que congelaria a still no meio do zoom. Por isso o Ken Burns tem um override explícito que neutraliza o transform por completo:

```css
@media (prefers-reduced-motion: reduce) {
  .vv-kenburns { animation: none !important; transform: none !important; }
}
```

Qualquer novo efeito de "still animada" precisa do mesmo override `animation:none + transform:none`, senão fica preso no frame final.

### CTA sticky mobile

Quando a barra de CTA sticky mobile (Variant B) está montada (`html.vv-sticky-cta`), o float global do WhatsApp é ocultado em telas `≤ 767px` (`[data-wa-float] { display: none }`) para os dois controles não se empilharem no mesmo canto. O float continua no desktop.

---

## 7. Imagem e fotografia

- **Cores:** sempre coloridas para estrutura, natureza e gastronomia. **P&B apenas** para detalhes/momentos estéticos específicos.
- **Enquadramento:** imagens sangradas (full-bleed), **sem distorção** (sem esticar/achatar).
- **Sem filtros artificiais.** O hero usa apenas ajuste sutil de saturação/brilho (`saturate(0.84) brightness(1.02)`).
- **Sem imagens de banco genéricas** — usar apenas as fornecidas.
- Posts de blog não têm imagem de capa nos dados (`coverImage` null); o front-end renderiza um **fallback em gradiente verde/dourado da marca**.

---

## 8. Regras rígidas — FAZER / NUNCA FAZER

### Fazer

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

### Nunca fazer

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
- Alterar as fontes de `index.css` invocando o brand guide (a exceção Work Sans é decisão registrada).

---

## 9. Referências

- `artifacts/valeverde/src/index.css` — fonte de verdade dos tokens, foco, skip-link, cards, Ken Burns e reduced-motion aplicados.
- `artifacts/valeverde/components.json` — configuração shadcn/ui (estilo, aliases).
- `docs/brand/vvf-system-context.md` — System Context v2: estratégia, invariantes (§2), tom de voz (§1.1/§4.2) e identidade visual (§5). Fonte de verdade conceitual.
- `replit.md` → seções *User preferences* e *Brand* — decisões aplicadas e exceções registradas.
