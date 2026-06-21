---
name: intel-competitiva-dominio-convergente
description: WO-INTEL-001 passo B FEITO — business doc de inteligência-competitiva escrito (um doc, dois anéis), convergindo radar + KB de Competidor; próximo é passo C (Domain Map).
metadata:
  node_type: memory
  type: project
  originSessionId: c0bb13b7-a089-465f-8970-db181d729e07
---

**RESOLVIDO (jun/2026).** A convergência radar (WO-INTEL-001) + KB de Competidor (sales-enablement)
foi mapeada como **UM** business doc em `docs/business/inteligencia-competitiva/` (âncora `_dominio.md`
+ `coleta.md` / `analise.md` / `municao.md` / `lacunas.md`). Decisão de escopo: um doc, **só** o domínio
intel nesta rodada (funil/atores comercial = B1, adiado). **Passo B mesclado em `origin/main` (PR 62).**

**Modelo (refinado por análise adversarial multi-agente que confrontou os dados já coletados do radar):**
- **Dois anéis**, não 3 facetas de peso igual: Anel 1 = núcleo de coleta (serve o norte: recorrente,
  fácil acesso, robô); Anel 2 = leitura/análise humana (incremental, parte em Lacuna/congelada).
- **Reframe-raiz:** "Concorrente" ⇒ **Grupo** (entidade econômica) + **Concorrente-Espaço** (raiz
  observada que disputa o casal), Grupo(1):Concorrente-Espaço(N) — porque **4/5 dos alvos do radar são
  roll-ups**. Captura = **uma** `Observação` datada+Fonte (anúncio/review/preço = tipos, não entidades);
  Delta/SWOT/Reputação = **saídas derivadas**, não entidades/atributos. 29 regras `INTEL-<FACETA>-NN`.
- **Decisões batidas:** Grupo+Concorrente-Espaço (sim); "aspiracional" cortado do tier; aprovação de
  munição = **dono único (fundador) + dois níveis** (reverte o "comitê de gestão" inicial, alinha D-1);
  **Ganho/Perda é do comercial** (intel consome por conexão).

**Norte do fundador (peso alto):** inteligência recorrente, de fácil acesso, robôs coletando; a estrutura
do banco firma com o tempo — não super-projetar. Build segue **faseado** (só registro curado + seed agora,
D-20; motor automatizado + render L3 congelados, D-19). Coleta ampliada por **D-24** (cliente oculto;
cerca: meios legítimos, minimizar PII, não reusar criativo).

**PRÓXIMO:** passo C = Domain Map (`doc-domain-architect`, agora há 2 business docs: comercial + intel);
depois D (léxico — termos Grupo/Concorrente-Espaço/Observação/Finding/Estética/Disputa), E (specs), F
(system), G (impl). Ver [[wo-fence-edicao-governanca]] · [[pr-auto-merge-armar]] · [[worktree-write-path]].
