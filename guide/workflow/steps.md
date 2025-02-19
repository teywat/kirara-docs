# 处理步骤

工作流的处理步骤定义了如何处理消息和执行操作。每个步骤都是一个独立的处理单元，可以组合成复杂的处理流程。

## 步骤类型

### LLM 步骤

调用大语言模型处理消息。

```yaml
steps:
  - type: llm
    model: gpt-3.5-turbo
    prompt: |
      你是一个友好的助手。
      请回答用户的问题：{{message}}
    temperature: 0.7
```

#### 配置选项
- 模型选择
- 提示词模板
- 温度参数
- 最大长度
- 上下文管理

[图片：LLM 步骤配置界面]

### 条件步骤

根据条件执行不同的分支。

```yaml
steps:
  - type: condition
    if: "{{message.length > 100}}"
    then:
      - type: llm
        model: gpt-4
    else:
      - type: llm
        model: gpt-3.5-turbo
```

#### 条件类型
- 消息属性
- 变量值
- 正则匹配
- 自定义函数

[图片：条件步骤配置界面]

### 循环步骤

重复执行特定步骤。

```yaml
steps:
  - type: loop
    count: 3
    steps:
      - type: llm
        model: gpt-3.5-turbo
```

#### 循环控制
- 固定次数
- 条件循环
- 列表遍历
- 中断条件

[图片：循环步骤配置界面]

### 插件步骤

调用插件提供的功能。

```yaml
steps:
  - type: plugin
    name: image_generator
    params:
      prompt: "{{message}}"
      style: anime
```

#### 常见插件
- 图像生成
- 语音处理
- 数据存储
- API 调用

[图片：插件步骤配置界面]

### 消息步骤

发送或处理消息。

```yaml
steps:
  - type: message
    action: send
    content: "处理完成：{{result}}"
    format: markdown
```

#### 消息操作
- 发送消息
- 编辑消息
- 撤回消息
- 转发消息

[图片：消息步骤配置界面]

## 步骤组合

你可以组合多个步骤创建复杂的处理流程：

```yaml
steps:
  - type: condition
    if: "{{is_admin}}"
    then:
      - type: llm
        model: gpt-4
      - type: plugin
        name: image_generator
    else:
      - type: message
        content: "权限不足"
```

## 步骤执行

### 执行顺序
1. 按定义顺序依次执行
2. 条件步骤可能改变执行路径
3. 循环步骤会重复执行
4. 可以设置步骤间延迟

### 错误处理
1. 设置重试策略
2. 定义错误处理步骤
3. 配置超时时间
4. 记录执行日志

## 最佳实践

1. **步骤设计**
   - 保持步骤简单明确
   - 合理拆分处理逻辑
   - 避免过深的嵌套

2. **性能优化**
   - 减少不必要的步骤
   - 合理使用缓存
   - 控制循环次数

3. **错误处理**
   - 添加适当的重试
   - 优雅处理异常
   - 记录关键信息

4. **调试技巧**
   - 使用日志追踪
   - 测试各种情况
   - 模拟错误场景 