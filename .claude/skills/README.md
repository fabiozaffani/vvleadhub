# Skills do agente — migradas para o vvcore

As skills deste repo foram **promovidas para o core compartilhado** (`vvcore`) em **2026-06-17** e agora
carregam globalmente via a junction `~/.claude/skills -> vvcore/plugins/vvcore/skills`. **Não há mais
skills locais aqui** — uma skill mora no core **ou** no repo, nunca nos dois (cópia única = sem drift).

- **Inventário + governança** (autorais, vendorizadas, critério de vendoring, "não instalar"):
  [`../../../vvcore/plugins/vvcore/skills/README.md`](../../../vvcore/plugins/vvcore/skills/README.md).
- **Promovidas** (jun/2026): `copy-marca`, `a11y-axe`, `audit-quality`, `checklist-fase`, `work-order`,
  `auditar`, `sync-governanca`, `react-best-practices`, `seo-schema-org`.
- **`.agents/skills/` removido:** downloads brutos não-adotados (`copywriting`, `web-design-guidelines`,
  `next-best-practices`, `find-skills`) + a duplicata `vercel-react-best-practices` (era a versão crua da
  `react-best-practices` já vendorizada e revisada). `copywriting` e `web-design-guidelines` permaneciam
  recusados por decisão de governança (genérico/INV-05; conflito com as Design Guidelines).

Regra de ouro mantida: **invariante inviolável vive no `AGENTS.md`** (contexto sempre presente); skill é
**procedimento longo sob demanda**. Poucas skills boas > muitas. Nova skill nasce em `.claude/skills/`
(iteração rápida) e sobe via `/promote <skill>` quando prova valor transversal.

## Backlog — criar quando a fase abrir a lacuna
| Skill futura | Criar na | Conteúdo previsto |
|---|---|---|
| `eventos-tracking` | Fase 1 | Schema canônico de eventos (05 §4) **incluindo `click_ids` (D-14 — nasce com a skill, sem retrofit)**, catálogo completo (05 §13, com eventos de visita), split de ingestão D-15 (analytics via proxy CF × `/collect`), caminho CTWA (05 §9.3), "novo destino = adapter puro + testes", `test:true`/sandbox obrigatório (05 §11) |
| `nova-lp` | Fase 2 | Procedimento de LP por campanha: Molde + Assunto + Objetivo, capacidades dos Blocos (02 §4), eventos com `correlation_id` + `click_ids`, regra de canônico (04 §9 — um Assunto = uma página indexada; LP extra = `noindex`/canonical), checklist (sem preço, opt-in mínimo, consent pass-through) |

## Mapa de qualidade — qual ferramenta, quando
| Régua | Ferramenta | Quando | Quem dispara |
|---|---|---|---|
| Runtime do site buildado (CWV + axe) | `/audit-quality` | Sob demanda, por rota; sempre nos gates de fase | Fundador |
| Diff do PR — bugs | `/code-review` (nativa) | **Todo PR antes do merge**, sem exceção de tamanho | Agente (regra no CLAUDE.md) |
| Diff do PR — simplificação/reuso | `/simplify` (nativa) | Threshold do CLAUDE.md: > 150 linhas líquidas · 5+ arquivos · abstração nova · escopo cresceu | Agente (regra no CLAUDE.md) |
| Fase pronta | `/checklist-fase` | Fim de fase, antes de promover preview | Fundador |
| Subsistema × spec dona (estrutura/contrato) | `/auditar <area>` | Sob demanda · dívida técnica · legado — fora do gate | Agente/fundador (read-only) |

> As skills citadas acima agora vivem no vvcore (ver inventário). Quando o tooling real existir
> (lighthouserc, axe no CI, dependency-cruiser), atualizar `audit-quality`/`checklist-fase` **no vvcore**
> com os comandos exatos do repo.
