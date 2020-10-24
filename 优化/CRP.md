https://blog.csdn.net/weixin_34184158/article/details/89078379?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.channel_param

## 现在回顾一下浏览器执行的几个步骤：

处理 HTML 标记，构建 DOM 树

处理 CSS 标记，构建 CSSOM 树

将 DOM 树和 CSSOM 树融合成渲染树

根据渲染树进行布局，计算每个节点的几何信息

在屏幕上绘制各个节点

## 阻塞渲染的CSS

```html
<link href="style.css" rel="stylesheet">
<!-- 上面默认匹配到我们引入的css，会阻塞渲染 -->

<link href="print.css" rel="stylesheet" media="print">
<!-- 这里表示只有当需要打印的时候才会阻塞我们的cssom渲染 -->

<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
<!-- 这里表示只有当最小屏幕为40em的时候才请求我们的这个css资源，才会阻塞渲染 -->
```
>「阻塞渲染」仅是指该资源是否会阻塞浏览器的首次页面渲染。无论 CSS 是否阻塞渲染，CSS 资源都会被下载，只是说非阻塞性资源的优先级比较低而已。

## 阻塞解析的JavaScript

JS可以修改页面的内容、样式以及响应用户的交互，JS在DOM、CSSOM和JS执行之间引入了很多新的依赖关系，导致浏览器在处理和渲染页面上出现大幅延迟：

当浏览器遇到`<script>`标签时，DOM构建会暂停，直到脚本执行完毕

JavaScript 执行会暂停，直到CSSOM准备就绪

默认情况下，所有 JS 均会阻塞解析器，因为浏览器不知道脚本想在页面上做什么，因此它必须假定最糟的情况并阻塞解析器。但是，如果我们能够有个信号告知浏览器，说脚本无需在文档中引用它的确切位置被执行呢？这样一来，浏览器就会继续构建DOM，并在脚本准备就绪后执行脚本。

这个信号就是async——在script标签里面添加async关键字，其有两个特性：

告诉浏览器当它碰到`<script>`标签时不用阻塞DOM构建，因此浏览器会忽略脚本请求，继续解析DOM

JS执行不依赖CSSOM：如果在CSSOM就绪之前脚本已经就绪，脚本可以立即执行

很显然，这将会显著提升性能！

---

`<script src="script.js"></script>`

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

`<script async src="script.js"></script>`

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

`<script defer src="myscript.js"></script>`

有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

https://segmentfault.com/q/1010000000640869

---


## CRP性能

关键资源：能够阻止网页首次渲染的资源

关键路径长度：往返过程的数量，或者获取所有关键资源所需的总时间

关键字节：网页首次渲染所需的总字节数，是所有关键资源的传输文件大小总和。

## 优化CRP
常规步骤：

分析、描述关键路径：关键资源数量、字节数、关键路径长度

最小化关键资源数量：删除相应资源、延迟下载、标记为异步资源等

减少关键字节数，以减少资源下载时间（往返次数）

优化剩余关键资源的加载顺序：尽可能早的下载所有关键资源，以缩短关键路径长度


## web安全漏洞