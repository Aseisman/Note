// 1.首先为什么要深拷贝？不希望数据被修改或者只需要部分修改数据。
// 2.怎么实现深拷贝？简单需求用 JSON 反序列化，复杂需求用递归克隆。
// 3.手写深拷贝的优点？体现扎实的 JS 基础
// 4.至于缺点以及如何解决缺点稍后再回答

//一、
const B = JSON.parse(JSON.stringify(A));
//缺点：
//JSON value不支持数据类型，拷贝不了;(Date格式)
//不支持函数
//不支持undefined（支持null）
//不支持循环引用 比如:a={name:'a',slef:a}

//二、
//1.递归
// 2.对象分类型讨论
// 3.解决循环引用（环）

//怎么解决好呢：
//实现深拷贝，就是遍历对象的key,并将value赋给新的对象的key,
//如果原对象的属性值为对象，则递归调用深拷贝方法（这里指的属性值为对象指有自己属性的对象，区别于正则，Date对象等）

function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}

function deepCopy(source) {
    // 判断如果参数不是一个对象，返回改参数
    if (!isObject(source)) return source;
    // 判断参数是对象还是数组来初始化返回值
    let res = Array.isArray(source) ? [] : {};
    // 循环参数对象的key
    for (let key in source) {
        // 如果该key属于参数对象本身
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // 如果该key的value值是对象，递归调用深拷贝方法进行拷贝
            if (isObject(source[key])) {
                res[key] = deepCopy(source[key]);
            } else {
                // 如果该key的value值不是对象，则把参数对象key的value值赋给返回值的key
                res[key] = source[key];
            }
        }
    }
    // 返回返回值
    return res;
}
//上面那样子无法判断Date、正则；原因是isObject中对于Date对象和正则也会返回true
//so 改成下面的isObject
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
//接下来就差循环引用的问题了。前面的会爆。
//es6的WeakMap可以解决。
//WeakMap是以对象为键的键值对，所以我们把对象存进去判断是否有该对象，如果有的话我们就不用再进行循环了。
function deepCopy(source, hash = new WeakMap()) {
    // 判断如果参数不是一个对象，返回改参数
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source); // 如果拷贝过该对象，则直接返回该对象
    // 判断参数是对象还是数组来初始化返回值
    let res = Array.isArray(source) ? [] : {};
    hash.set(source, res); // 哈希表添加新对象
    // 循环参数对象的key
    for (let key in source) {
        // 如果该key属于参数对象本身
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            // 如果该key的value值是对象，递归调用深拷贝方法进行拷贝
            if (isObject(source[key])) {
                res[key] = deepCopy(source[key], hash);
            } else {
                // 如果该key的value值不是对象，则把参数对象key的value值赋给返回值的key
                res[key] = source[key];
            }
        }
    }
    // 返回返回值
    return res;
};
//第二种方法。。未看。
class DeepClone {
    constructor() {
        this.cacheList = [];
    }
    clone(source) {
        if (source instanceof Object) {
            const cache = this.findCache(source);
            if (cache) {
                // 如果找到缓存，直接返回
                return cache;
            } else {
                let target;
                if (source instanceof Array) {
                    target = new Array();
                } else if (source instanceof Function) {
                    target = function() {
                        return source.apply(this, arguments);
                    };
                } else if (source instanceof Date) {
                    target = new Date(source);
                } else if (source instanceof RegExp) {
                    target = new RegExp(source.source, source.flags);
                }
                // 把源对象和新对象放进缓存列表
                this.cacheList.push([source, target]);
                for (let key in source) {
                    // 不拷贝原型上的属性，太浪费内存
                    if (source.hasOwnProperty(key)) {
                        // 递归克隆
                        target[key] = this.clone(source[key]);
                    }
                }
                return target;
            }
        }
        return source;
    }

    findCache(source) {
        for (let i = 0; i < this.cacheList.length; ++i) {
            if (this.cacheList[i][0] === source) {
                // 如果有环，返回对应的新对象
                return this.cacheList[i][1];
            }
        }
        return undefined;
    }
}