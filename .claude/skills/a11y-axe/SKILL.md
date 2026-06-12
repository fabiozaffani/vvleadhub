---
name: a11y-axe
description: Auditoria de acessibilidade WCAG 2.1 AA com scanner real (axe-core oficial da Deque, via Playwright) + checklist manual do que a automação não cobre + relatório com evidência. Usar quando o usuário pedir auditoria de acessibilidade, "a11y", "axe", "WCAG", ou quando o gate do projeto (axe sem violações novas) precisar de diagnóstico. O resultado vem do scanner, não de opinião do modelo.
---

# Auditoria de acessibilidade — axe-core + WCAG 2.1 AA

Skill proprietária construída direto sobre o tooling oficial da Deque (`@axe-core/playwright`) — a mesma stack que o gate de CI do projeto usa (09 §3). Estrutura procedural destilada de snapsynapse/skill-a11y-audit (MIT), sem código de terceiro.

Princípio: **violação só existe se o scanner reportou ou se o check manual a demonstrou**. Nunca estimar conformidade lendo código.

## Contexto VVF (vence qualquer default)

- **Padrão-alvo:** WCAG 2.1 AA — o gate é "axe sem violações novas" (CLAUDE.md / 09 §3).
- **Rotas-gate (Fase 0):** home, 1 página de espaço, 1 post — as mesmas do Lighthouse CI. Auditar **build de produção**: `pnpm --filter site build && pnpm --filter site preview`.
- **Contraste:** a colisão paleta × AA tem resolução registrada (`docs/brand/vvf-design-guidelines.md` §2/§8): dourado claro `#C69F3F` sobre creme falha AA em texto pequeno — texto usa verde `#143C37` ou dourado escuro `#7D5900`; dourado claro só em elemento grande/decorativo. Não propor mudança de paleta; aplicar o processo registrado.
- **Foco:** corrigir violação de foco com as classes canônicas `.vv-focus` / `.vv-focus-dark` / `.vv-focus-light` e o `.vv-skip-link` — nunca remover outline sem substituto.
- **Reduced motion:** stills animadas (Ken Burns) exigem override `animation: none + transform: none` sob `prefers-reduced-motion` (Guidelines §6).
- Relatório em tom de trabalho; qualquer texto sugerido para a UI é pt-BR e segue a skill `copy-marca`.

## Procedimento

### 1. Descoberta

- Confirmar as rotas a auditar: as rotas-gate por default; argumento do usuário sobrescreve.
- Em site grande, amostrar **por template, não por URL**: uma página de cada Molde/tipo (home, espaço, post, LP) representa todas as irmãs — violação de template se corrige uma vez.
- Subir o preview de produção e anotar a URL base.

### 2. Scan automatizado (axe-core)

Stack canônica: `@axe-core/playwright` (Deque oficial). Quando o repo tiver o harness de e2e (Fase 0), usar os specs de axe do próprio repo. Standalone, antes disso:

```ts
// pnpm dlx tsx scan-a11y.ts  (Playwright + axe oficiais; sem wrapper de terceiro)
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const routes = ["/", "/espacos/<slug>", "/blog/<slug>"];
const browser = await chromium.launch();
const page = await browser.newPage();
for (const route of routes) {
  await page.goto(new URL(route, process.env.BASE_URL).href);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  console.log(JSON.stringify({ route, violations: results.violations }, null, 2));
}
await browser.close();
```

- Dependências (`playwright`, `@axe-core/playwright`) são devDependencies do monorepo — se ainda não existem, instalar faz parte da Fase 0; **perguntar antes** de instalar qualquer coisa fora disso.
- Rodar também com viewport mobile (375px) — o site é mobile-first; layout muda, violações mudam.
- Estados interativos contam: menu aberto, form com erro de validação, consent visível.

### 3. Interpretação (do JSON, não da impressão)

- Ordenar por impacto do axe: `critical` → `serious` → `moderate` → `minor`.
- Para cada violação: regra (`id`), critério WCAG correspondente (campo `tags`), seletor do nó, trecho de HTML, e a correção concreta no componente — não conselho genérico.
- Distinguir **violação nova** (introduzida pela mudança em revisão — quebra o gate) de **pré-existente** (entra como dívida listada).

### 4. Checklist manual (o que o axe não vê)

O axe cobre ~30–40% dos critérios; o resto é manual. Gerar checklist **priorizada pelos achados** (não estática), por método:

- **Teclado:** tab percorre tudo na ordem visual; foco sempre visível (classes `.vv-focus*`); skip-link funciona; nenhuma armadilha de foco (menu, lightbox); Esc fecha overlays.
- **Leitor de tela:** headings em hierarquia real (um `h1`, sem pulos); landmarks (`main`, `nav`, `footer`); `alt` das fotos descreve a cena (espaços, gastronomia), decorativa = `alt=""`; labels de form associados; anúncios de erro de validação (`aria-live`).
- **Inspeção visual:** zoom 200% sem perda de conteúdo; contraste em estados hover/focus (o token muda); texto sobre imagem do hero legível em qualquer frame do Ken Burns.
- **Movimento/tempo:** `prefers-reduced-motion` neutraliza Ken Burns e entradas do Framer Motion (`MotionConfig reducedMotion="user"`); nada pisca, nada expira sem aviso.

### 5. Relatório

```
## Auditoria a11y — <data> — <rotas>
Scanner: axe-core <versão> via @axe-core/playwright, WCAG 2.1 A/AA
| Impacto | Regra | Critério WCAG | Rota | Nó | Correção proposta |
...
Violações novas: N (gate: 0) · Pré-existentes: M
Checks manuais: X feitos (resultado por item) · Y pendentes (instruções)
Veredicto do gate: PASSA / NÃO PASSA
```

Sem violação? Dizer "0 violações nas regras automatizáveis" + o status dos checks manuais — nunca "100% acessível".

## O que esta skill NÃO faz

- Não corrige código por conta própria — reporta com proposta; a correção é tarefa separada.
- Não cobre regressão visual (screenshot diff), PDF, nem VPAT.
- Não substitui o gate de CI — é o diagnóstico local com a mesma régua.
