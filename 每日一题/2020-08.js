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