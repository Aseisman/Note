## web-worker: 

http://www.ruanyifeng.com/blog/2018/07/web-worker.html

就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。

### Web Worker 有以下几个使用注意点。

#### （1）同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

#### （2）DOM 限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

#### （3）通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

#### （4）脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

#### （5）文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。


## web-socket:

基于TCP的一个全双工通信协议

好处就是在于服务器可以主动发送资源给客户端，而且只需要一次连接就会是持久连接

前缀：1）ws:// 不是加密的、 (2)wss:// 是加密的


## service-worker:

实际上是浏览器和服务器之间的代理服务器，它最大的特点是在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
Service Worker的目的在于离线缓存，转发请求和网络代理。它有自己的生命周期