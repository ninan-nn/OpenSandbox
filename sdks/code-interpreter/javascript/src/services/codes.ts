import type { ServerStreamEvent } from "@alibaba/opensandbox";
import type { Execution, ExecutionHandlers } from "@alibaba/opensandbox";
import type { CodeContext, RunCodeRequest, SupportedLanguage } from "../models.js";

export interface Codes {
  createContext(language: SupportedLanguage): Promise<CodeContext>;

  run(
    code: string,
    opts?: { context?: CodeContext; language?: SupportedLanguage; handlers?: ExecutionHandlers; signal?: AbortSignal },
  ): Promise<Execution>;

  runStream(
    req: RunCodeRequest,
    signal?: AbortSignal,
  ): AsyncIterable<ServerStreamEvent>;

  interrupt(contextId: string): Promise<void>;
}


