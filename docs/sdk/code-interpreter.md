---
title: Code Interpreter SDK
---

# Code Interpreter SDK

Code Interpreter SDK 通过 execd 与 Jupyter 内核执行多语言代码，支持上下文与流式输出。

## 安装

```bash
pip install opensandbox-code-interpreter
```

## 快速示例

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

## 运行时要求

需使用 `opensandbox/code-interpreter` 镜像（或衍生镜像），可通过环境变量指定语言版本。

更多细节请参考 `sdks/code-interpreter/python/README.md`。
