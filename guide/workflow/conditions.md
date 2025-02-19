# 条件和分支

条件和分支允许工作流根据不同的情况执行不同的处理逻辑。

## 条件类型

### 基本条件

最简单的条件判断。

```yaml
steps:
  - type: condition
    if: "{{message == '你好'}}"
    then:
      - type: message
        content: "你好！"
    else:
      - type: message
        content: "抱歉，我不明白。"
```

#### 比较运算符
- `==`: 相等
- `!=`: 不相等
- `>`: 大于
- `<`: 小于
- `>=`: 大于等于
- `<=`: 小于等于

### 复合条件

组合多个条件。

```yaml
steps:
  - type: condition
    if: "{{is_admin && message.startsWith('/') || is_whitelist}}"
    then:
      # 管理员命令处理
```

#### 逻辑运算符
- `&&`: 与
- `||`: 或
- `!`: 非

### 正则条件

使用正则表达式匹配。

```yaml
steps:
  - type: condition
    if: "{{message.match('^/[a-z]+$')}}"
    then:
      # 处理命令
```

## 分支结构

### if-then-else

基本的条件分支结构。

```yaml
steps:
  - type: condition
    if: "{{count > 0}}"
    then:
      # 条件为真时执行
    else:
      # 条件为假时执行
```

### 多重分支

处理多个条件分支。

```yaml
steps:
  - type: switch
    value: "{{status}}"
    cases:
      success:
        # 处理成功情况
      error:
        # 处理错误情况
      default:
        # 处理其他情况
```

[图片：分支配置界面]

### 嵌套分支

在分支内部再次使用条件判断。

```yaml
steps:
  - type: condition
    if: "{{is_group}}"
    then:
      - type: condition
        if: "{{is_admin}}"
        then:
          # 群管理员处理
        else:
          # 普通群成员处理
```

## 条件函数

### 字符串函数

```yaml
steps:
  - type: condition
    if: "{{message.startsWith('/')}}"  # 检查前缀
  - type: condition
    if: "{{message.includes('hello')}}"  # 包含检查
  - type: condition
    if: "{{message.length > 10}}"  # 长度检查
```

### 数值函数

```yaml
steps:
  - type: condition
    if: "{{Math.random() < 0.5}}"  # 随机条件
  - type: condition
    if: "{{Number.isInteger(value)}}"  # 整数检查
```

### 自定义函数

```yaml
steps:
  - type: condition
    if: "{{utils.checkPermission(sender, 'admin')}}"  # 权限检查
  - type: condition
    if: "{{utils.isValidTime('09:00', '18:00')}}"  # 时间检查
```

## 最佳实践

1. **条件设计**
   - 保持条件简单清晰
   - 避免过于复杂的逻辑
   - 使用有意义的变量名

2. **分支组织**
   - 控制分支嵌套深度
   - 合理使用 switch 语句
   - 提供默认处理分支

3. **性能优化**
   - 优先判断简单条件
   - 避免重复计算
   - 缓存常用条件结果

4. **错误处理**
   - 处理边界情况
   - 提供错误提示
   - 记录异常情况

5. **维护建议**
   - 添加注释说明
   - 定期检查条件
   - 更新过时逻辑 