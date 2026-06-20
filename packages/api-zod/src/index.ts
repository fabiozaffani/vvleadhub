/**
 * @vvf/api-zod — schemas Zod de borda gerados do OpenAPI (`@vvf/api-spec`, D-22).
 * Consumido SÓ pelo api-server para validar a forma de req/params/body.
 *
 * Os arquivos sob `./generated/` são saída do `orval` — NUNCA editados à mão
 * (regra de ouro D-22). Este barrel re-exporta o que o codegen produz; ao
 * adicionar uma tag/endpoint no spec, acrescente a linha `export *` da nova
 * pasta de tag aqui.
 */
export * from "./generated/health/health";
export * from './generated/types';
