---
title: Lifecycle API
---

# Lifecycle API

Core endpoints:

- `POST /sandboxes`
- `GET /sandboxes`
- `GET /sandboxes/{sandboxId}`
- `DELETE /sandboxes/{sandboxId}`
- `POST /sandboxes/{sandboxId}/pause`
- `POST /sandboxes/{sandboxId}/resume`
- `POST /sandboxes/{sandboxId}/renew-expiration`
- `GET /sandboxes/{sandboxId}/endpoints/{port}`

Spec: `specs/sandbox-lifecycle.yml`.
