# 插件开发指南

Kirara AI 提供了强大的插件系统，允许开发者扩展和定制 AI 助手的功能。本指南将帮助你了解如何开发 Kirara AI 插件。

## 插件基础

插件是一个 Python 包，需要遵循特定的结构和接口规范：

```
my-plugin/
├── __init__.py
├── plugin.yaml
└── handler.py
```

### plugin.yaml 示例

```yaml
name: my-plugin
version: 1.0.0
description: 这是一个示例插件
author: Your Name
requirements:
  - requests>=2.28.0
```

### 基础插件示例

```python
from kirara.plugin import Plugin
from kirara.message import Message

class MyPlugin(Plugin):
    def __init__(self):
        super().__init__()
        
    async def handle_message(self, message: Message):
        # 处理消息的逻辑
        pass
```

## 开发指南

- [插件结构](./structure) - 了解插件的文件结构和配置
- [API 参考](./api) - 插件开发 API 文档
- [消息处理](./message) - 处理和响应消息
- [状态管理](./state) - 管理插件状态
- [配置管理](./config) - 处理插件配置
- [工具和辅助函数](./utils) - 常用开发工具

## 最佳实践

- [插件开发规范](./guidelines)
- [测试和调试](./testing)
- [发布插件](./publishing) 