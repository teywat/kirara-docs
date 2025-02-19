# 消息处理

本页面介绍如何在插件中处理和响应消息。

## 消息类型

### 文本消息

最基本的消息类型。

```python
from kirara.message import Message, MessageType

class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        if message.type == MessageType.TEXT:
            content = message.content
            await message.reply(f"收到文本：{content}")
```

### 图片消息

处理图片消息。

```python
from kirara.message import Image

class MyPlugin(Plugin):
    async def handle_image(self, message: Message):
        if message.type == MessageType.IMAGE:
            image: Image = message.image
            url = image.url
            size = image.size
            await message.reply(f"收到图片：{url}")
```

### 语音消息

处理语音消息。

```python
from kirara.message import Voice

class MyPlugin(Plugin):
    async def handle_voice(self, message: Message):
        if message.type == MessageType.VOICE:
            voice: Voice = message.voice
            duration = voice.duration
            format = voice.format
```

## 消息处理器

### 命令处理

处理特定命令。

```python
from kirara.plugin import handler

class MessageHandler:
    @handler.command("help")
    async def handle_help(self, message: Message):
        """处理 /help 命令"""
        await message.reply("可用命令：...")
        
    @handler.command("echo", args=["text"])
    async def handle_echo(self, message: Message, text: str):
        """处理 /echo 命令"""
        await message.reply(text)
```

### 正则匹配

使用正则表达式匹配消息。

```python
from kirara.plugin import handler

class MessageHandler:
    @handler.regex(r"^你好[,，]?\s*(.+)$")
    async def handle_hello(self, message: Message, match):
        name = match.group(1)
        await message.reply(f"你好，{name}！")
```

### 关键词匹配

匹配消息中的关键词。

```python
from kirara.plugin import handler

class MessageHandler:
    @handler.keyword("天气")
    async def handle_weather(self, message: Message):
        await message.reply("正在查询天气...")
```

## 消息回复

### 基本回复

发送文本回复。

```python
class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        # 直接回复
        await message.reply("回复消息")
        
        # 发送到指定目标
        await message.send_to(target, "发送消息")
```

### 富文本回复

发送包含格式的消息。

```python
from kirara.message import RichMessage

class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        rich = RichMessage()
        rich.add_text("粗体", bold=True)
        rich.add_text("斜体", italic=True)
        rich.add_link("链接", "https://example.com")
        await message.reply(rich)
```

### 多媒体回复

发送图片、语音等多媒体消息。

```python
from kirara.message import Image, Voice

class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        # 发送图片
        image = Image.from_file("image.png")
        await message.reply(image)
        
        # 发送语音
        voice = Voice.from_file("audio.mp3")
        await message.reply(voice)
```

## 消息链

处理复杂的消息组合。

```python
from kirara.message import MessageChain

class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        chain = MessageChain()
        chain.add_text("Hello")
        chain.add_image("image.png")
        chain.add_text("World")
        await message.reply(chain)
```

## 消息引用

引用和回复特定消息。

```python
class MyPlugin(Plugin):
    async def handle_message(self, message: Message):
        # 引用回复
        await message.quote("这是引用回复")
        
        # 回复特定消息
        await message.reply_to(target_message, "回复特定消息")
```

## 最佳实践

1. **消息解析**
   - 验证消息类型
   - 处理特殊字符
   - 提取有效信息

2. **命令设计**
   - 清晰的命令名称
   - 合理的参数设计
   - 完整的帮助信息

3. **错误处理**
   - 验证输入
   - 处理异常
   - 友好的错误提示

4. **性能优化**
   - 避免阻塞操作
   - 缓存常用数据
   - 控制消息大小 