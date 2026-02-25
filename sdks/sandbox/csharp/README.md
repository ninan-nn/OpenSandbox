# OpenSandbox SDK for C#

This is the C# SDK package skeleton for OpenSandbox.

## Installation

```bash
dotnet add package Alibaba.OpenSandbox
```

## Build Locally

```bash
dotnet restore OpenSandbox.Sandbox.csproj
dotnet build OpenSandbox.Sandbox.csproj -c Release
dotnet pack OpenSandbox.Sandbox.csproj -c Release -o ./artifacts
```

## Publish (CI)

Publishing to NuGet is automated by GitHub Actions using tags:

- `csharp/sandbox/v<version>`

Example:

```bash
git tag csharp/sandbox/v0.1.0-alpha.1
git push origin csharp/sandbox/v0.1.0-alpha.1
```
