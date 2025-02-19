# 插件结构

本页面介绍 Kirara AI 插件的基本结构和组织方式。

## 基本结构

一个标准的插件包含以下文件和目录：

```
my-plugin/
├── __init__.py          # 插件入口
├── plugin.yaml          # 插件配置
├── handler.py           # 消息处理器
├── requirements.txt     # 依赖项
├── README.md           # 文档
└── assets/             # 资源文件
```

## 配置文件

### plugin.yaml

插件的主要配置文件。

```yaml
name: my-plugin
version: 1.0.0
description: 这是一个示例插件
author: Your Name
homepage: https://github.com/username/my-plugin
license: MIT

requirements:
  - requests>=2.28.0
  - pillow>=9.0.0

permissions:
  - message.read
  - message.write
  - file.read

config:
  api_key:
    type: string
    description: API 密钥
    required: true
  max_retries:
    type: integer
    description: 最大重试次数
    default: 3
```

## 入口文件

### \_\_init\_\_.py

插件的入口文件。

```python
from kirara.plugin import Plugin
from kirara.message import Message

class MyPlugin(Plugin):
    def __init__(self):
        super().__init__()
        self.name = "my-plugin"
        self.version = "1.0.0"
        
    async def initialize(self):
        """插件初始化"""
        self.api_key = self.config.get("api_key")
        self.max_retries = self.config.get("max_retries", 3)
        
    async def handle_message(self, message: Message):
        """处理消息"""
        pass
```

## 消息处理器

### handler.py

处理具体消息的逻辑。

```python
from kirara.message import Message
from kirara.plugin import handler

class MessageHandler:
    @handler.command("hello")
    async def handle_hello(self, message: Message):
        """处理 /hello 命令"""
        await message.reply("Hello, world!")
    
    @handler.regex(r"^/echo\s+(.+)$")
    async def handle_echo(self, message: Message, match):
        """处理 /echo 命令"""
        text = match.group(1)
        await message.reply(f"Echo: {text}")
```

## 依赖管理

### requirements.txt

声明插件的依赖项。

```
requests>=2.28.0
pillow>=9.0.0
python-dateutil>=2.8.2
```

## 文档

### README.md

插件的说明文档。

```markdown
# My Plugin

这是一个示例插件，展示了基本的功能。

## 功能

- 功能 1
- 功能 2
- 功能 3

## 安装

1. 从插件市场安装
2. 配置 API 密钥
3. 重启 Kirara AI

## 使用方法

- `/hello` - 发送问候
- `/echo <text>` - 复读文本

## 配置说明

- `api_key`: API 密钥
- `max_retries`: 最大重试次数
```

## 资源文件

### assets/

存放插件的资源文件。

```
assets/
├── images/         # 图片资源
├── templates/      # 模板文件
└── data/          # 数据文件
```

## 目录结构示例

完整的插件目录结构示例：

```
my-plugin/
├── __init__.py
├── plugin.yaml
├── handler.py
├── requirements.txt
├── README.md
├── utils/
│   ├── __init__.py
│   ├── api.py
│   └── helpers.py
├── models/
│   ├── __init__.py
│   └── data.py
├── templates/
│   └── response.txt
└── assets/
    └── images/
        └── logo.png
```

## 最佳实践

1. **文件组织**
   - 遵循标准结构
   - 合理分割模块
   - 保持目录整洁

2. **配置管理**
   - 使用配置文件
   - 提供默认值
   - 验证配置项

3. **代码风格**
   - 遵循 PEP 8
   - 添加类型注解
   - 编写文档字符串

4. **资源管理**
   - 合理组织资源
   - 控制文件大小
   - 使用相对路径 