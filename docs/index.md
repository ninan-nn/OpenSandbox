---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "OpenSandbox"
  text: "面向 AI 应用的通用沙箱平台"
  tagline: 多语言 SDK + 标准化协议 + Docker/Kubernetes 运行时，一套体系承载 Coding/GUI Agent、评测与训练场景。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: API 总览
      link: /api/overview

features:
  - title: 多语言 SDK
    details: Python、Java/Kotlin、JavaScript/TypeScript 与 Code Interpreter SDK，覆盖生命周期、命令、文件与代码执行。
  - title: 协议先行
    details: Sandbox 生命周期与执行 API 完整 OpenAPI 规范，便于扩展自定义运行时与生态集成。
  - title: 运行时可插拔
    details: Docker 生产可用，Kubernetes 可扩展，支持资源限制、自动过期、可观测性。
  - title: 内置执行能力
    details: execd 提供 SSE 流式输出、Jupyter 多语言内核、命令与文件系统操作。
  - title: 网络与安全
    details: 单机代理路由、多端口统一接入，API Key + execd 访问令牌双层控制。
  - title: 丰富场景
    details: Coding Agents、浏览器自动化、远程桌面、评测/训练等示例开箱即用。
---
## 适合谁用

- **普通用户**：快速启动 OpenSandbox 服务，安全执行代码与命令
- **开发者**：基于 SDK 与 API 集成到代理、评测、平台服务中
- **平台团队**：通过可插拔运行时与协议标准化进行扩展与治理

## 推荐阅读路径

- 新手：`快速开始` → `架构设计` → `SDK 总览`
- 平台集成：`API 概览` → `生命周期/执行 API` → `网络与路由`
- 运行维护：`配置指南` → `部署方式` → `安全与权限`
