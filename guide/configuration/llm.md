# 连接大语言模型

Kirara AI 支持连接多种大语言模型，通过适配器机制实现与不同 API 接口的交互。本文将指导您完成模型连接的配置。

## 适配器：API 接口的翻译官
适配器是 Kirara AI 与外部 API 之间的「翻译官」，它负责：
- 理解不同 API 的请求和响应格式
- 将数据转换为 Kirara AI 能理解的统一结构
- 处理 API 特有的认证和安全机制

▸ **提示**：适配器只与 API 接口类型相关，与具体模型无关。同一个适配器可以支持多种模型，只要它们使用相同的 API 接口格式。

## 配置入口
通过 WebUI 左侧导航栏按路径操作：  
`LLM 管理 → 后端管理 → 添加适配器`


## 配置三步骤
### 一、选择适配器类型
Kirara AI 提供以下内置适配器：
- **OpenAI**：支持所有 OpenAI 格式的 API
- **Claude**：支持 Anthropic 的 Claude API
- **DeepSeek**：支持 DeepSeek API
- **Ollama**：支持本地部署的 Ollama API
- **Gemini**：支持 Google 的 Gemini API

▸ 小贴士：如果没找到你需要的 API 类型，可以到插件市场安装扩展支持。

### 二、填写 API 信息
每个适配器需要的信息略有不同，但通常包括：
- **Api Base**：API 的基础地址（如 `https://api.openai.com/v1`）
- **Api Key**：从服务商处获取的访问密钥

### 三、选择支持的模型
在配置中，您可以指定该 API 支持的模型。如果不确定支持哪些模型，可以点击"自动检测模型"按钮，系统将自动识别可用的模型。


## 内置适配器说明
| 适配器类型 | 支持的 API 格式 | 获取帮助 |
|------------|-----------------|----------|
| OpenAI     | OpenAI 格式 API | [官方文档](https://platform.openai.com/docs/api-reference) |
| Claude     | Claude API      | [官方文档](https://docs.anthropic.com/claude/reference/getting-started-with-the-api) |
| DeepSeek   | DeepSeek API    | [官方文档](https://platform.deepseek.com/docs) |
| Ollama     | Ollama API      | [官方文档](https://github.com/ollama/ollama) |
| Gemini     | Gemini API      | [官方文档](https://ai.google.dev/docs) |

## 配置示例
以下配置示例仅供参考，您可以根据实际情况调整参数。

### OpenAI 适配器
▸ 必须参数：
- `Api Base`：`https://api.openai.com/v1`
- `Api Key`：从 OpenAI 控制台获取的密钥

### Claude 适配器
▸ 必须参数：
- `Api Base`：`https://api.anthropic.com/v1`
- `Api Key`：从 Anthropic 控制台获取的密钥

▸ 注意事项：
1. 确保 API Key 有足够的权限
2. 检查 API 接口的访问限制

### DeepSeek 适配器
▸ 必须参数：
- `Api Base`：`https://api.deepseek.com/v1`
- `Api Key`：从 DeepSeek 控制台获取的密钥

▸ 小贴士：DeepSeek 的接口形式与 OpenAI 类似，只是多了一些字段。所以实际上你也可以用 OpenAI 适配器来调用 DeepSeek 的模型。

### Ollama 适配器
▸ 必须参数：
- `Api Base`：`http://localhost:11434`
- `Api Key`：通常不需要，除非配置了安全认证

▸ 注意事项：
1. 确保 Ollama 服务已启动
2. 检查本地网络连接

▸ 小贴士：Ollama 也支持 OpenAI 形式的接口，使用 OpenAI 形式的接口时，需要使用 OpenAI 适配器，Api Base 需要带上 `v1`（如 `http://localhost:11434/v1`）。

### Gemini 适配器
▸ 必须参数：
- `Api Base`：`https://generativelanguage.googleapis.com/v1`
- `Api Key`：从 Google Cloud 控制台获取的密钥

▸ 注意事项：
1. 确保 API Key 有足够的权限
2. 检查 API 接口的访问限制


## 使用第三方 API 服务
许多第三方服务支持 OpenAI 格式的 API，这意味着您可以使用 OpenAI 适配器来连接这些服务。例如，您可以使用 OpenAI 适配器来连接 DeepSeek、Gemini 等模型。

▸ 配置步骤：
1. 选择 OpenAI 适配器
2. 填写第三方服务提供的 Api Base 和 Api Key
3. 根据服务商的文档配置支持的模型


## 负载均衡
当您为一个模型添加了多个后端后，Kirara AI 会在发送请求前随机选择一个后端，以此分担压力，确保系统的稳定性和响应速度。
