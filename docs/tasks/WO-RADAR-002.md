---
id: WO-RADAR-002
status: done
traces: [D-19]
deps: []
skills: [sync-governanca]
---

# WO-RADAR-002 — Propagar a emenda à D-19 (coleta ampliada / cliente oculto)

## 1. Objetivo (o quê & por quê)
Propagar pela superfície de governança a emenda à **D-19** decidida pelo fundador: a coleta da inteligência competitiva passa a incluir **cliente oculto/mystery shopping** (público **ou não**). Registrar a decisão emendante (**D-22**) e alinhar os guardrails ativos que ainda dizem "só conteúdo público". Sem isso, ledger e radar ficam contradizendo a emenda já registrada em [`discovery/inteligencia-competitiva.md`](../discovery/inteligencia-competitiva.md) (2026-06-20) e nos `fontes.md`/templates do radar.

## 2. Dependências
**Nenhuma** (`deps: []`). A emenda de discovery (validada pelo `doc-discovery-mapper`) e a extensão do radar (`fontes.md`/templates) já estão aplicadas nesta sessão — são o insumo, não pré-requisito de WO.

## 3. Restrições de design
- **Padrão emenda (ARQUITETURA-IA §6.3):** decisão fechada **não se reescreve** — emenda-se. D-22 é a decisão emendante; D-19 ganha status "fechada (emendada pela D-22)". Não reabrir o mérito da D-19.
- **`AGENTS.md` vence:** nenhuma das edições contradiz o `AGENTS.md` (que não restata o guardrail de coleta — confirmado por grep).
- **Gate/faseamento intactos:** a emenda **não** muda o gate da D-19 (≥3 ideias usáveis + admin/Tracker Hub) nem o congelamento do build p/ Fase 3.
- **Cerca mínima preservada na nova redação:** meios legítimos (sem meio ilícito/invasão/quebra de NDA); LGPD sobre **PII de indivíduos** (alvo = inteligência de **negócio**); nunca reusar criativo alheio nos nossos ads.
- **Não reescrever história:** WOs `done` e diários datados ficam como estão.

## 4. Passos
1. **`_decisoes.md`** — inserir a linha **D-22** (texto exato abaixo) ao fim da tabela de decisões (após a D-21); mudar o status da **D-19** de `fechada` para `fechada (emendada pela D-22)`.
2. **`radar/README.md`** §Guardrails — substituir a linha "LGPD: só conteúdo público de negócio…" pela redação da coleta ampliada + cerca mínima (ref. D-22).
3. **`radar/concorrentes.md`** linha 7 — idem (a nota "LGPD/D-19: só conteúdo público de negócio…").
4. **`discovery/inteligencia-competitiva.md`** — trocar "emenda à D-19 (pendente de registro em `_decisoes.md`)" por "emenda à D-19 (registrada como **D-22**)".

**Texto exato da D-22:**
> `| D-22 | jun/2026 | **Coleta ampliada da inteligência competitiva (emenda à D-19):** a coleta deixa de ser restrita a conteúdo público — inclui **cliente oculto/mystery shopping** (prática padrão do segmento: preço real, script de venda, processo, pontos fracos do atendimento), público **ou não**. **Cerca mínima:** (a) meios **legítimos** (sem meio ilícito/invasão/quebra de NDA); (b) **LGPD sobre dado pessoal de indivíduos** — minimizar PII (rostos/nomes de vendedores, depoimentos de casais), o alvo é a inteligência **de negócio** do concorrente; (c) **nunca reusar criativo alheio nos nossos ads**. O **gate** da D-19 (≥3 ideias usáveis + admin/Tracker Hub) e o **faseamento** (build congelado p/ Fase 3) **não mudam**. Motiva: o radar v0 mostrou que a experiência de compra por dentro é a fonte mais rica p/ fraquezas/SWOT/munição do KB de Competidor (extensão sales-enablement em `discovery/inteligencia-competitiva.md`, emenda 2026-06-20). | fechada |`

## Arquivos permitidos (a cerca)
- `docs/_decisoes.md`
- `docs/discovery/radar/README.md`
- `docs/discovery/radar/concorrentes.md`
- `docs/discovery/inteligencia-competitiva.md`

## 6. Fora de escopo
- `docs/tasks/WO-RADAR-001.md` e `docs/discovery/radar/diario/*.md` — **histórico**, não reescrever.
- `docs/discovery/radar/fontes.md` + `_template-{diario,semanal,mensal}.md` — já atualizados nesta sessão.
- `.agents/skills/discovery-radar/SKILL.md:95` (checklist da skill ainda diz "só conteúdo público") — **edição de skill é da `skill-auditor`** → vira **follow-up separado**, fora deste WO.
- Qualquer mudança no gate/faseamento da D-19; qualquer build.

## 7. Skills a carregar (ordem)
1. **`sync-governanca`** — dona da superfície de governança; aplica o padrão emenda e mantém os ponteiros consistentes. Obrigatória (a cerca toca `_decisoes.md`/canon).

## 8. Critérios de aceite (done looks like)
- [ ] **D-22 no ledger** com o texto aprovado — `grep -n "D-22" docs/_decisoes.md`.
- [ ] **D-19 marcada** "fechada (emendada pela D-22)" — `grep -n "D-19 |" docs/_decisoes.md` (inspeção do status).
- [ ] **Guardrails ativos emendados** — `grep -n "cliente oculto\|público ou não\|coleta ampliada" docs/discovery/radar/README.md docs/discovery/radar/concorrentes.md` retorna a nova redação.
- [ ] **Ponteiro atualizado** — `grep -n "registrada como D-22" docs/discovery/inteligencia-competitiva.md`.
- [ ] **Sem órfão ativo** — `grep -rn "só conteúdo público" docs/` retorna **apenas** histórico (WO-RADAR-001, diarios) (a do `SKILL.md` está fora de `docs/`, fica p/ skill-auditor).
- [ ] Escopo 1-PR → `status: done` no PR de execução (D-3); **PR de governança NÃO auto-merge** → merge explícito do fundador.

## 9. Refs (ler antes)
1. [`docs/_decisoes.md`](../_decisoes.md) — D-19 (a emendar) e o padrão das emendas (D-18/D-21).
2. [`docs/discovery/inteligencia-competitiva.md`](../discovery/inteligencia-competitiva.md) — emenda 2026-06-20 (origem).
3. ARQUITETURA-IA §6.3 (padrão emenda) — via `@import`.
