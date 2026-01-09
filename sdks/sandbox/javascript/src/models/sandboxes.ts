/**
 * Domain models for sandbox lifecycle.
 *
 * IMPORTANT:
 * - These are NOT OpenAPI-generated types.
 * - They are intentionally stable and JS-friendly.
 *
 * The internal OpenAPI schemas may change frequently; adapters map responses into these models.
 */

export type SandboxId = string;

export type ImageAuth = {
  username?: string;
  password?: string;
  token?: string;
} & Record<string, unknown>;

export type ImageSpec = {
  uri: string;
  auth?: ImageAuth;
};

export type ResourceLimits = Record<string, string>;

export type SandboxState =
  | "Creating"
  | "Running"
  | "Pausing"
  | "Paused"
  | "Resuming"
  | "Deleting"
  | "Deleted"
  | "Error"
  | string;

export type SandboxStatus = {
  state: SandboxState;
  reason?: string;
  message?: string;
} & Record<string, unknown>;

export type SandboxInfo = {
  id: SandboxId;
  image: ImageSpec;
  entrypoint: string[];
  metadata?: Record<string, string>;
  status: SandboxStatus;
  /**
   * Sandbox creation time.
   */
  createdAt: Date;
  /**
   * Sandbox expiration time (server-side TTL).
   */
  expiresAt: Date;
} & Record<string, unknown>;

export type CreateSandboxRequest = {
  image: ImageSpec;
  entrypoint: string[];
  /**
   * Timeout in seconds (server semantics).
   */
  timeout: number;
  resourceLimits: ResourceLimits;
  env?: Record<string, string>;
  metadata?: Record<string, string>;
  extensions?: Record<string, unknown>;
} & Record<string, unknown>;

export type CreateSandboxResponse = {
  id: SandboxId;
  status: SandboxStatus;
  metadata?: Record<string, string>;
  /**
   * Sandbox expiration time after creation.
   */
  expiresAt: Date;
  /**
   * Sandbox creation time.
   */
  createdAt: Date;
  entrypoint: string[];
} & Record<string, unknown>;

export type PaginationInfo = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
} & Record<string, unknown>;

export type ListSandboxesResponse = {
  items: SandboxInfo[];
  pagination?: PaginationInfo;
} & Record<string, unknown>;

export type RenewSandboxExpirationRequest = {
  expiresAt: string;
};

export type RenewSandboxExpirationResponse = {
  /**
   * Updated expiration time (if the server returns it).
   */
  expiresAt?: Date;
} & Record<string, unknown>;

export type Endpoint = {
  endpoint: string;
} & Record<string, unknown>;

export type ListSandboxesParams = {
  /**
   * Filter by lifecycle state (the API supports multiple `state` query params).
   * Example: `{ states: ["Running", "Paused"] }`
   */
  states?: Array<string>;
  /**
   * Filter by metadata key-value pairs.
   * NOTE: This will be encoded to a single `metadata` query parameter as described in the spec.
   */
  metadata?: Record<string, string>;
  page?: number;
  pageSize?: number;
};

