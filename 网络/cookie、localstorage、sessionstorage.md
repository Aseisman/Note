相同点：  
cookie，localStorage，sessionStorage都是在客户端保存数据的，存储数据的类型：都是字符串。

---
不同点：
- 生命周期：
  - cookie：如果不设置有效期，那么就是临时存储（存储在内存中）；设置了有效期，那么cookie存储在硬盘里，有效期到了，就自动消失了。
  - localstorage：生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。
  - sessionstorage：仅在当前会话下有效。sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。
- 网络通信：
  - cookie的数据每次都会发给服务器端
  - localstorage和sessionStorage不会与服务器端通信
- 大小：
  - cookie大小限制在4KB
  - localstorage和sessionStorage在5M
- 安全：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获。
- 使用更方便：webStorage有api调用。