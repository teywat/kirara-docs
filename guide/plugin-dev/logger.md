# 插件日志记录指南

`kirara`提供了一个标准接口，方便开发者快速使用该接口发送日志。

```python
from kirara_ai.logger import get_logger

# 传递你的插件名称，获得一个日志记录器
logger = get_logger("Your Plugin Name")

# 发送 info 级别日志
logger.info("It's a normal message")

# 发送 warning 级别日志
logger.warning("Warning, some promble accour")

# 发送 error 级别日志
logger.erro("Some error found ")
```