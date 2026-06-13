import { defineConfig } from "drizzle-kit";

/**
 * D-9: o Drizzle migra SÓ o schema `app`. `schemaFilter` garante que um generate/push
 * jamais enxergue as tabelas do schema `payload` como "sobra" e gere migração destrutiva
 * — o footgun nº 1 de um agente rodando `drizzle-kit push` num banco de dois schemas.
 * Belt-and-suspenders: os roles do Postgres (infra/db/roles.sql) já bloqueiam no nível do banco.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  schemaFilter: ["app"],
  dbCredentials: { url: process.env.DATABASE_URL_APP ?? "" },
});
