/**
 * @vvf/contracts — única fonte de CONTRATOS DE DOMÍNIO cruzados entre site,
 * admin e api-server (D-22): evento, lead, primitivas + enums estáveis de
 * runtime (ErrorCode — D-23). O contrato HTTP gerado do OpenAPI vive em
 * `@vvf/api-zod`/`@vvf/api-client`; tipos do Payload em `./generated`.
 * Alteração aqui é gated por CODEOWNERS (aval do fundador).
 */
export * from "./shared.js";
export * from "./events.js";
export * from "./lead.js";
export * from "./http-errors.js";
