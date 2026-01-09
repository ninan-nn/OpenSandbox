import type { ExecdClient } from "../openapi/execdClient.js";
import { throwOnOpenApiFetchError } from "./openapiError.js";
import type { paths as ExecdPaths } from "../api/execd.js";
import type { SandboxMetrics } from "../models/execd.js";
import type { ExecdMetrics } from "../services/execdMetrics.js";

type ApiMetricsOk =
  ExecdPaths["/metrics"]["get"]["responses"][200]["content"]["application/json"];

function normalizeMetrics(m: ApiMetricsOk): SandboxMetrics {
  const cpuCount = m.cpu_count ?? 0;
  const cpuUsedPercentage = m.cpu_used_pct ?? 0;
  const memoryTotalMiB = m.mem_total_mib ?? 0;
  const memoryUsedMiB = m.mem_used_mib ?? 0;
  const timestamp = m.timestamp ?? 0;
  return {
    cpuCount: Number(cpuCount),
    cpuUsedPercentage: Number(cpuUsedPercentage),
    memoryTotalMiB: Number(memoryTotalMiB),
    memoryUsedMiB: Number(memoryUsedMiB),
    timestamp: Number(timestamp),
  };
}

export class MetricsAdapter implements ExecdMetrics {
  constructor(private readonly client: ExecdClient) {}

  async getMetrics(): Promise<SandboxMetrics> {
    const { data, error, response } = await this.client.GET("/metrics");
    throwOnOpenApiFetchError({ error, response }, "Get execd metrics failed");
    const ok = data as ApiMetricsOk | undefined;
    if (!ok || typeof ok !== "object") {
      throw new Error("Get execd metrics failed: unexpected response shape");
    }
    return normalizeMetrics(ok);
  }
}

