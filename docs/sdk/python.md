---
title: Python SDK
---

# Python SDK

Python SDK 支持生命周期管理、命令执行与文件系统操作。

## 安装

```bash
pip install opensandbox
```

或：

```bash
uv add opensandbox
```

## 快速示例

```python
import asyncio
from opensandbox.sandbox import Sandbox
from opensandbox.config import ConnectionConfig

async def main():
    config = ConnectionConfig(
        domain="api.opensandbox.io",
        api_key="your-api-key",
    )
    sandbox = await Sandbox.create("ubuntu", connection_config=config)
    async with sandbox:
        execution = await sandbox.commands.run("echo 'Hello Sandbox!'")
        print(execution.logs.stdout[0].text)
        await sandbox.kill()

if __name__ == "__main__":
    asyncio.run(main())
```

## 常见能力

- 生命周期：创建、续期、暂停、恢复、销毁
- 命令执行：前台/后台命令与 SSE 输出
- 文件系统：上传/下载/搜索/权限管理

更多配置与用法请参考 `sdks/sandbox/python/README.md`。
