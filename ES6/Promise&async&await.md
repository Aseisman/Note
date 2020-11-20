## 阿里：Promise和async/await的区别及手撕源码

## Promise 手撕

``` js
(function() {
    function Promise(executor) {
        var self = this;
        self.PromiseState = 'pending';
        self.PromiseResult = undefined;
        self.onfulfilledCallbacks =[];
        self.onrejectedCallbacks=[];
        // 修改promise状态和value
        var change = function change(state, value) {
            if (self.PromiseState === 'pending') {
                self.PromiseState = state;
                self.PromiseResult = value;

                setTimeout(function() {
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
        var self = this;
        state = self.PromiseState;
        value = self.PromiseResult;
        switch (state) {
            case 'fulfilled':
                setTimeout(function(){
                    onfulfilled(value);
                })
                break;
            case 'rejected':
                setTimeout(function(){
                    onrejected(value);
                })
                break;
            default:
                self.onfulfilledCallbacks.push(onfulfilled);
                self.onrejectedCallbacks.push(onrejected);
        }
    }
    //window.Promise=Promise;
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
```

## Promise 依次触发问题

```js
//有三个函数fun1，fun2，fun3，依次执行
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
```

1. 最傻逼的用法：then链调用
```js
func1().then(x=>{
    console.log(x);
    return func2();//返回一个func2(),func2()执行后返回一个promise，于是用promise链可以继续调用
}).then(x=>{
    console.log(x);
    return func3();
}).then(x=>{
    console.log(x);
}).catch(reason=>{
    console.log(reason);
})
```
2. async用法
```js
(async()=>{
    try{
        let x=await func1();//await会等待func1返回结果，func1会执行完
        console.log(x);
        x = await func2();
        console.log(x);

        x = await func3();
        console.log(x);
    }catch(err){
        console.log(err);
    }
})();
```
3. async/await的原理：async/await是generator的语法糖
```js
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

```



## Promise.all原理
```js
// all的原理
Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let results = []; // 结果数组
        let i = 0;
        let processData = (value,index)=>{
            results[index] = value;
            // 当成功的个数 和 当前的参数个数相等就把结果抛出去
            if(++i === values.length){
                resolve(results);
            }
        }
        for(let i = 0 ; i< values.length;i++){
            let current = values[i]; // 拿到数组中每一项
            // 判断是不是一个promise
            if((typeof current === 'object' &&  current !==null)|| typeof current == 'function'){
                // 如果是promise
                if(typeof current.then == 'function'){
                    // 就调用这个promise的then方法，把结果和索引对应上,如果任何一个失败了返回的proimise就是一个失败的promise
                    current.then(y=>{
                        processData(y,i);
                    },reject)
                }else{
                    processData(current,i);
                }
            }else{
                processData(current,i);
            }
        }
    });
}
```