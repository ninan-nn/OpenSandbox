---
title: Networking
---

# Networking

OpenSandbox supports scalable single-host routing through execd proxying.

## Bridge mode (recommended)

All services are exposed via:

```
{public_host}:{host_proxy_port}/proxy/{port}
```

This avoids port conflicts when running many sandboxes.

## Host mode

Ports bind directly on the host:

```
{public_host}:{port}
```

Best for single sandbox or fixed port allocations.
