---
title: 安全与权限
---

# 安全与权限

OpenSandbox 提供生命周期与执行两层 API，并通过不同的访问机制控制权限边界。

## 访问控制

- **Lifecycle API**：`OPEN-SANDBOX-API-KEY` 头部鉴权
- **Execution API (execd)**：`X-EXECD-ACCESS-TOKEN` 头部鉴权

建议在生产环境中始终开启 API Key，并通过网关或服务侧策略限制访问。

## 资源限制

创建沙箱时可设置 CPU/内存等资源限制：

```json
{
  "cpu": "500m",
  "memory": "512Mi"
}
```

## 网络安全

使用 `networkPolicy` 可以限制沙箱对外网络访问（仅 Docker bridge 模式支持）：

```json
{
  "defaultAction": "deny",
  "egress": [
    { "action": "allow", "target": "pypi.org" },
    { "action": "allow", "target": "*.python.org" }
  ]
}
```

## 运行时加固

Docker 配置支持：

- 禁止危险能力（`drop_capabilities`）
- `no_new_privileges`
- `seccomp`/`apparmor` 配置

请参考 `server/README.md` 中的安全配置示例。
