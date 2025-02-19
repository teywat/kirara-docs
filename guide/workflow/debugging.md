# 调试技巧

本页面介绍如何调试和排查工作流中的问题。

## 日志记录

### 添加日志

在关键步骤添加日志记录。

```yaml
steps:
  - type: log
    level: debug
    message: "开始处理消息：{{message}}"
  - type: llm
    model: gpt-3.5-turbo
    prompt: "{{message}}"
  - type: log
    level: info
    message: "LLM 响应：{{response}}"
```

### 日志级别

根据需要设置不同的日志级别。

- `debug`: 详细的调试信息
- `info`: 一般信息
- `warning`: 警告信息
- `error`: 错误信息

## 变量检查

### 变量打印

检查变量的值。

```yaml
steps:
  - type: log
    level: debug
    message: |
      当前变量状态：
      message: {{message}}
      sender: {{sender | json}}
      context: {{context | json}}
```

### 条件断点

在特定条件下记录信息。

```yaml
steps:
  - type: condition
    if: "{{debug_mode}}"
    then:
      - type: log
        level: debug
        message: "调试信息：{{debug_info}}"
```

## 错误处理

### 错误捕获

捕获和记录错误。

```yaml
steps:
  - type: try
    steps:
      - type: llm
        model: gpt-3.5-turbo
    catch:
      - type: log
        level: error
        message: "错误：{{error}}"
      - type: message
        content: "抱歉，处理出错了"
```

### 错误追踪

记录错误堆栈和上下文。

```yaml
steps:
  - type: error
    action: trace
    message: "发生错误"
    context:
      message: "{{message}}"
      state: "{{state}}"
      stack: "{{error.stack}}"
```

## 测试工具

### 模拟消息

模拟不同类型的消息。

```yaml
steps:
  - type: test
    action: simulate
    message:
      content: "测试消息"
      type: "text"
      sender:
        id: "test_user"
        role: "admin"
```

### 性能测试

测试工作流性能。

```yaml
steps:
  - type: test
    action: benchmark
    iterations: 100
    workflow: "target_workflow"
```

## 调试模式

### 启用调试

开启调试模式。

```yaml
settings:
  debug:
    enabled: true
    verbose: true
    save_context: true
```

### 调试选项

- 保存上下文
- 详细日志
- 性能分析
- 变量跟踪

[图片：调试模式设置界面]

## 常见问题

### 1. 变量未定义

```yaml
# 问题
steps:
  - type: message
    content: "{{undefined_var}}"

# 解决
steps:
  - type: condition
    if: "{{undefined_var != null}}"
    then:
      - type: message
        content: "{{undefined_var}}"
    else:
      - type: log
        level: warning
        message: "变量未定义：undefined_var"
```

### 2. 模型响应超时

```yaml
# 问题
steps:
  - type: llm
    model: gpt-3.5-turbo
    timeout: 30

# 解决
steps:
  - type: try
    steps:
      - type: llm
        model: gpt-3.5-turbo
        timeout: 30
    catch:
      - type: workflow
        name: "fallback_response"
```

## 最佳实践

1. **日志管理**
   - 使用合适的日志级别
   - 记录关键信息
   - 避免敏感数据

2. **错误处理**
   - 优雅处理异常
   - 提供友好提示
   - 保存错误信息

3. **测试策略**
   - 编写单元测试
   - 进行压力测试
   - 模拟各种场景

4. **性能分析**
   - 监控响应时间
   - 分析资源使用
   - 优化瓶颈

5. **调试工具**
   - 使用调试模式
   - 检查变量状态
   - 追踪执行流程 