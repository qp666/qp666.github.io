---
title: "微信公众号-scanqrcodefail-the-permission-value-is-offline-verifying"
date: 2021-11-03
author: 前端卿年
tag:
  - 微信小程序
  - UniApp
  - 移动端
source: https://juejin.cn/post/7026164263572111396
---

### 微信调用扫码报scanqrcodefail-the-permission-value-is-offline-verifying

首先微信公众号配置什么接口安全域名啊,白名单啊,都没用.我都试过了

解决办法:

地址栏问题:push的跳转不能被写入ios微信浏览器的地址栏

处理:push跳转改为window.loaction.href跳转 ;window.loaction.href跳转才能改变地址栏的变化，才能签名成功

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d6c3684066432e96675b5e2175e963~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=601&h=105&s=11996&e=png&b=1e1e1e)

* * *

另一种情况,我看其他帖子上说的:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44fb1942265349b09e1d0213bc810d70~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1632&h=1234&s=266087&e=png&b=fefefe)
