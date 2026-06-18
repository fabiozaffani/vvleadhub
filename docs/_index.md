# Índice — docs do vvleadhub (load-first)

Princípio organizador (padrão VV, ARQUITETURA-IA §5): pipeline **`discovery → business → specs → system → tasks-drafts → tasks`**; `roadmap/` costura tudo em paralelo. **Um dono por conceito**, referência por nome (nunca recópia). Conduta do agente é o [`../AGENTS.md`](../AGENTS.md) (fonte única tool-neutral).

## Espinha (raiz de docs/)
- [`_index.md`](_index.md) (este) · [`_lexico.md`](_lexico.md) (termos canônicos) · [`_decisoes.md`](_decisoes.md) (ledger ADR D-1..D-18).
- **Contexto/marca da empresa vem do vvcore** (`CONTEXTO-IA` + `ARQUITETURA-IA`, via `@import` no [`../CLAUDE.md`](../CLAUDE.md)) — não vive aqui.

## Módulos (padrão VV)
| Módulo | Status | O quê |
|---|---|---|
| [`business/`](business/) | **ativo** | verdade do negócio, tech-neutral. Domínio comercial: [`business/comercial/_dominio.md`](business/comercial/_dominio.md) |
| [`specs/`](specs/) | **ativo** | ingredientes técnicos granulares, por domínio (plataforma · landing-pages · eventos · admin · blog · experimentacao · engenharia · design-system) |
| [`system/`](system/) | **ativo** | a coesão: cada `system/<domínio>.md` agrega as specs do domínio no todo integrado. [`system/arquitetura.md`](system/arquitetura.md) é o transversal que conecta os runtimes |
| [`roadmap/`](roadmap/) | **ativo** | fases do build ([`roadmap/fases.md`](roadmap/fases.md)), planta de páginas, inventário de conteúdo |
| [`tasks/`](tasks/) | **ativo** | work-orders (frontmatter §5.4); o system desmembrado para execução |
| [`tasks-drafts/`](tasks-drafts/) | **ativo** | WO sugeridas (Fase 1+), pré-promoção |
| [`discovery/`](discovery/) | **ativo** | validação pré-spec; hoje a auditoria pré-build histórica |

## Ordem de leitura (dependência)
marca (CONTEXTO-IA, vvcore) → [`_index.md`](_index.md) → [`_lexico.md`](_lexico.md) → [`_decisoes.md`](_decisoes.md) → [`business/comercial/_dominio.md`](business/comercial/_dominio.md) → [`specs/plataforma/`](specs/plataforma/) → [`system/arquitetura.md`](system/arquitetura.md) → a spec do domínio da tarefa → o work-order em [`tasks/`](tasks/).

## Governança (resumo — detalhe no AGENTS.md)
- Um conceito = um dono; docs de baixo referenciam os de cima, nunca recopiam.
- Decisões fechadas (D-1..D-18) não se rediscutem — implementam-se; dúvida real → fundador.
- Escopo da doc = **arquitetura, lógica e estratégia**; operação (quem opera, cadências, campanhas) fica para pós-go-live.
- `business`/`specs`/`system`/`AGENTS.md`/`CLAUDE.md`/`.cursor` são gated por CODEOWNERS.
