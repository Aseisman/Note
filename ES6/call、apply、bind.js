// call(this,参数1,参数2,……)
// bind(this,参数1,参数2,……)
// apply(this,[参数1,参数2,……])
// call与apply会立即执行，返回值则是对应的函数的返回值。
// bind不会立即执行，而是返回一个新函数，且函数已经是我们上面的参数，无法改变。

//模拟实现call、apply
//https://www.cnblogs.com/echolun/p/12144344.html

// 手写bind
//https://www.cnblogs.com/echolun/p/12178655.html

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

var obj = {
    z: 1
};

function fn(x, y) {
    console.log(x + y + this.z);
};

var bound = fn.bind_(obj, 1);
bound(2); //4