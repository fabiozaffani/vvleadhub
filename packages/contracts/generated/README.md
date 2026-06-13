# generated/ — tipos gerados (NUNCA editar à mão)

Saída de codegen, versionada para o CI checar drift (09 §2). Dois geradores desaguam aqui:

- **OpenAPI do api-server** → tipos do contrato HTTP (`api-server/openapi.yaml` é a fonte). O CI falha se o gerado divergir do commitado.
- **`payload generate:types`** (admin) → tipos das collections do Payload, consumidos pelo `site/` para tipar as respostas da API de conteúdo. **Não** escrever esses tipos à mão no site (regra `.cursor/rules/site.mdc`).

Configurar os scripts de geração na Fase 0b (work-orders em `docs/tasks/fase-0.md`).
