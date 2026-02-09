---
title: Runtime 运行时
---

# Runtime 运行时

本页说明运行时选择与能力差异，内容来自 `server/README.md` 与 `kubernetes/README.md`。

## 1. 运行时选择

通过 `runtime.type` 选择调度实现：

- `docker`：本地/单机场景，部署简单
- `kubernetes`：集群化场景，支持资源池与批量沙箱

## 2. Docker 运行时关键点

基础参数（节选）：

- `runtime.execd_image`：execd 镜像
- `docker.network_mode`：`host` 或 `bridge`

网络模式说明：

- **host**：容器共享宿主网络，性能更高，但端口冲突
- **bridge**：隔离网络，通过代理路由访问多端口

### Egress 与 networkPolicy

当创建沙箱请求包含 `networkPolicy` 时，需要配置 `egress.image`：

```toml
[runtime]
type = "docker"
execd_image = "opensandbox/execd:v1.0.5"

[egress]
image = "opensandbox/egress:v1.0.0"
```

该能力仅在 Docker bridge 模式下生效。

## 3. Kubernetes 运行时与资源池

Kubernetes Controller 提供：

- **资源池（Pool）**：预热资源，提升沙箱启动速度
- **BatchSandbox**：批量交付沙箱，面向高吞吐场景
- **可选任务调度**：支持任务模板与差异化分发

详细说明见：

- <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README.md>
- <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README-ZH.md>
