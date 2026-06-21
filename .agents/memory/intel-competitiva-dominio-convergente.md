---
name: intel-competitiva-dominio-convergente
description: WO-INTEL-001 passos C+D+D-25 FEITOS — Domain Map + léxico do intel + D-25 (régua P1); rename Concorrente-Espaço→Espaço-Concorrente aplicado. Próximo: passo E (specs).
metadata:
  node_type: memory
  type: project
  originSessionId: c0bb13b7-a089-465f-8970-db181d729e07
---

**Passo C FEITO (jun/2026, branch `docs/wo-intel-001-domain-map`).** `docs/_domain-map.md` criado
(1º Domain Map do repo), ligado na espinha do `_index.md`. Skill dona `doc-domain-architect` + preflight;
proposta vetada por verificação adversarial (3 lentes) **e** corrigida por aval do fundador no chat.

**Descoberta estruturante — régua P1 (correção do fundador, candidata a `D-NN`):** o **comercial é domínio
de VENDA, não de criação**. Tudo que a empresa **provê** (Serviço, Espaço-VVF, Hospedagem) **nasce e é
vetado na operação (vvdomain)** — o comercial **só representa e vende**, nunca cria (gate de viabilidade/
processo interno é da operação). O que é do comercial são as **construções de venda**: Pacote/escada, funil,
Ganho/Perda. Isso reposiciona o vvleadhub: **comercial (vende) + inteligência (observa)**; o backbone
operacional/identidade é do **vvdomain** (externo).

**Ownership cravado (lacunas):**
- **L1 (Party):** Pessoa/Organização = transversal, **dono provável = vvdomain** (em mapeamento lá); NÃO
  cristalizar aqui; intel guarda conteúdo, nunca identidade (INTEL-FONTE-03). Gatilho de uso real: ≥2
  domínios persistirem identidade.
- **L2 (Ganho/Perda):** dono = **comercial** (DR5/INTEL-ANL-02/D-9); intel consome o agregado por conexão.
  Definição hoje **reside nos docs de intel** → **Reconciliação R1** (revisitar no B1/funil).
- **L3 (Observação/Finding):** = **intel** (confirmado, resiste).
- **Reconciliação R2:** Serviço/Espaço-VVF/Hospedagem aparecem como entidades no comercial, mas a fonte
  canônica é **operações (vvdomain)** — reconciliar quando vvdomain for mapeado.

**Refinamentos no mapa:** Disputa→Espaço-VVF = "Referência de Catálogo por id (D-9)", não Partnership
(acoplamento por DADO, não MODELO); SWOT/Reputação/Mapa/Delta = saídas derivadas (não-entidades);
Pergunta = 2 ciclos; seam futura Coleta×Munição; Handoff Auditável não se aplica (vigiar B1).

**Passos D-25 + D FEITOS (jun/2026):** D-25 (régua P1) registrada — ADR + ecos de range D-N, PR #67 mesclado.
Léxico do intel fixado (`doc-lexicon-keeper`, PR #68): termos canônicos (Grupo/Espaço-Concorrente/Canal/
Observação/Estética/Disputa/Finding/Pergunta de Inteligência/Munição/Prova/Battlecard/SWOT/Reputação + eixos
relação competitiva e nível de mercado); **Finding mantido EN**; **Serviço** com nota D-25. **Tríade de espaço
(head + sufixo):** `Espaço` (canônico; no comercial sempre VVF) × `Espaço-VVF` (qualificado, cross-domain) ×
`Espaço-Concorrente` (rival). Proscritos: `tier`, `Aspiracional`.

**FEITO — `doc-reconciler` aplicou** o rename **`Concorrente-Espaço` → `Espaço-Concorrente`** pela árvore
(business docs do intel, `_domain-map.md`, notas de pendência de léxico; o ADR `D-25` não continha o termo).
Fila do `_lexico.md` fechada (resolvido jun/2026). **Pendente p/ passo E:** checar colisão do termo com o
nome de collection `Concorrentes` (WO-INTEL-001 §G, congelado).

**PRÓXIMO:** rodar `doc-reconciler` (o rename) → passo **E** (specs `docs/specs/inteligencia/` — modelo de dados
+ status registry; **não** congelado, serve o registro curado D-20) → **F** (system) → **G** (impl).
Ver [[wo-fence-allowlist-heading]] · [[sed-mangles-markdown]] · [[pr-auto-merge-armar]].
