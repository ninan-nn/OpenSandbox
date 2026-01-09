import type { Execution, ExecutionHandlers } from "../models/execution.js";
import type { CommandExecution, RunCommandOpts, ServerStreamEvent } from "../models/execd.js";

export interface ExecdCommands {
  /**
   * Run a command and stream server events (SSE). This is the lowest-level API.
   */
  runStream(command: string, opts?: RunCommandOpts, signal?: AbortSignal): AsyncIterable<ServerStreamEvent>;

  /**
   * Convenience: run a command, consume the stream, and build a structured execution result.
   */
  run(command: string, opts?: RunCommandOpts, handlers?: ExecutionHandlers, signal?: AbortSignal): Promise<CommandExecution>;

  /**
   * Interrupt the current execution in the given context/session.
   *
   * Note: Execd spec uses `DELETE /command?id=<sessionId>`.
   */
  interrupt(sessionId: string): Promise<void>;
}


