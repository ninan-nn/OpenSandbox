---
title: 贡献指南
---

# 贡献指南

欢迎参与 OpenSandbox 开源社区！

## 贡献流程

1. Fork 仓库并创建分支
2. 编写代码与测试
3. 运行测试与 lint
4. 提交 PR

## 开发与测试

- Python：`uv run ruff check` / `uv run pytest`
- Go：`cd components/execd && make fmt && make test`
- Kotlin：`cd sdks/sandbox/kotlin && ./gradlew test`

详细流程见 `CONTRIBUTING.md`。
