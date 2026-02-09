import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "OpenSandbox",
  description:
    "OpenSandbox 是面向 AI 应用的通用沙箱平台，提供多语言 SDK、统一协议与 Docker/Kubernetes 运行时能力。",
  base: "/OpenSandbox/",
  lastUpdated: true,
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/",
      description:
        "OpenSandbox is a general-purpose sandbox platform for AI applications with multi-language SDKs and Docker/Kubernetes runtimes.",
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
        nav: [
          { text: "Tutorials", link: "/zh/tutorials/overview" },
          { text: "Developers", link: "/zh/developers/overview" },
          { text: "API", link: "/zh/api/overview" },
          { text: "SDK", link: "/zh/sdk/overview" },
          { text: "社区", link: "/zh/community" },
        ],
        sidebar: {
          "/zh/tutorials/": [
            {
              text: "Tutorials",
              items: [
                { text: "概览", link: "/zh/tutorials/overview" },
                { text: "快速开始", link: "/zh/tutorials/quickstart" },
                {
                  text: "Server 配置",
                  link: "/zh/tutorials/server-configuration",
                },
                { text: "Runtime 运行时", link: "/zh/tutorials/runtime" },
                { text: "示例与场景", link: "/zh/tutorials/examples" },
                { text: "常见问题", link: "/zh/tutorials/faq" },
                { text: "排障指南", link: "/zh/tutorials/troubleshooting" },
              ],
            },
          ],
          "/zh/developers/": [
            {
              text: "Developers",
              items: [
                { text: "概览", link: "/zh/developers/overview" },
                { text: "系统架构", link: "/zh/developers/architecture" },
                {
                  text: "架构深度解析",
                  link: "/zh/developers/architecture-deep-dive",
                },
                { text: "组件设计", link: "/zh/developers/components" },
                {
                  text: "运行时实现（Docker）",
                  link: "/zh/developers/runtime-docker",
                },
                {
                  text: "运行时实现（Kubernetes）",
                  link: "/zh/developers/runtime-kubernetes",
                },
                { text: "execd 设计", link: "/zh/developers/execd" },
                { text: "生命周期与状态机", link: "/zh/developers/lifecycle" },
                { text: "网络与路由", link: "/zh/developers/networking" },
                { text: "技术栈", link: "/zh/developers/stack" },
                { text: "贡献指南", link: "/zh/developers/contribution" },
              ],
            },
          ],
          "/zh/api/": [
            {
              text: "API",
              items: [
                { text: "总览与认证", link: "/zh/api/overview" },
                { text: "生命周期 API", link: "/zh/api/lifecycle" },
                { text: "执行 API（execd）", link: "/zh/api/execd" },
                { text: "API 示例", link: "/zh/api/examples" },
              ],
            },
          ],
          "/zh/sdk/": [
            {
              text: "SDK",
              items: [
                { text: "SDK 总览", link: "/zh/sdk/overview" },
                { text: "Python SDK", link: "/zh/sdk/python" },
                { text: "Kotlin/Java SDK", link: "/zh/sdk/kotlin" },
                {
                  text: "Code Interpreter SDK",
                  link: "/zh/sdk/code-interpreter",
                },
              ],
            },
          ],
          "/zh/examples/": [],
          "/zh/reference/": [],
        },
        editLink: {
          pattern:
            "https://github.com/alibaba/OpenSandbox/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页",
        },
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/logo.svg",
    nav: [
      { text: "Tutorials", link: "/tutorials/overview" },
      { text: "Developers", link: "/developers/overview" },
      { text: "API", link: "/api/overview" },
      { text: "SDK", link: "/sdk/overview" },
      { text: "Community", link: "/community" },
    ],
    sidebar: {
      "/tutorials/": [
        {
          text: "Tutorials",
          items: [
            { text: "Overview", link: "/tutorials/overview" },
            { text: "Quickstart", link: "/tutorials/quickstart" },
            {
              text: "Server Configuration",
              link: "/tutorials/server-configuration",
            },
            { text: "Runtime", link: "/tutorials/runtime" },
            { text: "Examples", link: "/tutorials/examples" },
            { text: "FAQ", link: "/tutorials/faq" },
            { text: "Troubleshooting", link: "/tutorials/troubleshooting" },
          ],
        },
      ],
      "/developers/": [
        {
          text: "Developers",
          items: [
            { text: "Overview", link: "/developers/overview" },
            { text: "Architecture", link: "/developers/architecture" },
            {
              text: "Architecture Deep Dive",
              link: "/developers/architecture-deep-dive",
            },
            { text: "Components", link: "/developers/components" },
            { text: "Runtime (Docker)", link: "/developers/runtime-docker" },
            {
              text: "Runtime (Kubernetes)",
              link: "/developers/runtime-kubernetes",
            },
            { text: "execd Design", link: "/developers/execd" },
            { text: "Lifecycle & States", link: "/developers/lifecycle" },
            { text: "Networking", link: "/developers/networking" },
            { text: "Tech Stack", link: "/developers/stack" },
            { text: "Contributing", link: "/developers/contribution" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API",
          items: [
            { text: "总览与认证", link: "/api/overview" },
            { text: "生命周期 API", link: "/api/lifecycle" },
            { text: "执行 API（execd）", link: "/api/execd" },
            { text: "API 示例", link: "/api/examples" },
          ],
        },
      ],
      "/sdk/": [
        {
          text: "SDK",
          items: [
            { text: "SDK 总览", link: "/sdk/overview" },
            { text: "Python SDK", link: "/sdk/python" },
            { text: "Kotlin/Java SDK", link: "/sdk/kotlin" },
            { text: "Code Interpreter SDK", link: "/sdk/code-interpreter" },
          ],
        },
      ],
      "/examples/": [],
      "/reference/": [],
    },
    editLink: {
      pattern: "https://github.com/alibaba/OpenSandbox/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    outline: [2, 3],
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/alibaba/OpenSandbox" },
    ],
    footer: {
      message: "Apache 2.0 License",
      copyright: "Copyright © OpenSandbox Contributors",
    },
  },
});
