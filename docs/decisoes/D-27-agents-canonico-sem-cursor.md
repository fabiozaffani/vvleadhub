# D-27 — AGENTS.md canônico sem Cursor

**Status:** fechada · **Data:** jun/2026 · **Tags:** gov, agentes

## Contexto

O ecossistema VV está simplificando a fundação: `AGENTS.md` passa a ser o contrato canônico por repo, Claude Code continua como ambiente primário atual, e a operação deve seguir transferível para outro agente/LLM sem depender de wrappers de uma IDE específica.

No VVLEADHUB, D-16/D-18/D-21 ainda descreviam Cursor como builder/wrapper vivo e `.cursor/rules` como ponteiro/gate operacional.

## Decisão

O `AGENTS.md` é a fonte canônica de conduta do VVLEADHUB. `CLAUDE.md` permanece apenas como adapter do Claude Code. `.cursor` e `.cursor/rules` deixam de existir como suporte vivo ou fallback.

Claude Code é o ambiente primário atual de construção/revisão; outros agentes podem atuar quando carregarem `AGENTS.md` + `.agents/context/`.

## Consequências

- Regras úteis que estavam nos antigos `.cursor/rules/*.mdc` foram migradas/deduplicadas para `AGENTS.md`.
- CODEOWNERS e templates deixam de listar `.cursor/rules`.
- D-16, D-18 e D-21 ficam emendadas por esta decisão.
- Histórico antigo pode continuar mencionando Cursor, mas docs operacionais vivos não devem tratá-lo como builder/fallback.
