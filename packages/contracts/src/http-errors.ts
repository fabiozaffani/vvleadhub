import { z } from "zod";

/**
 * Códigos de erro do envelope HTTP do api-server (09 — specs/engenharia/contrato-http.md).
 * Esta é a ÚNICA fonte dos códigos válidos (D-23): o `openapi.yaml` declara
 * `error.code` como `string` (sem enum gerado) e as rotas checam o valor com
 * `errorCodeSchema`. O cliente ramifica por `code`, não pelo status HTTP.
 *
 * `status` mapeia cada código ao HTTP correto (o status é sempre coerente com
 * o code). Mantido aqui ao lado do enum para não duplicar a tabela em prosa.
 */
export const errorCodeSchema = z.enum([
  "VALIDATION_FAILED",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL",
]);
export type ErrorCode = z.infer<typeof errorCodeSchema>;

/** HTTP status canônico por código (contrato-http.md §1.2). */
export const ERROR_STATUS: Record<ErrorCode, number> = {
  VALIDATION_FAILED: 422,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};
