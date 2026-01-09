import type { SandboxMetrics } from "../models/execd.js";

export interface ExecdMetrics {
  getMetrics(): Promise<SandboxMetrics>;
}


