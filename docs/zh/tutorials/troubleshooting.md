---
title: 排障指南
---

# 排障指南

## 服务启动失败

- 确认 `~/.sandbox.toml` 路径与格式正确
- 运行 `opensandbox-server -h` 检查参数
- 检查 Docker/Kubernetes 运行时可用性

## 无法创建沙箱

- 检查镜像是否可访问
- 检查 `runtime.execd_image` 是否存在
- 验证 API Key 是否正确

## execd 连接失败

- 确认 `get_endpoint` 返回的地址可访问
- 在 bridge 模式下确保 `/proxy/{port}` 路径完整
- 检查防火墙或网关策略

## SSE 流无输出

- 确认请求头包含 `Accept: text/event-stream`
- 确认 execd 的访问 token 正确
