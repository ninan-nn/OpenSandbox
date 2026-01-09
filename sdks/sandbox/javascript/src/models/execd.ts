import type { Execution } from "./execution.js";

/**
 * Domain models for execd interactions.
 *
 * IMPORTANT:
 * - These are NOT OpenAPI-generated types.
 * - They are intentionally stable and JS-friendly.
 */
export type ServerStreamEvent = {
  type:
    | "init"
    | "stdout"
    | "stderr"
    | "result"
    | "execution_count"
    | "execution_complete"
    | "error"
    | string;
  timestamp?: number;
  text?: string;
  results?: Record<string, unknown>;
  error?: Record<string, unknown>;
  [k: string]: unknown;
};

export type RunCommandRequest = {
  command: string;
  cwd?: string;
  background?: boolean;
} & Record<string, unknown>;

export type CodeContextRequest = {
  language: string;
} & Record<string, unknown>;

export type SupportedLanguage =
  | "python"
  | "go"
  | "javascript"
  | "typescript"
  | "bash"
  | "java";

export type RunCommandOpts = {
  /**
   * Working directory for command execution (maps to API `cwd`).
   */
  workingDirectory?: string;
  /**
   * Run command in detached mode.
   */
  background?: boolean;
};

export type CommandExecution = Execution;

export type Metrics = {
  cpu_count?: number;
  cpu_used_pct?: number;
  mem_total_mib?: number;
  mem_used_mib?: number;
  timestamp?: number;
  [k: string]: unknown;
};

/**
 * Normalized, JS-friendly metrics.
 */
export type SandboxMetrics = {
  cpuCount: number;
  cpuUsedPercentage: number;
  memoryTotalMiB: number;
  memoryUsedMiB: number;
  timestamp: number;
};

export type PingResponse = Record<string, unknown>;
