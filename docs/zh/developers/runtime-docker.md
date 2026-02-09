---
title: 运行时实现（Docker）
---

# 运行时实现（Docker）

Docker 运行时是 OpenSandbox 的默认实现，适合单机或小规模部署（详见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>）。

## 关键特性（摘录）

- 镜像拉取与容器生命周期管理
- execd 注入与启动脚本
- 资源限制（CPU/内存）
- 两种网络模式：`host` / `bridge`

## 网络模式

- **host**：容器共享宿主网络，性能高但端口冲突
- **bridge**：隔离网络，通过代理路由访问多端口

## Egress 与 networkPolicy

当创建请求包含 `networkPolicy` 时，需配置 `egress.image`，并且仅支持 bridge 模式。
