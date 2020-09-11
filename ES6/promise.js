//执行10个请求，第11个请求需要用到前十个的运行结果


//https://blog.csdn.net/weixin_37719279/article/details/80950713
//1、 Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
// 2、promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。
// 3、构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。
// 4、promise 可以链式调用。提起链式调用我们通常会想到通过 return this 实现，不过 Promise 并不是这样实现的。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用。
// 5、.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
//6、.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。.catch 是 .then 第二个参数的简便写法，但是它们用法上有一点需要注意：.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 .catch 可以捕获之前（then里面的）的错误。

//js实现promise

// var promise = new Promise((resolve, reject) => {
//     if ( /*异步执行成功*/ ) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// }).then(function() {

// }, function() {

// })

//构造函数
function _Promise(resolver) {
    this._status = 'pending';
    this._result = '';
    resolver(this.resolve.bind(this), this.reject.bind(this))
};
_Promise.prototype.resolve = function(result) {
    if (this._status = 'pending') {
        this._status = 'fullfilled';
        this._result = result;
    }
}
_Promise.prototype.reject = function(result) {
    if (this._status = 'pending') {
        this._status = 'rejected';
        this._result = result;
    }
}
_Promise.prototype.then = function(isResolve, isReject) {
    if (this._status === 'fullfilled') {
        var _isPromise = isResolve(this._result)
        if (_isPromise instanceof _Promise) {
            return _isPromise;
        }
        return this;
    } else if (this._status == 'rejected' && arguments[1]) {
        var err = new TypeError(this._result)
        var _isPromise = isReject(err)
        if (_isPromise instanceof _Promise) {
            return _isPromise;
        }
        return this;
    }
}

// //promise.all:接受一个Promise对象数组作为参数，当这个数组中所有的Promise对象状态都变成了resolved和rejected，它才会去调用then。
// //promise.race:接受一个Promise对象数组作为参数，只要其中的一个Promise状态变成resolved或者是rejected，就可以调用then方法。

// //async：
// async function fn() {
//     return 30;
// }
// const fn = async() => {
//         return 30;
//     }
//返回的值不是30，而是一个Promise对象
//await:只能在async中使用:同步等待后面的promise对象返回数据后再执行下面的语句。
//await只能接受promise对象。

const foo = async() => {
    const t = await Promise.resolve(30);
    console.log(t)
    console.log("next")
}
foo()

//try-catch可以捕获async/await的异常。
//try-catch只能捕获同步任务的异常，对于异步任务的宏仁务和微任务，都无法捕获。