---
title: vue3使用<script setup>语法糖时 不引入defineEmits,直接使用时报错
date: 2023-02-15
author: 前端卿年
tag:
  - 前端
source: https://juejin.cn/post/7200278589873864761
---

官方文档中明确写了:
查看官方文档

但是实际项目中未引入报:error ‘defineProps’ is not defined no-undef
检查以后发现是eslint报的,需要在eslint配置的env中加入

    env: {
    'vue/setup-compiler-macros': true 
    }

结果出现了一个新的报错:结果新出现了一个报错 Environment key "vue/setup-compiler-macros" is unknown;

根据提示可知，是当前依赖包 eslint-plugin-vue 中没有 vue/setup-compiler-macros 规则，故需升级 eslint-plugin-vue，当前最新版本是 8.4.0

npm update --save-dev eslint-plugin-vue@8.4.0

安装成功

升级后发现 路由报错了error  Component name "Home" should always be multi-word  vue/multi-word-component-names

原因是eslint太高了,需要关闭命名规则校验

在根目录下找到 eslint的rules里面添加如下代码：

    "vue/multi-word-component-names":"off"

完美解决,点个赞再走吧~
