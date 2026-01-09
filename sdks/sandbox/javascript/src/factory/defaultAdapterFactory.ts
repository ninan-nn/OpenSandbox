import { createExecdClient } from "../openapi/execdClient.js";
import { createLifecycleClient } from "../openapi/lifecycleClient.js";

import { CommandsAdapter } from "../adapters/commandsAdapter.js";
import { FilesystemAdapter } from "../adapters/filesystemAdapter.js";
import { HealthAdapter } from "../adapters/healthAdapter.js";
import { MetricsAdapter } from "../adapters/metricsAdapter.js";
import { SandboxesAdapter } from "../adapters/sandboxesAdapter.js";

import type { AdapterFactory, CreateExecdStackOptions, CreateLifecycleStackOptions, ExecdStack, LifecycleStack } from "./adapterFactory.js";

export class DefaultAdapterFactory implements AdapterFactory {
  createLifecycleStack(opts: CreateLifecycleStackOptions): LifecycleStack {
    const lifecycleClient = createLifecycleClient({
      baseUrl: opts.lifecycleBaseUrl,
      apiKey: opts.connectionConfig.apiKey,
      headers: opts.connectionConfig.headers,
      fetch: opts.connectionConfig.fetch,
    });
    const sandboxes = new SandboxesAdapter(lifecycleClient);
    return { sandboxes };
  }

  createExecdStack(opts: CreateExecdStackOptions): ExecdStack {
    const execdClient = createExecdClient({
      baseUrl: opts.execdBaseUrl,
      headers: opts.connectionConfig.headers,
      fetch: opts.connectionConfig.fetch,
    });

    const health = new HealthAdapter(execdClient);
    const metrics = new MetricsAdapter(execdClient);
    const files = new FilesystemAdapter(execdClient, {
      baseUrl: opts.execdBaseUrl,
      fetch: opts.connectionConfig.fetch,
      headers: opts.connectionConfig.headers,
    });
    const commands = new CommandsAdapter(execdClient, {
      baseUrl: opts.execdBaseUrl,
      fetch: opts.connectionConfig.fetch,
      headers: opts.connectionConfig.headers,
    });

    return {
      commands,
      files,
      health,
      metrics,
    };
  }
}

export function createDefaultAdapterFactory(): AdapterFactory {
  return new DefaultAdapterFactory();
}

