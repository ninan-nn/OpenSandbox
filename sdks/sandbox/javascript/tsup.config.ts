import { defineConfig } from "tsup";

const entries = ["src/index.ts", "src/internal.ts"];

export default defineConfig([
  {
    entry: entries,
    format: ["esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    sourcemap: true,
    target: "es2022",
  },
  {
    entry: entries,
    format: ["cjs"],
    outDir: "dist/cjs",
    clean: false,
    sourcemap: true,
    target: "es2022",
    outExtension: () => ({ js: ".cjs" }),
  },
]);
