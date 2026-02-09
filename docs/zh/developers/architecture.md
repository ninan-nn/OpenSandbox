---
title: 系统架构
---

# 系统架构

OpenSandbox 采用“协议先行 + 运行时可插拔”的架构，便于扩展、复用和规模化部署。

![OpenSandbox Architecture](../assets/architecture.svg)

## 四层模型

1. **SDK 层**：对生命周期、命令、文件与代码执行提供统一抽象
2. **协议层**：OpenAPI 规范，定义统一接口与模型
3. **运行时层**：服务端实现生命周期 API，负责创建与治理沙箱
4. **实例层**：沙箱容器 + execd 执行代理

## 关键组件

- **Server（Lifecycle API）**：负责沙箱创建、状态管理、续期、回收
- **execd（Execution API）**：在沙箱内执行命令、代码与文件操作
- **SDKs**：多语言客户端，屏蔽协议细节
- **Specs**：OpenAPI 规范，保障多运行时一致性
