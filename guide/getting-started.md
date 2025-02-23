# 快速开始

本指南将帮助你快速部署和配置 Kirara AI，让你的 AI 助手开始工作。

## 部署方法选择

在开始之前，我们先来了解一下不同的部署方法，以便你选择最适合自己的一种：

*   **Windows 快速部署包：**  
    **优点：** 步骤最少，操作简单，无需配置环境，适合 Windows 新手用户。  
    **建议：** 如果你是 Windows 新手，或者希望快速体验 Kirara AI，建议选择此方法。

*   **Docker Compose 部署：**  
    **优点：** 部署简单，易于管理，支持自动更新，跨平台兼容性好，适合 Linux 用户。  
    **建议：** 如果你是 Linux 用户，或者希望方便地管理和更新 Kirara AI，建议选择此方法。

*   **源码部署：**  
    **优点：** 适合不喜欢使用 Docker 的用户，或者想要在项目基础上进行二次开发的用户。  
    **建议：** 使用此方法的用户需要有一定的 Python 基础，希望你知道自己在做什么。

选择好部署方法后，就可以开始啦！

::: tabs

=== Windows 快速部署包

本教程适用于 Windows 平台。

1.  **下载部署包：**  
    首先，前往 [Release 页面](https://github.com/lss233/chatgpt-mirai-qq-bot/releases) 下载最新版本的 `quickstart-windows-kirara-ai-amd64.zip` 文件。  
    下载完成后，将压缩包解压到你想要安装 Kirara AI 的目录。

2.  **启动 Kirara AI：**  
    进入解压后的目录，双击 `启动.cmd` 文件，就可以启动 Kirara AI 啦！

3.  **访问 WebUI：**  
    当你看见 `WebUI 地址：http://127.0.0.1:8080` 字样时，说明你的 Kirara AI 已经成功启动了！  
    现在，打开你的浏览器，访问 `http://127.0.0.1:8080` (如果修改了端口，请使用你修改后的端口)，即可进入 WebUI 界面。

4.  **下一步：**  
    恭喜你，已经成功启动 Kirara AI！  
    接下来，你可以开始配置消息平台和大语言模型了，让你的 AI 助手真正开始工作！

=== Docker Compose 部署

本教程适用于希望使用 Docker 部署的用户。

1.  **安装 Docker：**  
    在开始之前，请确保你已经安装了 Docker 和 Docker Compose。  
    如果还没有安装，请参考 Docker 官方文档进行安装。

2.  **创建 `docker-compose.yml` 文件：**  
    在你的项目目录下，创建一个名为 `docker-compose.yml` 的文件，并将以下内容复制到文件中：

    ```yaml
    version: "3.8"
    services:
      kirara-agent:
        image: lss233/kirara-agent-framework:latest
        container_name: kirara-agent
        restart: always
        volumes:
          - ./data:/app/data
        ports:
          - "8080:8080"
    ```

    这个文件描述了 Kirara AI 的 Docker 容器配置，包括使用的镜像、容器名称、重启策略、数据卷和端口映射。

3.  **启动 Docker Compose：**  
    打开你的终端，进入包含 `docker-compose.yml` 文件的目录，并执行以下命令：
    ```bash
    docker-compose up -d
    ```
    这个命令会启动 Kirara AI 的 Docker 容器。

4.  **(可选) 使用 Watchtower 自动更新：**  
    如果你希望 Kirara AI 能够自动更新，可以使用 Watchtower。  
    将以下内容添加到 `docker-compose.yml` 文件中：

    ```yaml
    version: "3.8"
    services:
      kirara-agent:
        image: lss233/kirara-agent-framework:latest
        container_name: kirara-agent
        restart: always
        volumes:
          - ./data:/app/data
        ports:
          - "8080:8080"
      watchtower:
        image: containrrr/watchtower
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
        environment:
          - WATCHTOWER_POLL_INTERVAL=300
        command: kirara-agent
    ```

    *   `WATCHTOWER_POLL_INTERVAL`  设置检查更新的间隔（秒）。

5.  **启动 WebUI：**  
    启动完成后，你的 Kirara AI 应该已经成功启动了！  
    打开浏览器，访问 `http://127.0.0.1:8080` (如果修改了端口，请使用你修改后的端口)，即可进入 WebUI 界面。

6.  **下一步：**  
    恭喜你，已经成功启动 Kirara AI！  
    接下来，你可以开始配置消息平台和大语言模型了，让你的 AI 助手真正开始工作！

=== 源码部署

本教程适用于 Windows、Linux 等平台，**推荐有一定 Python 基础的用户使用**。

**系统要求：**

-   Python 3.9 或更高版本
-   Git（可选，用于获取最新代码）
-   稳定的网络连接

1.  **获取源码：**  
    首先，你需要获取 Kirara AI 的源码。  
    你可以选择使用 Git 克隆源码，或者下载压缩包。

    *   **使用 Git:**  
        打开你的终端，执行以下命令：
        ```bash
        git clone https://github.com/lss233/chatgpt-mirai-qq-bot
        cd chatgpt-mirai-qq-bot
        ```
    *   **下载压缩包:**  
        前往 [Release 页面](https://github.com/lss233/chatgpt-mirai-qq-bot/releases) 下载最新版本的源码压缩包，并解压到你想要安装 Kirara AI 的目录。

2.  **安装依赖：**  
    进入 Kirara AI 的源码目录，执行以下命令安装依赖：
    ```bash
    pip3 install -e .
    ```
    这个命令会安装 Kirara AI 运行所需的所有 Python 依赖。

3.  **下载并解压 WebUI (必须):**  
    接下来，你需要下载并解压 WebUI。  
    前往 [chatgpt-for-bot-webui Release 页面](https://github.com/DarkSkyTeam/chatgpt-for-bot-webui/releases) 下载最新版本的 `dist.zip`，并解压到 `web` 目录。
    ```bash
    unzip dist.zip -d /tmp/web_dist
    mkdir web
    mv /tmp/web_dist/dist/* web/
    ```

4.  **启动 Kirara AI：**  
    执行以下命令启动 Kirara AI：
    ```bash
    python3 -m kirara_ai
    ```

5.  **启动 WebUI：**  
    启动完成后，你的 Kirara AI 应该已经成功启动了！  
    打开浏览器，访问 `http://127.0.0.1:8080` (如果修改了端口，请使用你修改后的端口)，即可进入 WebUI 界面。

6.  **下一步：**  
    恭喜你，已经成功启动 Kirara AI！  
    接下来，你可以开始配置消息平台和大语言模型了，让你的 AI 助手真正开始工作！

:::


## 下一步

- [配置消息平台](/guide/configuration/im)
- [配置大语言模型](/guide/configuration/llm)
- [了解工作流配置](/guide/workflow/) 
