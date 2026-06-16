---
name: sync-governanca
description: Mantém a superfície de governança consistente quando uma regra, invariante ou decisão muda — acha o lar canônico, enumera os ecos, aplica o padrão emenda e propõe o changeset sincronizado (gated por CODEOWNERS). AGENTS.md é a fonte e vence sempre. Uso - /sync-governanca [regra|decisão|arquivo alterado]; sem argumento, modo auditoria varre a superfície e reporta drift existente.
disable-model-invocation: true
argument-hint: "[regra|decisão|arquivo alterado]"
---

# Sync de governança — manter os ponteiros falando a mesma língua

O `AGENTS.md` manda "mantenha-os sincronizados quando uma regra muda" — e **nada de máquina verifica isso**: o CI trava fronteiras de **código** (dependency-cruiser, 09 §2), não consistência de **doc**. Num repo cujo eixo é governança multi-agente (D-16/D-18), ponteiro fora de sincronia = Cursor e Claude Code seguindo regras diferentes — o maior risco silencioso do projeto. Princípio: **o `AGENTS.md` é a fonte canônica e vence sempre; a skill propõe, o fundador aprova.**

## Superfície (confirmar lendo o repo — não decorar)

- **`AGENTS.md`** — fonte única, tool-neutral. Em conflito, vence.
- **`CLAUDE.md`** — ponteiro + resumo dos invioláveis inline (Claude Code).
- **`.cursor/rules/00-inviolaveis.mdc`** — ponteiro + invioláveis inline, `alwaysApply` (Cursor).
- **`.cursor/rules/{site,admin,api-server,contracts}.mdc`** — regras por pasta.
- **`docs/00-indice-regras.md` §6** (glossário canônico) e **§7** (log de decisões D-1..D-N + diferidos).
- **`docs/tasks/README.md`** (papéis de governança) e **`.claude/skills/README.md`** (só se a mudança tocar regra de skill/qualidade).

## Procedimento

1. **O que mudou.** Do argumento; se já está no working tree, `git diff` (e `git diff --staged`) os arquivos da superfície para extrair a mudança real.
2. **Lar canônico.** `AGENTS.md` é a fonte. Decisão → `00` §7. Vocabulário → `00` §6. O lar recebe o texto primeiro; os ponteiros ecoam depois.
3. **Enumerar todo eco.** `grep -rn` os termos/IDs afetados por **toda** a superfície; listar onde cada um aparece. Nenhum eco órfão.
4. **Padrão emenda (onde o erro mora).** Decisão fechada **não se rediscute — só se emenda**, com aval do fundador (caso real de cadeia: D-7 → emendada pela D-16 → emendada pela D-18 — a própria governança multi-agente que esta skill mais propaga). Emendar = (a) editar status/texto da original (`fechada (emendada pela D-N)`); (b) acrescentar a decisão emendante no §7; (c) atualizar **todo** doc que referencia a original. Nunca reabrir o mérito.
5. **Detectar drift dos resumos inline.** Comparar os invioláveis de `CLAUDE.md` e de `00-inviolaveis.mdc` **contra** o `AGENTS.md` — sinalizar cada divergência (afirmação ausente, contraditória ou desatualizada).
6. **Vocabulário (00 §6).** Mudou um termo? `grep -rn` o repo **inteiro** pelos proibidos (`venue`, `Foco`, "intenção × unidade", `Arquétipo` no sentido plataforma) e sinalizar ocorrências — colisão de nome é defeito, não estilo (00 §4); `Arquétipo` é exclusivo da marca (00 §6).
7. **Propor o changeset.** Tabela **arquivo × o que muda × por quê**.

## CODEOWNERS — propor, não declarar pronto

Toda a superfície é gated (`.github/CODEOWNERS` → `@fabiozaffani`): `AGENTS.md`, `CLAUDE.md`, `docs/`, `.cursor/rules/`, `.github/`, `packages/contracts/`, `infra/`. Logo: **entra por branch + PR com aval do fundador, NUNCA auto-mergeado.** A skill edita os arquivos e abre o PR, mas **não** declara sincronizado por conta própria — confirma o changeset com o fundador antes de editar. PR de governança **não usa `pnpm ship`** (que liga `--auto` merge): abre PR normal e deixa para o aval do fundador.

## Modo auditoria (sem argumento)

Varre a superfície e reporta o **drift existente**, com evidência por `arquivo:linha`: um `.mdc` contradiz o `AGENTS.md` (drift vivo hoje em `.cursor/rules/00-inviolaveis.mdc:11` — "sem branch protection mecânica" onde já está ligada + auto-merge, pós-#18)? algum ponteiro ainda cita o Replit (removido pela D-18)? decisão referenciada por algum doc mas ausente do §7? termo do glossário §6 divergente no repo? Relatório `achado × arquivo:linha × correção proposta`.

## Tie-in — propagar decisão nova

É a skill que carrega uma decisão recém-fechada pela superfície. Ex.: uma decisão de mudar a convenção de work-orders (formato git epic/issue) entraria como: (a) registrar no `00` §7 com status `fechada`; (b) refletir os papéis no `docs/tasks/README.md` e o formato na skill `work-order`; (c) tocar os ponteiros **só se** mexer em invariante. Roda os passos 3–7 normalmente, sempre como proposta gated — a skill propaga uma decisão que o fundador já fechou, não inventa a decisão.

## Regras de veredicto

- **`AGENTS.md` vence sempre** — conflito entre ponteiros resolve-se pelo texto da fonte, não votando entre cópias.
- **A skill propõe, o fundador aprova** — toda a superfície é gated; nada auto-mergeia.
- **Nenhum termo de glossário fica divergente; nenhuma decisão fechada é rediscutida** — só emendada, com aval.
- **Não duplica:** o CI trava fronteiras de **código** (09 §2); esta skill cuida de consistência de **doc** de governança. Não é a régua de diff (`/code-review`) nem de fase (`/checklist-fase`) — se a regra mudada tiver trava de máquina, apontar para ela, não reimplementar aqui.
