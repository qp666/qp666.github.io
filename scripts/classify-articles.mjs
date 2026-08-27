import fs from 'node:fs/promises'
import path from 'node:path'

const dir = path.join(process.cwd(), 'docs/juejin')
const rules = [
  ['vue', /vue|element|vant|konva/i],
  ['wechat-uniapp', /微信|小程序|uniapp|uni\.|vant/i],
  ['javascript', /javascript|js|数组|对象|防抖|赋值顺序|数字|正方形|flex|css|1px|nth-child|dom/i],
  ['engineering-tools', /cursor|powershell|pnpm|npm|git|sourcetree|postman|vscode|trae|nginx|charles/i],
  ['web-network', /浏览器|postman|session|cookie|请求|https|http|缓存|连接|性能/i],
  ['mobile', /ios|苹果|安卓|android|手机/i],
]
const names = {
  vue: 'Vue 与组件库',
  'wechat-uniapp': '微信小程序与 UniApp',
  javascript: 'JavaScript 与 CSS',
  'engineering-tools': '工程化与开发工具',
  'web-network': '网络与浏览器',
  mobile: '移动端开发',
  other: '其他技术笔记',
}
for (const key of Object.keys(names)) await fs.mkdir(path.join(dir, key), { recursive: true })
for (const file of await fs.readdir(dir)) {
  if (!file.endsWith('.md')) continue
  const full = path.join(dir, file)
  const text = await fs.readFile(full, 'utf8')
  const title = text.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || file
  const category = rules.find(([, re]) => re.test(title))?.[0] || 'other'
  await fs.rename(full, path.join(dir, category, file))
  console.log(`${names[category]}: ${title}`)
}
