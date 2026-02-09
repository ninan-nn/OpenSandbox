---
title: Deployment
---

# Deployment

OpenSandbox supports Docker and Kubernetes runtimes.

## Docker (single host)

```bash
uv pip install opensandbox-server
opensandbox-server init-config ~/.sandbox.toml --example docker
opensandbox-server
```

## Kubernetes (cluster)

See `kubernetes/` for operator deployment and CRD setup.
