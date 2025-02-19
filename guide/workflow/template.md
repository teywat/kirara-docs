# 模板语法

模板语法允许你在工作流中动态生成内容，访问变量，并进行简单的逻辑处理。

## 基本语法

### 变量插值

使用双大括号访问变量。

```yaml
steps:
  - type: message
    content: "你好，{{sender.name}}！"
```

### 表达式

支持在双大括号中使用表达式。

```yaml
steps:
  - type: message
    content: "计算结果：{{1 + 2 * 3}}"
```

## 过滤器

### 内置过滤器

使用管道符号 `|` 应用过滤器。

```yaml
steps:
  - type: message
    content: |
      大写：{{message | uppercase}}
      小写：{{message | lowercase}}
      首字母大写：{{message | capitalize}}
```

#### 常用过滤器
- `uppercase`: 转换为大写
- `lowercase`: 转换为小写
- `capitalize`: 首字母大写
- `trim`: 去除首尾空格
- `slice`: 截取字符串
- `default`: 设置默认值

### 过滤器参数

部分过滤器支持参数。

```yaml
steps:
  - type: message
    content: |
      截取：{{message | slice:0:5}}
      默认值：{{undefined_var | default:'未设置'}}
```

## 条件表达式

### 三元运算符

简单的条件判断。

```yaml
steps:
  - type: message
    content: "状态：{{is_online ? '在线' : '离线'}}"
```

### 逻辑运算

支持基本的逻辑运算。

```yaml
steps:
  - type: message
    content: "权限：{{is_admin && is_active ? '管理员' : '普通用户'}}"
```

## 循环语法

### 数组遍历

遍历数组或列表。

```yaml
steps:
  - type: message
    content: |
      {% for item in items %}
      - {{item}}
      {% endfor %}
```

### 对象遍历

遍历对象属性。

```yaml
steps:
  - type: message
    content: |
      {% for key, value in object %}
      {{key}}: {{value}}
      {% endfor %}
```

## 函数调用

### 内置函数

使用系统提供的函数。

```yaml
steps:
  - type: message
    content: |
      时间：{{date.format(timestamp, 'YYYY-MM-DD')}}
      随机数：{{Math.random()}}
```

### 自定义函数

调用自定义的辅助函数。

```yaml
steps:
  - type: message
    content: |
      权限检查：{{utils.checkPermission(user, 'admin')}}
      格式化：{{utils.formatNumber(12345.67, 2)}}
```

## 转义语法

### 特殊字符转义

使用反斜杠转义特殊字符。

```yaml
steps:
  - type: message
    content: "变量语法示例：\\{{variable}}"
```

### 原始字符串

使用 raw 标签避免模板解析。

```yaml
steps:
  - type: message
    content: |
      {% raw %}
      这里的 {{content}} 不会被解析
      {% endraw %}
```

## 最佳实践

1. **模板设计**
   - 保持模板简洁
   - 避免复杂嵌套
   - 适当使用换行和缩进

2. **性能优化**
   - 减少重复计算
   - 缓存常用结果
   - 控制模板大小

3. **安全考虑**
   - 转义用户输入
   - 验证变量存在
   - 提供默认值

4. **维护建议**
   - 添加注释说明
   - 模块化模板
   - 定期检查和更新 