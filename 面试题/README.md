# ES6

# Vue

## 1:列表组件中写key的作用：

key的作用主要是为了高效的更新虚拟DOM

虚拟DOM的diff算法

## 2：Vue中的diff原理
  
vue的diff算法是平级比较，不考虑跨级比较的情况。内部采用深度递归的方式+双指针的方式进行比较。  

先比较是否是相同节点；  

相同节点比较属性，并复用老节点；  

比较儿子节点，考虑吧老节点和新节点儿子的情况；  

优化比较：头头，尾尾，头尾，尾头；  

比对查找进行复用。

## 3：Vue为什么需要虚拟DOM？  
虚拟DOM就是用js对象来描述真实DOM，是对真实DOM的抽象，

由于直接操作DOM性能低，js层操作效率高，可以将DOM操作转化成对象操作，

最终通过diff算法对比差异进行更新DOM。

虚拟DOM不依赖真是平台环境，从而也可以实现跨平台。  

虚拟DOM的实现就是普通对象包含tag，data，children等属性对真实节点的描述。

## 4：响应式数据

对象内部通过defineReactive方法；

使用Object.defineProperity属性进行数据劫持(只会劫持已经存在的属性)

数组则是通过重写数组方法来实现的。  

（多层对象是通过递归来实现劫持，顺带提出vue3.0是使用proxy来实现响应式数据的）

发布订阅模式

在defineReactive方法中对对象的每个属性进行定义一个dep集合，负责收集我们的订阅者

在用defineProperty进行劫持我们的对象属性的时候，通过get进行首次的往dep里面添加订阅者，每次set更新数据的时候，我们就循环dep进行订阅者的更新
  ```js
        let state = {
            count: 0
        };
        let active;
        //1、定义一个响应式数据的方法：
        function defineReactive(obj) {
            for (let key in obj) {
                let value = obj[key];
                //如果有多个watcher的话，就可以用dep去统一我们的watchers然后统一发送请求
                //每个变量都应该有个dep
                let dep = []
                    //defineProperty参数：对象，键，{get or set}
                Object.defineProperty(obj, key, {
                    get() {
                        if (active) {
                            dep.push(active);
                        }
                        return value;
                    },
                    set(newValue) {
                        value = newValue;
                        dep.forEach(watcher => watcher());
                    }
                })
            }
        }
        defineReactive(state);
        //2、数据发生变化了，通知视图
        //发布-订阅者模式：每一个数据的监听器Observer进行数据劫持，如果数据发生变化，就询问一下订阅者watcher是否需要更新数据
        //这里模拟多个订阅者watcher。
        const watcher = (fn) => {
            active = fn;
            fn();
            active = null;
        }
        watcher(() => {
            app.innerHTML = state.count;
        })
        watcher(() => {
            console.log(state.count);
        })
  ```
## 5：数组响应式数据

数组考虑到性能原因没有用defineProperty对数组的每一项进行拦截，而是选择重写数组（push，pop，splice，unshift，shift,sort,reverse）方法进行重写。

为什么调用这7个方法呢：因为这7个方法都会改变原来的数组

在vue中修改数组的索引和长度是无法控制的，

需要调用上面7种方法才会触发数组对应的watcher进行更新，

数组中如果是对象数据类型也会进行递归劫持。

```js
        let state = [1, 2, 3];
        let originalArray = Array.prototype;
        let arrayMethods = Object.create(originalArray);
        //1、定义一个响应式数组数据的方法：
        function defineReactive(obj) {
            //函数劫持
            arrayMethods.push = function(...args) {
                originalArray.push.call(this, ...args)
                render();
            }
            obj.__proto__ = arrayMethods
        }
        defineReactive(state);

        function render() {
            app.innerHTML = state;
        }
        render();
        setTimeout(() => {
            state.push(4)
        }, 2000);
```

## 6：Vue模板编译原理：

将template转换成render函数（转换的过程是用正则匹配的,render函数即为语法树），然后再继续产生虚拟节点，然后再编译为真实节点。

# React