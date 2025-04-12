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

完善插件文档`readme.md`。

```markdown
# My Plugin

一个功能强大的 Kirara AI 插件。

## 功能特性

- 功能 1：...
- 功能 2：...
- 功能 3：...

## 安装方法
- 从插件市场安装。(详情请参见项目配置)
- 手动安装：
	> [!CAUTION]
	> 该方法建议只用于插件开发。
	1. 激活`kirara_ai`项目的虚拟环境。
  2. 使用`pip install example`安装对应插件。
  3. 在`kirara_ai`项目配置根目录下找到`config.toml`。
  4. 找到`plugins`项，其结构如下
  	\ ```yaml
  	plugins:
  		enable:
  		- chatgpt-mirai-qq-bot-web-search
  		- web_search
  		- chatgpt-mirai-qq-bot-onebot-adapter
 		  - im_onebot_adapters
  		market_base_url: https://kirara-plugin.app.lss233.com/api/v1
  	\ ```
  	在`enable`中按照结构添加插件名称
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
```markdown

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

1. 进入你的插件目录。

2. 创建`setup.py`文件，并按照`python`软件包发布规范编写`setup.py`。

3. 在`setup.py`中将以下部分合入代码。
  >```python
  >setup(
  >	# 其余代码
  >  entry_points={
  >    "kirara_ai.plugin": [
  >      "your plugin name": "your"
  >    ]
  >  },
  >  # 其余代码
  >)
  >```

4. 打包为`python pypi package`, 上传插件仓库

   > [!CAUTION]
   >
   > 现在的插件仓库需要先fork，然后将自己的插件目录放置在指定文件夹下。pr，等待审查通过后即可成功入住插件商店。

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