CacheStorage和Cache，是两个与缓存有关的接口，用于管理当前网页/Web App的缓存；在使用Service Worker时基本都会用到。

它们跟数据库有点类似，我们可以用mongodb来打个比喻：

CacheStorage管理着所有的Cache，是整个缓存api的入口，类似mongo
Cache是单个缓存库，通常一个app会有一个，类似mongo里的每个db

无论在ServiceWorker域或window域下，你都可以用caches来访问全局的CacheStorage。



### cacheStorage
.delete()，删除某个Cache
.open()，打开某个Cache（打开后才能修改Cache），若没有则新建一个
.keys()，得到所有Cache的名称
.has()，判断某个Cache是否存在
上面所有方法，都返回Promise。

### cache
Cache是一个类Map的数据结构对象。

.match(requestUrl, options)，返回Promise，能得到requestUrl对应的response
.put(requestUrl, response)，将requestUrl及其response保存在Cache里
.delete(requestUrl)，从Cache里删除requestUrl及其response
keys()，返回所有存在Cache的requestUrl
