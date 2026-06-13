import { z } from "zod";

/**
 * Primitivas compartilhadas entre o schema de evento (05 §4) e o contrato de lead (04 §7).
 * Esta é a ÚNICA fonte de verdade desses tipos (09 §1/§2). Runtimes derivam via z.infer —
 * nunca recopiam. Alterar aqui afeta os três runtimes → gated por CODEOWNERS.
 *
 * Vocabulário canônico (00 §6): subject = Assunto, subjectType = TipoDeAssunto,
 * objective = Objetivo, template = Molde. `venue`/`Foco` são proibidos.
 */

/** Marca — prontidão multi-vertical (02 §7); default VVF, nada ativado antes dos gates. */
export const brandSchema = z.enum(["VVF", "VVXV", "VVCorp"]).default("VVF");

/** TipoDeAssunto (01 §4 / 02 §2.2). Valores no vocabulário de domínio (pt-BR). */
export const subjectTypeSchema = z.enum(["espaço", "serviço", "campanha"]);
export type SubjectType = z.infer<typeof subjectTypeSchema>;

/** Referência a um Assunto vinculado (N:N com a LP). */
export const subjectRefSchema = z.object({
  ref: z.string().min(1),
  type: subjectTypeSchema,
});
export type SubjectRef = z.infer<typeof subjectRefSchema>;

/** Objetivo de conversão (02 §2.4). `agendar_visita` previsto (D-13). */
export const objectiveSchema = z.enum([
  "handoff_whatsapp",
  "captura_lead",
  "roteamento",
  "contato_qualificado",
  "agendar_visita",
]);
export type Objective = z.infer<typeof objectiveSchema>;

/** Canal de origem do lead (04 §7). `marketplace` (D-13). */
export const originChannelSchema = z.enum([
  "meta",
  "google",
  "tiktok",
  "pinterest",
  "youtube",
  "assessor",
  "organic",
  "bio",
  "marketplace",
]);
export type OriginChannel = z.infer<typeof originChannelSchema>;

/** Tipo de Evento — dimensão transversal (01 §3.1 / 02 §7). */
export const eventTypeSchema = z.enum(["casamento", "aniversario", "debutante", "corporativo"]);
export type EventType = z.infer<typeof eventTypeSchema>;

export const deviceSchema = z.enum(["mobile", "desktop"]);
export type Device = z.infer<typeof deviceSchema>;

/** UTM. `term` opcional (presente no contrato de lead, 04 §7). */
export const utmSchema = z.object({
  source: z.string().default(""),
  medium: z.string().default(""),
  campaign: z.string().default(""),
  content: z.string().default(""),
  term: z.string().optional(),
});
export type Utm = z.infer<typeof utmSchema>;

/**
 * Click IDs (D-14): capturados em cookie first-party junto de UTM/xcode, desde a Fase 1.
 * Click ID NÃO tem retrofit — sem eles o match quality do CAPI/EC4L despenca.
 * `fbc`/`fbp` do pixel Meta; `gclid` Google; `ttclid` TikTok; `epik` Pinterest.
 */
export const clickIdsSchema = z.object({
  fbc: z.string().optional(),
  fbp: z.string().optional(),
  gclid: z.string().optional(),
  ttclid: z.string().optional(),
  epik: z.string().optional(),
});
export type ClickIds = z.infer<typeof clickIdsSchema>;

/**
 * Consentimento (gancho LGPD — D-5, build diferido). Hoje pass-through; o campo já existe.
 * Não remover, não implementar gating real antes da etapa final (00 §7).
 */
export const consentSchema = z.object({
  analytics: z.boolean(),
  marketing: z.boolean(),
});
export type Consent = z.infer<typeof consentSchema>;

/** Vínculo LP na origem do evento/lead. */
export const lpRefSchema = z.object({
  id: z.string().default(""),
  molde: z.string().default(""),
  variant: z.string().default("a"),
});
export type LpRef = z.infer<typeof lpRefSchema>;

/**
 * Join key (diferido — value-mapping na etapa final, 00 §7). Campo reservado,
 * presente no evento e no lead. Manter o gancho; não preencher antes da hora.
 */
export const correlationIdSchema = z.string().optional();
