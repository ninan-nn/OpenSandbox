---
title: 总览与认证
---

# API 总览与认证

OpenSandbox 提供两类 API：

1. **Lifecycle API**：创建、查询、暂停、删除沙箱（服务端）
2. **Execution API (execd)**：在沙箱内执行代码、命令与文件操作

## 基础地址

- Lifecycle API：`http://localhost:8080/v1`
- Execution API：`http://localhost:8080`（通过 execd 端点访问）

## 认证方式

- Lifecycle API：`OPEN-SANDBOX-API-KEY`
- Execution API：`X-EXECD-ACCESS-TOKEN`

建议将 API Key 放入环境变量：

```bash
export OPEN_SANDBOX_API_KEY=your-key
```

## 规范与来源

OpenSandbox 的 API 完整 OpenAPI 规范位于：

- `specs/sandbox-lifecycle.yml`
- `specs/execd-api.yaml`

下一步建议阅读：`生命周期 API` 与 `执行 API（execd）`。
