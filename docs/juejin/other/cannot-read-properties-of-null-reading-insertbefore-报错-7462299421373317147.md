---
title: "Cannot read properties of null (reading ‘insertBefore‘)报错"
date: 2025-01-22
author: 前端卿年
tag:
  - 技术笔记
  - 问题排查
  - 前端
source: https://juejin.cn/post/7462299421373317147
---

#### 现象:vue3+vite项目中报错

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fbed7dab4d484155bca947bb1f5dc709~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5Y2_5bm0:q75.awebp?rk3s=f64ab15b&x-expires=1788318007&x-signature=2GYSKneY6MIz2FE8RnKe3TUwub4%3D)

#### 原因:v-自定义权限指令与v-if互相影响

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9d1c2622452843c187b6e8ae736cfde1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5Y2_5bm0:q75.awebp?rk3s=f64ab15b&x-expires=1788318007&x-signature=wBX%2F92epqTygdfj6OtGVZziM87A%3D)

#### 解决办法:v-if换成v-show,或者自定义指令里面更换成el.style.display = "none",或者弃用自定义指令,把权限加在v-if中一并判断.

#### 遗留问题:测试环境中报错后不阻止代码继续运行,本地环境中阻止代码继续运行.
