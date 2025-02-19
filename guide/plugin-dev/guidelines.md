# 开发规范

本页面介绍 Kirara AI 插件开发的规范和建议。

## 代码风格

### Python 规范

遵循 PEP 8 规范。

```python
# 正确的命名方式
class MyPlugin(Plugin):
    def handle_message(self, message):
        pass
    
    def process_data(self, data):
        pass

# 错误的命名方式
class myPlugin(Plugin):
    def HandleMessage(self, message):
        pass
    
    def process_Data(self, data):
        pass
```

### 文档字符串

为类和方法添加文档字符串。

```python
class MyPlugin(Plugin):
    """示例插件类。
    
    这个插件用于演示基本功能。
    
    Attributes:
        name: 插件名称
        version: 插件版本
    """
    
    async def handle_message(self, message: Message) -> None:
        """处理接收到的消息。
        
        Args:
            message: 接收到的消息对象
            
        Returns:
            None
            
        Raises:
            ValueError: 当消息格式不正确时
        """
        pass
```

### 类型注解

使用类型提示。

```python
from typing import List, Dict, Optional

class MyPlugin(Plugin):
    def __init__(self) -> None:
        self.data: Dict[str, Any] = {}
        
    async def process_items(self, items: List[str]) -> Optional[str]:
        if not items:
            return None
        return items[0]
```

## 项目结构

### 目录组织

```
my-plugin/
├── __init__.py          # 插件入口
├── plugin.yaml          # 插件配置
├── README.md           # 文档
├── CHANGELOG.md        # 更新日志
├── LICENSE            # 许可证
├── src/               # 源代码
│   ├── handlers/     # 消息处理器
│   ├── models/       # 数据模型
│   └── utils/        # 工具函数
└── tests/            # 测试文件
```

### 模块划分

```python
# handlers/message.py
from kirara.plugin import handler

class MessageHandler:
    @handler.command("help")
    async def handle_help(self, message):
        pass

# models/user.py
class User:
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name

# utils/helper.py
def format_message(template: str, **kwargs) -> str:
    return template.format(**kwargs)
```

## 错误处理

### 异常处理

```python
class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        try:
            result = await self.process_message(message)
        except ValueError as e:
            await message.reply(f"输入错误：{e}")
        except ApiError as e:
            self.logger.error(f"API 错误：{e}")
            await message.reply("服务暂时不可用")
        except Exception as e:
            self.logger.exception("未知错误")
            await message.reply("发生未知错误")
```

### 自定义异常

```python
class PluginError(Exception):
    """插件基础异常类"""
    pass

class ConfigError(PluginError):
    """配置错误"""
    pass

class ApiError(PluginError):
    """API 调用错误"""
    pass
```

## 日志记录

### 日志级别

```python
class MyPlugin(Plugin):
    def __init__(self):
        self.logger = Logger(__name__)
        
    async def process(self):
        self.logger.debug("开始处理")
        self.logger.info("处理完成")
        self.logger.warning("配置可能有问题")
        self.logger.error("处理失败")
```

### 结构化日志

```python
class MyPlugin(Plugin):
    async def log_event(self, event):
        self.logger.info("事件处理", extra={
            "event_id": event.id,
            "event_type": event.type,
            "user_id": event.user_id,
            "timestamp": event.timestamp
        })
```

## 性能优化

### 缓存使用

```python
from functools import lru_cache

class MyPlugin(Plugin):
    @lru_cache(maxsize=100)
    def get_user_info(self, user_id: str) -> dict:
        return self.api.get_user(user_id)
```

### 异步操作

```python
class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        # 并行处理多个任务
        results = await asyncio.gather(
            self.task1(message),
            self.task2(message),
            self.task3(message)
        )
```

## 测试规范

### 单元测试

```python
import pytest

def test_message_handler():
    handler = MessageHandler()
    message = create_test_message("hello")
    result = handler.process(message)
    assert result == "Hello, world!"

@pytest.mark.asyncio
async def test_async_handler():
    handler = AsyncHandler()
    result = await handler.process()
    assert result is not None
```

### 模拟测试

```python
from unittest.mock import Mock, patch

def test_api_call():
    with patch("my_plugin.api.call") as mock_call:
        mock_call.return_value = {"status": "ok"}
        result = api.process()
        assert result["status"] == "ok"
```

## 最佳实践

1. **代码质量**
   - 遵循 PEP 8
   - 添加类型注解
   - 编写文档字符串

2. **项目管理**
   - 清晰的目录结构
   - 版本控制
   - 更新日志

3. **错误处理**
   - 合理的异常层级
   - 完整的错误信息
   - 用户友好提示

4. **测试覆盖**
   - 单元测试
   - 集成测试
   - 性能测试 