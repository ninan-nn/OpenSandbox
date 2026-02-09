---
title: execd Design
---

# execd Design

`execd` is the in-sandbox execution daemon (see <https://github.com/alibaba/OpenSandbox/blob/main/components/execd/README.md>).

## Capabilities

- Code execution via Jupyter kernels
- Command execution (foreground/background)
- Filesystem CRUD and search
- SSE streaming and metrics

## Key packages

- `pkg/web/` HTTP controllers and SSE
- `pkg/runtime/` execution dispatcher
- `pkg/jupyter/` Jupyter client
