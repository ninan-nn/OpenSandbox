---
title: Architecture
---

# Architecture

OpenSandbox follows a protocol-first, runtime-pluggable architecture.

## Four-layer model

1. **SDK layer**: unified developer APIs
2. **Spec layer**: OpenAPI contracts
3. **Runtime layer**: lifecycle server orchestration
4. **Instance layer**: sandbox containers + execd

## Key components

- **Server (Lifecycle API)**: create, pause, resume, delete, renew
- **execd (Execution API)**: commands, files, code execution
- **SDKs**: consistent client abstractions
- **Specs**: shared contracts between components
