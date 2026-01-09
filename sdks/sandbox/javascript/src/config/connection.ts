export type ConnectionProtocol = "http" | "https";

/**
 * Options for {@link ConnectionConfig}.
 *
 * Most users only need `domain`, `protocol`, and `apiKey`.
 */
export type ConnectionConfigOptions = {
  /**
   * API server domain (host[:port]) without scheme.
   * Examples:
   * - "localhost:8080"
   * - "api.opensandbox.io"
   *
   * You may also pass a full URL (e.g. "http://localhost:8080" or "https://api.example.com").
   * If the URL includes a path, it will be preserved and `/v1` will be appended automatically.
   */
  domain?: string;
  protocol?: ConnectionProtocol;
  apiKey?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;

  /**
   * Request timeout applied to all SDK HTTP calls (best-effort; wraps fetch).
   * Defaults to 30 seconds.
   */
  requestTimeoutSeconds?: number;
  /**
   * Enable basic debug logging for HTTP requests (best-effort).
   */
  debug?: boolean;
};

function isNodeRuntime(): boolean {
  const p = (globalThis as any)?.process;
  return !!(p?.versions?.node);
}

function redactHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = { ...headers };
  for (const k of Object.keys(out)) {
    if (k.toLowerCase() === "open-sandbox-api-key") out[k] = "***";
  }
  return out;
}

function readEnv(name: string): string | undefined {
  const env = (globalThis as any)?.process?.env;
  const v = env?.[name];
  return typeof v === "string" && v.length ? v : undefined;
}

function stripTrailingSlashes(s: string): string {
  return s.replace(/\/+$/, "");
}

function stripV1Suffix(s: string): string {
  const trimmed = stripTrailingSlashes(s);
  return trimmed.endsWith("/v1") ? trimmed.slice(0, -3) : trimmed;
}

function normalizeDomainBase(input: string): { protocol?: ConnectionProtocol; domainBase: string } {
  // Accept a full URL and preserve its path prefix (if any).
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const u = new URL(input);
    const proto = u.protocol === "https:" ? "https" : "http";
    // Keep origin + pathname, drop query/hash.
    const base = `${u.origin}${u.pathname}`;
    return { protocol: proto, domainBase: stripV1Suffix(base) };
  }

  // No scheme: treat as "host[:port]" or "host[:port]/prefix" and normalize trailing "/v1" or "/".
  return { domainBase: stripV1Suffix(input) };
}

export class ConnectionConfig {
  readonly protocol: ConnectionProtocol;
  readonly domain: string;
  readonly apiKey?: string;
  readonly headers: Record<string, string>;
  readonly fetch: typeof fetch;
  readonly requestTimeoutSeconds: number;
  readonly debug: boolean;
  readonly userAgent: string = "OpenSandbox-JS-SDK/0.1.0";

  /**
   * Create a connection configuration.
   *
   * Environment variables (optional):
   * - `OPEN_SANDBOX_DOMAIN` (default: `localhost:8080`)
   * - `OPEN_SANDBOX_API_KEY`
   */
  constructor(opts: ConnectionConfigOptions = {}) {
    const envDomain = readEnv("OPEN_SANDBOX_DOMAIN");
    const envApiKey = readEnv("OPEN_SANDBOX_API_KEY");

    const rawDomain = opts.domain ?? envDomain ?? "localhost:8080";
    const normalized = normalizeDomainBase(rawDomain);

    // If the domain includes a scheme, it overrides `protocol`.
    this.protocol = normalized.protocol ?? opts.protocol ?? "http";
    this.domain = normalized.domainBase;
    this.apiKey = opts.apiKey ?? envApiKey;
    this.requestTimeoutSeconds = typeof opts.requestTimeoutSeconds === "number"
      ? opts.requestTimeoutSeconds
      : 30;
    this.debug = !!opts.debug;

    const headers: Record<string, string> = { ...(opts.headers ?? {}) };
    // Attach API key via header unless the user already provided one.
    if (this.apiKey && !headers["OPEN-SANDBOX-API-KEY"]) {
      headers["OPEN-SANDBOX-API-KEY"] = this.apiKey;
    }
    // Best-effort user-agent (Node only).
    if (isNodeRuntime() && this.userAgent && !headers["user-agent"] && !headers["User-Agent"]) {
      headers["user-agent"] = this.userAgent;
    }
    this.headers = headers;

    const baseFetch = opts.fetch ?? fetch;
    this.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const method = init?.method ?? "GET";
      const url = typeof input === "string" ? input : (input as any)?.toString?.() ?? String(input);

      const ac = new AbortController();
      const timeoutMs = Math.floor(this.requestTimeoutSeconds * 1000);
      const t = Number.isFinite(timeoutMs) && timeoutMs > 0
        ? setTimeout(() => ac.abort(new Error(`Request timed out (timeoutSeconds=${this.requestTimeoutSeconds})`)), timeoutMs)
        : undefined;

      const onAbort = () => ac.abort((init?.signal as any)?.reason ?? new Error("Aborted"));
      if (init?.signal) {
        if (init.signal.aborted) onAbort();
        else init.signal.addEventListener("abort", onAbort, { once: true } as any);
      }

      const mergedInit: RequestInit = {
        ...init,
        signal: ac.signal,
      };

      if (this.debug) {
        const mergedHeaders = { ...(this.headers ?? {}), ...((init?.headers ?? {}) as any) };
        // eslint-disable-next-line no-console
        console.log("[opensandbox] ->", method, url, redactHeaders(mergedHeaders));
      }

      try {
        const res = await baseFetch(input, mergedInit);
        if (this.debug) {
          // eslint-disable-next-line no-console
          console.log("[opensandbox] <-", method, url, res.status);
        }
        return res;
      } finally {
        if (t) clearTimeout(t);
        if (init?.signal) init.signal.removeEventListener("abort", onAbort as any);
      }
    };
  }

  getBaseUrl(): string {
    // If `domain` already contains a scheme, treat it as a full base URL prefix.
    if (this.domain.startsWith("http://") || this.domain.startsWith("https://")) {
      return `${stripV1Suffix(this.domain)}/v1`;
    }
    return `${this.protocol}://${stripV1Suffix(this.domain)}/v1`;
  }
}


