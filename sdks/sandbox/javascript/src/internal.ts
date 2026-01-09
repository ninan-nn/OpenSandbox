/**
 * INTERNAL / ADVANCED ENTRYPOINT
 *
 * This subpath exposes low-level OpenAPI clients and adapters for advanced integrations.
 * It is intentionally NOT exported from the root entrypoint (`@alibaba/opensandbox`),
 * because generated OpenAPI types are not considered stable public API.
 *
 * Import path:
 * - `@alibaba/opensandbox/internal`
 */

export { createLifecycleClient } from "./openapi/lifecycleClient.js";
export type { LifecycleClient } from "./openapi/lifecycleClient.js";
export { createExecdClient } from "./openapi/execdClient.js";
export type { ExecdClient } from "./openapi/execdClient.js";

// OpenAPI schema types (NOT stable public API; internal-only).
export type { paths as LifecyclePaths } from "./api/lifecycle.js";
export type { paths as ExecdPaths } from "./api/execd.js";

export { SandboxesAdapter } from "./adapters/sandboxesAdapter.js";
export { HealthAdapter } from "./adapters/healthAdapter.js";
export { MetricsAdapter } from "./adapters/metricsAdapter.js";
export { FilesystemAdapter } from "./adapters/filesystemAdapter.js";
export { CommandsAdapter } from "./adapters/commandsAdapter.js";

