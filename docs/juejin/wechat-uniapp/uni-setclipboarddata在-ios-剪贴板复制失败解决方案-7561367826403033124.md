---
title: "uni.setClipboardData在 iOS 剪贴板复制失败解决方案"
date: 2025-10-16
author: 前端卿年
tag:
  - 微信小程序
  - UniApp
  - 移动端
source: https://juejin.cn/post/7561367826403033124
---

uni.setClipboardData在 iOS 剪贴板复制失败解决方案
-------------------------------------

### 问题描述

在 UniApp 中使用 `uni.setClipboardData` 进行剪贴板复制时，Chrome 等桌面浏览器运行正常，但在 iOS 设备的微信浏览器和 Safari 浏览器中会出现复制失败的情况。

### 问题原因

1.  **浏览器安全策略**：现代浏览器要求剪贴板操作必须在用户手势（如点击）的同步上下文中执行
2.  **异步操作丢失上下文**：当复制操作前有异步调用（如 `await getShortLink()`）时，会丢失用户手势上下文
3.  **iOS 限制更严格**：iOS Safari 对剪贴板 API 的安全限制比其他平台更严格

### 解决方案：简单延迟方案

**`适用于简单场景，通过 setTimeout 延迟执行来解决时序问题：`**

```javascript
const handleCopyData = async () => {
  const copyData = await getCopyData();
  
  // 延迟 100ms 执行，解决复制失败问题
  setTimeout(() => {
    uni.setClipboardData({
      data: `要复制的文本:${copyData}`,
      success: () => {
        uni.showToast({ title: "复制成功", icon: "success" });
      },
      fail: () => {
        uni.showToast({ title: "复制失败", icon: "none" });
      },
    });
  }, 100);
};
```
