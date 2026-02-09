---
title: Security
---

# Security

OpenSandbox uses two layers of API security:

- **Lifecycle API**: `OPEN-SANDBOX-API-KEY`
- **Execution API**: `X-EXECD-ACCESS-TOKEN`

Use resource limits and TTL to control sandbox lifetimes. For outbound control, use `networkPolicy` in bridge mode.
