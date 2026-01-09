import { ConnectionConfig } from "@alibaba/opensandbox";

export const DEFAULT_DOMAIN = "localhost:8080";
export const DEFAULT_PROTOCOL = "http";
export const DEFAULT_API_KEY = "e2e-test";
export const DEFAULT_IMAGE =
  "sandbox-registry.cn-zhangjiakou.cr.aliyuncs.com/opensandbox/code-interpreter:latest";

export const TEST_DOMAIN = process.env.OPENSANDBOX_TEST_DOMAIN ?? DEFAULT_DOMAIN;
export const TEST_PROTOCOL = process.env.OPENSANDBOX_TEST_PROTOCOL ?? DEFAULT_PROTOCOL;
export const TEST_API_KEY = process.env.OPENSANDBOX_TEST_API_KEY ?? DEFAULT_API_KEY;
export const TEST_IMAGE = process.env.OPENSANDBOX_SANDBOX_DEFAULT_IMAGE ?? DEFAULT_IMAGE;

export function getSandboxImage(): string {
  return TEST_IMAGE;
}

export function createConnectionConfig(): ConnectionConfig {
  return new ConnectionConfig({
    domain: TEST_DOMAIN,
    protocol: TEST_PROTOCOL === "https" ? "https" : "http",
    apiKey: TEST_API_KEY,
  });
}

export function nowMs(): number {
  return Date.now();
}

export function assertRecentTimestampMs(ts: number, toleranceMs = 180_000): void {
  if (typeof ts !== "number" || ts <= 0) throw new Error(`invalid timestamp: ${ts}`);
  const delta = Math.abs(nowMs() - ts);
  if (delta > toleranceMs) {
    throw new Error(`timestamp too far from now: delta=${delta}ms (ts=${ts})`);
  }
}

export function assertEndpointHasPort(endpoint: string, expectedPort: number): void {
  if (!endpoint) throw new Error("endpoint is empty");
  if (endpoint.includes("://")) throw new Error(`unexpected scheme in endpoint: ${endpoint}`);

  if (endpoint.includes("/")) {
    if (!endpoint.endsWith(`/${expectedPort}`)) {
      throw new Error(`endpoint route must end with /${expectedPort}: ${endpoint}`);
    }
    const domain = endpoint.split("/", 1)[0];
    if (!domain) throw new Error(`missing domain in endpoint: ${endpoint}`);
    return;
  }

  const idx = endpoint.lastIndexOf(":");
  if (idx < 0) throw new Error(`missing :port in endpoint: ${endpoint}`);
  const host = endpoint.slice(0, idx);
  const port = endpoint.slice(idx + 1);
  if (!host) throw new Error(`missing host in endpoint: ${endpoint}`);
  if (!/^\d+$/.test(port)) throw new Error(`non-numeric port in endpoint: ${endpoint}`);
  if (Number(port) !== expectedPort) throw new Error(`endpoint port mismatch: ${endpoint} != :${expectedPort}`);
}


