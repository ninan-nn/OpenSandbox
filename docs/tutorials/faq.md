---
title: FAQ
---

# FAQ

## Why does sandbox creation fail?

Common reasons:

- Docker not running
- Image pull errors
- Invalid entrypoint or resource limits

## How do I access execd?

Use the execd endpoint and include `X-EXECD-ACCESS-TOKEN`.

## Host vs Bridge networking?

- **Host**: higher performance but port conflicts
- **Bridge**: proxy routing for multi-sandbox

## Where are the API docs?

- Swagger: `http://localhost:8080/docs`
- ReDoc: `http://localhost:8080/redoc`
