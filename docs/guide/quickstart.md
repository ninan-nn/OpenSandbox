---
title: 快速开始
---

# 快速开始

本节以最短步骤完成：**启动服务 → 创建沙箱 → 执行命令/代码**。

## 前置条件

- Docker 20.10+（本地运行）
- Python 3.10+（推荐）
- 包管理器：`uv` 或 `pip`

## 1. 安装并初始化配置

```bash
uv pip install opensandbox-server
opensandbox-server init-config ~/.sandbox.toml --example docker
```

如需从源码启动（适合开发场景）：

```bash
git clone https://github.com/alibaba/OpenSandbox.git
cd OpenSandbox/server
uv sync
cp example.config.toml ~/.sandbox.toml
uv run python -m src.main
```

## 2. 启动服务

```bash
opensandbox-server
```

默认地址：`http://localhost:8080`  
健康检查：`http://localhost:8080/health`

## 3. 创建沙箱并执行命令（Python SDK）

```python
import asyncio
from opensandbox import Sandbox

async def main() -> None:
    sandbox = await Sandbox.create("ubuntu")
    async with sandbox:
        execution = await sandbox.commands.run("echo 'Hello OpenSandbox'")
        print(execution.logs.stdout[0].text)
        await sandbox.kill()

if __name__ == "__main__":
    asyncio.run(main())
```

## 4. 代码解释器（Code Interpreter SDK）

```python
import asyncio
from code_interpreter import CodeInterpreter, SupportedLanguage
from opensandbox import Sandbox

async def main() -> None:
    sandbox = await Sandbox.create(
        "opensandbox/code-interpreter:v1.0.1",
        entrypoint=["/opt/opensandbox/code-interpreter.sh"],
        env={"PYTHON_VERSION": "3.11"},
    )
    async with sandbox:
        interpreter = await CodeInterpreter.create(sandbox=sandbox)
        result = await interpreter.codes.run(
            "result = 2 + 2\nresult",
            language=SupportedLanguage.PYTHON,
        )
        print(result.result[0].text)
        await sandbox.kill()

if __name__ == "__main__":
    asyncio.run(main())
```

下一步建议阅读：`架构设计` 与 `SDK 总览`。
