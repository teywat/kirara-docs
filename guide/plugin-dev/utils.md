# 工具和辅助函数

本页面介绍 Kirara AI 提供的工具和辅助函数。

## HTTP 客户端

### 基本请求

```python
from kirara.utils.http import HttpClient

class MyPlugin(Plugin):
    def __init__(self):
        self.http = HttpClient()
        
    async def make_request(self):
        # GET 请求
        response = await self.http.get("https://api.example.com/data")
        
        # POST 请求
        data = await self.http.post("https://api.example.com/create", {
            "name": "test",
            "value": 123
        })
```

### 高级选项

```python
class MyPlugin(Plugin):
    async def advanced_request(self):
        # 设置请求头
        response = await self.http.get(
            "https://api.example.com",
            headers={
                "Authorization": "Bearer token"
            }
        )
        
        # 设置超时
        response = await self.http.post(
            "https://api.example.com",
            timeout=30
        )
        
        # 使用代理
        response = await self.http.get(
            "https://api.example.com",
            proxy="http://proxy.example.com:8080"
        )
```

## 文件操作

### 基本操作

```python
from kirara.utils.file import FileManager

class MyPlugin(Plugin):
    def __init__(self):
        self.files = FileManager()
        
    async def handle_files(self):
        # 读取文件
        content = await self.files.read("config.json")
        
        # 写入文件
        await self.files.write("data.txt", "content")
        
        # 检查文件是否存在
        exists = await self.files.exists("file.txt")
        
        # 删除文件
        await self.files.delete("temp.txt")
```

### 路径管理

```python
from kirara.utils.path import PathManager

class MyPlugin(Plugin):
    def __init__(self):
        self.paths = PathManager()
        
    def get_paths(self):
        # 获取插件目录
        plugin_dir = self.paths.plugin_dir
        
        # 获取数据目录
        data_dir = self.paths.data_dir
        
        # 获取临时目录
        temp_dir = self.paths.temp_dir
```

## 图像处理

### 基本操作

```python
from kirara.utils.image import ImageProcessor

class MyPlugin(Plugin):
    def __init__(self):
        self.image = ImageProcessor()
        
    async def process_image(self, image_path):
        # 调整大小
        resized = await self.image.resize(image_path, width=800)
        
        # 裁剪图片
        cropped = await self.image.crop(image_path, x=0, y=0, width=100, height=100)
        
        # 添加水印
        watermarked = await self.image.watermark(image_path, "watermark.png")
```

### 格式转换

```python
class MyPlugin(Plugin):
    async def convert_image(self, image_path):
        # 转换格式
        png = await self.image.convert(image_path, "png")
        
        # 压缩图片
        compressed = await self.image.compress(image_path, quality=80)
```

## 文本处理

### 字符串工具

```python
from kirara.utils.text import TextProcessor

class MyPlugin(Plugin):
    def __init__(self):
        self.text = TextProcessor()
        
    def process_text(self, text):
        # 移除 HTML 标签
        clean = self.text.remove_html(text)
        
        # 截取文本
        truncated = self.text.truncate(text, length=100)
        
        # 格式化文本
        formatted = self.text.format(text, **variables)
```

### 正则工具

```python
from kirara.utils.regex import RegexHelper

class MyPlugin(Plugin):
    def __init__(self):
        self.regex = RegexHelper()
        
    def match_text(self, text):
        # 匹配邮箱
        is_email = self.regex.is_email(text)
        
        # 匹配 URL
        is_url = self.regex.is_url(text)
        
        # 自定义匹配
        matches = self.regex.find_all(text, r"\d+")
```

## 时间工具

### 时间操作

```python
from kirara.utils.time import TimeHelper

class MyPlugin(Plugin):
    def __init__(self):
        self.time = TimeHelper()
        
    def handle_time(self):
        # 获取当前时间
        now = self.time.now()
        
        # 格式化时间
        formatted = self.time.format(now, "YYYY-MM-DD HH:mm:ss")
        
        # 计算时间差
        diff = self.time.diff(now, another_time)
```

### 定时任务

```python
from kirara.utils.scheduler import Scheduler

class MyPlugin(Plugin):
    def __init__(self):
        self.scheduler = Scheduler()
        
    async def setup_tasks(self):
        # 延迟执行
        await self.scheduler.delay(self.task, seconds=30)
        
        # 定期执行
        await self.scheduler.interval(self.task, minutes=5)
        
        # Cron 任务
        await self.scheduler.cron("0 9 * * *", self.task)
```

## 加密工具

### 哈希函数

```python
from kirara.utils.crypto import CryptoHelper

class MyPlugin(Plugin):
    def __init__(self):
        self.crypto = CryptoHelper()
        
    def hash_data(self, data):
        # MD5 哈希
        md5 = self.crypto.md5(data)
        
        # SHA256 哈希
        sha256 = self.crypto.sha256(data)
```

### 加密解密

```python
class MyPlugin(Plugin):
    async def encrypt_data(self, data):
        # AES 加密
        encrypted = await self.crypto.encrypt(data, key)
        
        # AES 解密
        decrypted = await self.crypto.decrypt(encrypted, key)
```

## 最佳实践

1. **工具选择**
   - 使用内置工具
   - 避免重复实现
   - 保持代码简洁

2. **错误处理**
   - 捕获异常
   - 提供错误信息
   - 优雅降级

3. **性能优化**
   - 缓存结果
   - 异步操作
   - 资源管理

4. **安全考虑**
   - 验证输入
   - 安全传输
   - 数据加密 