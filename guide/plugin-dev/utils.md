# 工具和辅助函数

本页面介绍 Kirara AI 提供的工具和辅助函数。

## HTTP 客户端

### 基本请求

```python
import request

# 使用post请求
respones = request.post()
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

## 媒体组件

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