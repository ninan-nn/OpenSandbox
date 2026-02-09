---
title: API 示例
---

# API 示例

## 获取沙箱端口访问地址

```bash
curl -H "OPEN-SANDBOX-API-KEY: your-secret-api-key" \
  http://localhost:8080/v1/sandboxes/{sandboxId}/endpoints/8000
```

返回：

```json
{ "endpoint": "sandbox.example.com/a1b2c3/8000" }
```

## execd 代码执行（示意）

```bash
curl -X POST http://{execd-endpoint}/code \
  -H "Content-Type: application/json" \
  -H "X-EXECD-ACCESS-TOKEN: your-token" \
  -d '{
    "language": "python",
    "code": "print(1 + 1)"
  }'
```

> 具体字段与事件流格式请参考 `specs/execd-api.yaml`。
