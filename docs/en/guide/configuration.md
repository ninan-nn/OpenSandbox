---
title: Configuration
---

# Configuration

Default config file: `~/.sandbox.toml`.

## Generate config

```bash
opensandbox-server init-config ~/.sandbox.toml --example docker
```

## Common fields

- `server.host`, `server.port`, `server.api_key`
- `runtime.type`, `runtime.execd_image`
- `docker.network_mode`

Egress requires `egress.image` when using `networkPolicy`.
