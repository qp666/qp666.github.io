---
title: "微信小程序 wx.request enableChunked 模式下 timeout 失效问题"
date: 2025-09-12
author: 前端卿年
tag:
  - 微信小程序与 UniApp
source: https://juejin.cn/post/7548717557530591272
---

🐞 微信小程序 wx.request enableChunked 模式下 timeout 失效问题

问题描述

现象： 在微信小程序中使用 wx.request 开启 enableChunked: true 后，timeout 参数设置失效，无法按预期时间触发超时机制。

影响： 导致长时间请求无法正常超时，可能造成用户体验问题和资源占用。

🔍 测试环境与结果

测试配置

wx.request({
  url: "https://example.com/api",
  method: "POST",
  timeout: 1000 * 60 * 10, // 设置10分钟超时
  header: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-DashScope-SSE": "enable",
  },
  data: {},
  enableChunked: true, // 开启分块传输
  success: (res) => {
    console.log("success", res);
  },
  fail: (err) => {
    console.error("API request failed:", err);
  },
});

测试结果

平台环境版本timeout 设置实际效果微信开发者工具Stable 1.06.2503300任意值❌ 无效微信 iOS8.0.61任意值❌ 无效微信安卓8.0.61> 60000ms✅ 生效微信安卓8.0.61&#x3C; 60000ms❌ 无效Windows 微信4.0.6.21任意值❌ 无效
🔍 问题根因分析

1. enableChunked 与 timeout 机制冲突

enableChunked: true 启用分块传输编码（Transfer-Encoding: chunked）

分块传输模式下，微信客户端的超时机制实现存在缺陷

不同平台的微信客户端对此问题的处理方式不一致

2. 平台差异性问题

安卓微信：存在60秒的硬编码阈值，超过60秒的timeout设置才会生效

iOS微信/开发者工具/Windows微信：完全忽略timeout参数

可能与底层网络库的实现差异有关

3. SSE 流式传输特性

使用了 X-DashScope-SSE: enable 头部，表明这是服务器发送事件(SSE)场景

SSE 本身就是长连接流式传输，与分块传输结合使用时更容易触发此问题

⚠️ 注意事项

此问题为微信客户端的已知缺陷，建议关注微信官方更新

测试时需要在真机环境验证，开发者工具的表现可能与真机不一致
