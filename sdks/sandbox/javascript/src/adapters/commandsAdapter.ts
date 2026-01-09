import type { ExecdClient } from "../openapi/execdClient.js";
import { throwOnOpenApiFetchError } from "./openapiError.js";
import { parseJsonEventStream } from "./sse.js";
import type { paths as ExecdPaths } from "../api/execd.js";
import type { CommandExecution, RunCommandOpts, ServerStreamEvent } from "../models/execd.js";
import type { ExecdCommands } from "../services/execdCommands.js";
import type { ExecutionHandlers } from "../models/execution.js";
import { ExecutionEventDispatcher } from "../models/executionEventDispatcher.js";

function joinUrl(baseUrl: string, pathname: string): string {
  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

type ApiRunCommandRequest =
  ExecdPaths["/command"]["post"]["requestBody"]["content"]["application/json"];

function toRunCommandRequest(command: string, opts?: RunCommandOpts): ApiRunCommandRequest {
  return {
    command,
    cwd: opts?.workingDirectory,
    background: !!opts?.background,
  };
}

export type CommandsAdapterOptions = {
  /**
   * Must match the baseUrl used by the ExecdClient.
   */
  baseUrl: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
};

export class CommandsAdapter implements ExecdCommands {
  private readonly fetch: typeof fetch;

  constructor(
    private readonly client: ExecdClient,
    private readonly opts: CommandsAdapterOptions,
  ) {
    this.fetch = opts.fetch ?? fetch;
  }

  async interrupt(sessionId: string): Promise<void> {
    const { error, response } = await this.client.DELETE("/command", {
      params: { query: { id: sessionId } },
    });
    throwOnOpenApiFetchError({ error, response }, "Interrupt command failed");
  }

  async *runStream(
    command: string,
    opts?: RunCommandOpts,
    signal?: AbortSignal,
  ): AsyncIterable<ServerStreamEvent> {
    const url = joinUrl(this.opts.baseUrl, "/command");
    const body = JSON.stringify(toRunCommandRequest(command, opts));

    const res = await this.fetch(url, {
      method: "POST",
      headers: {
        "accept": "text/event-stream",
        "content-type": "application/json",
        ...(this.opts.headers ?? {}),
      },
      body,
      signal,
    });

    for await (const ev of parseJsonEventStream<ServerStreamEvent>(res, { fallbackErrorMessage: "Run command failed" })) {
      yield ev;
    }
  }

  async run(
    command: string,
    opts?: RunCommandOpts,
    handlers?: ExecutionHandlers,
    signal?: AbortSignal,
  ): Promise<CommandExecution> {
    const execution: CommandExecution = {
      logs: { stdout: [], stderr: [] },
      result: [],
    };
    const dispatcher = new ExecutionEventDispatcher(execution, handlers);
    for await (const ev of this.runStream(command, opts, signal)) {
      // Keep legacy behavior: if server sends "init" with empty id, preserve previous id.
      if (ev.type === "init" && (ev.text ?? "") === "" && execution.id) {
        (ev as any).text = execution.id;
      }
      await dispatcher.dispatch(ev as any);
    }

    return execution;
  }
}

