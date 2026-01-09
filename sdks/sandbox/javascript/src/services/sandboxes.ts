import type {
  CreateSandboxRequest,
  CreateSandboxResponse,
  Endpoint,
  ListSandboxesParams,
  ListSandboxesResponse,
  RenewSandboxExpirationRequest,
  RenewSandboxExpirationResponse,
  SandboxId,
  SandboxInfo,
} from "../models/sandboxes.js";

export interface Sandboxes {
  createSandbox(req: CreateSandboxRequest): Promise<CreateSandboxResponse>;
  getSandbox(sandboxId: SandboxId): Promise<SandboxInfo>;
  listSandboxes(params?: ListSandboxesParams): Promise<ListSandboxesResponse>;
  deleteSandbox(sandboxId: SandboxId): Promise<void>;

  pauseSandbox(sandboxId: SandboxId): Promise<void>;
  resumeSandbox(sandboxId: SandboxId): Promise<void>;

  renewSandboxExpiration(
    sandboxId: SandboxId,
    req: RenewSandboxExpirationRequest,
  ): Promise<RenewSandboxExpirationResponse>;

  getSandboxEndpoint(sandboxId: SandboxId, port: number): Promise<Endpoint>;
}


