import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // These E2E tests can be slow depending on the provider.
    testTimeout: 15 * 60_000,
    hookTimeout: 15 * 60_000,
    // Keep ordering deterministic (mirrors ordered Python/Java E2E suites).
    sequence: {
      concurrent: false,
    },
  },
});


