# docs/ — onde o conhecimento mora

Os MD da raiz do repo ([`../AGENTS.md`](../AGENTS.md), [`../CLAUDE.md`](../CLAUDE.md)) são roteador + regras. O conteúdo vive aqui, na **taxonomia canônica VV** (ARQUITETURA-IA §5). Comece por [`_index.md`](_index.md) (índice load-first).

**Pipeline:** `discovery → business → specs → system → tasks-drafts → tasks`; `roadmap/` costura em paralelo. Espinha na raiz: [`_index.md`](_index.md) · [`_lexico.md`](_lexico.md) · [`_decisoes.md`](_decisoes.md).

| Pasta / arquivo | Papel |
|---|---|
| [`_index.md`](_index.md) | índice load-first (módulos + espinha + ordem de leitura) |
| [`_lexico.md`](_lexico.md) | termos canônicos (um por conceito; ponteiro ao doc dono) |
| [`_decisoes.md`](_decisoes.md) | ledger ADR (D-1..D-18 + diferidos) |
| [`business/`](business/) | verdade do negócio, tech-neutral (domínio `comercial/`) |
| [`specs/`](specs/) | ingredientes técnicos granulares, por domínio |
| [`system/`](system/) | a coesão: agrega as specs de cada domínio no todo integrado |
| [`roadmap/`](roadmap/) | fases do build, planta de páginas, inventário de conteúdo |
| [`tasks/`](tasks/) · [`tasks-drafts/`](tasks-drafts/) | work-orders ativas / sugeridas |
| [`discovery/`](discovery/) | validação pré-spec (auditoria pré-build histórica) |

> **Marca e doutrina VV-wide não vivem aqui:** `CONTEXTO-IA` (negócio/marca) e `ARQUITETURA-IA` (engenharia) são canônicos no **vvcore** e entram por `@import` no [`../CLAUDE.md`](../CLAUDE.md). Referencie como `CONTEXTO-IA §x`.
