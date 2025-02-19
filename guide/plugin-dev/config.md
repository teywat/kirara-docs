# 配置管理

本页面介绍如何在插件中管理配置。

## 配置定义

### 配置文件

在 `plugin.yaml` 中定义配置项。

```yaml
name: my-plugin
version: 1.0.0
description: 示例插件

config:
  api_key:
    type: string
    description: API 密钥
    required: true
    
  max_retries:
    type: integer
    description: 最大重试次数
    default: 3
    
  log_level:
    type: enum
    description: 日志级别
    options:
      - debug
      - info
      - warning
      - error
    default: info
```

### 配置类型

支持的配置类型：

- `string`: 字符串
- `integer`: 整数
- `float`: 浮点数
- `boolean`: 布尔值
- `enum`: 枚举值
- `array`: 数组
- `object`: 对象

## 配置访问

### 基本访问

```python
from kirara.config import Config

class MyPlugin(Plugin):
    def __init__(self):
        self.config = Config()
        
    def load_config(self):
        # 获取配置
        api_key = self.config.get("api_key")
        max_retries = self.config.get("max_retries")
        log_level = self.config.get("log_level")
```

### 类型转换

```python
class MyPlugin(Plugin):
    def load_config(self):
        # 获取特定类型
        count = self.config.get_int("count")
        enabled = self.config.get_bool("enabled")
        items = self.config.get_list("items")
```

### 默认值

```python
class MyPlugin(Plugin):
    def load_config(self):
        # 使用默认值
        timeout = self.config.get("timeout", 30)
        debug = self.config.get_bool("debug", False)
        retries = self.config.get_int("retries", 3)
```

## 配置验证

### 基本验证

```python
from kirara.config import ConfigValidator

class MyPlugin(Plugin):
    def validate_config(self):
        validator = ConfigValidator(self.config)
        
        # 验证必填项
        validator.require("api_key")
        
        # 验证类型
        validator.check_type("max_retries", int)
        
        # 验证范围
        validator.check_range("max_retries", 1, 10)
```

### 自定义验证

```python
class MyPlugin(Plugin):
    def validate_config(self):
        def validate_api_key(key):
            return key.startswith("sk-")
            
        validator = ConfigValidator(self.config)
        validator.add_validator("api_key", validate_api_key)
```

## 配置更新

### 动态更新

```python
class MyPlugin(Plugin):
    async def update_config(self):
        # 更新配置
        await self.config.set("timeout", 60)
        await self.config.set("debug", True)
        
        # 保存配置
        await self.config.save()
```

### 配置重载

```python
class MyPlugin(Plugin):
    async def reload_config(self):
        # 重新加载配置
        await self.config.reload()
        
        # 更新插件状态
        self.initialize()
```

## 配置UI

### 配置表单

定义配置界面。

```yaml
config_ui:
  api_key:
    type: password
    label: API 密钥
    placeholder: 请输入 API 密钥
    
  max_retries:
    type: number
    label: 最大重试次数
    min: 1
    max: 10
    
  log_level:
    type: select
    label: 日志级别
    options:
      - label: 调试
        value: debug
      - label: 信息
        value: info
      - label: 警告
        value: warning
      - label: 错误
        value: error
```

[图片：配置界面截图]

### 配置分组

```yaml
config_ui:
  groups:
    - name: basic
      label: 基本设置
      fields:
        - api_key
        - max_retries
        
    - name: advanced
      label: 高级设置
      fields:
        - log_level
        - debug_mode
```

## 最佳实践

1. **配置设计**
   - 合理的默认值
   - 清晰的配置项
   - 完整的说明

2. **类型安全**
   - 使用类型注解
   - 验证输入
   - 处理转换错误

3. **用户体验**
   - 友好的界面
   - 合理的分组
   - 即时的验证

4. **安全考虑**
   - 加密敏感信息
   - 控制访问权限
   - 验证配置值 