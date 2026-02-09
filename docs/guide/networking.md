---
title: 网络与路由
---

# 网络与路由

OpenSandbox 提供 **单机可扩展** 的端口接入方案，兼顾性能与可维护性。

## 单机桥接模式（推荐）

在 Docker bridge 模式下，每个沙箱仅暴露一个 **execd 代理端口**。所有服务端口都通过：

```
{public_host}:{host_proxy_port}/proxy/{port}
```

统一转发到容器内部端口，减少端口冲突。

## Host 模式（性能优先）

Host 模式下，沙箱共享宿主网络。访问端口为：

```
{public_host}:{port}
```

但因为端口直接绑定宿主机，通常只能运行少量沙箱。

## 关键要点

- execd 会保留 `Upgrade` 与 `Connection` 等头部，支持 WebSocket/SSE
- `get_endpoint(..., resolve_internal=True)` 可返回容器内部地址
- 代理路由可统一多端口访问，减少防火墙与端口管理复杂度

更多细节参见 `单机网络详解`。
