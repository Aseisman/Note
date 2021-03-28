//执行10个请求，第11个请求需要用到前十个的运行结果
//promise.all([a,b,c,d,e,f,g,h,i,j]).then(res=>{
//   res是个数组，存放了10个请求正确后的结果
//})

// Promise对象可以理解为一次执行的异步操作，使用promise对象之后可以使用一种链式调用的方式来组织代码；让代码更加的直观。就是当执行完一次异步操作后，会有一次回调，不管成功还是失败，成功就对应成功的回调，失败就对应失败的回调。
//https://blog.csdn.net/weixin_37719279/article/details/80950713
// 1、Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
// 2、promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。
// 3、构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。
// 4、promise 可以链式调用。提起链式调用我们通常会想到通过 return this 实现，不过 Promise 并不是这样实现的。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用。
// 5、.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
// 6、.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。.catch 是 .then 第二个参数的简便写法，但是它们用法上有一点需要注意：.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 .catch 可以捕获之前（then里面的）的错误。

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
  this._status = "pending";
  this._result = "";
  resolver(this.resolve.bind(this), this.reject.bind(this));
}
_Promise.prototype.resolve = function (result) {
  if ((this._status = "pending")) {
    this._status = "fullfilled";
    this._result = result;
  }
};
_Promise.prototype.reject = function (result) {
  if ((this._status = "pending")) {
    this._status = "rejected";
    this._result = result;
  }
};
_Promise.prototype.then = function (isResolve, isReject) {
  if (this._status === "fullfilled") {
    var _isPromise = isResolve(this._result);
    if (_isPromise instanceof _Promise) {
      return _isPromise;
    }
    return this;
  } else if (this._status == "rejected" && arguments[1]) {
    var err = new TypeError(this._result);
    var _isPromise = isReject(err);
    if (_isPromise instanceof _Promise) {
      return _isPromise;
    }
    return this;
  }
};

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

const foo = async () => {
  const t = await Promise.resolve(30);
  console.log(t);
  console.log("next");
};
foo();

//try-catch可以捕获async/await的异常。
//try-catch只能捕获同步任务的异常，对于异步任务的宏仁务和微任务，都无法捕获。

//发起若干个请求，然后如果发送失败则重新发起请求，次数可规定，整体返回Promise对象，以便then链调用。

/* let dd = 0;
function f() {
    console.log(dd);
  if (dd == 2) {//rr==2的时候才rejected
    // dd++;
    console.log("失败");
    return Promise.reject(500)
  } else {
    dd++;
    console.log("成功");
    return Promise.resolve(200)
  }
}
// let i=1;
async function timer(req, time) {
  return new Promise(async (resolve, rejected) => {
    let res;
    while (time) {
      try {
        res = await req();
        console.log("成功",res);
        //成功
        // i++;
        return resolve(res);
      } catch (err) {
        //失败
        console.log("失败","537");
        time--;
      }
    }
    console.log("失败542");
    return rejected("失败");
  });
}
async function all(reqs, time) {
  let result = [];
  for (let i = 0; i < reqs.length; i++) {
    result[i] =await timer(reqs[i], time);
  }
  return Promise.all(result);
//   return result;
}
// console.log(all([f, f, f, f, f], 4),'551');
all([f,f,f,f,f],4).then(res=>{
    console.log(res);
}).catch(err=>{
  
}) */

/* function request() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.9) {
          resolve(200)
        } else {
          resolve(403)
        }
      }, 300);
    })
  }
  
  async function all(reqs) {
    for (var i = 0; i < reqs.length; i++) {
      var res = await reqs[i]
      while (res !== 200) {
        reqs[i] = request()
        res = await reqs[i]
      }
    }
    return Promise.all(reqs)
  }
  
  var reqs = [];
  for (var i = 0; i < 5; i++) {
    reqs[i] = request();
  }
  var res = all(reqs)
  res.then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  }) */

//   Promise.all(task).then().catch() 会在所有task都resolve时才会进then方法，并且把所有结果以一个数组返回。只要有一个失败，就会进catch。但如果在单个请求中定义了catch方法，就不会进Promise.all的catch方法。


// https://www.cnblogs.com/huanglei-/p/9396783.html
//先发起一遍Promise.all请求，然后再判断是不是有失败的请求，再继续发送Promise.all请求。
let failedList = [];

//   function getDataById (id) { // 这是单个请求
//     return new Promise(function (resolve, reject) {
//       getResponse(id, resolve, reject)
//     }).catch(e => {
//       failedList.push(getDataById (id)) // 如果失败，就重新发起请求，并将该请求放入failedList中以便后续处理
//     })
//   }

//   function getResponse (id, resolve, reject) { // 模拟返回结果
//     setTimeout(() => {
//       if (Math.random() > 0.8) resolve({id, msg: 'ok'})
//       else reject({id, msg: 'error'})
//     }, 1000)
//   }
function getDataById(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (Math.random() > 0.8) resolve({ id, msg: "ok" });
      else reject({ id, msg: "error" });
    }, 0);
  }).catch((e) => {
    failedList.push(getDataById(id));
  });
}

const RequestList = [getDataById(1), getDataById(2), getDataById(3)];

handlePromiseDone(RequestList);

let requestTime = 1; // 当前请求次数
let maxRequestTime = 5; // 最大重试次数
let result = []; // 最后的结果

function handlePromiseDone(requestList) {
  // 处理请求结果
  Promise.all(requestList)
    .then((resolve) => {
      result = result.concat(resolve.filter((i) => i !== undefined)); // 过滤掉resolve列表里的失败请求的结果
      let failedLength = failedList.length;
      if (failedLength > 0 && requestTime < maxRequestTime) {
        // 如果失败列表里有请求，并且请求次数不超过设定的值，就进行下一次请求
        console.log(
          `第${requestTime}次请求完成，其中成功${
            RequestList.length - failedLength
          }个，失败${failedLength}个，正在进行第${++requestTime}次请求...`
        );
        handlePromiseDone(failedList);
        failedList = []; // 清空本轮请求的failedList
      } else {
        // 表示所有请求都成功了，或者达到了最大请求次数。到这里就可以对result做进一步处理了。
        console.log(
          `请求完成，共请求${requestTime}次, 其中成功${
            RequestList.length - failedLength
          }个，失败${failedLength}个\n`,
          result
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
