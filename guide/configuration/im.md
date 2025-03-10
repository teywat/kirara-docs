# 连接聊天平台

Kirara AI 支持连接多种聊天平台，通过适配器机制实现跨平台的消息处理。本文将指导您完成平台连接的配置。

![image](/assets/images/im_manage.png)

## 适配器：平台连接的桥梁
适配器是 Kirara AI 与外部平台之间的连接桥梁，主要功能包括：
- 处理不同平台的消息协议
- 转换消息格式为统一结构
- 管理平台特有的认证机制

## 配置入口
通过 WebUI 左侧导航栏按路径操作：  
`聊天平台管理 → 选择连接方式 → 添加配置`

## 配置步骤
### 一、选择适配器类型
Kirara AI 提供以下适配器：
- **内置适配器**：HTTP API、 QQ 开放平台机器人、 Telegram 机器人、企业微信应用等主流平台
- **插件适配器**：通过插件市场扩展的平台支持

▸ 提示：若目标平台未列出，需先安装对应插件

### 二、添加配置

每个配置都需要有一个名称，名称的命名规范为：  
  - 格式：`[平台]_[用途]`（示例：`telegram_cs_bot`）
  - 字符限制：小写字母/数字/下划线
  - 全局唯一性：不可与现有配置重名

### 三、填写平台相关信息

不同的平台连接机器人的方式都不一样，下面介绍了几个内置适配器的配置填写方式。

> [!TIP] 
> 对于插件提供的适配器，可以参考插件的文档来了解如何填写配置。  


#### 内置适配器配置指南
| 平台        | 关键参数                     | 获取位置                  |
|-------------|-----------------------------|--------------------------|
| Telegram 机器人 | Bot Token                 | [@BotFather](https://core.telegram.org/bots#botfather) 创建机器人时获取 |
| HTTP API 服务      | API Key      | 自定义           |
| 企业微信应用      | CorpID + Secret + AgentID 等参数 | [企业微信管理后台](https://work.weixin.qq.com/) 应用详情页     |
| 微信公众号      |  Secret + AgentID 等参数 | [微信公众号管理后台](https://mp.weixin.qq.com/) 应用详情页     |
| QQ 开放平台机器人 | AppID + AppKey + Token 等参数 | [QQ 开放平台](https://bot.q.qq.com/) 应用详情页     |

## Telegram 机器人
**▸ 必须参数：**
- `Token`：格式为 `数字:字母组合`，从 @BotFather 获取

> [!TIP] 
> 如果机器人以普通成员身份加入群组，则需要开启 Privacy Mode 才接收普通消息。

## QQ 开放平台机器人
**▸ 必须参数：**
- `AppID`：QQ 开放平台的 AppID
- `AppKey`：QQ 开放平台的 AppKey
- `Token`：QQ 开放平台的 Token

**▸ 参数获取路径：**
1. 参考 [平台入驻文档](https://q.qq.com/wiki/#%E6%B3%A8%E5%86%8C%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0%E8%B4%A6%E5%8F%B7) 注册账号，并创建一个机器人。
2. 参考 [开发基础设置](https://q.qq.com/wiki/#_3-5-%E5%BC%80%E5%8F%91%E5%9F%BA%E7%A1%80%E8%AE%BE%E7%BD%AE)，可以获取到 `AppID`、`App Secret`、`Token` 参数，分别对应 Kirara AI 的同名配置。
3. 勾选 Sandbox，保存 Kirara AI 中的配置，如果信息填写正确，此时你可以看见 WebUI 中展示出机器人的头像和昵称。  
4. 在 QQ 开放平台中，点击「回调配置」，填写 `请求地址`，这个参数是 Kirara AI 的 公网 HTTP 地址 + 机器人回调地址，并点确定配置。
5. 在「添加事件」中，勾选所有的事件。
6. 参考 [平台入驻文档](https://q.qq.com/wiki/#_3-4-%E5%BC%80%E5%8F%91%E5%9C%BA%E6%99%AF%E9%80%89%E6%8B%A9)，完成沙箱环境的配置，即可和机器人进行对话。

> [!TIP] 
> 尽管文档中提到个人开发者暂不开放 QQ 群和单聊能力，但是在沙箱模式下你仍然可以使用这些功能和机器人进行对话。

## HTTP API 服务
通过 HTTP 协议将 Kirara AI 的能力开放给其他系统，使外部程序可以通过 API 调用获得 AI 服务。

**▸ 配置参数：**
- `API Key`：API 调用密钥，可选项。   

API Key 填写后，只有请求头携带了 `Authorization: Bearer ${API Key}` 字段的请求才会被处理。 若不填写，则所有请求都会被处理。

当任意一个 HTTP API 服务被配置后， Kirara AI 的 HTTP API 接口才会被启用。

你可以在[HTTP API 接口文档](https://github.com/lss233/kirara-ai?tab=readme-ov-file#-http-api) 查看详细的 API 接口文档。

## 企业微信应用
▸ 参数获取路径：
1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin/loginpage_wx?from=myhome)
2. 点击顶部的 「我的企业」→「企业信息」，获取 `企业ID` 参数，这里的值对应 Kirara AI 的 `企业ID`。
  ![WeCom CorpID](/assets/images/wecom_corp_id.png)
2. 从顶部导航栏进入「应用管理」→「应用」→「自建」→「创建应用」
  ![WeCom Create App](/assets/images/wecom_create_app.png)
3. 应用 Logo、名称、介绍 可随意填写，「可见范围」按照实际情况选择。
4. 在应用详情页，可以获取到 `AgentID`、`Secret` 参数，分别对应 Kirara AI 的 `应用ID`、`应用Secret`。
5. 点击下方的 「接收消息」→ 「设置API接收」 按钮，将 `URL` 设置为 Kirara AI 的 公网 HTTP 地址 + 微信端回调地址。
  `Token` 和 `EncodingAESKey` 则点击「随机获取」，然后把获取到的参数填写到 Kirara AI 的配置中。  
  此处的配置是为了让 Kirara AI 能够从微信服务器接收消息。
  ![WeCom API Settings](/assets/images/wecom_api_settings.png)
6. 接下来，先在 Kirara AI 中保存配置，然后再保存企业微信端的配置，否则会出现 「openai回调请求不通过」的错误。
7. 返回上一个页面，点击下方的 「企业可信IP」，填写 Kirara AI 的 IP 地址，点击「确定」。  
  此处的配置是为了让 Kirara AI 能够正常地回复消息。
  ![WeCom Trusted IP](/assets/images/wecom_trusted_ip.png)
8. 最后，在企业微信App中，你就可以看见新创建的应用，并发送消息了。  

▸ 常见问题
1. 「openai回调请求不通过」
   - 原因：Kirara AI 的配置未保存，或者配置出现错误。
   - 解决：检查 Kirara AI 的输出日志。
2. 可以收到消息，但是无法回复。
   - 原因：Kirara AI 的 IP 地址未添加到企业微信的「可信IP」列表中。
   - 解决：
   检查 Kirara AI 的输出日志，看是否有下面类似的日志：
   ```
   | ERROR    | Wecom-Adapter | Failed to send text message: Error code: 60020, message: not allow to access from your ip, hint: [****], from ip: *.*.*.*, more info at https://open.work.weixin.qq.com/devtool/query?e=60020
   ```
   这里 `from ip` 就是 Kirara AI 的 IP 地址，将这个 IP 地址添加到企业微信的「可信IP」列表中即可。


## 连接其他平台
若需连接未内置的平台：
1. 访问 **插件市场** 搜索目标平台适配器
2. 安装完成后，返回本页面即可在下拉菜单看到新选项
3. 根据插件文档填写配置参数
