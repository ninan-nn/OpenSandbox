---
title: 生命周期与状态机
---

# 生命周期与状态机

Lifecycle API 负责沙箱创建、暂停/恢复与回收（详见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md> 与 <https://github.com/alibaba/OpenSandbox/blob/main/specs/sandbox-lifecycle.yml>）。

## 典型操作

- Create / List / Get / Delete
- Pause / Resume
- Renew expiration
- Get endpoint

## 状态模型

服务端维护沙箱状态流转（如 Pending → Running → Paused/Stopping → Terminated/Failed）。

更完整的状态说明与示例响应见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>。
