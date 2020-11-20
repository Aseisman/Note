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

## 二面
```js
//1. 判定一个数组内字符串的最大公共前缀子串，
//示例：[ "abssss", "abeeee", "abttssrre" ] 最大公共ab

funtion findCommon(arr) {
        let res="";
        for(let i=0;i<arr[0].length;i++){
              res+=arr[0][i];
                   for(let j=1;j<arr.length;j++){
                    for(let k=0;k<res.length;k++){
                          if(res[k]!=arr[j][k])return res.pop();
                    }
              }
        }
        return res;
}

//2、生成1-1000的10个随机数，不重复，输出一个数组
function randomTen (min, max) {
      		let res=[];
                for(let i=0;i<10;i++){
                              let flag=true;
                              while(flag){
                              let temp=Math.random()*（max-min+1）+min;
                              if(res.indexOf(temp)==-1){res.push(temp);flag=false; }
                              }
                }
                return res;
}
Set()
while(Set.length<10){
     let temp;
     Set;
}
return [...set];

//3、快速排序
function quickSort(arr){
    if(arr.length<=1)return arr;
    var index=Math.floor(arr.length/2);
    var left=[],right=[],p=arr.splice(index,1)[0];
    for(let i=0;i<arr.length;i++){
         if(arr[i]<=p)left.push(arr[i]);
         else right.push(arr[i]);
    }
    return quickSort(left).concat([p],quickSort(right));
}

```