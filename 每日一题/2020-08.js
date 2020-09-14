// 8.24
// const array = new Array(5).map((item) => {
//     return item = {
//         name: '1'
//     }
// });
// // new Array(5)创建了5个undefined的空间
// //数组调用map，foreach等方法时，会为每一个有值的数组项调用回调函数callback，但是5个undefined时没有调用map的callback的。
// //所以答案为[empty*5]
// console.log(array);

//8.25
// var a = 1;
// (function a() {
//     a = 2;
//     console.log(a);
// })();
// console.log(a);
// //对于立即执行函数，不会存在变量提升与函数提升的情况！！
// //立即执行函数有自己独立的作用域。
// //函数的name是只读的。
// //function a(){} Object.getOwnPropertyDescriptor(a,'name');
// //会输出 {'value':'a','writable':false,'enumerable':false};
// //我们会发现。对于一个函数是不可写的，所以a=2这句话中的a其实是function的a，赋值失效。在严格模式下会报错。
// //所以打印的a其实是这个函数function a(){ a=2;console.log(a);}
// //第二个console.log(a)依然是1，没有变过

//8.26
// let obj = {
//     age: 18,
//     foo: function(func) {
//         func()
//         arguments[0]()
//     }
// }
// var age = 10

// function fn() {
//     console.log(this.age)
// }
// obj.foo(fn);
//func()执行的时候，即fn调用的时候，没有明先的指明调用者，默认是window，所以打印10；
//第二个打印看下面的例子再来看答案。答案：undefined
//因为arguments[0]()中的fn作用域是这个数组的作用域，然后数组没有age这个变量，所以报undefined。


// const arr = [function() { console.log(this[1]) }, 'I am cargo']
// arr[0]();
//我们arr的第一项就是一个函数，然后这个函数的this的作用域就是我们的数组，this[1]也就是 I am cargo
//所以打印出来了第二项。

//8.27
//完成curry函数

// function curry(fn) {
//     const len = fn.length; //fn的length就是形参的长度，add(1,2,3,4)长度为4
//     const args = Array.from(arguments).slice(1); //argument是curry的参数,只有一个fn也就是1。
//     return function(...rest) {
//         if (len == rest.length + args.length) {
//             return fn(...args, ...rest)
//         } else {
//             return curry.apply(null, [fn, ...args, ...rest])
//         }
//     }
// };

// function sum(a, b, c, d) {
//     return a + b + c + d;
// }
// const add = curry(sum)
// console.log(add(1, 2, 3, 4))
// console.log(add(1, 2)(3, 4))
// console.log(add(1)(2)(3, 4))
// console.log(add(1)(2)(3)(4))

// 8.28
//类数组的定义：类数组就是拥有length属性，且其他属性为非负整数的对象，且不具备数组所用于的方法。常见的arguments、NodeList都是类数组。
//类数组转为数组的方法：Array.prototype.slice.call(aa)||[...aa]
//详细看ES6->类数组

//8.29
// 标记清除
// 引用计数


// function changeInfo(o) {
//     o.name = "cargo"
//     o = new Object()
//     o.name = "C"
// }
// let info = {}
// changeInfo(info)
// console.log(info) //cargo,因为方法传入的是个地址指针，也就是说o在new的时候，将指针指向了新的object，然后info的值没有变化。

// //9.1
// function fn1() {
//     for (let i = 0; i < 4; i++) {
//         var timer = setTimeout((i) => {
//             console.log(i);
//             clearTimeout(timer)
//         }, 10, i);
//     }
// }
// fn1(); //0,1,2;
//var timer只有一个，变量提升，所以timer赋值的其实是最后一个settimeout，
//当我们执行第一个settimeout的时候，clearTimeout()把我们的timer清除掉了，所以i=3的时候没打印出来。

//9.2
// const array = [1, 2, 3, 4, 5]
// Array.prototype.multiply = function() {
//     // let temp = [...array]
//     // for (let i of array) {
//     //     temp.push(i * i)
//     // }
//     // return temp;
//     const arr = this.valueOf() //this.valueOf()是object原型的方法，数组调用时返回的是整个数组。
//     return arr.concat(arr.map(item => item * item));
//     //深拷贝的具体实现方法，，concat返回一个新的数组，不改变原来的数组。同理 slice，扩展运算符等均可。
//     //对象进行深拷贝：Object.assign();JSON.stringify()与JSON.parse() 展开运算符a={a:0} b={...a}
// }
// const result = array.multiply()
// console.log(result) //[1,2,3,4,5,1,4,9,16,25]
// console.log(array) //[1,2,3,4,5]

// //请用一行代码实现拥有一百个值的数组，且值是数组下标
// new Array(100).fill(0).map((item, idx) => idx)
//     //Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
// Array.from({ length: 100 }, (item, idx) => idx)
// Array.from("*".padEnd(100, '*'), (i, idx) => idx)
// new Array(100).fill(0).forEach((item, idx) => idx)

//9.3

// for (var i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }
// //9,9,9,9,9,9,9,9,9
// for (let i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }
//0,1,2,3,4,5,6,7,8,9

// for (var i = 0; i < 10; i++) {
//     (function(i) {
//         setTimeout(() => {
//             console.log(i)
//         })
//     })(i)
// }
// for (let i = 0; i < 10; i++) {
//     setTimeout((i) => {
//         console.log(i)
//     }, 1000, i)
// }

