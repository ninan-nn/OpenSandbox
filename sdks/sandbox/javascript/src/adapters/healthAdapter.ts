import type { ExecdClient } from "../openapi/execdClient.js";
import { throwOnOpenApiFetchError } from "./openapiError.js";
import type { ExecdHealth } from "../services/execdHealth.js";

export class HealthAdapter implements ExecdHealth {
  constructor(private readonly client: ExecdClient) {}

  async ping(): Promise<boolean> {
    const { error, response } = await this.client.GET("/ping");
    throwOnOpenApiFetchError({ error, response }, "Execd ping failed");
    return true;
  }
}

