---
id: WO-ADMIN-001
status: done
traces: [specs/admin/registros.md, specs/admin/rbac.md, specs/plataforma/primitivas.md, system/admin.md]
---
# WO-ADMIN-001 · Payload base + registros do 02

**Quem executou:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** ex-WO-01 da Fase 0b.

## Objetivo
Payload (Next-hosted) no schema `payload` (D-9), com as collections do registro da plataforma e RBAC (D-12).

## Arquivos
`admin/**` (não tocar `site/`, `api-server/`, `packages/contracts`).

## Aceite (entregue)
- Registros seedados: 3 TipoDeAssunto como collections (`espacos`/`servicos`/`campanhas` — [`../specs/plataforma/primitivas.md`](../specs/plataforma/primitivas.md), "tipo novo = collection nova"); 5 espaços com `categoria`; serviços com `papel: padrão|adicional`; Objetivos incl. `agendar_visita`; `tipos-de-evento` (dimensão transversal, **não** é Assunto).
- RBAC nativo do Payload (4 papéis, D-12), sem provedor externo.
- `payload generate:types` desaguando em `packages/contracts/generated`.
- Resíduo `mínimo` do doc legado **não** reproduzido — `Servicos` usa o canônico `padrão|adicional`.

## Refs
[`specs/admin/registros.md`](../specs/admin/registros.md), [`specs/admin/rbac.md`](../specs/admin/rbac.md), [`specs/plataforma/primitivas.md`](../specs/plataforma/primitivas.md), [`_decisoes.md`](../_decisoes.md) (D-1/D-9/D-12).

## Dívida conhecida (vira WO própria)
`Objetivos` é collection livre vs enum fechado `objectiveSchema` → [`WO-ADMIN-002`](WO-ADMIN-002.md).
