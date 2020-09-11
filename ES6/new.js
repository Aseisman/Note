//一、

// 1. 创建一个空对象

// 2. 设置空对象的__proto__属性继承构造函数的prototype属性，也就是继承构造函数的原型对象上的公有属性和方法

// 3. 调用构造函数，将构造函数中的this替换为空对象的this，继承构造函数中的属性

// 4. 在函数内部返回一个新对象

function myNew(fun) {
    //传入的fun是一个构造函数
    return function() {
        let obj = {
            __proto__: fun.prototype
        }
        fun.call(obj, ...arguments)
        return obj;
    }
}

function person(name, age) {
    this.name = name;
    this.age = age;
}
let obj = myNew(person)('chen', 18)
console.log(obj)


//二、
//定义create方法
function create() {
    //定义空对象
    let obj = {};
    //取出参数列表的第一个参数（构造函数）
    let Con = [].shift.call(arguments);
    //手动指正obj的构造函数为Con（链接原型）
    obj.__proto__ = Con.prototype;
    //调用Con，改变this为obj，传入剩余参数arguments
    let result = Con.apply(obj, arguments);
    //考虑到Con函数中有return的原因，需要对result进行判断
    return result instanceof Object ? result : obj
}
let a = create(person, 'cargo', 18)
console.log(a)