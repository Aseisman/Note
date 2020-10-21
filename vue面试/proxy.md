- Proxy: 代理是一种封装，能够拦截并改变 JS 引擎的底层操作。简单的说，就是在目标对象上架设一层 “拦截”，外界对该对象的访问，都必须先通过这层拦截，提供了一种改变 JS 引擎过滤和改写的能力。
- 两个参数：target和handler
- target是目标对象
- handler包含有各个捕获器的对象，这些捕获器都是一个个的函数作为属性的对象。

陷阱函数|	被重写的行为	|默认行为
-|-|-
get	|读取一个属性的值|	Reflect.get()
set	|写入一个属性	|Reflect.set()
has	|in 运算符	|Reflect.has()
deleteProperty	|delete 运算符	|Reflect.deleteProperty()
getPrototypeOf	|Object.getPrototypeOf()	|Reflect.getPrototypeOf()
setPrototypeOf	|Object.setPrototypeOf()	|Reflect.setPrototypeOf()
isExtensible	|Object.isExtensible()	|Reflect.isExtensible()
preventExtensions	|Object.preventExtensions()	|Reflect.preventExtensions()
getOwnPropertyDescriptor	|Object.getOwnPropertyDescriptor()	|Reflect.getOwnPropertyDescriptor()
defineProperty|	Object.defineProperty()|	Reflect.defineProperty
ownKeys	|Object.keys、Object.getOwnPropertyNames() 与 Object.getOwnPropertySymbols()	|Reflect.ownKeys()
apply	|调用一个函数	|Reflect.apply()
construct	|使用 new 调用一个函数	|Reflect.construct()

---



```js
var arr = [1, 2, 3, 4];
// var a = { f: 123 };
var pro = new Proxy(arr, {
        get: function(obj, prop) {
            console.log("get到此一游");
            console.log(obj, prop);
            return obj[prop];
        },
        set: function(obj, prop, value) {
            console.log("set");
            obj[prop] = value;
            return true;
        }
    })
    // console.log(pro.f);
    // console.log(a.f);
    // a.f = 222;
console.log(pro[0]);
pro[1] = 4;
```