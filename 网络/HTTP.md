[参考网址](https://www.jianshu.com/p/52d86558ca57)
---
### HTTP1.0和HTTP1.1的区别

- 长连接(Persistent Connection)：HTTP1.1中默认开启长连接keep-alive
- 节约带宽：HTTP1.1支持只发送header信息（不带任何body信息），如果服务器认为客户端有权限请求服务器，则返回100，客户端接收到100才开始把请求body发送到服务器；如果返回401，客户端就可以不用发送请求body了节约了带宽。（options请求方法）
- HOST域：在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname），HTTP1.0没有host域。随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都支持host域，且请求消息中如果没有host域会报告一个错误（400 Bad Request）。
- 缓存处理：1.0有If-modify-since（Last-modify）、Expire的标志，1.1增加了E-tag中的if-match和if-not-match，cache-control等。
- 错误通知的管理：HTTP1.1中新增了24个错误状态响应码

### HTTP2.0和HTTP1.1区别
- 多路复用：多路复用允许单一的 HTTP/2 连接同时发起多重的请求-响应消息。  (设置优先级)
- 二进制分帧：HTTP2.0将所有的传输信息分割为更小的信息或者帧，并对他们进行二进制编码首部压缩。
- 首部压缩：HTTP1.1请求和响应都是由状态行、请求/响应头部、消息主体三部分组成.状态行和头部却没有经过任何压缩。主体压缩。而2.0支持对header进行压缩
- 服务端推送（server push），同SPDY一样，HTTP2.0也具有server push功能。


---
- 什么是Http协议无状态协议?怎么解决Http协议无状态协议?
>无状态协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息;  
也就是说，当客户端一次HTTP请求完成以后，客户端再发送一次HTTP请求，HTTP并不知道当前客户端是一个”老用户“。  
可以使用Cookie来解决无状态的问题，Cookie就相当于一个通行证，第一次访问的时候给客户端发送一个Cookie，当客户端再次来的时候，拿着Cookie(通行证)，那么服务器就知道这个是”老用户“。

### HTTP2.0和SPDY的区别：

HTTP2.0 支持明文 HTTP 传输，而 SPDY 强制使用 HTTPS
HTTP2.0 消息头的压缩算法采用 HPACK，而非 SPDY 采用的 DEFLATE

