---
id: WO-DOCS-003
status: in_progress
traces: [D-26, CONTEXTO-IA§2.2, CONTEXTO-IA§7, CONTEXTO-IA§9, docs/discovery/curadoria-desintermediacao.md]
deps: []
skills: [sync-governanca]
---

# WO-DOCS-003 — Registrar D-26 (emendas de canon da tese de curadoria) + ecos

**Quem executa:** Claude Code. **Camada de tom:** trabalho. **Origem:** três emendas ao canon de marca (CONTEXTO-IA, vvcore) decididas pelo fundador no chat (jun/2026), derivadas da tese de curadoria/desintermediação. O canon já é emendado no PR vvcore (WO-CORE-030); falta o **registro formal da decisão D-26** no leadhub + os ecos de range D-N.

## 1. Objetivo

Registrar a decisão **D-26 — emendas de canon pela tese de curadoria/desintermediação**: corpo ADR em [`decisoes/`](../decisoes/) + 1 linha no índice [`_decisoes.md`](../_decisoes.md), marcar as colisões como **decididas** no registro de discovery, e propagar os ecos (bump das citações de range `D-1..D-25` → `D-1..D-26`) pela superfície de governança (`sync-governanca`).

## 2. Dependências

- `deps: []` — sem WO pré-requisito no leadhub. **Relaciona-se** ao **WO-CORE-030** (vvcore), que aplica as emendas no `CONTEXTO-IA.md` — repo distinto, não é `deps`. A canon-edição e o registro são PRs companheiros, ambos para merge do fundador.

## 3. Restrições de design

- **Conteúdo da decisão (já batido — NÃO reabrir):** as 3 emendas (exceção de crise INV-05; gate de preço M-02 baseline×alvo; desintermediação em §9) foram aprovadas pelo fundador. Aqui só se **registra**.
- **Golden rule:** o ADR é a fonte do detalhe; `_decisoes.md` é índice fino (1 linha); o resto **referencia, não recopia**. A canon-edição mora no vvcore (não recopiar o texto da invariante aqui).
- **§6.4 — discovery não promovido:** só estes 3 pontos sobem ao canon. O resto da tese fica em `discovery`; o registro de discovery é **atualizado** (colisões → decididas), não promovido a business/specs.
- **Cópia derivada:** `.cursor/rules/00-canon-vvf.mdc` é **derivada** do canon (regen pós-merge via `sync-cursor-rules.sh`) — **não** editar à mão aqui. O bump de range toca só `.cursor/rules/00-inviolaveis.mdc` (ponteiro mantido à mão).
- **Merge (D-21 / §4):** toca `AGENTS.md` + `.cursor/rules` (superfície de governança) → **NÃO armar `--auto`**; merge explícito do fundador. Ver [[pr-auto-merge-armar]].

## 4. Passos

1. **`sync-governanca`** (modo: nova decisão D-26) — achar o lar canônico e enumerar os ecos (feito: 6 citações de range).
2. Criar `docs/decisoes/D-26-emendas-canon-tese-curadoria.md`: contexto (tese + colisão §1.2), decisão (as 3 emendas A/B/C), consequências (canon VV-wide via WO-CORE-030; resto da tese segue em discovery; provisórios — gatilho INV-05 e desenho do teste de elasticidade).
3. `docs/_decisoes.md` — acrescentar 1 linha de índice para D-26.
4. Atualizar [`discovery/curadoria-desintermediacao.md`](../discovery/curadoria-desintermediacao.md) §4: marcar as 3 colisões como **DECIDIDAS (D-26)**, com link ao ADR.
5. Bump das citações de range `D-1..D-25` → `D-1..D-26`: `docs/_index.md` (2x), `docs/README.md`, `AGENTS.md` (2x), `.cursor/rules/00-inviolaveis.mdc`.
6. Abrir **PR de governança** — sem `--auto`; aguarda o merge do fundador.

## Arquivos permitidos

- `docs/decisoes/`
- `docs/_decisoes.md`
- `docs/_index.md`
- `docs/README.md`
- `AGENTS.md`
- `.cursor/rules/`
- `docs/discovery/`

## 6. Fora de escopo

- Reabrir o **conteúdo** das 3 emendas (decidido).
- Aplicar a edição do **canon** (é o WO-CORE-030, repo vvcore).
- Promover o resto da tese (segundo funil, menu de sonhos, governança anti-BV) — segue em discovery (§6.4); sobe via business→specs→system na Fase 1.
- Regenerar `.cursor/rules/00-canon-vvf.mdc` (derivada — pós-merge do canon, via script).

## 7. Skills a carregar (ordem)

1. **`sync-governanca`** (dona da superfície de governança, §6.1) — registra a decisão e propõe os ecos sincronizados.
- Universais de todo PR (`/code-review`) não listados.

## 8. Critérios de aceite (done looks like)

- [ ] `docs/decisoes/D-26-*.md` existe no formato do template (contexto/decisão/consequências). Prova: inspeção.
- [ ] `_decisoes.md` tem a linha de índice de D-26. Prova: `grep -n "D-26" docs/_decisoes.md`.
- [ ] `discovery/curadoria-desintermediacao.md` §4 marca as colisões como decididas (link D-26). Prova: inspeção.
- [ ] Citações de range incluem D-26 — sem drift. Prova: `grep -rn "D-1\.\.D-25" docs AGENTS.md .cursor` = 0.
- [ ] PR aberto **sem** `--auto`; aguarda merge do fundador. Prova: inspeção do PR.

## 9. Refs (ler antes)

1. [`discovery/curadoria-desintermediacao.md`](../discovery/curadoria-desintermediacao.md) — veredito + as 3 colisões.
2. [`decisoes/D-25-comercial-vende-nao-cria.md`](../decisoes/D-25-comercial-vende-nao-cria.md) — formato ADR + [`_decisoes.md`](../_decisoes.md) (padrão das linhas).
3. WO-DOCS-002 — precedente de registro de decisão + ecos.
