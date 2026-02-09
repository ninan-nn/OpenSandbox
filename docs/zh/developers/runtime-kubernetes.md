---
title: 运行时实现（Kubernetes）
---

# 运行时实现（Kubernetes）

Kubernetes Controller 是 OpenSandbox 的集群调度实现，基于自定义资源管理沙箱（见 <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README.md>）。

## 关键能力

- **BatchSandbox**：批量创建沙箱，适配高吞吐场景
- **Pool 资源池**：预热资源，加速沙箱交付
- **可选任务调度**：支持任务模板与差异化分发

## 资源模型

Controller 通过自定义资源（BatchSandbox、Pool）进行调度与资源管理，并提供状态监控与自动过期能力。

如需细节与示例，请直接参考 <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README.md> 与 <https://github.com/alibaba/OpenSandbox/blob/main/kubernetes/README-ZH.md>。
