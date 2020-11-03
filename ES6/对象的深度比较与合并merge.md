```js
/*
 * 阿里：对象的深度比较与合并merge
 * 延展：关于数组和对象的深浅克隆！！以及插件组件封装中应该注意的事项！！
 * 
 * 深度合并 & A原始对象成员值/B新对象的成员值
 *   + A/B都是对象  把A和B对象再进行深度的比较合并
 *   + A不是对象/B不是对象  B替换A
 *   + A不是对象/B是对象  B替换A
 *   + A是对象/B不是对象 返回A的值，不进行替换
 */
function merge(obj1, obj2) {
    let isPlain1 = _.isPlainObject(obj1),
        isPlain2 = _.isPlainObject(obj2);
    if (!isPlain1) return obj2;
    if (!isPlain2) return obj1;
    [
        ...Object.getOwnPropertyNames(obj2),
        ...Object.getOwnPropertySymbols(obj2)
    ].forEach(key => {
        obj1[key] = merge(obj1[key], obj2[key]);
    });
    return obj1;
}

// 演练
let defaults = {
    url: '',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    params: null,
    cache: {}
};
let options = {
    url: '/api/list',
    headers: {
        'x-token': 'xxx'
    },
    params: {
        lx: 0,
        from: 'weixin'
    },
    cache: 10
};
console.log(merge(defaults, options));

/* let obj = Object.assign(defaults, options);
// console.log(obj === defaults); //=>true
// console.log(defaults); //->浅比较下的浅合并 */
```