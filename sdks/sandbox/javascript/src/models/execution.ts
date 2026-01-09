export type OutputMessage = {
  text: string;
  timestamp: number;
  isError?: boolean;
};

export type ExecutionResult = {
  text?: string;
  timestamp: number;
  /**
   * Raw mime map from execd event (e.g. "text/plain", "text/html", ...)
   */
  raw?: Record<string, unknown>;
};

export type ExecutionError = {
  name: string;
  value: string;
  timestamp: number;
  traceback: string[];
};

export type ExecutionComplete = {
  timestamp: number;
  executionTimeMs: number;
};

export type ExecutionInit = {
  id: string;
  timestamp: number;
};

export type Execution = {
  id?: string;
  executionCount?: number;
  logs: {
    stdout: OutputMessage[];
    stderr: OutputMessage[];
  };
  result: ExecutionResult[];
  error?: ExecutionError;
  complete?: ExecutionComplete;
};

export type ExecutionHandlers = {
  /**
   * Optional low-level hook for every server-sent event (SSE) received.
   * Kept as `unknown` to avoid coupling to a specific OpenAPI schema module.
   */
  onEvent?: (ev: unknown) => void | Promise<void>;
  onStdout?: (msg: OutputMessage) => void | Promise<void>;
  onStderr?: (msg: OutputMessage) => void | Promise<void>;
  onResult?: (res: ExecutionResult) => void | Promise<void>;
  onExecutionComplete?: (c: ExecutionComplete) => void | Promise<void>;
  onError?: (err: ExecutionError) => void | Promise<void>;
  onInit?: (init: ExecutionInit) => void | Promise<void>;
};


