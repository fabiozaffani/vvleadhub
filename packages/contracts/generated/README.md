# generated/ — tipos do Payload (NUNCA editar à mão)

Saída de codegen, versionada para o CI checar drift (09 §2). **Só um gerador desagua aqui** (D-22):

- **`payload generate:types`** (admin) → tipos das collections do Payload, consumidos pelo `site/` para tipar as respostas da API de conteúdo. **Não** escrever esses tipos à mão no site (regra `.cursor/rules/site.mdc`). O CI falha se o gerado divergir do commitado.

> **O contrato HTTP (OpenAPI) NÃO vive mais aqui (D-22).** A fonte é `packages/api-spec/openapi.yaml` e o codegen Orval desagua em `@vvf/api-zod` (validação de borda) e `@vvf/api-client` (hooks React Query) — cada um com seu próprio `src/generated/` e lockfile de drift (`pnpm codegen:check`).
