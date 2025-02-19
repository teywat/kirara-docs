# 变量和上下文

工作流中的变量和上下文系统允许你在不同步骤之间共享数据，存储状态，并实现更复杂的交互逻辑。

## 变量类型

### 内置变量

系统提供的预定义变量。

```yaml
steps:
  - type: message
    content: "消息来自：{{sender.name}}"
```

#### 常用内置变量
- `message`: 当前消息内容
- `sender`: 发送者信息
- `platform`: 平台信息
- `timestamp`: 时间戳
- `workflow`: 工作流信息

### 用户变量

在工作流中定义的自定义变量。

```yaml
steps:
  - type: set
    variables:
      count: 0
      name: "{{sender.name}}"
  - type: message
    content: "你好，{{name}}"
```

#### 变量作用域
- 工作流级别
- 会话级别
- 全局级别

[图片：变量管理界面]

## 上下文管理

### 会话上下文

存储多轮对话的历史记录和状态。

```yaml
steps:
  - type: context
    action: add
    content: "{{message}}"
  - type: llm
    model: gpt-3.5-turbo
    context: "{{context}}"
```

#### 上下文操作
- 添加记录
- 清除历史
- 获取历史
- 更新状态

[图片：上下文管理界面]

### 状态管理

管理工作流的状态和进度。

```yaml
steps:
  - type: state
    action: set
    key: current_step
    value: 1
  - type: condition
    if: "{{state.current_step == 1}}"
    then:
      # 处理步骤 1
```

#### 状态类型
- 进度状态
- 配置状态
- 临时状态
- 持久状态

[图片：状态管理界面]

## 数据存储

### 临时存储

存储临时数据，会话结束后自动清除。

```yaml
steps:
  - type: storage
    action: set
    scope: temporary
    key: temp_data
    value: "{{result}}"
```

### 持久存储

长期存储数据，可跨会话使用。

```yaml
steps:
  - type: storage
    action: set
    scope: persistent
    key: user_preference
    value: "{{preference}}"
```

## 变量操作

### 基本操作

```yaml
steps:
  - type: set
    variables:
      # 赋值
      count: 0
      # 计算
      total: "{{count + 1}}"
      # 字符串操作
      name: "{{user.name | uppercase}}"
```

### 条件判断

```yaml
steps:
  - type: condition
    if: "{{count > 0 && name != ''}}"
    then:
      # 条件成立时的步骤
```

### 循环遍历

```yaml
steps:
  - type: loop
    items: "{{list}}"
    var: item
    steps:
      - type: message
        content: "当前项：{{item}}"
```

## 最佳实践

1. **变量命名**
   - 使用清晰的命名
   - 遵循命名规范
   - 添加必要注释

2. **作用域控制**
   - 合理使用作用域
   - 及时清理无用数据
   - 避免作用域污染

3. **上下文管理**
   - 控制上下文大小
   - 定期清理历史
   - 处理超时情况

4. **性能优化**
   - 减少不必要的存储
   - 使用合适的存储类型
   - 及时释放资源

5. **安全考虑**
   - 验证输入数据
   - 加密敏感信息
   - 控制访问权限 