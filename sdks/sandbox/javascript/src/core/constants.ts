export const DEFAULT_EXECD_PORT = 44772;

export const DEFAULT_ENTRYPOINT: string[] = ["tail", "-f", "/dev/null"];

export const DEFAULT_RESOURCE_LIMITS: Record<string, string> = {
  cpu: "1",
  memory: "2Gi",
};

export const DEFAULT_TIMEOUT_SECONDS = 600;
export const DEFAULT_READY_TIMEOUT_SECONDS = 30;
export const DEFAULT_HEALTH_CHECK_POLLING_INTERVAL_MILLIS = 200;

export const DEFAULT_REQUEST_TIMEOUT_SECONDS = 30;
export const DEFAULT_USER_AGENT = "OpenSandbox-JS-SDK/0.1.0";

