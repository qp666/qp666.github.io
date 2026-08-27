---
title: 微信公众号-scanqrcodefail-the-permission-value-is-offline-verifying
date: 2021-11-03
author: 前端卿年
tag:
  - 前端
source: https://juejin.cn/post/7026164263572111396
---

微信调用扫码报scanqrcodefail-the-permission-value-is-offline-verifying

首先微信公众号配置什么接口安全域名啊,白名单啊,都没用.我都试过了

解决办法:

地址栏问题:push的跳转不能被写入ios微信浏览器的地址栏

处理:push跳转改为window.loaction.href跳转 ;window.loaction.href跳转才能改变地址栏的变化，才能签名成功

另一种情况,我看其他帖子上说的:
