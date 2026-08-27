---
title: uniapp中实现input的shift+enter换行,enter提交
date: 2025-07-01
author: 前端卿年
tag:
  - 前端
source: https://juejin.cn/post/7521906092495699995
---

uni-app 中实现 Shift+Enter 组合键检测

问题背景

在 uni-app 开发中，event.shiftKey 属性为 undefined，无法直接检测 Shift 键的状态，这给实现 Shift+Enter 组合键功能带来了挑战。

常见需求场景：

Enter 键：发送消息

Shift+Enter 键：换行操作

解决方案

通过状态管理的方式手动跟踪 Shift 键的按下和释放状态，在 Enter 键事件中判断组合键状态。

实现原理

状态跟踪：使用 shiftKeyDown 状态记录 Shift 键是否处于按下状态

按键监听：分别监听 keydown 和 keyup 事件

状态更新：

Shift 键按下时，设置 shiftKeyDown = true

Shift 键释放时，设置 shiftKeyDown = false

组合判断：Enter 键按下时，根据 shiftKeyDown 状态判断是否为组合键

代码实现

import { ref } from "vue";

// 记录 Shift 键是否处于按下状态
const shiftKeyDown = ref(false);

/**
 * 按键释放事件处理
 * @param event 键盘事件对象
 */
const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === "Shift") {
    shiftKeyDown.value = false;
    console.log("Shift 键释放");
  }
};

/**
 * 按键按下事件处理
 * @param event 键盘事件对象
 * @returns boolean 是否阻止默认行为
 */
const handleKeyDown = (event: KeyboardEvent) => {
  console.log("按键事件:", event.key);

  // 检测 Shift 键按下
  if (event.key === "Shift") {
    shiftKeyDown.value = true;
    console.log("Shift 键按下");
    return;
  }

  // 处理 Enter 键逻辑
  if (event.key === "Enter") {
    if (shiftKeyDown.value) {
      // Shift+Enter：换行操作
      console.log("检测到 Shift+Enter 组合键，执行换行");
      return true; // 允许默认换行行为
    } else {
      // 单独 Enter：发送消息
      console.log("检测到单独 Enter 键，发送消息");
      event.preventDefault(); // 阻止默认换行行为
      event.stopPropagation(); // 阻止事件冒泡
      sendMessage();
      return false;
    }
  }
};

/**
 * 发送消息函数
 */
const sendMessage = () => {
  // 发送消息的具体实现
  console.log("消息已发送");
};

使用示例

&#x3C;template>
  &#x3C;textarea
    v-model="messageContent"
    @keydown="handleKeyDown"
    @keyup="handleKeyUp"
    placeholder="输入消息，Enter 发送，Shift+Enter 换行"
  >&#x3C;/textarea>
&#x3C;/template>

&#x3C;script setup lang="ts">
import { ref } from "vue";

const messageContent = ref("");

// ... 上述代码实现
&#x3C;/script>

技术要点

✅ 优势

兼容性好：适用于所有 uni-app 支持的平台

响应及时：实时跟踪按键状态，无延迟

逻辑清晰：状态管理简单明了

可扩展：可轻松扩展支持其他组合键

⚠️ 注意事项

焦点丢失：当输入框失去焦点时，需要重置 shiftKeyDown 状态

页面切换：页面切换时需要清理状态，避免状态残留

事件绑定：确保 keyup 和 keydown 事件都正确绑定

🔧 进阶优化

// 页面失去焦点时重置状态
const handleBlur = () => {
  shiftKeyDown.value = false;
  console.log("输入框失去焦点，重置 Shift 状态");
};

// 页面卸载时清理状态
onUnmounted(() => {
  shiftKeyDown.value = false;
});

应用场景

聊天应用：消息输入框的发送和换行控制

代码编辑器：代码输入时的换行和执行控制

富文本编辑器：文本格式化操作

表单输入：多行文本的提交和换行管理
