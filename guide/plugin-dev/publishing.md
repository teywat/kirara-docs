# 发布插件

本页面介绍如何发布和分享你的 Kirara AI 插件。

## 准备工作

### 版本检查

确保插件信息完整。

```yaml
# plugin.yaml
name: my-plugin
version: 1.0.0
description: 一个示例插件
author: Your Name
homepage: https://github.com/username/my-plugin
license: MIT

requirements:
  - requests>=2.28.0
  - pillow>=9.0.0
```

### 文档准备

完善插件文档。

```markdown
# My Plugin

一个功能强大的 Kirara AI 插件。

## 功能特性

- 功能 1：...
- 功能 2：...
- 功能 3：...

## 安装方法

1. 从插件市场安装
2. 手动安装：
   ```bash
   git clone https://github.com/username/my-plugin
   cd my-plugin
   pip install -r requirements.txt
   ```

## 使用方法

- `/command1` - 功能描述
- `/command2` - 功能描述

## 配置说明

```yaml
api_key: your-api-key
max_retries: 3
```

## 更新日志

### v1.0.0

- 初始版本发布
- 实现基本功能
```

## 发布流程

### 1. 代码检查

运行代码检查和测试。

```bash
# 运行代码检查
flake8 .
mypy .

# 运行测试
pytest
```

### 2. 打包插件

准备发布包。

```bash
# 创建发布目录
mkdir dist
cp -r src/* dist/
cp plugin.yaml README.md requirements.txt dist/

# 打包
cd dist
zip -r my-plugin-1.0.0.zip *
```

### 3. 发布插件

#### 插件市场发布

1. 在 WebUI 中打开插件市场
2. 点击"发布插件"
3. 填写插件信息
4. 上传插件包

[图片：插件发布界面]

#### GitHub 发布

1. 创建 GitHub 仓库
2. 推送代码
3. 创建 Release
4. 上传插件包

## 插件维护

### 版本更新

1. 更新版本号
```yaml
# plugin.yaml
version: 1.0.1
```

2. 更新更新日志
```markdown
## 更新日志

### v1.0.1

- 修复 bug
- 改进性能
- 添加新功能
```

3. 发布新版本

### 问题跟踪

使用 GitHub Issues 跟踪问题：

1. Bug 报告模板
```markdown
## 问题描述

## 复现步骤

## 期望行为

## 实际行为

## 环境信息
```

2. 功能请求模板
```markdown
## 功能描述

## 使用场景

## 实现建议
```

## 推广策略

### 1. 文档完善

- 详细的功能说明
- 清晰的安装步骤
- 丰富的使用示例
- 常见问题解答

### 2. 示例展示

提供实际使用的示例和截图。

[图片：功能展示截图]

### 3. 社区互动

- 回应用户反馈
- 及时修复问题
- 接受功能建议
- 保持更新活跃

## 最佳实践

1. **发布准备**
   - 完整的测试
   - 详细的文档
   - 清晰的版本号

2. **质量控制**
   - 代码审查
   - 自动化测试
   - 性能测试

3. **用户支持**
   - 及时响应
   - 问题追踪
   - 版本更新

4. **持续改进**
   - 收集反馈
   - 功能优化
   - 定期更新 