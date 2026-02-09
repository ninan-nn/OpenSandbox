---
title: execd 设计
---

# execd 设计

`execd` 是沙箱内执行守护进程，提供代码执行、命令执行、文件操作与监控能力（见 <https://github.com/alibaba/OpenSandbox/blob/main/components/execd/README.md>）。

## 核心能力

- 多语言代码执行（Jupyter 内核）
- 前台 / 后台命令执行
- 文件系统 CRUD 与搜索
- SSE 流式输出与指标监控

## 关键结构

`components/execd` 的目录结构（节选）：

- `pkg/web/`：HTTP 控制器与 SSE
- `pkg/runtime/`：执行调度
- `pkg/jupyter/`：Jupyter 客户端
- `pkg/util/`：工具与辅助

更多实现细节与 API 能力请参考 <https://github.com/alibaba/OpenSandbox/blob/main/components/execd/README.md> 与 <https://github.com/alibaba/OpenSandbox/blob/main/specs/execd-api.yaml>。
