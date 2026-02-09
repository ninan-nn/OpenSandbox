---
title: 配置指南
---

# 配置指南

OpenSandbox 使用 `~/.sandbox.toml` 作为默认配置文件。你可以通过 `opensandbox-server init-config` 生成示例配置或空配置。

## 快速生成配置

```bash
opensandbox-server init-config ~/.sandbox.toml --example docker
```

## 常用配置项

### Server

- `server.host`：监听地址，默认 `0.0.0.0`
- `server.port`：服务端口，默认 `8080`
- `server.api_key`：API Key（生产环境建议设置）

### Runtime

- `runtime.type`：`docker` 或 `kubernetes`
- `runtime.execd_image`：execd 镜像地址

### Docker

- `docker.network_mode`：`host` 或 `bridge`

### Egress（可选）

当请求中使用 `networkPolicy` 时，必须配置 `egress.image`：

```toml
[runtime]
type = "docker"
execd_image = "opensandbox/execd:v1.0.5"

[egress]
image = "opensandbox/egress:v1.0.0"
```

## 常见配置示例

### Docker + bridge

```toml
[server]
host = "0.0.0.0"
port = 8080
api_key = "your-secret-api-key"

[runtime]
type = "docker"
execd_image = "opensandbox/execd:v1.0.5"

[docker]
network_mode = "bridge"
```

### Docker + host

```toml
[server]
host = "0.0.0.0"
port = 8080
api_key = "your-secret-api-key"

[runtime]
type = "docker"
execd_image = "opensandbox/execd:v1.0.5"

[docker]
network_mode = "host"
```

更多高级配置项可参考 `server/README.md`。
