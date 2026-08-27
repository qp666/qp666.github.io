---
title: "vue3使用<script setup>语法糖时 不引入defineEmits,直接使用时报错"
date: 2023-02-15
author: 前端卿年
tag:
  - Vue
  - 组件库
  - 前端
source: https://juejin.cn/post/7200278589873864761
---

官方文档中明确写了: [查看官方文档](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fapi%2Fsfc-script-setup.html%23defineprops-defineemits "https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits")

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/717d7dd41d9b499caac2510b28f915bc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1564&h=894&s=163341&e=png&b=fefefe)

但是实际项目中未引入报:`error ‘defineProps’ is not defined no-undef` 检查以后发现是eslint报的,需要在eslint配置的env中加入

```bash
env: {
    'vue/setup-compiler-macros': true 
    }
```

结果出现了一个新的报错:结果新出现了一个报错 `Environment key "vue/setup-compiler-macros" is unknown`;

根据提示可知，是当前依赖包 `eslint-plugin-vue` 中没有 `vue/setup-compiler-macros` 规则，故需升级 `eslint-plugin-vue`，当前最新版本是 `8.4.0`

```css
npm update --save-dev eslint-plugin-vue@8.4.0
```

安装成功

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c28f9702499c479f82a0234c02418954~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=234&h=22&s=2931&e=png&b=1e1e1e)

升级后发现 路由报错了`error Component name "Home" should always be multi-word vue/multi-word-component-names`

原因是eslint太高了,**需要关闭命名规则校验**  
在根目录下找到 eslint的rules里面添加如下代码：

```json
"vue/multi-word-component-names":"off"
```

完美解决,点个赞再走吧~
