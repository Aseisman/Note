// //1、判断一个变量时数组类型
// var arr = [];
// arr instanceof Array //true
// typeof arr //object typeof是无法判断是否是数组的。

//js 实现instanceof
// instanceof是通过原型链判断的， 在A的原型链中层层查找，是否有原型等于B.prototype
//如果不是，A就继续往原型链里面找，找到顶端null。任然不等于B.prototype,返false。
// function instance(left, right) {
//     left = left.__proto__;
//     right = right.prototype;
//     while (true) {
//         console.log(left)
//         if (left == null) return false;
//         if (left === right) return true;
//         left = left.__proto__;
//     }
// }

// console.log(instance(arr, String))

//2、原型链继承!!重点
//动物
// function Animal() {
//     this.eat = function() {
//         console.log('animal eat')
//     }
// }
// //狗
// function Dog() {
//     this.bark = function() {
//         console.log('dog bark');
//     }
// }
// Dog.prototype = new Animal()
// var hashiqi = new Dog();
// hashiqi.eat();

//构造函数继承用call或apply

// var Person = function(name, age) {
//     this.name = name;
//     this.age = age;
// }
// var Student = function(name, age, grade) {
//     Student.call(Person, name, age);
//     this.grade = grade;
// }