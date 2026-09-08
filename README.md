# resume-site

王显朝的交互式在线简历（hacknical 风格）。

**线上地址：** https://resume.wxz.asia

## 技术栈

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts（技能雷达图）

## 本地开发

```bash
pnpm install
pnpm dev         # http://localhost:5173
pnpm build       # 输出到 dist/
pnpm preview
```

## 更新简历内容

编辑 `src/data/resume-2026.json`，保存后刷新页面即可。

> 主简历仓库 [`wxz6289/resume`](https://github.com/wxz6289/resume) 中的 `content/resume-2026.json` 为同源数据，更新后请同步到本仓库。

## 部署

### GitHub Pages（推荐，免备案）

站点托管在 GitHub 海外节点，**不受国内 ICP 备案限制**，浏览器不会提示「备案中 / 连接不安全」。

已启用 GitHub Actions 自动部署，推送 `main` 后自动发布。

**自定义域名 DNS 配置（阿里云）：**

| 记录类型 | 主机记录 | 记录值 | 说明 |
|---------|---------|--------|------|
| CNAME | resume | `wxz6289.github.io` | 指向 GitHub Pages |
| — | — | 删除原 A 记录 `8.166.121.81` | 避免仍走国内 ECS |

DNS 生效后（通常 5–30 分钟），在 GitHub 仓库 Settings → Pages → 勾选 **Enforce HTTPS**。

临时访问地址：https://wxz6289.github.io/resume-site/

### ECS 静态部署（需备案完成后使用）

```bash
bash deploy/deploy.sh          # 构建 + 上传至 8.166.121.81
```

> ⚠️ 域名解析到阿里云大陆 ECS 时，未完成 ICP 备案会触发合规拦截，浏览器提示「网站还处于域名备案中」，**与 SSL 证书无关**，HTTPS 也无法消除该提示。备案审核通过前请使用 GitHub Pages。

**SSL 证书（DNS 验证，ECS 专用）：**

1. 获取 TXT 记录值：`ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-issue.sh`
2. 在阿里云 DNS 添加 TXT：主机记录 `_acme-challenge.resume`，值为脚本输出
3. 签发证书：`ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-finish.sh`

### Vercel（备选）

```bash
vercel login
npx vercel --prod
```

## 导出 PDF

点击「下载 PDF」直接下载 `王显朝-前端开发工程师.pdf`（与 Boss 直聘投递版一致）。
