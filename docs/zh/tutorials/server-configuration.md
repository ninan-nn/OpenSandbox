---
title: Server 配置
---

# Server 配置

本页说明 OpenSandbox Server 的基础配置方式（内容来自 `server/README.md`）。

## 1. 配置文件与初始化

OpenSandbox 使用 `~/.sandbox.toml` 作为默认配置文件，可通过命令生成示例配置：

```bash
opensandbox-server init-config ~/.sandbox.toml --example docker
```

更完整的配置字段说明见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>。

## 2. 常用配置项（节选）

### Server

- `server.host`：监听地址，默认 `0.0.0.0`
- `server.port`：服务端口，默认 `8080`
- `server.api_key`：API Key（生产环境建议设置）

更完整的配置字段说明见 <https://github.com/alibaba/OpenSandbox/blob/main/server/README.md>。
