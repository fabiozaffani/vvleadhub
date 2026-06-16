---
name: work-order
description: Recorta um spec/fase em work-orders cercados ou emite UM work-order no formato canônico (docs/tasks/) — escopo travado por allowlist de arquivos, aceite ancorado no 03 §7.1, gate por CODEOWNERS — e abre a issue rastreável via gh. Uso - /work-order [area|fase|spec] (ex.: /work-order site | /work-order 0 | /work-order 05).
disable-model-invocation: true
argument-hint: "[area|fase|spec]"
---

# Work-order — o manual da fatia, antes de codar

Um roadmap não é um prompt: "construa a Fase N" é como nasce espaguete bem documentado (docs/tasks/README.md). Esta skill produz o **antídoto** — um WO com a cerca definida **antes** do código. **doc ≠ WO:** os docs 00–09 são *specs*; um spec vira *vários* WOs (a Fase 0b virou WO-01..WO-07; o 05 vira muitos). Relação muitos-para-muitos — por isso a skill é **invocada de propósito** ao começar uma fatia, não dispara ao "ir codar um doc".

## Dois modos

- **(a) Recorte** — argumento é um spec/fase grande (ex.: `05`, `0`). NÃO emite WO: **propõe a quebra** em candidatos (título, pacote, cluster de aceite do 03 §7.1, quais tocam contracts/docs) e **para para o fundador escolher**.
- **(b) Emissão** — argumento é uma fatia já decidida (ex.: `site`). Emite **UM** WO no formato canônico.

## Cercas de tamanho (o tamanho EMERGE delas — sem número fixo)

1. **Um pacote.** `site/` OU `admin/` OU `api-server/` OU `infra/` — dois agentes nunca tocam o mesmo pacote na mesma fase.
2. **Um tema, um PR.** Calibre pelo gatilho do `/simplify` (CLAUDE.md): ~150 linhas líquidas, 5+ arquivos ou abstração nova → provavelmente são 2 WOs.
3. **Um cluster de aceite** do 03 §7.1 (ver o mapa WO→critério no rodapé de `fase-0.md`).
4. **Mudança em `packages/contracts` ou `docs/` = WO próprio**, pequeno e gated — nunca embrulhada numa feature.
5. **Para no gancho do diferido** (LGPD `consent`, `correlation_id`, opt-in mínimo): mantém o hook, não implementa (00 §7).

## Formato canônico do WO

```
## WO-NN · <área> — <título>  _(<executor: Cursor Composer por padrão; Claude Code quando delegado — fase-0.md>)_
**Objetivo:** 1–2 frases.
**Arquivos permitidos:** allowlist = a CERCA (não changelog), um pacote só. Respeita o 09 §2:
  site não importa admin/api-server; tipos cruzados só via packages/contracts; site sem lib de banco (D-9).
**Fora de escopo:** o que explicitamente NÃO fazer aqui (anti scope-creep — explicita o que o allowlist deixa implícito).
**Critérios de aceite:** subconjunto VERIFICÁVEL do 03 §7.1 (não inventar), cada um com "como provar"
  (comando | demo no preview | inspeção) — mesma régua do /checklist-fase.
**Refs:** docs donos a ler antes, na ordem: brand → 00 → 01 → 02 → 03 → spec da tarefa (04–09).
**Restrições de build:** armadilhas conhecidas da fase (fase-0.md, restrições 1–8): Astro output:'server'; sem Framer
  no site; shadcn só no admin; astro:assets (não next/image); tipos do Payload via contracts/generated; preview de
  draft só por token assinado + noindex. Build do admin (Payload) com next build --webpack vive no 09 §7.
**Gate:** PR de código → auto-merge no verde (pnpm ship). Toca packages/contracts, docs/ ou infra/ →
  CODEOWNERS (aval do fundador), nunca auto-mergeado.
```

## Rastreabilidade — arquivo é o dono, issue é o estado

Regra-mãe (00, cabeçalho; reforçada na §4.2): um dono por conceito. O **WO canônico vive em arquivo versionado**, sob CODEOWNERS, lido pelo agente (o Cursor lê o arquivo, não a GitHub API). A issue é só a camada de **estado** (aberto/fechado, discussão, checkboxes) e **aponta** para o arquivo — não recopia.

- **Refinamento de convenção (CONFIRMAR com o fundador; listar em openQuestions):** hoje os WOs são *seções* dentro de `docs/tasks/fase-N.md`. Para o 1:1 issue↔WO↔PR, cada WO ganha seu `docs/tasks/wo-NN.md` e o `fase-N.md` vira o **índice da fase** (épico: visão + links + mapa WO→critério). `docs/` é gated — não migrar sem o ok.
- **Mapeamento leve:** Milestone = Fase · Issue = WO (`WO-NN`) · sub-issue = só quando 1 WO racha em vários PRs · PR `Closes #NN` fecha no **merge** (com auto-merge, no verde). Aceites viram **checkboxes** na issue; o `/checklist-fase` posta a evidência como comentário e tica as caixas. Sem pontos, sprints ou zoológico de labels.

## Procedimento

1. **Ler as fontes:** 03 §7.1 (aceite literal), 09 §1.1/§2 (estrutura e fronteiras), `docs/tasks/README.md` + `fase-0.md` (anatomia e exemplos), e a spec da área.
2. **Inferir a numeração** `WO-NN` varrendo `docs/tasks/` (próximo livre, sem reusar).
3. **Recorte (a)** ou **emissão (b)** conforme o argumento, aplicando as 5 cercas. No recorte, parar e deixar o fundador escolher.
4. **Escrever o arquivo do WO** (`docs/tasks/wo-NN.md` ou seção, conforme a convenção vigente/confirmada). Cada aceite com seu "como provar".
5. **Ação outward — confirmar antes de criar.** Abrir issue/PR é voltado para fora: **mostrar o arquivo + o comando exato e criar só após o ok** — nunca silenciosamente.
   `gh issue create --title "WO-NN · <área> — <título>" --milestone "Fase <n>" --body <ponteiro p/ docs/tasks/wo-NN.md + checkboxes dos aceites>`

## Regras de veredicto

- O *done* é o aceite do 03 §7.1, verificável, com prova; o *contorno* é o allowlist (um pacote, 09 §2, o agente não escreve fora sem novo WO). Critério inventado ou aceite não-verificável → o WO não vale.
- WO que tocaria dois pacotes, estoura o calibre do `/simplify`, ou mistura `packages/contracts`/`docs/`/`infra/` com feature → rachar antes de emitir (caminho gated = WO próprio).
- O gate não muda: CODEOWNERS trava no PR, não na issue. Diferido (00 §7): o WO para no gancho — mantém, não implementa. Dúvida real de escopo (não decisão fechada) → perguntar ao fundador.
- **Não é git helper genérico** (lista de não-instalar do README) e não duplica CI nem `/code-review`/`/simplify`: o valor é forçar as regras VVF (done no 03 §7.1, arquivos = fronteira, gate CODEOWNERS, formato issue).
