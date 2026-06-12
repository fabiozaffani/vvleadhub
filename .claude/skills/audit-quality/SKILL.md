---
name: audit-quality
description: Roda os dois gates de qualidade do projeto — Lighthouse CI (orçamento de Core Web Vitals) e axe (WCAG 2.1 AA) — contra o preview local e reporta resultado factual, número por número. Uso - /audit-quality [url ou lista de rotas]; sem argumento, audita as rotas-gate (home, 1 página de espaço, 1 post).
disable-model-invocation: true
argument-hint: "[url|rotas]"
---

# Auditoria de qualidade — Lighthouse + axe

Os dois gates de deploy do projeto (03 §4, 09 §3). Esta skill os roda **localmente, sob demanda**, com a mesma régua do CI. Princípio: reportar apenas números que saíram da ferramenta — nunca estimar um score.

## Orçamento (hard gate — 03 §4)

| Métrica | Gate | Alvo |
|---|---|---|
| LCP | < 2,5s | < 1,8s |
| INP | < 200ms | — |
| CLS | < 0,1 | — |
| JS inicial em rota de marketing | mínimo (Astro: zero por padrão) | — |

Acessibilidade: **axe sem violações novas**, WCAG 2.1 AA, nas rotas públicas-chave. Rotas-gate da Fase 0: home, 1 página de espaço, 1 post.

## Procedimento

1. **Preview de produção do site.** Auditar build de produção, nunca dev server (dev infla JS e zera o cache): `pnpm --filter site build && pnpm --filter site preview`. Anotar a porta.
2. **Lighthouse CI.** Comando canônico: `pnpm dlx @lhci/cli autorun --collect.url=<url>...` — quando `lighthouserc.{js,json}` existir na raiz (instalado na Fase 0), usar `pnpm dlx @lhci/cli autorun` puro, que lê as rotas-gate e asserções do config. Coletar 3 runs (default do lhci) e usar a mediana.
3. **axe.** Usar a skill `a11y-axe` deste repo (`.claude/skills/a11y-axe/`), que detém o procedimento canônico (`@axe-core/playwright`, mesma stack do gate de CI) e o checklist manual. Não duplicar a lógica aqui — invocá-la com as mesmas rotas.
4. **Interpretar o JSON, não a impressão.** Do Lighthouse: extrair LCP/CLS/TBT (TBT é o proxy de INP em lab) e os audits reprovados; comparar com a tabela acima. Do axe: violações por impacto (critical/serious primeiro), com seletor e regra.
5. **Relatório** em tom de trabalho: tabela métrica × valor × gate × veredicto por rota; violações axe por impacto; e diagnóstico apontando a causa concreta (elemento, recurso, script) — não genérico.

## Heurísticas de correção CWV

(Destilado de addyosmani/web-quality-skills, adaptado ao stack Astro + Cloudflare do projeto.)

- **LCP alto:** o elemento LCP é quase sempre a imagem do hero. Servir AVIF/WebP responsivo pelo pipeline D-10 (R2 + Cloudflare Images), `fetchpriority="high"` + preload no LCP, sem lazy-load no above-the-fold; fontes (Playfair Display + Work Sans) carregadas não-bloqueantes conforme Design Guidelines §3 — preconnect + stylesheet deferida, nunca `@import`.
- **CLS alto:** dimensões explícitas (`width`/`height` ou `aspect-ratio`) em toda imagem/embed; `font-display` com fallback metricamente compatível para evitar salto na troca de fonte; reservar espaço para qualquer conteúdo que chega depois (consent, CTA sticky). Lembrete de fase 2: variante A/B renderiza server-side justamente para CLS = 0 na troca.
- **INP/TBT alto:** menos JS — em Astro, ilha React só onde há interação real (zero JS é o default das rotas de marketing); third-party (collector, pixels) carregado depois da hidratação; listeners de scroll passivos; trabalho não-crítico em `requestIdleCallback`.
- **Contraste (axe):** a colisão paleta da marca × WCAG AA tem processo de resolução registrado nas Design Guidelines (§2/§8) — dourado `#C69F3F` sobre creme falha AA para texto pequeno; usar dourado escuro `#7D5900` ou verde `#143C37` para texto, dourado claro só em elementos grandes/decorativos. Indicadores de foco: usar as classes canônicas `.vv-focus` / `.vv-focus-dark` / `.vv-focus-light` — nunca remover outline sem substituto.

## Estado do tooling

Esta skill é o lugar canônico dos comandos de auditoria. A Fase 0 instala `@lhci/cli` (com `lighthouserc` versionado contendo orçamento e rotas-gate) e o axe no CI — **ao instalar, atualizar esta seção** com os comandos exatos do repo. Até lá, os comandos `pnpm dlx` acima funcionam de forma standalone contra qualquer preview.
