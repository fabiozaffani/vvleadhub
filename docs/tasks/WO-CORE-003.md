---
id: WO-CORE-003
status: done
traces: [.agents/context/ARQUITETURA-IA.md]
deps: []
skills: [sync-governanca]
---
# WO-CORE-003 · Propaga canon do vvcore p/ `.cursor` + persiste memória wo-fence — RASCUNHO

**Pré-promoção.** Executor: Claude Code. **Camada de tom:** trabalho. **Origem:** fechamento da propagação dos `WO-CORE-009..013` do vvcore (já mesclados lá) para o espelho `.cursor` deste repo + memória de aprendizado da sessão do WO-CORE-002.

## Objetivo
Fechar, no VVLEADHUB, a propagação do canon do vvcore: (1) **committar a regen** do espelho `.cursor/rules/00-canon-vvf.mdc` (gerada pelo `sync-cursor-rules.sh`, alinhando o espelho ao canon do vvcore já committed — D-1, `hook-wo-fence`, `.claude` no CODEOWNERS, campo `skills`); (2) **persistir a memória** do gotcha do `hook-wo-fence` em `.agents/memory/`.

## Dependências
**Nenhuma** (`deps: []`). O canon-fonte (vvcore `WO-CORE-009..013`) já está mesclado no vvcore.

## Restrições de design
- **`00-canon-vvf.mdc` é GERADO** por `sync-cursor-rules.sh` — committar o que o script produziu, **nunca editar à mão**. A regen já está no working tree.
- **Verificado:** vvcore `main` limpo/committed com `WO-CORE-009..013`; a regen corresponde ao canon atual (**não** é vazamento de canon uncommitted).
- **`.cursor/rules` é gated** por CODEOWNERS → PR gated, **sem auto-merge**, aval do fundador.
- **`.agents/memory`** é versionada e **não-gated** — pega carona no mesmo PR.
- Sem conteúdo novo: só committar o que já está no working tree (regen + memória draftada).

## Passos
1. Conferir que o working tree tem **só** essas 3 mudanças (sem vazamento).
2. Branch a partir da `main` atualizada.
3. `git add` das 3 + commit.
4. Push + abrir PR (gated, **sem auto-merge**) → aval do fundador.

## Arquivos permitidos (a cerca)
- `.cursor/rules/00-canon-vvf.mdc`
- `.agents/memory/MEMORY.md`
- `.agents/memory/wo-fence-edicao-governanca.md`

## Fora de escopo
- Editar o `00-canon` à mão (é gerado).
- Qualquer mudança no vvcore (já mesclado) ou no `AGENTS.md` (fechado no #44).
- Os follow-ups (C): `WO-CORE-002`→done, `_index:27`, cortes #2/#3 — WO próprio.

## Skills obrigatórias (ordem)
- **`sync-governanca`** (dona da superfície de governança, §6.1) — a cerca toca `.cursor/rules` (canônico gated). Aqui o ato é **commit de regen gerada** (não edição à mão), então é fecho de propagação, não mutação manual.

## Critérios de aceite (done looks like)
- `00-canon-vvf.mdc` committed reflete o canon do vvcore atual (D-1 / `hook-wo-fence` / `.claude` / `skills`). *Prova:* `git show` do commit.
- `wo-fence-edicao-governanca.md` + `MEMORY.md` committadas. *Prova:* aparecem no diff do PR.
- diff do PR = só essas 3 (+ o WO). *Prova:* `git diff --name-only main..HEAD`.
- PR gated, sem auto-merge, aguardando aval.

## Refs (ler antes)
- vvcore log: `WO-CORE-009/010/011/012/013`.
- `.agents/memory/wo-fence-edicao-governanca.md` (o conteúdo a persistir).
