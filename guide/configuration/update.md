# 更新 Kirara AI

本指南将帮助你更新 Kirara AI 项目，以获取最新的功能和修复。

## 更新方法选择

在开始之前，请根据你使用的部署方法选择相应的更新方案。

::: tabs

=== Windows 快速部署包

本教程适用于使用 Windows 快速部署包的用户。

1.  **下载最新版本：**  
    前往 [Release 页面](https://github.com/lss233/kirara-ai/releases) 下载最新版本的 `quickstart-windows-kirara-ai-amd64.zip` 文件。

2.  **解压部署包：**  
    将压缩包解压到你想要安装 Kirara AI 的目录。

3.  **初始化 Kirara AI：**  
    双击运行解压后的 `初始化.cmd` 文件，按照提示操作，完成 Kirara AI 的初始化配置。

4.  **迁移数据：**  
    将旧版本 Kirara AI 的 `data` 目录中的内容，以**合并**的方式拷贝到新版本的 `data` 目录中。  
    **注意：** 建议以合并的方式拷贝，因为新版本可能加入了更多的配置。

5.  **启动 Kirara AI：**  
    双击运行新版本目录下的 `启动.cmd` 文件，启动 Kirara AI。

=== Docker Compose 部署

本教程适用于使用 Docker Compose 部署的用户。

1.  **更新 Docker 镜像：**  
    打开你的终端，进入包含 `docker-compose.yml` 文件的目录，并执行以下命令：
    ```bash
    docker-compose pull
    ```
    这个命令会拉取最新版本的 Kirara AI Docker 镜像。

2.  **重启 Docker 容器：**  
    执行以下命令重启 Kirara AI 的 Docker 容器：
    ```bash
    docker-compose up -d
    ```
    这个命令会使用最新的 Docker 镜像重新启动 Kirara AI 容器。

3.  **(如果使用了 Watchtower) 检查 Watchtower 配置：**  
    如果你使用了 Watchtower 自动更新，请确保 Watchtower 的配置正确，并且能够正常拉取和更新 Kirara AI 的 Docker 镜像。

=== 源码部署

本教程适用于使用源码部署的用户。

1.  **获取最新代码：**  
    进入 Kirara AI 的源码目录，执行以下命令获取最新代码：
    ```bash
    git pull
    ```
    如果你没有使用 Git，可以前往 [Release 页面](https://github.com/lss233/kirara-ai/releases) 下载最新版本的源码压缩包，并解压到你想要安装 Kirara AI 的目录。

2.  **安装依赖：**  
    执行以下命令安装或更新依赖：
    ```bash
    pip install -e <Kirara AI 目录>
    ```

3.  **迁移数据：**  
    将旧版本 Kirara AI 的 `data` 目录中的内容，以**合并**的方式拷贝到新版本的 `data` 目录中。

4.  **启动 Kirara AI：**  
    执行以下命令启动 Kirara AI：
    ```bash
    python -m kirara_ai
    ```

:::