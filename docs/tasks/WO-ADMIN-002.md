---
id: WO-ADMIN-002
status: pending
traces: [specs/admin/registros.md, specs/plataforma/primitivas.md]
---
# WO-ADMIN-002 · Validação `Objetivo` ↔ `objectiveSchema`

**Quem executa:** Cursor Composer. **Camada de tom:** trabalho. **Origem:** divergência da auditoria (jun/2026).

## Objetivo
Fechar o drift: a collection `Objetivos` é livre (nome/slug/descrição), mas o canônico (`objectiveSchema` em `packages/contracts`) é um enum fechado. Hoje nada impede criar um Objetivo fora do enum — o seed acerta os 5 valores, mas sem trava.

## Arquivos
`admin/src/collections/Objetivos.ts` (hook de validação), eventual ref a `@vvf/contracts`.

## Aceite
- Hook `beforeValidate`/`beforeChange` que rejeita `slug` de Objetivo fora de `objectiveSchema` (ou deriva as opções do enum). Teste cobrindo a rejeição.

## Refs
[`specs/admin/registros.md`](../specs/admin/registros.md), [`specs/plataforma/primitivas.md`](../specs/plataforma/primitivas.md) (Objetivo de conversão = registro extensível, mas tipado pelo contrato).
