---
name: intel-competitiva-dominio-convergente
description: Dois threads (WO-INTEL-001 radar data-home + sales-enablement KB de Competidor) convergem no mesmo domínio inteligência-competitiva; mapear UM business doc cobrindo as duas facetas.
metadata: 
  node_type: memory
  type: project
  originSessionId: c0bb13b7-a089-465f-8970-db181d729e07
---

Dois threads precisam do **mesmo domínio inteligência-competitiva** (entidade central
**Concorrente ≟ Competidor** — termo a reconciliar no léxico), e **nenhum business doc existe**
(`docs/business/` só tem `comercial`):

- **WO-INTEL-001** (D-20 — casa-de-dados do radar, mesclada #54): registro curado em **Payload** —
  Concorrente, Canal, Estética, Classificação + seed bootstrap. **Passos B–I pendentes**
  (business→specs→system→implementação→skill). Status da WO em `main`: `pending`.
- **Sales-enablement** (plano `~/.claude/plans/como-parte-do-projeto-encapsulated-unicorn.md`;
  emenda 2026-06-20 em `discovery/inteligencia-competitiva.md`): **KB de Competidor**
  (SWOT/reviews/fraquezas/objeção→argumento; cliente oculto da **D-24**) → aponta
  `doc-business-mapper (B1 funil/atores + B2 KB/Competidor)`.

**Recomendado:** **UM** business doc para o domínio cobrindo as duas facetas (registro/radar +
KB/munição); depois as **specs se separam** (schema do radar × KB), ambas com `Origem` no mesmo
business. Evita fragmentar ("um dono por conceito") e dispensa o `doc-domain-architect` costurar
docs rivais. **Decisão de coordenação ainda ABERTA** (qual thread mapeia / escopo) — confirmar com
o fundador antes de rodar o `doc-business-mapper`.

**D-24 alargou os guardrails de coleta** (cliente oculto/mystery shopping, público **ou não**, com
cerca mínima: meios legítimos, LGPD sobre PII de indivíduos, não reusar criativo alheio) — as specs
futuras refletem isso, não "só público".

Ver [[wo-fence-edicao-governanca]] · [[pr-auto-merge-armar]].
