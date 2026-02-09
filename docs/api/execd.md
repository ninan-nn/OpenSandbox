---
title: 执行 API（execd）
---

# 执行 API（execd）

execd 运行在沙箱内部，提供命令执行、代码执行与文件系统操作。完整接口见 `specs/execd-api.yaml`。

## 主要能力

- **代码执行**：多语言执行与上下文管理
- **命令执行**：前台/后台命令，SSE 流式输出
- **文件系统**：上传/下载/搜索/权限管理
- **监控**：CPU/内存指标与实时 SSE

## 主要接口

### Code

- `POST /code/context`：创建执行上下文
- `POST /code`：执行代码（SSE）
- `DELETE /code`：中断执行

### Command

- `POST /command`：执行命令（SSE）
- `DELETE /command`：中断命令
- `GET /command/status/{session}`：查询状态
- `GET /command/output/{session}`：获取输出

### Filesystem

- `GET /files/info`
- `POST /files/upload`
- `GET /files/download`
- `POST /directories`
- `DELETE /directories`

### Metrics

- `GET /metrics`
- `GET /metrics/watch`（SSE）

## 认证

所有 execd 接口需要 `X-EXECD-ACCESS-TOKEN` 头部。
