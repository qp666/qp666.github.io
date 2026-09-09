# 卿鹏 · 在线简历

程序员的交互式简历，覆盖经历、项目、技能雷达图与联系方式。

线上访问：[qp666.github.io](https://qp666.github.io)

## 技术栈

Vite · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Recharts

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm lint     # TypeScript 检查
pnpm build    # 输出到 dist/
pnpm preview
```

简历正文在 `src/data/resume-2026.json`，改完刷新即可。PDF 文件放在 `public/`，站点内「下载 PDF」会下载 `卿鹏-前端开发工程师.pdf`。

## 部署

`git push` 前会自动跑 `pnpm lint`，检查不通过不会推上去。推送 `main` 后，GitHub Actions 会再跑 lint + build 并发布到 GitHub Pages。

备选：`npx vercel --prod`
