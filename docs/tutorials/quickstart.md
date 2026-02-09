---
title: Quickstart
---

# Quickstart

Goal: **start the server → create a sandbox → run a command/code**.

## Prerequisites

- Docker 20.10+
- Python 3.10+
- Package manager: `uv` or `pip`

## 1. Install and init config

```bash
uv pip install opensandbox-server
opensandbox-server init-config ~/.sandbox.toml --example docker
```

Source dev mode:

```bash
git clone https://github.com/alibaba/OpenSandbox.git
cd OpenSandbox/server
uv sync
cp example.config.toml ~/.sandbox.toml
uv run python -m src.main
```

## 2. Start the server

```bash
opensandbox-server
```

Default address: `http://localhost:8080`

## 3. Create a sandbox (Python SDK)

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

## 4. Code Interpreter SDK

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
