---
title: Introduction
---

# Introduction

OpenSandbox is a general-purpose sandbox platform for AI applications. It provides **standardized APIs, pluggable runtimes, and multi-language SDKs** for safe execution of code, commands, and files.

## Core capabilities

- **Unified protocols**: lifecycle + execution APIs
- **Multi-language SDKs**: Python, Kotlin/Java, Code Interpreter
- **Pluggable runtimes**: Docker (production) and Kubernetes (scale)
- **Execution environments**: commands, filesystem, Jupyter kernels
- **Security & governance**: API keys, access tokens, resource limits, TTL
- **Networking**: single-host proxy routing and port multiplexing

## Component overview

1. **SDK layer**: Sandbox, Filesystem, Commands, CodeInterpreter
2. **Spec layer**: OpenAPI contracts for lifecycle and execution
3. **Runtime layer**: lifecycle server orchestration
4. **Instance layer**: running sandboxes with execd

Next: read `Quickstart`.
