# API 参考

本页面提供了 Kirara AI 插件开发的 API 参考文档。

## 核心类

### Plugin

插件的基类。

```python
from kirara.plugin import Plugin

class MyPlugin(Plugin):
    def __init__(self):
        super().__init__()
        
    async def initialize(self):
        """初始化插件"""
        pass
        
    async def handle_message(self, message: Message):
        """处理消息"""
        pass
        
    async def cleanup(self):
        """清理资源"""
        pass
```

#### 生命周期方法

- `initialize()`: 插件初始化
- `handle_message(message)`: 处理消息
- `cleanup()`: 清理资源

### Message

消息对象。

```python
from kirara.message import Message

class MessageHandler:
    async def handle(self, message: Message):
        # 消息属性
        print(message.content)  # 消息内容
        print(message.sender)   # 发送者
        print(message.platform) # 平台信息
        
        # 消息方法
        await message.reply("回复")
        await message.delete()
        await message.forward(target)
```

## 装饰器

### 消息处理

```python
from kirara.plugin import handler

class MessageHandler:
    @handler.command("hello")
    async def handle_hello(self, message: Message):
        """处理 /hello 命令"""
        pass
        
    @handler.regex(r"^/echo\s+(.+)$")
    async def handle_regex(self, message: Message, match):
        """处理正则匹配"""
        pass
        
    @handler.event("member_join")
    async def handle_event(self, event: Event):
        """处理事件"""
        pass
```

### 权限控制

```python
from kirara.plugin import permission

class MessageHandler:
    @permission.admin
    async def admin_command(self, message: Message):
        """仅管理员可用"""
        pass
        
    @permission.require("file.read")
    async def file_operation(self, message: Message):
        """需要文件读取权限"""
        pass
```

## 工具类

### Config

配置管理。

```python
from kirara.config import Config

class MyPlugin(Plugin):
    def __init__(self):
        self.config = Config()
        
    def load_config(self):
        api_key = self.config.get("api_key")
        timeout = self.config.get("timeout", 30)
        debug = self.config.get_bool("debug")
```

### Storage

数据存储。

```python
from kirara.storage import Storage

class MyPlugin(Plugin):
    def __init__(self):
        self.storage = Storage()
        
    async def save_data(self):
        await self.storage.set("key", "value")
        await self.storage.get("key")
        await self.storage.delete("key")
```

### Logger

日志记录。

```python
from kirara.logger import Logger

class MyPlugin(Plugin):
    def __init__(self):
        self.logger = Logger(__name__)
        
    def log_example(self):
        self.logger.debug("调试信息")
        self.logger.info("一般信息")
        self.logger.warning("警告信息")
        self.logger.error("错误信息")
```

## 事件系统

### 事件监听

```python
from kirara.event import Event, EventListener

class MyPlugin(Plugin, EventListener):
    @event.on("message_received")
    async def on_message(self, event: Event):
        """消息接收事件"""
        pass
        
    @event.on("plugin_loaded")
    async def on_loaded(self, event: Event):
        """插件加载事件"""
        pass
```

### 事件发送

```python
from kirara.event import EventEmitter

class MyPlugin(Plugin, EventEmitter):
    async def emit_event(self):
        await self.emit("custom_event", {
            "type": "notification",
            "content": "Something happened"
        })
```

## 工具函数

### 网络请求

```python
from kirara.utils.http import HttpClient

class MyPlugin(Plugin):
    def __init__(self):
        self.http = HttpClient()
        
    async def make_request(self):
        response = await self.http.get("https://api.example.com")
        data = await self.http.post("https://api.example.com", {
            "key": "value"
        })
```

### 文件操作

```python
from kirara.utils.file import FileManager

class MyPlugin(Plugin):
    def __init__(self):
        self.files = FileManager()
        
    async def handle_file(self):
        await self.files.read("config.json")
        await self.files.write("data.txt", "content")
        await self.files.delete("temp.txt")
```

## 类型定义

```python
from kirara.types import (
    Message,
    User,
    Group,
    Platform,
    Event,
    Permission
)

class MyPlugin(Plugin):
    async def type_example(self, message: Message):
        user: User = message.sender
        group: Group = message.group
        platform: Platform = message.platform
        event: Event = message.event
        perm: Permission = user.permission
```

## 最佳实践

1. **类型提示**
   - 使用类型注解
   - 启用类型检查
   - 处理类型错误

2. **异步编程**
   - 使用 async/await
   - 避免阻塞操作
   - 合理使用并发

3. **错误处理**
   - 捕获异常
   - 记录错误
   - 优雅降级

4. **资源管理**
   - 及时清理
   - 控制内存
   - 关闭连接 