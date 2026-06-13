import { z } from "zod";
import {
  clickIdsSchema,
  consentSchema,
  correlationIdSchema,
  deviceSchema,
  eventTypeSchema,
  lpRefSchema,
  objectiveSchema,
  originChannelSchema,
  subjectRefSchema,
  utmSchema,
} from "./shared.js";

/**
 * Contrato de lead → Kommo (04 §7). A LP entrega o lead com origem; conversa, cadência
 * e qualificação são do Kommo (fronteira 03 §2). Dedup por telefone E.164 (D-11).
 *
 * Vale também para captura fora do site (D-13/D-14): lead forms nativos e CTWA entram pelo
 * MESMO contrato via webhook→api-server, com origin_channel da plataforma e metadados do
 * form/`referral` no lugar do contexto de página.
 */

/** Telefone em E.164 — a chave de identidade do lead (D-11). */
export const e164Schema = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, "telefone deve estar em E.164, ex.: +5519999999999");

export const leadContractSchema = z.object({
  name: z.string().nullable(),
  phone: e164Schema,
  email: z.string().email().nullable(),
  origin_channel: originChannelSchema,
  utm: utmSchema,
  xcode: z.string().optional(),
  /** Click IDs (D-14) — propagados da URL até o card; sem retrofit. */
  click_ids: clickIdsSchema.optional(),
  /** Join key reservada (diferido). */
  correlation_id: correlationIdSchema,
  event_type: eventTypeSchema.optional(),
  subjects: z.array(subjectRefSchema).default([]),
  lp: lpRefSchema.optional(),
  objective: objectiveSchema,
  /** Gancho LGPD (D-5) — pass-through hoje; opt-in mínimo no form. Não remover. */
  consent: consentSchema.optional(),
  page_url: z.string().url().optional(),
  device: deviceSchema.optional(),
  timestamp: z.string().datetime(),
});
export type LeadContract = z.infer<typeof leadContractSchema>;

/** Desfecho que volta do Kommo e alimenta o loop fechado (05 §9). Dispara por card (D-11). */
export const leadOutcomeSchema = z.object({
  phone: e164Schema,
  outcome: z.enum(["ganho", "perdido", "pipeline_recuperavel"]),
  reason: z.string().optional(),
  /** Valor por faixa da matriz M-02 para value-based bidding (D-14) — telemetria, não copy. */
  value: z.number().nonnegative().optional(),
  card_id: z.string().min(1),
  timestamp: z.string().datetime(),
});
export type LeadOutcome = z.infer<typeof leadOutcomeSchema>;
