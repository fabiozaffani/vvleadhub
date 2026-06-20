/**
 * Mutator do orval para `@vvf/api-client` (D-22). É o único ponto que fala
 * `fetch` no cliente gerado: centraliza base URL, bearer token e tradução de
 * erro HTTP num `ApiError` tipado. Os hooks gerados em `./generated/` chamam
 * `customFetch` — nunca `fetch` cru.
 */

export type CustomFetchOptions = RequestInit & {
  responseType?: "json" | "text" | "blob";
};

export type ErrorType<T = unknown> = ApiError<T>;
export type BodyType<T> = T;

export type AuthTokenGetter = () =>
  | string
  | null
  | undefined
  | Promise<string | null | undefined>;

const NO_BODY_STATUS = new Set([204, 205, 304]);

let baseUrl: string | null = null;
let authTokenGetter: AuthTokenGetter | null = null;

/** Define o host do api-server prefixado em URLs relativas (paths iniciando em `/`). */
export function setBaseUrl(url: string | null): void {
  baseUrl = url ? url.replace(/\/+$/, "") : null;
}

/** Registra o provedor do token de sessão (JWT do Payload — D-12). `null` limpa. */
export function setAuthTokenGetter(getter: AuthTokenGetter | null): void {
  authTokenGetter = getter;
}

export class ApiError<T = unknown> extends Error {
  override readonly name = "ApiError";
  readonly status: number;
  readonly data: T | null;
  readonly response: Response;

  constructor(response: Response, data: T | null) {
    super(`HTTP ${response.status} ${response.statusText}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = response.status;
    this.data = data;
    this.response = response;
  }
}

function resolveUrl(input: string): string {
  if (!baseUrl) return input;
  return input.startsWith("/") ? `${baseUrl}${input}` : input;
}

function hasNoBody(response: Response, method: string): boolean {
  if (method === "HEAD") return true;
  if (NO_BODY_STATUS.has(response.status)) return true;
  if (response.headers.get("content-length") === "0") return true;
  return response.body === null;
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text.trim() === "") return null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }
  return text;
}

export async function customFetch<T = unknown>(
  url: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { responseType = "json", headers: headersInit, ...init } = options;
  const method = (init.method ?? "GET").toUpperCase();

  const headers = new Headers(headersInit);
  if (typeof init.body === "string" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  if (responseType === "json" && !headers.has("accept")) {
    headers.set("accept", "application/json");
  }

  if (authTokenGetter && !headers.has("authorization")) {
    const token = await authTokenGetter();
    if (typeof token === "string" && token !== "") {
      headers.set("authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(resolveUrl(url), {
    credentials: "include",
    ...init,
    method,
    headers,
  });

  if (!response.ok) {
    const data = hasNoBody(response, method) ? null : await parseBody(response);
    throw new ApiError(response, data);
  }

  if (hasNoBody(response, method)) return null as T;
  if (responseType === "text") return (await response.text()) as T;
  if (responseType === "blob") return (await response.blob()) as T;
  return (await parseBody(response)) as T;
}
