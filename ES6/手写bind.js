// 初级：ES6 新语法 const/...
Function.prototype.bind_1 = function(asThis, ...args) {
    // 这里的 this 就是调用 bind 的函数 func
    var fn = this;
    return function(...arg2s) {
        fn.apply(asThis, [...args, ...arg2s]);
    };
};
//中级：兼容 ES5
Function.prototype.bind_ = function(obj) {
    //第0位是this，所以得从第一位开始裁剪
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    return function() {
        //二次调用我们也抓取arguments对象
        var params = Array.prototype.slice.call(arguments);
        //注意concat的顺序
        fn.apply(obj, args.concat(params));
    };
};

// 高级：支持 new，例如 new (funcA.bind(thisArg, args))
function bind_3(asThis) {
    var slice = Array.prototype.slice;
    var args1 = slice.call(arguments, 1);
    var fn = this;
    if (typeof fn !== "function") {
        throw new Error("Must accept function");
    }

    function resultFn() {
        var args2 = slice.call(arguments, 0);
        return fn.apply(
            resultFn.prototype.isPrototypeOf(this) ? this : asThis, // 用来绑定 this
            args1.concat(args2)
        );
    }
    resultFn.prototype = fn.prototype;
    return resultFn;
}

function a(a, b) {
    console.log(a + " " + b + " this.c= " + this.c)
}
let obj = {
    c: 3
}
let c = a.bind_1(obj, 1, 2)
c()