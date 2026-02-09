---
title: 生命周期 API
---

# 生命周期 API

生命周期 API 负责创建、管理与销毁沙箱实例。完整接口见 `specs/sandbox-lifecycle.yml`。

## 主要接口

- `POST /sandboxes`：创建沙箱
- `GET /sandboxes`：列表查询
- `GET /sandboxes/{sandboxId}`：沙箱详情
- `DELETE /sandboxes/{sandboxId}`：删除沙箱
- `POST /sandboxes/{sandboxId}/pause`：暂停
- `POST /sandboxes/{sandboxId}/resume`：恢复
- `POST /sandboxes/{sandboxId}/renew-expiration`：续期
- `GET /sandboxes/{sandboxId}/endpoints/{port}`：获取端口访问地址

## 创建沙箱示例

```bash
curl -X POST "http://localhost:8080/v1/sandboxes" \
  -H "OPEN-SANDBOX-API-KEY: your-secret-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "image": { "uri": "python:3.11-slim" },
    "entrypoint": ["python", "-m", "http.server", "8000"],
    "timeout": 3600,
    "resourceLimits": { "cpu": "500m", "memory": "512Mi" },
    "env": { "PYTHONUNBUFFERED": "1" },
    "metadata": { "project": "demo" }
  }'
```

## 续期示例

```bash
curl -X POST "http://localhost:8080/v1/sandboxes/{sandboxId}/renew-expiration" \
  -H "OPEN-SANDBOX-API-KEY: your-secret-api-key" \
  -H "Content-Type: application/json" \
  -d '{ "expiresAt": "2024-01-15T12:30:00Z" }'
```

## 状态模型

沙箱状态包含 Pending、Running、Paused、Stopping、Terminated、Failed 等状态。  
更详细的状态流转见 `server/README.md`。
