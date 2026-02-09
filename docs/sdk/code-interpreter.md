---
title: Code Interpreter SDK
---

# Code Interpreter SDK

```bash
pip install opensandbox-code-interpreter
```

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
