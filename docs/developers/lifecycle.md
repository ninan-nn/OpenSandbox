---
title: Lifecycle & States
---

# Lifecycle & States

Lifecycle API handles create/pause/resume/delete and renewal (see <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md> and <https://github.com/alibaba/OpenSandbox/blob/main/specs/sandbox-lifecycle.yml>).

## Typical operations

- Create / List / Get / Delete
- Pause / Resume
- Renew expiration
- Get endpoint

## State model

Sandboxes transition through states like Pending → Running → Paused/Stopping → Terminated/Failed.
