import { DEFAULT_EXECD_PORT } from "@alibaba/opensandbox";
import type { Sandbox } from "@alibaba/opensandbox";

import { createDefaultAdapterFactory } from "./factory/defaultAdapterFactory.js";
import type { AdapterFactory } from "./factory/adapterFactory.js";
import type { Codes } from "./services/codes.js";

export type CodeInterpreterCreateOptions = {
  adapterFactory?: AdapterFactory;
};

/**
 * Code interpreter facade (JS/TS).
 *
 * This class wraps an existing {@link Sandbox} and provides a high-level API for code execution.
 *
 * - Use {@link codes} to create contexts and run code.
 * - {@link files}, {@link commands}, and {@link metrics} are exposed for convenience and are
 *   the same instances as on the underlying {@link Sandbox}.
 */
export class CodeInterpreter {
  private constructor(
    readonly sandbox: Sandbox,
    readonly codes: Codes,
  ) {}

  static async create(sandbox: Sandbox, opts: CodeInterpreterCreateOptions = {}): Promise<CodeInterpreter> {
    const execdBaseUrl = await sandbox.getEndpointUrl(DEFAULT_EXECD_PORT);
    const adapterFactory = opts.adapterFactory ?? createDefaultAdapterFactory();
    const codes = adapterFactory.createCodes({ sandbox, execdBaseUrl });

    return new CodeInterpreter(sandbox, codes);
  }

  get id() {
    return this.sandbox.id;
  }

  get files() {
    return this.sandbox.files;
  }

  get commands() {
    return this.sandbox.commands;
  }

  get metrics() {
    return this.sandbox.metrics;
  }
}


