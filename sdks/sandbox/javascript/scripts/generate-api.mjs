#!/usr/bin/env node
/**
 * Copyright 2025 Alibaba Group Holding Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function run(cmd, args, cwd) {
  const pretty = [cmd, ...args].join(" ");
  console.log(`\n▶ ${pretty}`);
  const res = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  if (res.status !== 0) {
    fail(`Command failed (exit=${res.status}): ${pretty}`);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// scripts/ -> package root
const packageRoot = path.resolve(__dirname, "..");
// scripts/ -> repo root (OpenSandbox/)
const repoRoot = path.resolve(__dirname, "../../../../");

const specs = {
  execd: path.join(repoRoot, "specs", "execd-api.yaml"),
  lifecycle: path.join(repoRoot, "specs", "sandbox-lifecycle.yml"),
};

for (const [name, p] of Object.entries(specs)) {
  if (!existsSync(p)) {
    fail(`OpenAPI spec not found for '${name}': ${p}`);
  }
}

const outDir = path.join(packageRoot, "src", "api");
mkdirSync(outDir, { recursive: true });

const outFiles = {
  execd: path.join(outDir, "execd.ts"),
  lifecycle: path.join(outDir, "lifecycle.ts"),
};

console.log("🚀 OpenSandbox TypeScript SDK API Generator");
console.log(`- repoRoot: ${repoRoot}`);
console.log(`- outDir:   ${outDir}`);

// Use pnpm as requested by the project rules.
run("pnpm", ["exec", "openapi-typescript", specs.execd, "-o", outFiles.execd], packageRoot);
run(
  "pnpm",
  ["exec", "openapi-typescript", specs.lifecycle, "-o", outFiles.lifecycle],
  packageRoot,
);

console.log("\n✅ API type generation completed:");
console.log(`- ${path.relative(packageRoot, outFiles.execd)}`);
console.log(`- ${path.relative(packageRoot, outFiles.lifecycle)}`);


