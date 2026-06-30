---
name: intel-competitiva-dominio-convergente
description: WO-INTEL-001 — B/C/D/D-25/E + re-root Operador-de-mercado + System Doc F FEITOS (PRs #77 re-root / #78 roadmap, abertos, merge do fundador, sem auto-merge). EC=recorte venue-only; Operador+Endereços=transversais modelado-não-construído (§6.4). Próximo: G (impl build, 7 collections Payload).
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
Fila do `_lexico.md` fechada (resolvido jun/2026). **Resolvido no passo E:** a collection do rival é
**`espacos-concorrentes`** (honra o head=Espaço; o WO §G dizia `Concorrentes`, pré-rename — atualizar o §G).

**Passo E FEITO (jun/2026):** Business Doc **validado** (review `doc-process-reviewer` adversarial — sólido,
zero blocking; banner promovido) + **FONTE-03 emendada** (guarda origem + quem-originou p/ uso interno/
prospecção, nunca divulga — D-19 legítimo interesse). 5 specs em `docs/specs/inteligencia/` (`modelo-de-dados`/
`status-registry`/`seed-bootstrap`/`guardrails-coleta`/`saidas-derivadas`), **venue-only**, **7 collections**
materializadas (grupos, espacos-concorrentes, canais, esteticas, disputas, observacoes[slice], citacoes).
Decisões-chave: Canal unifica superfícies (owner polimórfico Grupo|EC); Grupo `arquivado`+`absorvido_por`;
Disputa→Espaço-VVF por `espacos.slug` (D-9); Fonte=enum ordinal→confiabilidade derivada; `localizacao`=endereço
+coordenada geo; **citação→intensidade da Disputa** (DR7 — captura interina no intel, feed do funil B1 = futuro).

**Re-root FEITO (jun/2026) — PRs #77 (re-root) + #78 (roadmap estratégico) ABERTOS, aguardando merge do fundador (sem `--auto`).** A entidade observada generalizou p/ **Operador de mercado** (transversal, eixos `tipo_de_servico[]` × `relacao_com_vvf[]`, **ambos multi** — o multi sustenta o caso "venue que é também fornecedor curado"); Espaço-Concorrente = **recorte venue-only** (`tipo ⊇ {espaço} ∧ relação ⊇ {concorrente}`). Operador + banco de **Endereços** (L11) entraram como **conceitos transversais (`_domain-map.md` §5), modelado-não-construído** — NÃO entidade intel em §3, **SEM** novo Business Doc (§6.4: Curadoria/Assessoria/2º-funil é Fase 1, exige B1 mapeado). Passos: `doc-domain-architect` (Map §3.3/§5/§8) → `doc-lexicon-keeper` (termo + desambigua homônimo "Operador" do Grupo + colisão→`espacos-concorrentes`) → `doc-system-mapper` (**System Doc F escrito**: `system/inteligencia-competitiva.md`, duas altitudes) → `doc-reconciler` (`business/README` lista o intel + notas-forward leave-and-annotate, "raiz observada" PERMANECE nos business docs venue-only). WO §G 4→7 collections, traces +D-26, cerca +`business/README.md`. Tese de curadoria posicionada em **novo** `roadmap/estrategico.md` (Fase 1 **estratégica** ≠ Fase 1 de **build**=Eventos).

**Próximo = G (impl build): 7 collections Payload (`grupos`/`espacos-concorrentes`/`canais`/`esteticas`/`disputas`/`observacoes`/`citacoes`) + seed externalizado + regen contracts + `pnpm verify`** — fora do escopo do re-root (Claude Code é o ambiente primário atual; outro agente só com `AGENTS.md` + contextos). WO segue `in_progress`. Aval no merge (não bloqueia): rebaixar o alias "Operador" do Grupo nos business docs é decisão do fundador; sem novo ADR (re-root executa DR6/L10/L11+D-26). Ver [[pr-auto-merge-armar]] e [[wo-done-verdict-same-commit]] (o gate D-4 `done` só dispara no fechamento final da WO, após G).
