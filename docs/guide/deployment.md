---
title: 部署方式
---

# 部署方式

OpenSandbox 支持 Docker 与 Kubernetes 运行时部署，适用于从单机到集群的不同场景。

## 单机部署（Docker）

适合开发、测试与小规模服务。

1. 安装 Docker
2. 初始化配置
3. 启动服务

```bash
uv pip install opensandbox-server
opensandbox-server init-config ~/.sandbox.toml --example docker
opensandbox-server
```

## Kubernetes 部署

适合大规模、多租户环境。请参考 `kubernetes/` 目录与文档：

- 运行时与控制平面部署
- Sandbox Operator / CRD
- 网络与存储策略

## 建议实践

- 生产环境启用 API Key
- 设置资源限制与 TTL
- 配置日志与监控
- 使用 bridge 模式提高多沙箱并发能力
