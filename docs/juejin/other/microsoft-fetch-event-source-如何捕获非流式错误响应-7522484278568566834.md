---
title: "@microsoft/fetch-event-source 如何捕获非流式错误响应"
date: 2025-07-03
author: 前端卿年
tag:
  - 技术笔记
  - 问题排查
  - 前端
source: https://juejin.cn/post/7522484278568566834
---

@microsoft/fetch-event-source SSE 错误处理解决方案
------------------------------------------

### 概述

在使用 `@microsoft/fetch-event-source` 库处理 Server-Sent Events (SSE) 流式请求时，虽然正常情况下该库表现良好，但在处理服务器错误响应时存在错误捕获困难的问题。本文档提供了完整的解决方案和最佳实践。

### 技术背景

#### SSE 流式请求特点

-   **长连接通信**：建立持久化连接接收服务器推送数据
-   **实时数据流**：适用于 AI 对话、实时通知等场景
-   **错误处理复杂**：网络错误、服务器错误、数据格式错误等多种异常情况

#### 库的默认行为

```javascript
// 默认配置
{
  headers: {
    "Accept": "text/event-stream"  // 仅接受 SSE 格式
  }
}
```

### 问题分析

#### 问题 1：HTTP 500 错误无法捕获

**故障现象**：

-   服务器返回 500 状态码
-   控制台中无可预览的响应内容
-   `onerror` 回调无法获取详细错误信息
-   开发者无法判断具体错误原因

**根本原因**：

```javascript
// 问题代码
headers: {
  "Accept": "text/event-stream"  // 仅接受 SSE 格式，拒绝其他类型响应
}
```

当服务器返回错误时，通常以 `application/json` 格式返回错误详情，但由于 Accept 头限制，浏览器拒绝处理非 SSE 格式的响应。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5d6421cbb03e47faa56cef2237ae06fd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5Y2_5bm0:q75.awebp?rk3s=f64ab15b&x-expires=1788163290&x-signature=%2BwGsRrOLrMN4S%2F%2B9Wfox8xh7eoQ%3D)

#### 问题 2：响应体解析失败

**故障现象**：

-   控制台可以看到错误响应
-   代码中无法获取响应体内容
-   错误处理逻辑无法执行
-   用户体验受影响

**根本原因**： 缺少对非流式响应的处理逻辑，错误响应通常是一次性的 JSON 数据而非流式数据。

### 解决方案

#### 方案 1：Accept 头配置优化

**核心修改**：

```javascript
// ❌ 错误配置
headers: {
  "Accept": "text/event-stream"
}

// ✅ 正确配置
headers: {
  "Accept": "*/*"  // 接受所有类型的响应
}
```

**生效结果**：

-   实际请求头变为：`Accept: */*,text/event-stream`
-   兼容 SSE 流式响应和 JSON 错误响应
-   控制台可正常显示错误信息

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e41e29cfa4134a26bb1a39bacf690ac7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5Y2_5bm0:q75.awebp?rk3s=f64ab15b&x-expires=1788163290&x-signature=dCJbRZNgrZ5Ohve0Y2P1s5hh9p8%3D)

#### 方案 2：onopen 回调增强

**实现错误捕获逻辑**：

```javascript
onopen: async (response) => {
  if (response.ok) {
    const contentType = response.headers.get("content-type");

    // 检查响应类型
    if (!contentType?.startsWith("text/event-stream")) {
      try {
        // 解析非流式响应（通常是错误信息）
        const errorData = await response.json();

        // 处理业务错误
        if (errorData.code === 202 && !errorData.success) {
          console.error("业务错误:", errorData.message);
          // 执行错误处理逻辑
          handleBusinessError(errorData);
        }
      } catch (parseError) {
        console.error("响应解析失败:", parseError);
      }
    }
  } else {
    // HTTP 状态码错误处理
    console.error(`HTTP ${response.status}: ${response.statusText}`);
  }
};
```

### 完整实现方案

#### 基础配置

```javascript
import { fetchEventSource } from "@microsoft/fetch-event-source";

/**
 * 创建增强的 SSE 连接
 * @param {Object} config - 配置参数
 */
function createEnhancedSSEConnection(config) {
  const controller = new AbortController();

  return fetchEventSource(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "*/*", // 关键配置：接受所有响应类型
      Token: config.token,
      ...config.headers,
    },
    body: JSON.stringify(config.data),
    signal: controller.signal,

    // 连接建立时的处理
    onopen: async (response) => {
      console.log("SSE连接状态:", response.status, response.statusText);

      if (response.ok) {
        const contentType = response.headers.get("content-type");

        // 判断是否为流式响应
        if (!contentType?.startsWith("text/event-stream")) {
          try {
            const responseData = await response.json();

            // 业务错误处理
            if (!responseData.success) {
              handleBusinessError(responseData);
              return;
            }

            // 非预期的非流式成功响应
            console.warn("收到非流式成功响应:", responseData);
          } catch (error) {
            console.error("非流式响应解析失败:", error);
          }
        }
      } else {
        // HTTP 错误处理
        try {
          const errorText = await response.text();
          console.error(`HTTP ${response.status}:`, errorText);
        } catch (error) {
          console.error(`HTTP ${response.status}: 无法读取错误详情`);
        }
      }
    },

    // 消息处理
    onmessage: (event) => {
      try {
        const data = JSON.parse(event.data);
        config.onMessage?.(data);
      } catch (error) {
        console.error("SSE消息解析失败:", error, "原始数据:", event.data);
      }
    },

    // 连接关闭处理
    onclose: () => {
      console.log("SSE连接已关闭");
      config.onClose?.();
    },

    // 错误处理
    onerror: (error) => {
      console.error("SSE连接错误:", error);
      config.onError?.(error);
    },
  });
}

/**
 * 业务错误处理函数
 */
function handleBusinessError(errorData) {
  const errorMap = {
    202: "认证失败，请重新登录",
    400: "请求参数错误",
    403: "权限不足",
    429: "请求过于频繁，请稍后重试",
    500: "服务器内部错误",
  };

  const message = errorMap[errorData.code] || errorData.message || "未知错误";

  console.error(`业务错误 [${errorData.code}]:`, message);

  // 根据错误类型执行相应操作
  switch (errorData.code) {
    case 202:
      // 认证失败，跳转登录
      redirectToLogin();
      break;
    case 429:
      // 频率限制，显示提示
      showRateLimitWarning();
      break;
    default:
      // 通用错误提示
      showErrorMessage(message);
  }
}
```
