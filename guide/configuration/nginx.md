# Nginx 反向代理配置

使用 Nginx 作为反向代理可以为 Kirara AI 提供更好的安全性和访问控制。本文将指导你如何配置 Nginx 来转发 Kirara AI 的不同接口。

## 为什么需要 Nginx 反向代理？

Kirara AI 提供多种接口，包括 WebUI 界面、聊天平台对接接口、HTTP API 等。使用 Nginx 可以带来以下好处：

- **安全性增强**：限制特定接口的访问来源，防止未授权访问
- **SSL 支持**：提供 HTTPS 加密访问
- **负载均衡**：可以将流量分发到多个 Kirara AI 实例

## 接口说明

在配置前，需要了解 Kirara AI 的几种接口类型：

| 接口路径前缀 | 用途 | 安全建议 |
|------------|------|--------|
| `/backend-api/` | WebUI 管理面板后端接口，**需要支持 WebSocket** | 增加访问限制，仅允许可信 IP 访问 |
| `/im/` | 供外部聊天平台访问的回调接口 | 通常不需要限制 |
| `/v1/chat/`、`/v2/chat/`、`/v2/chat/response` | HTTP API 接口 | 已内置 API Key 验证机制 |

## 基础配置

### 基本配置示例

以下是一个基本的 Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP 地址

    # 启用压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 为 WebUI 和 API 接口设置代理
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持（对 /backend-api/ 路径必须）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 高级配置

### 按需限制管理接口访问

可以限制 `/backend-api/` 接口的访问，仅允许特定 IP：

```nginx
# 限制管理接口访问
location /backend-api/ {
    # 允许本地访问
    allow 127.0.0.1;
    # 允许特定 IP 访问（替换为你的 IP）
    allow 192.168.1.100;
    # 允许特定 IP 段访问
    allow 10.0.0.0/24;
    # 拒绝其他所有访问
    deny all;

    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket 支持
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### 开放聊天平台回调接口

```nginx
# 聊天平台回调接口，通常不需要限制
location /im/ {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### HTTP API 接口

HTTP API 接口已内置 API Key 验证机制，通常不需要在 Nginx 层面添加额外的安全措施：

```nginx
# HTTP API 接口
location ~ ^/(v1|v2)/chat {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### HTTPS 配置示例

以下是一个包含 HTTPS 配置的示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 将 HTTP 请求重定向到 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # 启用压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 限制管理接口访问
    location /backend-api/ {
        # 允许特定 IP 访问
        allow 127.0.0.1;
        allow 192.168.1.100;  # 替换为你的 IP
        deny all;

        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # 聊天平台回调接口
    location /im/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # HTTP API 接口
    location ~ ^/(v1|v2)/chat {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 默认接口处理，包括 WebUI
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 故障排除

### WebUI 功能不正常

如果 WebUI 的某些功能不正常（如无法连接、长轮询失败），请检查：

1. Nginx 配置中是否包含了 WebSocket 支持：
   ```nginx
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "upgrade";
   ```

2. 是否有足够的连接超时时间：
   ```nginx
   proxy_read_timeout 300s;
   proxy_connect_timeout 75s;
   ```

### 外部平台无法回调

如果设置了 Nginx 但外部平台（如微信、QQ）无法成功回调到 `/im/` 接口：

1. 检查域名或 IP 是否正确解析
2. 检查防火墙是否开放了 80/443 端口
3. 使用 `curl` 命令测试回调地址是否可访问
4. 检查 Nginx 日志中是否有相关错误信息 