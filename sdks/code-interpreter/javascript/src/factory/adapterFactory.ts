import type { Sandbox } from "@alibaba/opensandbox";
import type { Codes } from "../services/codes.js";

export type CreateCodesStackOptions = {
  sandbox: Sandbox;
  execdBaseUrl: string;
};

/**
 * Factory abstraction for Code Interpreter SDK to decouple from concrete adapters/clients.
 */
export interface AdapterFactory {
  createCodes(opts: CreateCodesStackOptions): Codes;
}

