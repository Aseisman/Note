//let：用于定义变量；不会变量提升；有自己的块级作用域；禁止重复声明；
//const声明一个只读的常量，一旦声明，常量的值就不能改变；
//对于const定义复杂类型数据的情况：
//1、const定义的对象（数组）中，其实里面的值是可以改变的；
//2、对于const指定的a，其实是个指针，指向了对象的地址，而不是值。所以如果把a换成一个新的对象，会报错；
//3、往const中插入数据是可以的，因为对于这个对象来说，不变的只有a这个指针，而对象其实是整个都可以变的；
//4、那么我想要一个对象不可以改变怎么设置呢？Object.freeze()


const a = {
    name: '111'
}
a.name = '222';
console.log(a.name);
//1、const定义的对象中，其实里面的值是可以改变的；
//2、对于const指定的a，其实是个指针，指向了对象的地址，而不是值。所以如果把a换成一个新的对象，会报错。如下：
// a = {
//     temp: '222'
// }
//如果往const中插入数据呢？
Object.preventExtensions(a);
a.age = 18
console.log(a);
Object.seal(a);
delete a.name;
console.log(a);

//3、往const中插入数据是可以的，因为对于这个对象来说，不变的只有a这个指针，而对象其实是整个都可以变的；
//4、那么我想要一个对象不可以改变怎么设置呢？
// 考虑到，数组其实也是继承于对象，那么，根据下面三个规则
// Object.preventExtendsion(obj) 用来禁止对象可扩展其它属性
// Object.seal(obj)用来禁止对象删除其它属性和扩展其它属性
// Object.freeze(obj)用来冻结对象，就是所有的属性不能够更改和新增
const b = [1, 2, 3]
b[0] = 4
b[3] = 5
console.log(b)
Object.freeze(b)