from pathlib import Path
import html
import re
import shutil

source = Path('/Users/q/Downloads/el-tree 未展开的子节点无法 取消选中bugbug现象_el-tree的setChecked(节点,false)失 - 掘金.html')
root = Path('/Users/q/office/github/qp666.github.io')
backup = root / 'backup-before-juejin-migration'
target = root / 'docs/juejin'

if not backup.exists():
    shutil.copytree(root / 'docs', backup / 'docs')

text = source.read_text(encoding='utf-8')
title = re.search(r'<meta itemprop="headline" content="([^"]+)"', text).group(1)
date = re.search(r'<meta itemprop="datePublished" content="([^"]+)"', text).group(1)[:10]
start = text.index('<div id="article-root"')
body_start = text.index('>', start) + 1
end = text.index('</div></div></article>', body_start)
body = text[body_start:end]
body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.S)
body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.S)
body = body.replace(' data-v-61fb5e44=""', '').replace(' data-v-539963b4=""', '')
# 保存页包含大量展示用 HTML，转为干净文本，避免 VitePress/Vue 解析未闭合标签。
body = re.sub(r'<br\s*/?>', '\n', body, flags=re.I)
body = re.sub(r'<[^>]+>', '', body)
body = html.unescape(body)
body = re.sub(r'\n{3,}', '\n\n', body).strip()
body = body.replace('<', '&lt;').replace('>', '&gt;')
body = body.replace('{{', '&#123;&#123;').replace('}}', '&#125;&#125;')

target.mkdir(parents=True, exist_ok=True)
slug = 'el-tree-setchecked-bug'
output = target / f'{slug}.md'
frontmatter = f'''---\ntitle: {title}\ndate: {date}\nauthor: 前端卿年\ntag:\n  - Vue\n  - Element Plus\n  - JavaScript\n---\n\n'''
output.write_text(frontmatter + body + '\n', encoding='utf-8')
print(output)
