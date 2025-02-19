import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

export default defineConfig({
  title: "Kirara AI",
  description: "大模型 Agent 编排引擎官方文档",
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/lss233/chatgpt-mirai-qq-bot/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '什么是 Kirara AI', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        },
        {
          text: '配置',
          items: [
            { text: '配置概览', link: '/guide/configuration/' },
            { text: '连接聊天平台', link: '/guide/configuration/im' },
            { text: '连接大语言模型', link: '/guide/configuration/llm' },
            { text: '选择调用时机', link: '/guide/configuration/dispatch' },
            { text: '插件管理', link: '/guide/configuration/plugins' },
            { text: '更新 Kirara AI', link: '/guide/configuration/update' },
          ]
        },
        {
          text: '工作流',
          items: [
            { text: '工作流概述', link: '/guide/todo' },
            { text: '触发器', link: '/guide/todo' },
            { text: '处理步骤', link: '/guide/todo' },
            { text: '变量和上下文', link: '/guide/todo' },
            { text: '条件和分支', link: '/guide/todo' },
            { text: '模板语法', link: '/guide/todo' },
            { text: '设计模式', link: '/guide/todo' },
            { text: '性能优化', link: '/guide/todo' },
            { text: '调试技巧', link: '/guide/todo' },
          ]
        },
        {
          text: '插件开发',
          items: [
            { text: '插件开发概述', link: '/guide/todo' },
            { text: '插件结构', link: '/guide/todo' },
            { text: 'API 参考', link: '/guide/todo' },
            { text: '消息处理', link: '/guide/todo' },
            { text: '状态管理', link: '/guide/todo' },
            { text: '配置管理', link: '/guide/todo' },
            { text: '工具和辅助函数', link: '/guide/todo' },
            { text: '开发规范', link: '/guide/todo' },
            { text: '测试和调试', link: '/guide/todo' },
            { text: '发布插件', link: '/guide/todo' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lss233/chatgpt-mirai-qq-bot/' }
    ]
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
}) 