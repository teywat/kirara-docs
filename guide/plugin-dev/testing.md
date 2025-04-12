# 测试和调试

本页面介绍如何测试和调试 Kirara AI 插件。

## 单元测试

### 基本测试

使用 pytest 编写测试用例。

```python
# test_plugin.py
import pytest
from my_plugin import MyPlugin

def test_plugin_init():
    plugin = MyPlugin()
    assert plugin.name == "my-plugin"
    assert plugin.version == "1.0.0"

def test_message_handler():
    plugin = MyPlugin()
    message = create_test_message("hello")
    result = plugin.process_message(message)
    assert result == "Hello, world!"
```

### 异步测试

测试异步函数。

```python
# test_async.py
import pytest

@pytest.mark.asyncio
async def test_async_handler():
    plugin = MyPlugin()
    message = create_test_message("hello")
    response = await plugin.handle_message(message)
    assert response.content == "Hello!"

@pytest.mark.asyncio
async def test_api_call():
    plugin = MyPlugin()
    result = await plugin.call_api()
    assert result["status"] == "success"
```

## 模拟测试

### 消息模拟

```python
# test_message.py
from kirara_ai.testing import MessageMock

def test_command_handler():
    message = MessageMock(
        content="/help",
        sender=UserMock(id="123", name="test_user"),
        platform="telegram"
    )
    
    plugin = MyPlugin()
    response = plugin.handle_command(message)
    assert "帮助信息" in response.content
```

### API 模拟

```python
# test_api.py
from unittest.mock import Mock, patch
# 假设你的插件中有个api类
from my_plugin import Api

def test_external_api():
    with patch("Api.call") as mock_api:
        mock_api.return_value = {"data": "test"}
        
        plugin = MyPlugin()
        result = plugin.process_api_response()
        assert result == "test"
        
# 装饰器版本
@patch(Api, "call")
def test_external_api(mock_api_call):
    # 设定调用Api.call方法时，返回的值
    mock_api_call.return_value = "hello world"
```

## 集成测试

### 环境设置

```python
# conftest.py
import pytest
from kirara.testing import TestEnvironment

@pytest.fixture
def test_env():
    env = TestEnvironment()
    env.setup()
    yield env
    env.cleanup()

@pytest.fixture
def plugin(test_env):
    plugin = MyPlugin()
    plugin.initialize()
    return plugin
```

### 功能测试

```python
# test_integration.py
def test_full_workflow(test_env, plugin):
    # 设置初始状态
    test_env.set_state("user_data", {"points": 100})
    
    # 发送消息
    message = create_test_message("/buy item")
    response = plugin.handle_message(message)
    
    # 验证结果
    assert response.content == "购买成功"
    assert test_env.get_state("user_data")["points"] == 90
```

## 性能测试

### 基准测试

```python
# test_performance.py
import pytest
from kirara.testing import benchmark

@pytest.mark.benchmark
def test_message_processing(benchmark):
    plugin = MyPlugin()
    message = create_test_message("hello")
    
    result = benchmark(plugin.process_message, message)
    assert result is not None
```

### 负载测试

```python
# test_load.py
import asyncio
from kirara.testing import LoadTest

async def test_concurrent_messages():
    load_test = LoadTest()
    
    # 模拟 100 个并发请求
    results = await load_test.run_concurrent(
        count=100,
        func=plugin.handle_message,
        message=create_test_message("test")
    )
    
    # 验证结果
    assert all(r.success for r in results)
    assert load_test.average_response_time < 0.1
```

## 调试工具

### 日志调试

```python
# debug_log.py
from kirara.testing import DebugLogger

def setup_debug():
    logger = DebugLogger()
    logger.set_level("DEBUG")
    logger.add_file_handler("debug.log")
    
    return logger

def test_with_debug():
    logger = setup_debug()
    plugin = MyPlugin()
    
    logger.debug("开始测试")
    result = plugin.process()
    logger.debug(f"结果: {result}")
```

### 状态检查

```python
# debug_state.py
from kirara.testing import StateInspector

def inspect_plugin_state():
    inspector = StateInspector()
    
    # 检查插件状态
    state = inspector.get_plugin_state()
    print("当前状态:", state)
    
    # 监控状态变化
    inspector.watch_state_changes()
```

## 测试配置

### pytest 配置

```ini
# pytest.ini
[pytest]
asyncio_mode = auto
testpaths = tests
python_files = test_*.py
markers =
    asyncio: mark test as async
    benchmark: mark test as benchmark
```

### 测试数据

```python
# test_data.py
TEST_MESSAGES = [
    {
        "content": "hello",
        "expected": "Hello, world!"
    },
    {
        "content": "/help",
        "expected": "帮助信息"
    }
]

TEST_USERS = [
    {
        "id": "user1",
        "name": "Test User 1",
        "role": "admin"
    },
    {
        "id": "user2",
        "name": "Test User 2",
        "role": "user"
    }
]
```

## 最佳实践

1. **测试覆盖**
   - 编写完整测试
   - 包含边界情况
   - 测试异常情况

2. **测试组织**
   - 清晰的测试结构
   - 合理的测试粒度
   - 可重用的测试夹具

3. **调试技巧**
   - 使用日志追踪
   - 状态检查点
   - 性能分析

4. **持续集成**
   - 自动化测试
   - 代码质量检查
   - 性能监控 