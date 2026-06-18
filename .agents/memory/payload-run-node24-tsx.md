---
name: payload-run-node24-tsx
description: "payload run quebra no Node 24 (tsx trata node: como arquivo); usar node --import tsx/esm + --env-file"
metadata: 
  node_type: memory
  status: draft
  type: project
  verified: 2026-06-15
  originSessionId: 3f276925-1a40-42cb-b9c6-ce008e34a905
---

`payload run <script>` (ex.: o seed do admin) **quebra no Node 24** (validado 15/06/2026,
Node 24.14.1 + tsx 4.22.4 — a última do registry). O tsx trata imports `node:` (ex.:
`node:crypto`) como arquivo no loader CJS, via os hooks síncronos novos do Node 24 →
`ENOENT ...\admin\node:crypto?tsx-namespace=...`. **Bump de tsx NÃO resolve** (o latest é o
que quebra).

**Workaround (já aplicado em `admin/package.json` → script `seed`):**

```
node --env-file=.env --import tsx/esm src/seed.ts
```

O loader ESM do tsx trata `node:` certo; o `--env-file` carrega o `admin/.env`
(cwd = `admin/` quando rodado por `pnpm --filter @vvf/admin seed`).

**Como aplicar:** qualquer script futuro baseado em `payload run` (migrations, manutenção)
vai bater no mesmo bug — trocar por `node --import tsx/esm`. Se um agente adicionar scripts
`payload run ...`, ajustar do mesmo jeito.

**Promoção:** candidato a virar nota em `docs/specs/engenharia/manutencao.md` quando confirmado num
segundo script.
