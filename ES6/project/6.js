/*
 * 美团：数组/对象遍历方式的深入研究（含内置方法重写及iterator） 
 *  「常规遍历方式」
 *      + for循环
 *      + for in循环
 *      + while循环
 *      + for of循环
 *      + ...
 *  「函数式编程」
 *      + forEach
 *      + map
 *      + reduce
 *      + Object.keys
 *      + ...
 */
// for of 循环只能遍历具备iterator规范的：Symbol.iterator
//   + 数组
//   + 部分类数组：arguments/NodeList/HTMLCollection
//   + Set/Map
//   + String
//   + ...
// 普通对象是不具备的,默认对象是能基于for of循环处理的

let arr = [10, 20, 30, 40];
/* for (let item of arr) {
    console.log(item);
} */

let obj = {
    0: 10,
    1: 20,
    2: 30,
    3: 40,
    length: 4,
    // [Symbol.iterator]: Array.prototype[Symbol.iterator]
    [Symbol.iterator]: function () {
        let self = this,
            index = 0;
        return {
            next() {
                if (index > self.length - 1) {
                    return {
                        value: undefined,
                        done: true
                    };
                }
                return {
                    value: self[index++],
                    done: false
                };
            }
        };
    }
};
for (let item of obj) {
    console.log(item);
}