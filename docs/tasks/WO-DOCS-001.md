---
id: WO-DOCS-001
status: in_progress
traces: [_index.md]
---
# WO-DOCS-001 · Migração para a taxonomia canônica VV

**Quem executa:** Claude Code (delegado). **Camada de tom:** trabalho. **Origem:** drift detectado — o VVLEADHUB nasceu antes do formato canônico VV (ARQUITETURA-IA §5; exceção §5.3 sendo dissolvida).

## Objetivo
Dissolver os docs numerados legados (`00–09`, `99`) e as pastas fora da taxonomia (`brand/`, `conteudo/`) na taxonomia canônica `discovery → business → specs → system → tasks-drafts → tasks` + `roadmap` + espinha `_index`/`_lexico`/`decisoes`. App greenfield — cross-refs reescritos, sem backward-compat.

## Entregue por esta migração
- `business/comercial/` (← 01, com Autoral corrigido para nível máximo), `discovery/auditoria-pre-build.md` (← 99).
- `specs/<domínio>/*` granulares + `system/<domínio>.md` coesos (← 02/04–09 + design-system ← brand guidelines); `system/arquitetura.md` (← 03) + `roadmap/fases.md` (← 03 §7).
- Raiz: `_index.md`, `_lexico.md` (← 00 §5/§6), `_decisoes.md` (← 00 §7, D-N preservado).
- `roadmap/inventario-conteudo.md` (← conteudo/), `roadmap/composicao-paginas.md` (← tasks/).
- WO files com frontmatter §5.4; reescrita de cross-refs em docs + `AGENTS.md` + `.cursor/rules` + `.github` + comentários de config + `.agents/memory`.
- Eliminados: `docs/brand/` (stub deletado — canon vem por `@import`; guidelines realocada), `docs/conteudo/`, `docs/00–09`, `99`, `tasks/fase-0.md`.

## Fora deste repo (gated)
PR no vvcore: `CONTEXTO-IA §5` registra a tipografia decidida no app (Playfair + Work Sans, Sloop fora de uso).

## Refs
[`_index.md`](../_index.md), ARQUITETURA-IA §5 (vvcore).
