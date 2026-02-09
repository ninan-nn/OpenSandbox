---
title: 常见问题
---

# 常见问题

## 为什么创建沙箱失败？

常见原因包括：

- Docker 未启动或无法访问
- 镜像拉取失败（网络或权限）
- 未配置 `entrypoint` 或资源限制不合法

## execd 访问需要哪些权限？

execd API 需要 `X-EXECD-ACCESS-TOKEN`。请确保从生命周期 API 获取正确的 endpoint 与 token。

## Host 与 Bridge 网络模式如何选择？

- **Host**：性能更高，但端口容易冲突，适合单实例
- **Bridge**：通过代理路由统一接入，更适合多实例

## 如何查看 API 文档？

服务启动后：

- Swagger：`http://localhost:8080/docs`
- ReDoc：`http://localhost:8080/redoc`
