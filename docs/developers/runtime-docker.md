---
title: Runtime (Docker)
---

# Runtime (Docker)

Docker is the default runtime for single-host deployments (see <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>).

## Highlights

- Image pull and container lifecycle
- execd injection and startup
- Resource limits (CPU/memory)
- Network modes: `host` and `bridge`

## Egress and networkPolicy

`egress.image` is required when using `networkPolicy` and only supported in bridge mode.
