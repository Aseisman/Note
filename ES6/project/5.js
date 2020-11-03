/*
 * 阿里：Promise和async/await的区别及手撕源码
 * 
 * 延展：PromiseA+规范完整版本 & async/await源码 & 更多的generator的题目「例如：redux-saga & dva」 & ajax串行并行引发的数据通信问题「包含分析Axios源码库及其二次封账配置、Fetch和Axios的区别及其封装、以及一些细节的知识点」
 * https://promisesaplus.com/
 */

(function () {
    function Promise(executor) {
        var self = this;
        self.PromiseState = 'pending';
        self.PromiseResult = undefined;
        self.onfulfilledCallbacks = [];
        self.onrejectedCallbacks = [];

        // 修改promise状态和value
        var change = function change(state, value) {
            if (self.PromiseState === 'pending') {
                self.PromiseState = state;
                self.PromiseResult = value;

                setTimeout(function () {
                    var arr = state === 'fulfilled' ? self.onfulfilledCallbacks : self.onrejectedCallbacks;
                    for (var i = 0; i < arr.length; i++) {
                        var itemFunc = arr[i];
                        itemFunc(value);
                    }
                });
            }
        };
        var resolve = function resolve(result) {
            change('fulfilled', result);
        };
        var reject = function reject(reason) {
            change('rejected', reason);
        };

        // 立即执行executor函数
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    Promise.prototype.then = function then(onfulfilled, onrejected) {
        var self = this,
            state = self.PromiseState,
            value = self.PromiseResult;
        switch (state) {
            case 'fulfilled':
                setTimeout(function () {
                    onfulfilled(value);
                });
                break;
            case 'rejected':
                setTimeout(function () {
                    onrejected(value);
                });
                break;
            default:
                self.onfulfilledCallbacks.push(onfulfilled);
                self.onrejectedCallbacks.push(onrejected);
        }
    };
    // window.Promise = Promise;
})();

// ES6提供的内置类Promise:管控异步编程的
/* let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('OK');
        reject('NO');
    }, 1000);
});
p1.then(result => {
    console.log(result);
}, reason => {
    console.log(reason);
});
console.log(2); */


const func1 = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('func1 DATA!');
        }, 1000);
    });
};
const func2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('func2 DATA!');
            // reject('func2 error!');
        }, 1000);
    });
};
const func3 = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('func3 DATA!');
        }, 1000);
    });
};

/* func1().then(x => {
    console.log(x);
    return func2();
}).then(x => {
    console.log(x);
    return func3();
}).then(x => {
    console.log(x);
}).catch(reason => {
    console.log(reason);
}); */

/* (async () => {
    try {
        let x = await func1();
        console.log(x);

        x = await func2();
        console.log(x);

        x = await func3();
        console.log(x);
    } catch (err) {
        console.log(err);
    }
})(); */

/* 
(async () => {
    let x = await func1();
    console.log(x);

    try {
        x = await func2();
        console.log(x);
    } catch (err) {
        console.log(err);
    }

    x = await func3();
    console.log(x);
})(); */


/*
function* fn() {
    yield 1;
    yield 2;
}
let itor = fn(); //返回结果是一个迭代器：拥有next方法，执行next方法可以依次遍历数据结构中的每一项的值 ->数据结构具备Symbol.iterator属性，说明其是可以被迭代的 「使用for of循环」
console.log(itor.next()); //->{value:1,done:false}
console.log(itor.next()); //->{value:2,done:false}
console.log(itor.next()); //->{value:undefined,done:true}
*/
/* 
function* fn() {
    let x = yield 1;
    console.log(x); //->10 不是yeild的返回值，是执行next方法传递进来的值
    yield 2;
}
let itor = fn();
console.log(itor.next()); //->{value:1,done:false}
console.log(itor.next(10)); //->{value:2,done:false}
console.log(itor.next()); //->{value:undefined,done:true} 
*/

// async/await的原理：async/await是generator的语法糖
function AsyncFunc(generator) {
    const iterator = generator();
    const next = x => {
        let {
            value,
            done
        } = iterator.next(x);
        if (done) return;
        value.then(x => next(x));
    };
    next();
}
AsyncFunc(function* () {
    let x = yield func1();
    console.log(x);

    x = yield func2();
    console.log(x);

    x = yield func3();
    console.log(x);
});

/* 
function* generator() {
    let x = yield func1();
    console.log(x);

    x = yield func2();
    console.log(x);

    x = yield func3();
    console.log(x);
}
let iterator = generator();
iterator.next().value.then(x => {
    iterator.next(x).value.then(x => {
        iterator.next(x).value.then(x => {
            iterator.next(x);
        });
    });
}); */