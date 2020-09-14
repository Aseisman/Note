// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
//隐式调用toString:  https://www.cnblogs.com/barrior/p/4598354.html

function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function() {
        return _args.reduce(function(a, b) {
            return a + b;
        });
    }
    return _adder;
}
add(1)(2)(3); // 6
add(1, 2, 3)(4) // 10
add(1)(2)(3)(4)(5) // 15
add(2, 6)(1) // 9


//二、
//1、定义一个sum；然后返回一个方法
//2、如果继续执行这个方法，那么就往sum里面添加值
//3、重写toString方法，返回sum；
function add(num) {
    var sum = num,

        tmp = function(v) {
            sum += v;
            return tmp
        };

    tmp.toString = function() {
        return sum
    };

    return tmp
}


console.log(add(10)(20)(50).toString()) //80

//三、
//1、先定义一个方法add(a,b,c,d)。再获取长度len
//2、写一个中间函数curry，然后将我们获取到的参数的arguments,由于第一次参数只有一个函数，所以我们就可以slice掉fn然后我们就定义起来一个空的数组
//3、返回一个函数，里面的参数每次调用的时候我们就数组添加我们的参数
//4、判断原函数的参数长度是不是和我们的传过来的参数一样了，一样就返回执行我们一开始的add(a,b,c,d)方法

function curry(fn) {
    const len = fn.length; //fn的length就是形参的长度，add(1,2,3,4)长度为4
    const args = Array.from(arguments).slice(1); //argument是curry的参数,只有一个fn也就是1。args现在为空
    return function(...rest) {
        if (len == rest.length + args.length) {
            return fn(...args, ...rest)
        } else {
            return curry.apply(null, [fn, ...args, ...rest])
        }
    }
};

function sum(a, b, c, d) {
    return a + b + c + d;
}
const add = curry(sum)
console.log(add(1, 2, 3, 4))
console.log(add(1, 2)(3, 4))
console.log(add(1)(2)(3, 4))
console.log(add(1)(2)(3)(4))