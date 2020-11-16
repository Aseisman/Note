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

//原型链继承：子构造的prototype指向父的实例对象。
// 缺点是创建子类时不能向父类传参，并且父类原型上的所有引用类型可应用到所有实例对象上。
function Father(name, age) {
  this.name = name;
  this.age = age;
}
Father.prototype.getName = function () {
  return this.name;
};
function Child(skill) {
  this.skill = skill;
}
Child.prototype = new Father("zhangsan", 20);
var child = new Child("dance");
console.log(Child.prototype.constructor);
console.log(child.getName());

//构造函数继承：子类中使用对父构造函数使用call方法来调用，并且修改this指针，
//优点：避免了引用类型的属性被所有实例共享可传参，
//缺点：每次创建实例时都要创建一遍方法，

function Father(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    return this.name;
  };
  this.getAge = function () {
    return this.age;
  };
}
function Child(name, age, skill) {
  Father.call(this, name, age);
  this.skill = skill;
}
var child = new Child("zhangsan", 20, "dance");
console.log(child.getName());

//组合继承：通过结合了原型链继承和构造函数继承。

function Father(name, age) {
  this.name = name;
  this.age = age;
}
Father.prototype.money = function () {
  console.log("100000");
};
function Child(name, age, skill) {
  Father.call(this, name, age);
  this.skill = skill;
}
Child.prototype = new Father();
Child.prototype.constructor = Child;
Child.prototype.exam = function () {
  console.log("i want to have an exam");
};
var child = new Child("zhangsan", 20, "dance");
console.log(child.money());

// 原型式继承：将以参数形式传入的对象作为创建对象的原型。
function creatObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
var person = { name: "zhangsan", age: 20 };
var person1 = creatObj(person);
var person2 = creatObj(person);
person1.name = "lisi";
console.log(person1.name, person2.name);
