import createClient from "openapi-fetch";
import type { Client } from "openapi-fetch";

import type { paths as ExecdPaths } from "../api/execd.js";

export type ExecdClient = Client<ExecdPaths>;

export type CreateExecdClientOptions = {
  /**
   * Base URL to the Execd API (no `/v1` prefix).
   * Examples:
   * - `http://localhost:44772`
   * - `http://api.opensandbox.io/sandboxes/<id>/port/44772`
   */
  baseUrl: string;
  /**
   * Extra headers applied to every request.
   */
  headers?: Record<string, string>;
  /**
   * Custom fetch implementation.
   *
   * Useful for proxies, custom TLS, request tracing, retries, or running in environments
   * where a global `fetch` is not available.
   */
  fetch?: typeof fetch;
};

export function createExecdClient(opts: CreateExecdClientOptions): ExecdClient {
  return createClient<ExecdPaths>({
    baseUrl: opts.baseUrl,
    headers: opts.headers,
    fetch: opts.fetch,
  });
}


