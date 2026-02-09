---
title: 网络与路由
---

# 网络与路由

OpenSandbox 在单机场景通过 execd 代理路由实现多端口复用。

## Bridge 模式（推荐）

在 Docker bridge 模式下，每个沙箱仅暴露一个 **execd 代理端口**，通过以下格式访问：

```
{public_host}:{host_proxy_port}/proxy/{port}
```

代理会将请求转发到容器内部端口，减少端口冲突。

## Host 模式

Host 模式下，沙箱共享宿主网络，端口直接暴露：

```
{public_host}:{port}
```

适合单实例或明确端口管理的场景。

## 关键要点

- 代理保留 `Upgrade` / `Connection` 头部，支持 WebSocket/SSE
- `get_endpoint(..., resolve_internal=True)` 返回容器内部地址
- 单机多沙箱可通过代理端口复用
