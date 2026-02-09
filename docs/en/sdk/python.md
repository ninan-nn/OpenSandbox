---
title: Python SDK
---

# Python SDK

```bash
pip install opensandbox
```

```python
import asyncio
from opensandbox import Sandbox

async def main() -> None:
    sandbox = await Sandbox.create("ubuntu")
    async with sandbox:
        execution = await sandbox.commands.run("echo 'Hello Sandbox!'")
        print(execution.logs.stdout[0].text)
        await sandbox.kill()

if __name__ == "__main__":
    asyncio.run(main())
```
