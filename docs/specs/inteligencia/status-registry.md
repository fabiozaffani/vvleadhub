# Status registry — ciclos de vida do domínio intel

**Camada:** spec · **Domínio:** inteligência-competitiva · **Origem:** business/inteligencia-competitiva/ (coleta.md §1, municao.md §1; _domain-map.md §5) · **Tom:** trabalho

> **Depende de:** [`modelo-de-dados.md`](modelo-de-dados.md) (as collections que carregam o `status`).
> **Responsabilidade única:** os **namespaces de status, estados e transições válidas** de cada entidade com ciclo de vida. NÃO define campos (modelo-de-dados) nem constrói guards.

---

## 1. Convenção (a 1ª status registry do repo — crava o padrão)

- **Namespace:** `intel.<entidade>` (snake_case). Estados em snake_case.
- **Materialização:** um campo `status` **select** por collection (padrão do repo — `Espacos.ts`). Sem tabela de status separada.
- **Guards de transição:** o conjunto de transições válidas abaixo é **ponto de imposição documentado**, **não** um guard construído agora — o repo **não impõe transição** em collection nenhuma hoje. Construir guard (hook `beforeChange`) é decisão de build futura, não do registro curado.
- **Sinalização:** os nomes canônicos de estado cravados aqui resolvem o drift Map×dono (C-DRIFT) — sinalizar o `doc-domain-architect` para alinhar a linha "Status" do `_domain-map.md §5`.

## 2. Namespaces com ciclo (materializados agora)

### `intel.grupo` *(Origem: coleta.md §1.1, INTEL-COL-03)*
Estados: `{ativo, arquivado}`. Transição: `ativo → arquivado`.
**SYS-INTEL-02:** a distinção "absorvido × arquivado" **não** é um 2º estado — é o campo `absorvido_por` (rel→grupos): preenchido ⇒ aquisição (há sucessor); vazio ⇒ saiu do mercado. *(F2)*

### `intel.espaco_concorrente` *(Origem: coleta.md §1.2, INTEL-COL-03/06/11)*
Estados: `{candidato, ativo, dormente, arquivado}`.

| De | Para | Gatilho |
|---|---|---|
| candidato | ativo | entra em monitoramento |
| candidato | arquivado | **descartado** — não disputa nenhum Espaço-VVF (COL-11) *(resolve C-CANDIDATO)* |
| ativo | dormente | sem atividade detectada (COL-06) |
| dormente | ativo | reaparição **confirmada por curadoria** (COL-06) — heurística humana, **não** guard automático |
| ativo / dormente | arquivado | terminal deliberado (saiu do mercado) — ato do curador |
| ativo | ativo | re-parentamento (troca de Grupo numa aquisição, preserva identidade — COL-03) |

> **Sincronização Grupo×EC (C-SYNC):** ao mover um Grupo para `arquivado` por aquisição (`absorvido_por` preenchido), seus Espaços-Concorrentes `ativo` devem re-parentar ao Grupo sucessor — invariante de integridade a impor no guard de build (não construído agora).

## 3. Namespaces sem ciclo (declarados explícitos)

*(resolve K-LIFECYCLE4 — a ausência é a modelagem correta, declarada)*

- **`observacoes`** — **imutável append-only**: sem `status`; correção = nova linha (SYS-INTEL-05). É o átomo datado.
- **`canais`** — registro: `{ativo, arquivado}` (não é máquina de estado de negócio).
- **`esteticas`** — registro: `{ativo, arquivado}`.
- **`disputas`** — associativa: `{ativa, encerrada}` (encerra quando o rival sai do mercado).
- **`citacoes`** — **imutável append-only**: sem `status`; cada menção na pesquisa de preço é uma linha (SYS-INTEL-07). A intensidade da Disputa é a contagem.

## 4. Namespaces congelados (D-19 — modelado, não construído)

- **`intel.finding`** = `{rascunho, curado, obsoleto}` — `curado` = `publicado` (um estado só; F/S-FINDING-BARRA).
- **`intel.objecao_argumento`** = `{rascunho, publicada, em_revisao, aposentada}` — `aprovada` = `publicada`; `em_revisao` **é estado** (entra via Delta material — INTEL-MUN-05). *(três estados de operação + o de revisão; não o playbook de 6 do B2B-SaaS)*
