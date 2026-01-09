import type { ConnectionConfig } from "../config/connection.js";
import type { SandboxFiles } from "../services/filesystem.js";
import type { ExecdCommands } from "../services/execdCommands.js";
import type { ExecdHealth } from "../services/execdHealth.js";
import type { ExecdMetrics } from "../services/execdMetrics.js";
import type { Sandboxes } from "../services/sandboxes.js";

export type CreateLifecycleStackOptions = {
  connectionConfig: ConnectionConfig;
  lifecycleBaseUrl: string;
};

export type LifecycleStack = {
  sandboxes: Sandboxes;
};

export type CreateExecdStackOptions = {
  connectionConfig: ConnectionConfig;
  execdBaseUrl: string;
};

export type ExecdStack = {
  commands: ExecdCommands;
  files: SandboxFiles;
  health: ExecdHealth;
  metrics: ExecdMetrics;
};

/**
 * Factory abstraction to keep `Sandbox` and `SandboxManager` decoupled from concrete adapter implementations.
 *
 * This is primarily useful for advanced integrations (custom transports, dependency injection, testing).
 */
export interface AdapterFactory {
  createLifecycleStack(opts: CreateLifecycleStackOptions): LifecycleStack;
  createExecdStack(opts: CreateExecdStackOptions): ExecdStack;
}

