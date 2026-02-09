---
title: Runtime
---

# Runtime

This page summarizes runtime selection and capabilities (based on repo docs).

## Runtime selection

- `docker`: local or single-host
- `kubernetes`: cluster runtime with pooling and batch delivery

## Docker runtime highlights

- `runtime.execd_image`
- `docker.network_mode` (`host` or `bridge`)
- `egress.image` required when using `networkPolicy` (bridge only)

## Kubernetes runtime highlights

Kubernetes Controller provides:

- **BatchSandbox** for batch delivery
- **Pool** resources for pre-warmed capacity
- Optional task scheduling

See <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README.md> for details.
