# Design System — Tokens, paleta e layout

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Detalhe das cores, tokens HSL, cores fixas, dark mode, raio, espaçamento e layout do sistema visual aplicado. A visão coesa do sistema visual está em [`system/design-system.md`](../../system/design-system.md). Tipografia e componentes têm specs irmãs ([`tipografia.md`](tipografia.md), [`componentes.md`](componentes.md)). A identidade de marca canônica (paleta HEX original, tom, invariantes) vive no CONTEXTO-IA §5 (canon vvcore via @import).

---

## 1. Paleta de cores

### 1.1 Cores canônicas da marca (HEX — CONTEXTO-IA §5)

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

### 1.2 Tokens aplicados em `index.css` (`:root`, tema claro)

Os tokens são definidos em **HSL** (formato Tailwind `H S% L%`) e consumidos via `hsl(var(--token))`. O HEX abaixo é o equivalente do token — quando há pequena diferença em relação ao HEX canônico da marca, o token é uma aproximação consciente; o HEX canônico (CONTEXTO-IA §5) prevalece como referência da marca.

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

### 1.3 Cores fixas (hardcoded) usadas em CSS de marca

Alguns indicadores de foco e o skip-link usam HEX da marca diretamente (não tokens), porque precisam ler de forma garantida sobre fundos claros E escuros:

| HEX | Onde |
|---|---|
| `#143C37` | Outline de foco `.vv-focus`; fundo do skip-link |
| `#C69F3F` | Outline de foco do skip-link |
| `#FFFBF7` | Texto do skip-link; outline `.vv-focus-light` |
| `#7D5900` | Outline `.vv-focus-dark` |
| `rgba(225,180,72,0.65)` | Halo dourado (`#E1B448` @ 65%) do `.vv-focus` |

O detalhe de cada indicador de foco e do skip-link está em [`componentes.md`](componentes.md).

### 1.4 Tema escuro (`.dark`)

O dark mode existe como **alternativa verde-escura** e não é estritamente necessário hoje. Inverte para fundo verde profundo (`166 53% 10%`) com texto/realce dourado (`42 62% 80%`). Não projetar features assumindo dark mode; manter compatível por padrão.

---

## 2. Espaçamento, raio e layout

### 2.1 Raio (`--radius: 30px`)

| Token | Cálculo | Valor |
|---|---|---|
| `--radius-sm` | `radius - 4px` | 26px |
| `--radius-md` | `radius - 2px` | 28px |
| `--radius-lg` | `radius` | 30px |
| `--radius-xl` | `radius + 4px` | 34px |

- **Botões em pílula:** raio ~30px é a assinatura visual. Botões de ação devem ter cantos bem arredondados.
- O skip-link usa `border-radius: 9999px` (pílula total).

### 2.2 Layout (CONTEXTO-IA §5)

- **Espaço em branco com respiração** — generoso, nunca apertado.
- **Separadores:** linha horizontal fina OU divisão por cor de fundo. Evitar bordas decorativas complexas.
- **Arcos/círculos** como moldura apenas em pouca quantidade.
- Padrão de **duas colunas**: categoria à esquerda (negrito menor) + itens à direita.
- **Grades simples e simétricas.** Nada de grids complexos/assimétricos ou elementos sobrepostos sem intenção.

As regras rígidas de FAZER / NUNCA FAZER que tocam cor e layout estão consolidadas em [`regras-fazer-nunca.md`](regras-fazer-nunca.md).
