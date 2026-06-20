// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.astro/**",
      "**/.next/**",
      "**/.output/**",
      "**/coverage/**",
      "packages/contracts/generated/**",
      "packages/api-zod/src/generated/**",
      "packages/api-client/src/generated/**",
      // Diretórios de ambiente local / resíduo de tooling (não existem no repo/CI) — evita ruído de lint local.
      "**/.local/**",
      "**/.cache/**",
      "**/.upm/**",
      "**/.config/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    // Arquivos de config CommonJS (.cjs): globals do Node.
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { module: "readonly", require: "readonly", process: "readonly", __dirname: "readonly" },
    },
  },
  {
    // Configs ESM (.mjs) — astro.config.mjs, next.config.mjs: globals do Node.
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: { process: "readonly", URL: "readonly", console: "readonly" },
    },
  },
  {
    // Scripts de seed/CLI podem usar console livremente.
    files: ["**/seed.ts", "**/scripts/**"],
    rules: { "no-console": "off" },
  },
  prettier,
);
