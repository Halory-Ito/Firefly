---
title: Event Loop
published: 2026-08-31
description: ""
image: ""
tags: ["nodejs"]
category: "fe"
draft: false
lang: ""
slug: Event Loop
---

简单来说，知道了Event Loop，其实就是知道了代码执行的优先级：先call stack，后mircotask quene，最后work quene

- call stack中存放了同步函数，例如`console.log()`、`setTimeout()`等
- mircotask quene中存放了Promise中的`resolve()`函数
- work quene中存放了各种回调函数

以下面的代码为例：

```js
setTimeout(() => {
  console.log("timeout");
}, 10);
Promise.resolve().then(() => console.log("Promise"));

console.log("Others");
```

下面是代码的执行流程：

1. 首先`setTimeout()`函数会进入`call stack`中
2. 由于`setTimeout()`中存在回调函数，因此`() => console.log('timeout')`会进入`work quene`中
3. `Promise.resolve()`进入`call stack`中，由于`resolve()`中的函数中没有代码执行，因此会被弹出`call stack`，紧接着`then()`进入`call stack`，由于`then()`中存在`resolve`的中间处理逻辑，因此`() => console.log('Promise')`会进入`microtask quene`中
4. `console.log('Others')`是同步函数，进入`call stack`，执行后出栈
5. `call stack`栈空后，先执行`microtask quene`中的函数，里面只有`() => console.log('Promise')`
6. 最后执行`work quene`中的函数，里面只有`() => console.log('timeout')`

因此最后函数的打印顺序为：Others、Promise、timeout

最初js的代码执行逻辑还是比较复杂的，但在引入`async`和`await`之后，就可以将所有的异步函数进行同步处理，确保了代码的执行顺序和编写顺序一致

nodejs在组成上包含了v8引擎和libuv，其中v8引擎负责代码的执行，比如`call stack`和`microtask quene`中的代码，event loop也是由v8引擎提供的，而`libuv`是一个多线程模型，用于处理`work quene`中的回调函数和一些耗时耗力的操作

> 很多网站都推荐使用Chrome进行访问，其中的原因之一，就是v8引擎是浏览器内置的js引擎中性能最好的，而Chrome中使用的就是v8
