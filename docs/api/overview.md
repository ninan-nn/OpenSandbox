---
title: Overview & Auth
---

# API Overview & Auth

OpenSandbox exposes:

1. **Lifecycle API** for sandbox management
2. **Execution API (execd)** for in-sandbox operations

## Base URLs

- Lifecycle API: `http://localhost:8080/v1`
- Execution API: `http://localhost:8080` (via execd endpoint)

## Auth

- Lifecycle API: `OPEN-SANDBOX-API-KEY`
- Execution API: `X-EXECD-ACCESS-TOKEN`
