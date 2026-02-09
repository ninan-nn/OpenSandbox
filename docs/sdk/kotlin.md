---
title: Kotlin/Java SDK
---

# Kotlin/Java SDK

Kotlin/Java SDK 覆盖生命周期管理、命令执行与文件系统能力。

## 安装

Gradle（Kotlin DSL）：

```kotlin
dependencies {
    implementation("com.alibaba.opensandbox:sandbox:{latest_version}")
}
```

Maven：

```xml
<dependency>
    <groupId>com.alibaba.opensandbox</groupId>
    <artifactId>sandbox</artifactId>
    <version>{latest_version}</version>
</dependency>
```

## 快速示例

```java
import com.alibaba.opensandbox.sandbox.Sandbox;
import com.alibaba.opensandbox.sandbox.config.ConnectionConfig;

ConnectionConfig config = ConnectionConfig.builder()
    .domain("api.opensandbox.io")
    .apiKey("your-api-key")
    .build();

try (Sandbox sandbox = Sandbox.builder()
        .connectionConfig(config)
        .image("ubuntu")
        .build()) {
    System.out.println(sandbox.commands().run("echo 'Hello Sandbox!'")
        .getLogs().getStdout().get(0).getText());
    sandbox.kill();
}
```

更多配置与用法请参考 `sdks/sandbox/kotlin/README.md`。
