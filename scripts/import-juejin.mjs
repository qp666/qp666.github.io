import fs from 'node:fs/promises'
import path from 'node:path'
import * as cheerio from 'cheerio'
import TurndownService from 'turndown'

const root = process.cwd()
const userId = '2277843825591400'
const docs = path.join(root, 'docs')
const backup = path.join(root, `backup-before-juejin-${Date.now()}`)
const outDir = path.join(docs, 'juejin')
const headers = { 'user-agent': 'Mozilla/5.0', 'content-type': 'application/json' }
const featuredArticles = new Map([
  ['7636667427520544820', 100],
  ['7571005216910376979', 99],
  ['7563606176223887387', 98]
])

async function json(url, options = {}) {
  const res = await fetch(url, { headers: { ...headers, ...(options.headers || {}) }, ...options })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

function slugify(title, id) {
  const slug = title.toLowerCase().replace(/[^\u4e00-\u9fff\w-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70)
  return `${slug || 'article'}-${id}`
}

const turndown = new TurndownService({ codeBlockStyle: 'fenced', bulletListMarker: '-' })
turndown.addRule('highlightedCode', {
  filter: node => node.nodeName === 'PRE',
  replacement: (content, node) => {
    const code = node.querySelector?.('code')
    const lang = code?.getAttribute('lang')
      || code?.getAttribute('class')?.match(/language-([\w-]+)/)?.[1]
      || node.querySelector?.('.code-block-extension-lang')?.textContent?.trim()
      || ''
    // 掘金代码块包含工具栏、行号和高亮 span；textContent 能还原真实代码文本。
    const source = (code?.textContent || node.textContent || '')
      .replace(/\r\n/g, '\n')
      .replace(/复制代码/g, '')
      .trim()
    return `\n\n\`\`\`${lang}\n${source}\n\`\`\`\n\n`
  }
})

async function articleHtml(id) {
  const res = await fetch(`https://juejin.cn/post/${id}`, { headers: { 'user-agent': headers['user-agent'] } })
  const text = await res.text()
  const $ = cheerio.load(text)
  const root = $('#article-root')
  if (!root.length) throw new Error('article body not found')
  return root.html() || ''
}

function convertArticle(html) {
  // html 是 article-root 的内部片段，不是完整页面，因此使用 document root。
  const $ = cheerio.load(html, null, false)
  const root = $.root()
  root.find('style,script,.code-block-extension-top-bar').remove()
  root.find('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src')
    if (src) $(el).attr('src', src)
    $(el).removeAttr('data-src')
    $(el).removeAttr('style')
  })
  root.find('a').each((_, el) => {
    $(el).attr('href', $(el).attr('href') || '')
  })
  return turndown.turndown(root.html() || '').replace(/\n{3,}/g, '\n\n').trim()
}

const articles = []
let cursor = '0'
while (true) {
  const list = await json('https://api.juejin.cn/content_api/v1/article/query_list', {
    method: 'POST', body: JSON.stringify({ cursor, sort_type: 2, user_id: userId })
  })
  articles.push(...(list.data || []).map(x => x.article_info).filter(x => x?.article_id && x.is_original !== 0))
  if (!list.has_more) break
  cursor = list.cursor
}
if (!articles.length) throw new Error('未获取到文章列表，可能触发了掘金验证')

await fs.cp(docs, backup, { recursive: true })
for (const entry of await fs.readdir(docs)) {
  // 保留站点入口、关于页、主题配置和静态资源，只清理旧文章内容。
  if (!['.vitepress', 'public', 'index.md', 'AboutMe.md', 'about.md'].includes(entry)) {
    await fs.rm(path.join(docs, entry), { recursive: true, force: true })
  }
}
await fs.rm(outDir, { recursive: true, force: true })
await fs.mkdir(outDir, { recursive: true })

let imported = 0
for (const item of articles) {
  try {
    const html = await articleHtml(item.article_id)
    const title = item.title || `掘金文章 ${item.article_id}`
    const date = new Date(Number(item.ctime) * 1000).toISOString().slice(0, 10)
    const body = convertArticle(html).replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;')
    const sticky = featuredArticles.get(item.article_id)
    const stickyMeta = sticky ? `sticky: ${sticky}\n` : ''
    const md = `---\ntitle: ${JSON.stringify(title.replaceAll('\n', ' '))}\n${stickyMeta}date: ${date}\nauthor: 前端卿年\ntag:\n  - 前端\nsource: https://juejin.cn/post/${item.article_id}\n---\n\n${body}\n`
    await fs.writeFile(path.join(outDir, `${slugify(title, item.article_id)}.md`), md)
    imported++
    console.log(`imported ${imported}/${articles.length}: ${title}`)
  } catch (error) {
    console.warn(`skip ${item.article_id}: ${error.message}`)
  }
}

if (!imported) throw new Error('没有成功导入任何文章，原 docs 未被删除；备份位于 ' + backup)
console.log(`完成：导入 ${imported} 篇，备份：${backup}`)
