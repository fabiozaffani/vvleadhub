import path from "node:path";
import type { InputTransformerFn } from "orval";
import { defineConfig } from "orval";

// Os barrels de @vvf/api-client assumem que o título da API é "Api"
// (saída gerada = `api.schemas.ts`). Forçamos aqui para os caminhos de
// import gerados não dependerem do título escrito no spec.
const titleTransformer: InputTransformerFn = (config) => {
  config.info ??= {};
  config.info.title = "Api";
  return config;
};

const root = path.resolve(__dirname);
const apiZodSrc = path.resolve(root, "..", "api-zod", "src");
const apiClientSrc = path.resolve(root, "..", "api-client", "src");

export default defineConfig({
  // Zod de borda — consumido SÓ pelo api-server para validar req/params (D-22).
  "api-zod": {
    input: {
      target: "./openapi.yaml",
      override: { transformer: titleTransformer },
    },
    output: {
      workspace: apiZodSrc,
      client: "zod",
      target: "generated",
      schemas: { path: "generated/types", type: "typescript" },
      mode: "tags-split",
      clean: true,
      prettier: true,
      override: {
        zod: {
          coerce: {
            query: ["boolean", "number", "string"],
            param: ["boolean", "number", "string"],
            body: ["date"],
            response: ["date"],
          },
        },
        useDates: true,
      },
    },
  },
  // Hooks React Query — consumidos SÓ pelo admin (Next). O site é Astro e
  // não usa React Query (D-22).
  "api-client": {
    input: {
      target: "./openapi.yaml",
      override: { transformer: titleTransformer },
    },
    output: {
      workspace: apiClientSrc,
      target: "generated",
      client: "react-query",
      mode: "tags-split",
      clean: true,
      prettier: true,
      override: {
        fetch: { includeHttpResponseReturnType: false },
        mutator: {
          path: path.resolve(apiClientSrc, "custom-fetch.ts"),
          name: "customFetch",
        },
      },
    },
  },
});
