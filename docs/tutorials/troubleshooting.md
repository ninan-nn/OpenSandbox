---
title: Troubleshooting
---

# Troubleshooting

## Server fails to start

- Check `~/.sandbox.toml`
- Run `opensandbox-server -h`
- Verify Docker/Kubernetes runtime availability

## Sandbox creation fails

- Image pull errors
- `runtime.execd_image` not found
- API key misconfigured

## execd connection issues

- Validate endpoint returned by `get_endpoint`
- Keep `/proxy/{port}` in bridge mode
- Check firewall or gateway
