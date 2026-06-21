---
id: WO-DOCS-002
status: done
traces: [_domain-map.md]
deps: []
skills: [sync-governanca, doc-domain-architect]
---

# WO-DOCS-002 — Formalizar a régua P1 (comercial vende, não cria) como decisão D-25

**Quem executa:** Claude Code (delegado). **Camada de tom:** trabalho. **Origem:** princípio **P1** capturado no Domain Map (passo C da WO-INTEL-001) e confirmado pelo fundador no chat (jun/2026); falta o registro formal como decisão fechada + a propagação dos ecos.

## 1. Objetivo

Registrar a régua **P1 — "o comercial é domínio de venda, não de criação"** como decisão **D-25**: 1 linha no índice [`_decisoes.md`](../_decisoes.md) + corpo ADR em [`decisoes/`](../decisoes/), e propagar os ecos pela superfície de governança (`sync-governanca`), tirando a régua do estado "candidata/pendente" no mapa. É doutrina de ownership estrutural — vira decisão fechada para não ser re-litigada.

## 2. Dependências

- `deps: []` — sem WO pré-requisito. **Assume o PR #66 (passo C) mesclado** (o `_domain-map.md` com P1 já em `main`); como #66 auto-mescla no verde, partir de `main` atualizada.

## 3. Restrições de design

- **Conteúdo da decisão (já batido — NÃO reabrir):** o comercial possui as construções de venda (**Pacote/oferta, funil, Ganho/Perda**); tudo que a empresa *provê* (**Serviço, Espaço-VVF, Hospedagem**) nasce e é vetado na **operação (vvdomain)** por gate de viabilidade/existência/processo interno — o comercial **só representa e vende**.
- **Golden rule:** o ADR é a fonte; `_decisoes.md` é índice fino (1 linha); o resto **referencia, não recopia**.
- **Emenda, não revogação:** D-25 *relaciona-se* a **D-9** (isolamento de schema / fronteira de ownership) e à **Reconciliação R2** do mapa; não revoga decisão anterior — registrar a relação.
- **Merge (D-21 / §4):** o PR toca `AGENTS.md` + `.cursor/rules` (superfície de governança) → **NÃO armar `--auto`**; fica para o **merge explícito do fundador** (gate D-1 por convenção). Ver [[pr-auto-merge-armar]].

## 4. Passos

1. Carregar **`sync-governanca`** (modo: nova decisão D-25) — achar o lar canônico e enumerar os ecos.
2. Criar `docs/decisoes/D-25-comercial-vende-nao-cria.md` a partir de [`decisoes/_template.md`](../decisoes/_template.md): **contexto** (correção do fundador no passo C), **decisão** (a régua P1 + a divisão dono-da-venda × provido-pela-operação), **consequências** (Reconciliação R2; vvleadhub = comercial + inteligência; Serviço/Espaço/Hospedagem → operação/vvdomain), **relação** com D-9.
3. `docs/_decisoes.md` — acrescentar 1 linha de índice para D-25.
4. `sync-governanca` propaga os ecos e **reconcilia as faixas D-N citadas** para incluir D-25: `_index.md`, `AGENTS.md`, `.cursor/rules/00-inviolaveis.mdc`, `docs/README.md` (várias estavam drifted em D-21/D-23/D-24).
5. Carregar **`doc-domain-architect`** para tocar o mapa: em `docs/_domain-map.md`, §2/P1 deixa de ser "candidata a registro" e §8 passa de "pendente de aval" para "registrada como D-25".
6. Abrir **PR de governança** — mostrar antes, criar após o ok; **sem `--auto`**.

## Arquivos permitidos (a cerca)

- `docs/_decisoes.md`
- `docs/decisoes/`
- `docs/_index.md`
- `docs/_domain-map.md`
- `AGENTS.md`
- `.cursor/rules/**`
- `docs/README.md`

## 6. Fora de escopo

- Reabrir o **conteúdo** da régua P1 (decidido).
- Aplicar a **Reconciliação R2** de fato (Serviço/Espaço/Hospedagem no business doc do comercial) — só dispara quando a operação/vvdomain for mapeada; aqui só se **registra a decisão**.
- **Passo D** (léxico) e os demais passos da WO-INTEL-001.

## 7. Skills a carregar (ordem)

1. **`sync-governanca`** (dona da superfície de governança, §6.1) — registra a decisão e propõe o changeset sincronizado dos ecos.
2. **`doc-domain-architect`** (dona do `_domain-map.md`, §6.1) — atualiza §2/§8 do mapa (tira "candidata/pendente").
- Universais de todo PR (`/code-review`) não listados.

## 8. Critérios de aceite (done looks like)

- [ ] `docs/decisoes/D-25-*.md` existe no formato do template, com contexto/decisão/consequências/relação-com-D-9 (inspeção).
- [ ] `_decisoes.md` tem a linha de índice de D-25 apontando para o corpo (inspeção).
- [ ] Faixas D-N citadas (`_index.md`, `AGENTS.md`, `.cursor/rules`, `docs/README.md`) incluem D-25 — sem drift (`grep -rn "D-1\.\.D-2[0-9]"`).
- [ ] `_domain-map.md` §2/§8 não diz mais "candidata"/"pendente" — aponta D-25 (inspeção).
- [ ] PR aberto **sem** `--auto` (governança); aguarda o merge do fundador (inspeção do PR).

## 9. Refs (ler antes)

1. [`_domain-map.md`](../_domain-map.md) §2 (P1) + §8 (pendência).
2. [`decisoes/_template.md`](../decisoes/_template.md) (formato ADR) + [`_decisoes.md`](../_decisoes.md) (padrão das linhas de índice).
3. ARQUITETURA-IA §6.1 (`sync-governanca` é a dona) + D-9 (relação de ownership).
