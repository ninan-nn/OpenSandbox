import { defineConfig } from 'vitepress'

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
      label: "简体中文",
      lang: "zh-CN",
    },
    en: {
      label: "English",
      lang: "en-US",
      description:
        "OpenSandbox is a general-purpose sandbox platform for AI applications with multi-language SDKs and Docker/Kubernetes runtimes.",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/logo.svg",
    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "API", link: "/api/overview" },
      { text: "SDK", link: "/sdk/overview" },
      { text: "示例", link: "/examples/overview" },
      { text: "参考", link: "/reference/faq" },
      { text: "贡献", link: "/contributing" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [
            { text: "产品概览", link: "/guide/introduction" },
            { text: "快速开始", link: "/guide/quickstart" },
            { text: "架构设计", link: "/guide/architecture" },
            { text: "网络与路由", link: "/guide/networking" },
          ],
        },
        {
          text: "运维与配置",
          items: [
            { text: "配置指南", link: "/guide/configuration" },
            { text: "安全与权限", link: "/guide/security" },
            { text: "部署方式", link: "/guide/deployment" },
          ],
        },
        {
          text: "深入阅读",
          items: [
            { text: "架构深度解析", link: "/architecture" },
            { text: "单机网络详解", link: "/single_host_network" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API 概览",
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
          text: "SDK 指南",
          items: [
            { text: "SDK 总览", link: "/sdk/overview" },
            { text: "Python SDK", link: "/sdk/python" },
            { text: "Kotlin/Java SDK", link: "/sdk/kotlin" },
            { text: "Code Interpreter SDK", link: "/sdk/code-interpreter" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "示例与场景",
          items: [
            { text: "示例总览", link: "/examples/overview" },
            { text: "场景清单", link: "/examples/catalog" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "参考",
          items: [
            { text: "术语表", link: "/reference/glossary" },
            { text: "常见问题", link: "/reference/faq" },
            { text: "排障指南", link: "/reference/troubleshooting" },
            { text: "路线图", link: "/reference/roadmap" },
          ],
        },
      ],
    },
    editLink: {
      pattern: "https://github.com/alibaba/OpenSandbox/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },
    outline: [2, 3],
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/alibaba/OpenSandbox" }],
    footer: {
      message: "Apache 2.0 License",
      copyright: "Copyright © OpenSandbox Contributors",
    },
    locales: {
      root: {
        label: "简体中文",
        nav: [
          { text: "指南", link: "/guide/introduction" },
          { text: "API", link: "/api/overview" },
          { text: "SDK", link: "/sdk/overview" },
          { text: "示例", link: "/examples/overview" },
          { text: "参考", link: "/reference/faq" },
          { text: "贡献", link: "/contributing" },
        ],
        editLink: {
          pattern: "https://github.com/alibaba/OpenSandbox/edit/main/docs/:path",
          text: "在 GitHub 上编辑此页",
        },
      },
      en: {
        label: "English",
        nav: [
          { text: "Guide", link: "/en/guide/introduction" },
          { text: "API", link: "/en/api/overview" },
          { text: "SDK", link: "/en/sdk/overview" },
          { text: "Examples", link: "/en/examples/overview" },
          { text: "Reference", link: "/en/reference/faq" },
          { text: "Contributing", link: "/en/contributing" },
        ],
        sidebar: {
          "/en/guide/": [
            {
              text: "Getting Started",
              items: [
                { text: "Introduction", link: "/en/guide/introduction" },
                { text: "Quickstart", link: "/en/guide/quickstart" },
                { text: "Architecture", link: "/en/guide/architecture" },
                { text: "Networking", link: "/en/guide/networking" },
              ],
            },
            {
              text: "Operations",
              items: [
                { text: "Configuration", link: "/en/guide/configuration" },
                { text: "Security", link: "/en/guide/security" },
                { text: "Deployment", link: "/en/guide/deployment" },
              ],
            },
          ],
          "/en/api/": [
            {
              text: "API",
              items: [
                { text: "Overview", link: "/en/api/overview" },
                { text: "Lifecycle API", link: "/en/api/lifecycle" },
                { text: "Execution API", link: "/en/api/execd" },
                { text: "API Examples", link: "/en/api/examples" },
              ],
            },
          ],
          "/en/sdk/": [
            {
              text: "SDK",
              items: [
                { text: "Overview", link: "/en/sdk/overview" },
                { text: "Python SDK", link: "/en/sdk/python" },
                { text: "Kotlin/Java SDK", link: "/en/sdk/kotlin" },
                { text: "Code Interpreter", link: "/en/sdk/code-interpreter" },
              ],
            },
          ],
          "/en/examples/": [
            {
              text: "Examples",
              items: [
                { text: "Overview", link: "/en/examples/overview" },
                { text: "Catalog", link: "/en/examples/catalog" },
              ],
            },
          ],
          "/en/reference/": [
            {
              text: "Reference",
              items: [
                { text: "Glossary", link: "/en/reference/glossary" },
                { text: "FAQ", link: "/en/reference/faq" },
                { text: "Troubleshooting", link: "/en/reference/troubleshooting" },
                { text: "Roadmap", link: "/en/reference/roadmap" },
              ],
            },
          ],
        },
        editLink: {
          pattern: "https://github.com/alibaba/OpenSandbox/edit/main/docs/:path",
          text: "Edit this page on GitHub",
        },
      },
    },
  },
})
