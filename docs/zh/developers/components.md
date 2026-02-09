---
title: 组件设计
---

# 组件设计

OpenSandbox 由多个可独立演进的组件组成，核心职责来自仓库文档与目录结构说明。

## 核心组件

- **Server（Lifecycle API）**：FastAPI 服务，负责沙箱创建、状态管理、续期、回收与鉴权（见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>）
- **execd（Execution API）**：沙箱内执行守护进程，提供代码/命令/文件与 SSE 输出（见 <https://github.com/alibaba/OpenSandbox/blob/main/components/execd/README.md>）
- **Specs**：OpenAPI 规范，定义生命周期与执行协议（见 <https://github.com/alibaba/OpenSandbox/blob/main/specs/README.md>）
- **SDKs**：多语言 SDK，封装协议细节（见 `sdks/`）
- **Sandboxes**：运行时镜像与执行环境（见 `sandboxes/`）

## 周边组件

- **Kubernetes Controller**：提供 BatchSandbox、Pool 与资源池能力（见 <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README.md>）
- **Ingress / Egress**：流量入口与出口控制（见 <https://github.com/alibaba/OpenSandbox/tree/main/components/ingress>、<https://github.com/alibaba/OpenSandbox/tree/main/components/egress>）

如需了解细节实现，建议按顺序阅读：

1. `系统架构`
2. `execd 设计`
3. `运行时实现（Docker/Kubernetes）`
