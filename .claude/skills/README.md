# Skills do agente — inventário e decisões

Skills do Claude Code versionadas no repo (`.claude/skills/`). Regra de ouro (validada por pesquisa, jun/2026): **invariante inviolável vive no `CLAUDE.md`** (contexto sempre presente); skill é **procedimento longo sob demanda** — preferencialmente invocada por `/nome` ou carregada como conhecimento de fundo. Poucas skills boas > muitas: cada skill instalada consome orçamento de descrição no contexto.

## Proprietárias

| Skill | Invocação | Para quê |
|---|---|---|
| `copy-marca` | automática (fundo) | Tom de marca VVF para todo copy público + inventário de copy por fase |
| `checklist-fase` | `/checklist-fase <n>` | Declarar fase pronta só com evidência dos critérios do 03 §7.1 |
| `audit-quality` | `/audit-quality [rotas]` | Lighthouse CI + axe com o orçamento de CWV do projeto (03 §4) |
| `a11y-axe` | automática ou `/a11y-axe` | Auditoria WCAG 2.1 AA com `@axe-core/playwright` (Deque oficial) + checklist manual. Estrutura procedural destilada de snapsynapse/skill-a11y-audit (MIT), sem código de terceiro |

## Vendorizadas (terceiros, copiadas e revisadas — nunca via marketplace)

| Skill | Fonte | Commit | Revisão |
|---|---|---|---|
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (MIT, ~28k stars) | `f8a72b9` 2026-06-10 | regras intactas; frontmatter + nota de escopo VVF; `AGENTS.md` compilado não vendorizado |
| `seo-schema-org` | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (MIT, ~8,7k stars) | `dabfc1a` 2026-05-25 | adaptação substancial: subconjunto de tipos do VVF, templates pt-BR/BR, regra INV-05 (sem preço no markup); tabela de depreciados mantida da fonte |

**Critério para vendorizar:** ferramenta executável ou autoridade real de domínio + repo com comunidade vetando (stars/manutenção) + licença permissiva. Caso decidido: a primeira versão da `a11y-axe` vendorizava snapsynapse/skill-a11y-audit (2 stars) — substituída por skill proprietária sobre o tooling oficial da Deque (`@axe-core/playwright`), eliminando 2k linhas de wrapper sem vetting comunitário e a segunda stack de browser (Puppeteer) que ele trazia. Wrapper de terceiro só entra se a comunidade o valida; a âncora de confiança deve ser a ferramenta de base (axe-core), não o invólucro.

Ao atualizar uma vendorizada: re-baixar da fonte, refazer a revisão de segurança (frontmatter `allowed-tools`, injeções `` !`cmd` ``, rede/telemetria nos scripts) e atualizar o commit nesta tabela. Atualização sem revisão = supply chain risk.

## Backlog — criar quando a fase abrir a lacuna

| Skill futura | Criar na | Conteúdo previsto |
|---|---|---|
| `eventos-tracking` | Fase 1 | Schema canônico de eventos (05 §4), catálogo (05 §13), "novo destino = adapter puro + testes", `test:true`/sandbox obrigatório (05 §11) |
| `nova-lp` | Fase 2 | Procedimento de LP por campanha: Molde + Assunto + Objetivo, capacidades dos Blocos (02 §4), eventos com `correlation_id`, checklist (sem preço, opt-in mínimo, consent pass-through) |

Quando o tooling real existir (lighthouserc, axe no CI, dependency-cruiser), atualizar `audit-quality` e `checklist-fase` com os comandos exatos do repo.

## Decisões: não instalar (para não rediscutir)

- **obra/superpowers** e metodologias totalizantes — o repo já tem metodologia própria (CLAUDE.md + roadmap 03 §7); duas "constituições" conflitam.
- **Mega-coleções** (100+ skills) — degradam o triggering das skills críticas; qualidade média baixa.
- **Skills de Tailwind/design-system** opinativas — conflitam com tokens/tipografia das Design Guidelines (exceções de marca registradas não se revertem).
- **Skills de marketing/copywriting genéricas** — inglês, tom SaaS, táticas de preço/urgência que violam INV-05; no máximo minerar estrutura, nunca importar copy.
- **Git/commit/review helpers** — redundantes com o nativo do Claude Code.
