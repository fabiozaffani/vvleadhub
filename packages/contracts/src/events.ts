import { z } from "zod";
import {
  brandSchema,
  clickIdsSchema,
  consentSchema,
  correlationIdSchema,
  lpRefSchema,
  objectiveSchema,
  subjectRefSchema,
  utmSchema,
} from "./shared.js";

/**
 * Schema canônico de evento (05 §4 / §13). O evento é definido UMA vez aqui;
 * cada destino mapeia a partir dele (`Destino.map(event)`). Nada de campos ad-hoc.
 */

/** Catálogo canônico de eventos (05 §13). Origem-site + origem-Kommo (loop fechado, 05 §9). */
export const EVENT_NAMES = [
  // origem: site (collector)
  "page_view",
  "route_change",
  "page_enter",
  "page_exit",
  "scroll_depth",
  "cta_click",
  "whatsapp_handoff",
  "form_start",
  "form_field",
  "form_submit",
  "lead",
  "experiment_exposure",
  // origem: Kommo (loop fechado — marcos do funil M-04 + desfecho)
  "lead_qualificado",
  "visita_agendada",
  "visita_realizada",
  "no_show",
  "ganho",
  "perdido",
] as const;

export const eventNameSchema = z.enum(EVENT_NAMES);
export type EventName = z.infer<typeof eventNameSchema>;

/** Contexto de origem do evento (UTM, click IDs, xcode, LP, subjects, objetivo, experimento). */
export const eventContextSchema = z.object({
  url: z.string().url(),
  referrer: z.string().default(""),
  utm: utmSchema,
  xcode: z.string().optional(),
  /** Click IDs (D-14) — desde a Fase 1, sem retrofit. */
  click_ids: clickIdsSchema.optional(),
  /** Join key reservada (diferido — value-mapping na etapa final). */
  correlation_id: correlationIdSchema,
  lp: lpRefSchema.optional(),
  subjects: z.array(subjectRefSchema).default([]),
  objective: objectiveSchema.optional(),
  experiment: z
    .object({ key: z.string().default(""), variant: z.string().default("") })
    .optional(),
});
export type EventContext = z.infer<typeof eventContextSchema>;

/**
 * Evento canônico. `test:true` (05 §11): atravessa o pipeline real mas é roteado para
 * sandbox e excluído do store de produção — segregado de ponta a ponta.
 */
export const canonicalEventSchema = z.object({
  event_id: z.string().uuid(),
  event_name: eventNameSchema,
  timestamp_client: z.string().datetime(),
  anonymous_id: z.string().min(1),
  session_id: z.string().min(1),
  brand: brandSchema,
  test: z.boolean().default(false),
  /** Gancho LGPD (D-5) — pass-through hoje. */
  consent: consentSchema,
  context: eventContextSchema,
  /** Parâmetros livres por tipo de evento (ex.: { depth_pct: 75 }). */
  params: z.record(z.unknown()).default({}),
});
export type CanonicalEvent = z.infer<typeof canonicalEventSchema>;
