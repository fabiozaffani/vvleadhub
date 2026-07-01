---
name: payload-admin-login-autofill-401
description: "Login do admin Payload \"falha\" no navegador (401) por autofill de senha antiga, enquanto curl com a senha certa dá 200; diagnostique pelo log do dev, não re-resetando."
metadata: 
  node_type: memory
  type: project
  originSessionId: 404950ff-d439-4e6a-9834-eb27be99b426
---

Ao resetar a senha do admin (Payload, D-12) via Local API e/ou reiniciar `pnpm dev`, o **navegador pode continuar enviando uma senha antiga (autofill)** → o dev server loga `AuthenticationError: The email or password provided is incorrect` + `POST /api/users/login 401`, **enquanto `curl` com a senha correta retorna 200**. Não é o servidor nem a senha em si.

**Why:** o gargalo é o cliente (autofill/senha salva), não o backend. Re-resetar às cegas não resolve e ainda confunde.

**How to apply:**
- Diagnostique pelo output do dev server (`tasks/<id>.output` do `pnpm dev` em background): `401` nas tentativas do navegador × `200` no curl = senha errada vinda do cliente.
- Fix p/ o usuário: digitar a senha à mão / janela anônima (sem autofill); hard-refresh também ajuda (Next troca hash dos chunks a cada restart do dev, quebrando abas antigas).
- Reset/unlock de usuário: script temp Local API rodado com `node --env-file=.env --import tsx/esm <script>` de dentro de `admin/` (ver [[payload-run-node24-tsx]]) — `payload.update({ id, data:{ password }})` + `payload.unlock({ collection:'users', data:{ email }})`. Apagar o script depois.
