import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.join(process.cwd(), 'docs/juejin')
const labels = {
  vue: ['Vue', '组件库', '前端'],
  javascript: ['JavaScript', 'CSS', '前端'],
  'web-network': ['网络', '浏览器', '前端'],
  'engineering-tools': ['工程化', '开发工具', '前端'],
  'wechat-uniapp': ['微信小程序', 'UniApp', '移动端'],
  mobile: ['移动端', '兼容性', '前端'],
  other: ['技术笔记', '问题排查', '前端'],
}
async function walk(dir) {
  for (const name of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name)
    if (name.isDirectory()) await walk(full)
    else if (name.name.endsWith('.md') && name.name !== 'index.md') {
      const category = path.basename(dir)
      const text = await fs.readFile(full, 'utf8')
      const tags = labels[category] || labels.other
      const next = text.replace(/^tag:\n(?:  - .*\n)+/m, `tag:\n${tags.map(tag => `  - ${tag}\n`).join('')}`)
      await fs.writeFile(full, next)
    }
  }
}
await walk(root)
