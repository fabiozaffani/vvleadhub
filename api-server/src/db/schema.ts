import { pgSchema } from "drizzle-orm/pg-core";

/**
 * D-9: o api-server é dono APENAS do schema `app` (operacional). NUNCA declarar tabela
 * no schema `payload` (conteúdo, dono do Payload) — dado de conteúdo vem da API do Payload.
 */
export const appSchema = pgSchema("app");

// Tabelas operacionais (log de leads p/ atribuição, links xcode, log de dispatch, fila pg-boss)
// entram na Fase 0b/F2 — ver docs/tasks/fase-0.md. Forma de exemplo (não cria nada ainda):
//   export const leads = appSchema.table("leads", { id: uuid("id").primaryKey().defaultRandom(), ... });
