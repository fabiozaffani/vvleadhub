/**
 * @vvf/api-client — hooks React Query gerados do OpenAPI (`@vvf/api-spec`, D-22).
 * Consumido SÓ pelo admin (Next). O `site` é Astro e não usa React Query.
 *
 * Os arquivos sob `./generated/` são saída do `orval` — NUNCA editados à mão
 * (regra de ouro D-22). Ao adicionar uma tag/endpoint no spec, acrescente a
 * linha `export *` da nova pasta de tag aqui.
 */
export * from "./generated/api.schemas";
export * from "./generated/health/health";
export {
  setBaseUrl,
  setAuthTokenGetter,
  customFetch,
  ApiError,
} from "./custom-fetch";
export type {
  AuthTokenGetter,
  CustomFetchOptions,
  ErrorType,
  BodyType,
} from "./custom-fetch";
