# LinkSense DevOps

## 生产拓扑

| 项目       | 值                                                 |
| ---------- | -------------------------------------------------- |
| 域名       | `https://linksense.org`                            |
| 服务器     | `47.239.171.167`（SSH 别名 `c-ciss-prod-server`）  |
| 部署目录   | `/root/devops/linksense-site`                      |
| 静态产物   | `/root/devops/linksense-site/site`                 |
| 容器       | `linksense-site-web`（`nginx:1.27-alpine`）        |
| 容器监听   | `127.0.0.1:39031 -> 80`                            |
| 宿主 Nginx | `/www/server/panel/vhost/nginx/linksense.org.conf` |
| 证书目录   | `/www/server/panel/vhost/cert/linksense.org/`      |

站点是 Next.js 静态导出（`output: 'export'`）。服务器不拉代码、不构建镜像；镜像直接使用 Docker Hub 官方 `nginx:1.27-alpine`，只读挂载静态产物和 Nginx 配置。

## 发布流程

使用 Node 24.22.1 和 pnpm 10.34.6，固定生产域名为 `https://linksense.org`。

### 1. 本地构建

```sh
eval "$(fnm env --shell zsh)"
fnm use
SITE_URL=https://linksense.org pnpm build
```

### 2. 上传到临时目录

```sh
COPYFILE_DISABLE=1 tar --no-xattrs -C out -czf - . \
  | ssh c-ciss-prod-server 'set -eu; cd /root/devops/linksense-site; rm -rf site.new; mkdir site.new; tar -xzf - -C site.new; chown -R root:root site.new'
```

### 3. 切换并启动

```sh
ssh c-ciss-prod-server 'set -eu; cd /root/devops/linksense-site; docker compose stop web; rm -rf site.old; mv site site.old; mv site.new site; ./sync.sh'
```

`sync.sh` 会从 `site/_redirects` 重新生成 `nginx/redirects.conf`，然后启动并重启容器。

### 4. 验证

```sh
curl -sI https://linksense.org/ | head -1
curl -s https://linksense.org/ | grep -o 'rel="canonical"[^>]*'
curl -s -o /dev/null -w '%{http_code}\n' https://linksense.org/doc/zh-CN/
curl -sI https://linksense.org/help/x | grep -i '^location'
ssh c-ciss-prod-server 'docker inspect -f "{{.State.Health.Status}}" linksense-site-web'
```

### 5. 清理旧版本

确认容器 healthy 且页面正常后再删除：

```sh
ssh c-ciss-prod-server 'rm -rf /root/devops/linksense-site/site.old'
```

回滚：在删除 `site.old` 前，停容器，把当前 `site` 移走，把 `site.old` 换回 `site`，再执行 `./sync.sh`。

## 服务器侧文件

- `docker-compose.yml`：Nginx 服务，端口 `127.0.0.1:39031:80`，只读挂载 `site/`、`nginx/default.conf`、`nginx/redirects.conf`。
- `nginx/default.conf`：静态文件、gzip、长缓存、404、目录尾斜杠 301。
- `nginx/redirects.conf`：由 `sync.sh` 从 `site/_redirects` 生成，不要手改。
- `sync.sh`：生成重定向规则，`docker compose up -d`，再 `docker compose restart web`。

## 域名与证书

- GoDaddy DNS：`linksense.org` 和 `www.linksense.org` 的 A 记录指向 `47.239.171.167`。
- 宿主 Nginx：80 端口保留 ACME 验证目录，其余 301 到 HTTPS；443 反代 `127.0.0.1:39031`；`www` 301 到 apex。
- 证书：Let's Encrypt，由 `acme.sh` 自动续期，证书安装在 `/www/server/panel/vhost/cert/linksense.org/`，续期后自动 reload Nginx。
- 旧域名：`linksense.guygubaby.top` 通过 Cloudflare `guygubaby.top` 区域的 Redirect Rule 301 到 `https://linksense.org`，保留路径和查询参数。

## 注意

- 本项目固定使用 `127.0.0.1:39031`，不要占用或影响服务器上的其他服务。
- 不要修改其他站点 vhost 或其他项目的容器。
- 当前没有 CI/CD；发布依赖本机构建和上述手工步骤。
