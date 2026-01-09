import { SandboxApiException, SandboxError } from "@alibaba/opensandbox";

export function throwOnOpenApiFetchError(
  result: { error?: unknown; response: Response },
  fallbackMessage: string,
): void {
  if (!result.error) return;

  const requestId = result.response.headers.get("x-request-id") ?? undefined;
  const status = (result.response as any).status ?? 0;

  const err = result.error as any;
  const message =
    err?.message ??
    err?.error?.message ??
    fallbackMessage;

  const code = err?.code ?? err?.error?.code;
  const msg = err?.message ?? err?.error?.message ?? message;

  throw new SandboxApiException({
    message: msg,
    statusCode: status,
    requestId,
    error: code
      ? new SandboxError(String(code), String(msg ?? ""))
      : new SandboxError(SandboxError.UNEXPECTED_RESPONSE, String(msg ?? "")),
    rawBody: result.error,
  });
}

