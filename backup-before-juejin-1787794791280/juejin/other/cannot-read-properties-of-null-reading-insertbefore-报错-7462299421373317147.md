---
title: "Cannot read properties of null (reading ‘insertBefore‘)报错"
date: 2025-01-22
author: 前端卿年
tag:
  - 其他技术笔记
source: https://juejin.cn/post/7462299421373317147
---

现象:vue3+vite项目中报错

原因:v-自定义权限指令与v-if互相影响

解决办法:v-if换成v-show,或者自定义指令里面更换成el.style.display = "none",或者弃用自定义指令,把权限加在v-if中一并判断.

遗留问题:测试环境中报错后不阻止代码继续运行,本地环境中阻止代码继续运行.
