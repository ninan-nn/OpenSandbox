import { createExecdClient } from "@alibaba/opensandbox/internal";

import type { AdapterFactory, CreateCodesStackOptions } from "./adapterFactory.js";
import { CodesAdapter } from "../adapters/codesAdapter.js";
import type { Codes } from "../services/codes.js";

export class DefaultAdapterFactory implements AdapterFactory {
  createCodes(opts: CreateCodesStackOptions): Codes {
    const client = createExecdClient({
      baseUrl: opts.execdBaseUrl,
      headers: opts.sandbox.connectionConfig.headers,
      fetch: opts.sandbox.connectionConfig.fetch,
    });

    return new CodesAdapter(client, {
      baseUrl: opts.execdBaseUrl,
      headers: opts.sandbox.connectionConfig.headers,
      fetch: opts.sandbox.connectionConfig.fetch,
    });
  }
}

export function createDefaultAdapterFactory(): AdapterFactory {
  return new DefaultAdapterFactory();
}

