---
id: WO-INTEL-001
status: in_progress
traces: [D-19, D-20, D-25]
deps: []
skills: [sync-governanca, doc-business-mapper, doc-domain-architect, doc-lexicon-keeper, doc-specs-mapper, doc-system-mapper, doc-roadmap-keeper, skill-auditor]
---

# WO-INTEL-001 — Radar competitivo: casa-de-dados no banco (Payload) + seed portável

## 1. Objetivo

Mover a **captura curada do radar competitivo** (hoje markdown/JSON versionado em
`docs/discovery/radar/_raw` + `concorrentes.md` + `panorama.md`) para o **banco**, como collections
no **Payload** (`payload` schema, D-9), editáveis no admin, com um **seed bootstrap portável** que
popula dev agora e produção depois. É **dado de produto**, não doc versionada em git.

Esta WO cobre o **feature inteiro** num só guarda-chuva (multi-PR), porque os passos são acoplados
(o schema da spec dirige as collections, que dirigem o seed): emenda de governança → mapeamento
business→specs→system → implementação → atualização da skill. PRs temáticos e pequenos sob esta WO;
`done` no PR final (§5.4).

## 2. Dependências

- `deps: []` — sem pré-requisito de outra WO.
- Autoridade: **D-19** (decisão fechada — mapeamento liberado, build congelado) + veredito validado
  em [`docs/discovery/inteligencia-competitiva.md`](../discovery/inteligencia-competitiva.md)
  (✅ Validar faseado). A **emenda D-20** (passo A) descongela a fatia casa-de-dados curada.

## 3. Restrições de design

- **Escopo D-20:** só **registro curado** (entrada manual no admin) + **seed**. **CONGELADOS** atrás
  do gate original da D-19: coleta automatizada (jobs Apify/Meta Ad Library/YouTube no `api-server`)
  e **render L3 no Tracker Hub**. Não construir nenhum dos dois aqui.
- **D-9:** tudo no schema `payload`; **nenhuma FK atravessa schema** — a referência da Classificação
  ao Espaço VVF (domínio `comercial`) é **por id**, validada na aplicação.
- **Guardrails D-19 viram regra escrita na spec** (não boa intenção): LGPD (só conteúdo público de
  negócio, PII mínima, retenção, uso interno), INV-01 (sem me-too/caça-tendência), INV-03 (sem
  guerra de componente), preço = inteligência interna (INV-05 só no copy público).
- **Seed idempotente** por chave natural (`slug` / `facebook_page_id`), no padrão de
  [`admin/src/seed.ts`](../../admin/src/seed.ts). Dado externalizado para arquivos versionados
  (bootstrap); o dado vivo cresce no DB, não no git.
- **Pipeline fiel** (escolha do fundador): cada artefato canônico mutado pela **skill dona** (§6.1),
  com `preflight-protocol` onde aplicável.
- **Merge (D-21):** PRs de `docs/` puros (business/specs/system/léxico/domain-map) **auto-mescla no
  CI verde, sem review**; a PR de governança (toca `AGENTS.md`/`.cursor`) e a de implementação (toca
  `packages/contracts`) **não armam `--auto`** — ficam para o merge explícito do fundador.

## 4. Passos (cada um = PR temático sob esta WO)

A. **Emenda D-20** (`/sync-governanca`): registra D-20 em `_decisoes.md` (emenda à D-19); ecoa em
   `roadmap/fases.md`, `AGENTS.md` (range D-1..D-21 + nota no backlog `intel-competitiva`),
   `_index.md`, `docs/README.md`, `.cursor/rules/00-inviolaveis.mdc`, e nota leve nos índices de
   discovery. **PR de governança — não auto-mergeia.**
B. **Business Doc** (`/doc-business-mapper`, preflight antes): `docs/business/inteligencia-competitiva/_dominio.md`.
C. **Domain Map** (`/doc-domain-architect`): `docs/_domain-map.md` (1º do repo; 2 Business Docs).
D. **Léxico** (`/doc-lexicon-keeper`): termos canônicos em `docs/_lexico.md`.
E. **Specs** (`/doc-specs-mapper`): `docs/specs/inteligencia/` — modelo de dados + status registry.
F. **System Doc** (`/doc-system-mapper`): `docs/system/inteligencia-competitiva.md`.
G. **Implementação:** collections em `admin/src/collections/` (Concorrentes, Canais, Esteticas,
   Classificacao) no padrão `Espacos.ts`, registradas em `payload.config.ts`; seed externalizado em
   `admin/src/seed/radar/*.json` (migrado de `_raw`/`concorrentes.md`/`panorama.md`); `seed.ts`
   estendido; `pnpm --filter @vvf/admin generate:types` regenera os contracts. **Toca contracts →
   gated.**
H. **Aposentar fonte git:** remover `docs/discovery/radar/_raw/*.json`; reduzir `concorrentes.md` e
   `panorama.md` a **ponteiros/views** do DB.
I. **Skill** (`/skill-auditor`): `discovery-radar` passa a escrever no DB/admin. Diário/semanal/
   mensal (síntese narrativa) **permanecem** discovery docs.

## Arquivos permitidos (a cerca)

- `docs/_decisoes.md`
- `docs/_lexico.md`
- `docs/_domain-map.md`
- `docs/business/inteligencia-competitiva/`
- `docs/specs/inteligencia/`
- `docs/system/inteligencia-competitiva.md`
- `AGENTS.md`
- `.cursor/rules/00-inviolaveis.mdc`
- `docs/_index.md`
- `docs/README.md`
- `docs/roadmap/fases.md`
- `docs/discovery/inteligencia-competitiva.md`
- `docs/discovery/README.md`
- `docs/discovery/radar/`
- `admin/src/collections/`
- `admin/payload.config.ts`
- `admin/src/seed/`
- `admin/src/seed.ts`
- `packages/contracts/generated/payload-types.ts`
- `.agents/skills/discovery-radar/`
- `docs/tasks/WO-INTEL-001.md` (lifecycle/finalização)

## 6. Fora de escopo

- Coleta automatizada (Apify/Meta Ad Library/YouTube) e qualquer job no `api-server` — congelado D-19.
- Render L3 no Tracker Hub e qualquer view nova no admin — congelado D-19.
- Tabelas time-series de Anúncio/Sinal — marcadas como extensão futura na spec, **não** construídas.
- Pinterest pago, TikTok per-concorrente (não-objetivos D-19).

## 7. Critérios de aceite

- [ ] D-20 registrado em `_decisoes.md`, D-19 marcada `(emendada pela D-20)`, ecos sincronizados.
- [ ] Business Doc, Domain Map, léxico, specs e System Doc do domínio existem, cada um pela skill dona.
- [ ] Collections Payload (Concorrentes/Canais/Esteticas/Classificacao) + seed externalizado; `pnpm seed`
      idempotente (2× sem duplicar); contracts regenerados.
- [ ] `pnpm verify` verde (typecheck + lint + boundaries + test + build).
- [ ] `_raw/*.json` removido; `concorrentes.md`/`panorama.md` reduzidos a ponteiros do DB.
- [ ] Skill `discovery-radar` atualizada para escrever no DB.
- [ ] Guardrails D-19 escritos na spec (não só boa intenção).

## Referências

1. [`docs/_decisoes.md`](../_decisoes.md) — D-19 (faseamento, guardrails, schema "a definir na spec") + D-20.
2. [`docs/discovery/inteligencia-competitiva.md`](../discovery/inteligencia-competitiva.md) — veredito + lacunas (schema owner).
3. [`docs/discovery/radar/concorrentes.md`](../discovery/radar/concorrentes.md) · [`panorama.md`](../discovery/radar/panorama.md) · `_raw/*.json` — origem do dado.
4. [`admin/src/seed.ts`](../../admin/src/seed.ts) · [`admin/src/collections/Espacos.ts`](../../admin/src/collections/Espacos.ts) — padrão de collection + seed.
