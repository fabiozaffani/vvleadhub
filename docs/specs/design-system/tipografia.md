# Design System — Tipografia

**Camada:** spec · **Dominio:** design-system · **Origem:** brand/vvf-design-guidelines.md · **Tom:** trabalho

Padrão tipográfico canônico do app, carregamento das famílias e regras de hierarquia. A visão coesa do sistema visual está em [`system/design-system.md`](../../system/design-system.md). A identidade de marca canônica vive no CONTEXTO-IA §5 (canon vvcore via @import).

---

## 1. Famílias e papéis

| Papel | Família aplicada (token) | Observação |
|---|---|---|
| Títulos e subtítulos (`h1`–`h6`) | **Playfair Display** (serifada) — `--app-font-serif` | Aplicada automaticamente a todos os headings via `@layer base` |
| Corpo de texto | **Work Sans** (sans-serif) — `--app-font-sans` | Aplicada ao `body` |
| Mono | Menlo, monospace — `--app-font-mono` | Uso técnico raro |

**Padrão canônico do app:** **Playfair Display** para títulos e subtítulos + **Work Sans** para corpo de texto. Esta é a tipografia canônica do VVLEADHUB, alinhada ao CONTEXTO-IA §5 (atualizado jun/2026 para registrar esta decisão). **Sloop Script Pro está fora de uso** — não é dependência nem placeholder do projeto.

**Carregamento:** Playfair Display e Work Sans são carregadas de forma não bloqueante via `<link>` diferido em `index.html` (preconnect + stylesheet deferida), não por `@import` em CSS. Ao mudar famílias, sincronizar com aquele `<link>`.

## 2. Nota histórica — migração Arial → Work Sans

A versão original do guia de marca pedia **Arial** no corpo de texto e **Sloop Script Pro** para detalhes/acentos. O app adotou **Work Sans** no corpo (em vez de Arial) e não incorporou Sloop Script Pro. Essa escolha foi promovida ao canon: a partir de jun/2026 o CONTEXTO-IA §5 registra Playfair Display + Work Sans como o padrão, e **não se trata mais de exceção ao guia de marca** — é o canon. Esta seção fica só como registro histórico da transição; não há divergência ativa a reconciliar. Ledger de decisões em [`decisoes.md`](../../decisoes.md).

## 3. Regras de hierarquia (CONTEXTO-IA §5)

- Hierarquia em **3 níveis**.
- Caixa alta para categorias principais (não sempre).
- Itálico para **descrições e nomes de espaços** — nunca para informações funcionais (preços, datas, botões, labels).
- Evitar negrito excessivo no corpo de texto.

As regras rígidas de FAZER / NUNCA FAZER que tocam tipografia estão consolidadas em [`regras-fazer-nunca.md`](regras-fazer-nunca.md).
