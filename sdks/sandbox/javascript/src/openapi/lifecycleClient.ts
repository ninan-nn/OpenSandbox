import createClient from "openapi-fetch";
import type { Client } from "openapi-fetch";

import type { paths as LifecyclePaths } from "../api/lifecycle.js";

export type LifecycleClient = Client<LifecyclePaths>;

export type CreateLifecycleClientOptions = {
  /**
   * Base URL to OpenSandbox Lifecycle API, including the `/v1` prefix.
   * Example: `http://localhost:8080/v1`
   */
  baseUrl?: string;
  /**
   * API key for `OPEN-SANDBOX-API-KEY` header.
   * If omitted, reads from `process.env.OPEN_SANDBOX_API_KEY` when available.
   */
  apiKey?: string;
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

function readEnvApiKey(): string | undefined {
  // Avoid requiring @types/node by not referencing `process` directly.
  // In Node, `globalThis.process.env` exists; in browsers it won't.
  const env = (globalThis as any)?.process?.env;
  const v = env?.OPEN_SANDBOX_API_KEY;
  return typeof v === "string" && v.length ? v : undefined;
}

export function createLifecycleClient(opts: CreateLifecycleClientOptions = {}): LifecycleClient {
  const apiKey = opts.apiKey ?? readEnvApiKey();

  const headers: Record<string, string> = {
    ...(opts.headers ?? {}),
  };

  if (apiKey && !headers["OPEN-SANDBOX-API-KEY"]) {
    headers["OPEN-SANDBOX-API-KEY"] = apiKey;
  }

  return createClient<LifecyclePaths>({
    baseUrl: opts.baseUrl ?? "http://localhost:8080/v1",
    headers,
    fetch: opts.fetch,
  });
}


