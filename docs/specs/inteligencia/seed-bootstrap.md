# Seed bootstrap — carga portável do registro curado

**Camada:** spec · **Domínio:** inteligência-competitiva · **Origem:** business/inteligencia-competitiva/ (D-20; WO-INTEL-001 §H) · **Tom:** trabalho

> **Depende de:** [`modelo-de-dados.md`](modelo-de-dados.md) (collections e chaves naturais).
> **Responsabilidade única:** o **contrato do seed** — chave natural por entidade, idempotência, ordem de carga e a migração do radar v0 para o banco. NÃO define os campos (modelo-de-dados).

---

## 1. Por que chave natural (e não o id)

A PK serial não atravessa ambientes (dev≠preview≠prod), então o seed versionado em git **não** pode referenciar `id`. Cada entidade tem uma **chave natural** estável; o seed referencia por ela e a carga resolve para a FK serial. Padrão de upsert idêntico ao existente em [`../../../admin/src/seed.ts`](../../../admin/src/seed.ts) (`where: { slug: { equals } }`).

| Entidade | Chave natural |
|---|---|
| `grupos` | `slug` |
| `espacos-concorrentes` | `slug` |
| `canais` | (`tipo` + `identificador`) |
| `esteticas` | `slug` |
| `disputas` | (`espaco_concorrente.slug` + `espaco_vvf_slug`) |
| `observacoes` | append-only — **não** entra no seed bootstrap (são capturas, não registro de bootstrap) |

## 2. Idempotência

- `pnpm seed` roda **2× sem duplicar** (critério de aceite #3): upsert por chave natural — encontra-existe → atualiza; não-existe → cria.
- Referências internas (FK) são resolvidas **por slug** no momento da carga, não por id literal no arquivo.

## 3. Ordem de carga (resolve as dependências de FK)

1. `esteticas`, `grupos` *(sem FK de entrada)*
2. `espacos-concorrentes` *(FK `grupo`; N:N `esteticas`)*
3. `canais` *(FK polimórfica `owner` → grupos|espacos-concorrentes)*
4. `disputas` *(`espaco_vvf_slug` deve casar com um `espacos.slug` já semeado pelo seed comercial — acqua/florest/serra/morada/villa)*

> A Disputa valida `espaco_vvf_slug` contra os Espaços-VVF existentes **na aplicação** (D-9, sem FK cross-schema). Slug inexistente = erro de seed, não silencioso.

## 4. Migração do radar v0 → banco *(critério de aceite #5/#6)*

- Fonte: `docs/discovery/radar/_raw/*.json` + `concorrentes.md` → **seed versionado** (`admin/src/seed/` ou `admin/src/seed.ts`).
- Após a carga: `_raw/*.json` **removido**; `concorrentes.md` e `panorama.md` **reduzidos a ponteiros** do DB (deixam de ser a fonte).
- A skill `discovery-radar` é atualizada para **escrever no DB** (não mais em markdown) — handoff de implementação, fora desta spec.

> O git guarda **só o seed inicial** que bootstrapa produção; a captura corrente é dado de produto, curável no admin (D-20).
