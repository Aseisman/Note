## 一、
```js
// 0.1+0.2=0.3  n个小数相加返回正确值
// function demo(){
//     let args=arguments;
//     //转为string串
//     let max=0;
//     for(let a of args){
//         if(max<String(a).split(".")[1].length)max=String(a).split(".")[1].length;
//     }
//     let m=Math.pow(10,max);
//     let res=0;
//     for(let a of args){
//         res+=a*m
//     }
//     return res/m;
// }

// console.log(demo(0.2,0.3,0.23));
```

## 二、
```js
//发送一个promise请求，限制超时时间为2秒
function request() {
  //模拟请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("来自服务器的message");
    }, Math.random() * 5000);
  });
}
function resolve() {
  //code here
}

resolve()
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); //超时
```

```js
//answer
function resolve() {
  //promise.race竞赛
  let second = function () {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        reject("超时");
      }, 2000);
    });
  };
  let arr=[request(),second()];
  return Promise.race(arr);
}
```
