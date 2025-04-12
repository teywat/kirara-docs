# 插件开发指南

Kirara AI 提供了强大的插件系统，允许开发者扩展和定制 AI 助手的功能。本指南将帮助你了解如何开发 Kirara AI 插件。

> [!TIP]
>
> 开发者应当至少拥有一定的`python`编程能力以及对相关概念。



## 插件基础

插件是一个 Python 包，需要遵循特定的结构和接口规范：

```
my/
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
from kirara_ai.plugin_manager.plugin import Plugin

class MyPlugin(Plugin):
  	"""
  	因为Plugin为抽象类，所以你必须在子类中重写 on_load on_start on_stop 方法。
  	"""
    def __init__(self):
        super().__init__()
        
    def on_load(self):
      # 必须重写
      # 当插件被加载时，执行的方法。
      pass
    def on_start(self):
      # 必须重写
      # 当插件被启用时，执行的方法。
      pass
    def on_stop(self):
      # 必须重写
      # 当插件被禁用时，执行的方法。
      pass
```

## 开发指南

- [插件结构](./structure) - 了解插件的文件结构和配置
- [API 参考](./api) - 插件开发 `API` 文档
- [日志记录](./logger) - 插件标准化日志记录
- [配置管理](./config) - 处理插件配置
- [工作流相关](./workflow/index.md) - 介绍工作流
- [作用域容器](./container.md) - 介绍插件开发必用模块——作用域容器
- [工具和辅助函数](./utils) - 常用开发库
- [发布插件](./publishing.md) - 发布插件步骤

## 最佳实践

- [插件开发规范](./guidelines)
- [测试和调试](./testing) 