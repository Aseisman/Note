// // function demo(){
// //     let n=5,k=3;
// //     let arr=[1,2,2,1,3]
// //     for(let i=0;i<n-k+1;i++){
// //         let map=new Map();
// //         for(let j=0;j<k;j++){
// //             if(map.has(arr[j+i])){
// //                 map.set(arr[j+i],map.get(arr[j+i])+1);
// //             }else{
// //                 map.set(arr[j+i],1);
// //             }
// //         }
// //         console.log(map)
// //         let res=Infinity,maxres=1;
// //         map.forEach((v,k)=>{
// //             if(v>maxres||(res>k&&v===maxres)){
// //                 res=k;
// //                 maxres=v;
// //             }
// //         })
// //         // print(res);
// //         console.log(res);
// //     }
// // }
// // demo();

// /**
//  * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
//  *
//  *
//  * @param arr int整型二维数组 要处理的二维数组
//  * @return int整型一维数组
//  */
// function spin( arr ) {
//     // write code here
//     let res=[];
//     let p=(arr,dir)=>{
//         if(arr.length==0)return;
//         switch(dir){
//             case "left":
//                 for(let left=0;left<arr[0].length;left++){
//                     res.push(arr[0][left]);
//                 }
//                 arr.splice(0,1);
//                 p(arr,'down');
//                 break;
//             case "right":
//                 let temp=arr.length-1;
//                 for(let right=arr[temp].length-1;right>=0;right--){
//                     res.push(arr[temp][right]);
//                 }
//                 arr.splice(temp,1);
//                 p(arr,'up');
//                 break;
//             case "down":
//                 for(let down=0;down<arr.length;down++){
//                     res.push(arr[down][arr[down].length-1]);
//                     arr[down].splice(arr[down].length-1,1);
//                 }
//                 p(arr,'right');
//                 break;
//             case 'up':
//                 for(let up=arr.length-1;up>=0;up--){
//                     res.push(arr[up][0]);
//                     arr[up].splice(0,1);
//                 }
//                 p(arr,'left');
//                 break;
//         }
//     }
//     p(arr,'left');
//     return res;
// }
// function tpl( templateStr ,  arr ) {
//     // write code here
//     //var reg=/\{\{\$.\}\}/g;
//     //let resArr=templateStr.match(reg);
//     if(arr.length==0)return templateStr;
//     let temp=0;
//     let res=templateStr.replace(/\{\{\$[0-9][0-9]*\}\}/g,function(m,m1){
//         let num=parseInt(m.split("{{$")[1].split("}}")[0]);
//         return arr[num];
//     })
//     return res;
// }
// module.exports = {
//     spin : spin
// };

// snail = function (arr) {
//   var res;
//   while (arr.length) {
//     //左到右 一整行shift
//     res = res ? res.concat(arr.shift()) : arr.shift();
//     //上到下
//     for (let i = 0; i < arr.length; i++) {
//       res.push(arr[i].pop());
//     }
//     //右到左
//     res = res.concat((arr.pop() || []).reverse());
//     //下到上
//     for (let i = arr.length - 1; i >= 0; i--) {
//       res.push(arr[i].shift());
//     }
//   }
//   return res;
// };
// console.log(snail([[1,2,3],[4,5,6],[7,8,9]]));

// var merge = function (arr) {
//   if (arr.length <= 1) return arr;
//   arr.sort((a, b) => {
//     if (a[0] !== b[0]) {
//       return a[0] - b[0];
//     } else {
//       return a[1] - b[1];
//     }
//   });
//   let res = [arr[0]];
//   for (let i = 1; i < arr.length; i++) {
//     if (
//       res[res.length - 1][1] >= arr[i][0] &&
//       res[res.length - 1][1] <= arr[i][1]
//     ) {
//       //[1,3]和[2,4]
//       //or
//       //[1,2]和[2,4]
//       //or
//       //[1,4]和[2,4]
//       let temp = res.pop();
//       res.push([temp[0], arr[i][1]]);
//     } else {
//       //[1,3]和[4,5]
//       res.push(arr[i]);
//     }
//   }
//   return res;
// };
// console.log(
//   merge([
//     [3, 5],
//     [1, 2],
//     [1, 3],
//     [6, 9],
//     [8, 10],
//     [11, 12],
//   ])
// );

// function tran(arr){
//   let len1 = arr.length,
//     len2 = arr[0].length;
//   //凑够n*n
//   if (len1 < len2) {
//     for (let i = len1; i < len2; i++) {
//       arr.push([]);
//     }
//     for (let i = 0; i < len1; i++) {
//       for (let j = i; j < len2; j++) {
//         [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
//       }
//     }
//   } else {
//     for (let i = 0; i < len1; i++) {
//       for (let j = 0; j < i; j++) {
//         [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
//       }
//     }
//   }
//   arr.reverse();
//   return arr;
// }
// console.log(
//   tran([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
//   ])
// );
// console.log(
//   tran([
//     [1, 2, 3],
//     [4, 5, 6],
//   ])
// );
// console.log(
//   tran([
//     [1, 2],
//     [3, 4],
//     [5, 6],
//   ])
// );

// var bb=2;
// function aa(){
//   this.bb=1;
//   setTimeout(()=>{console.log(this.bb);},0)
// }
// let aaa=new aa();

// var a={
//   i:1,
//   toString:function(){
//     return a.i++;
//   }
// };
// //如果原始类型和对象比较，对象会转为原始类型的值在进行比较。
// // 对象转换为原始类型的值，先调用对象的 valueOf 方法，如果返回的还是对象，再接着调用 toString 方法
// //a.valueOf()是a的这个对象，a.valueOf().toString()返回自定义的东西

// var a=[1,2,3];
// a.join=a.shift;
// //array也是对象，array的toString
// // console.log(a.toString());  输出：1,2,3
// //aray隐式转换的时候，自动调用toString 方法返回一个字符串
// //（该字符串由数组中的每个元素的 toString() 方法返回值，再经过调用 join() 方法连接（由逗号隔开）组成）。
// //数组 toString 方法会调用本身的 join() 方法
// //这里把自己的 join() 方法改写为 shift() 方法,并删除前一个值，从而达到目的
// if(a==1&&a==2&&a==3)console.log(1);

// function Father(){
//   this.a=1;
// }
// function Son(){
//   this.b=2;
// }
// let f=new Father();
// f.c=3;
// Son.prototype=f
// let son=new Son();
// console.log(son.__proto__);
// console.log(son.c);

// function demo(arr){
//   let obj={};
//   return arr.filter((item,index)=>{
//     return obj.hasOwnProperty(JSON.stringify(item))?false:obj[JSON.stringify(item)]=true;
//   })
// }
// function demo2(arr){
//   let obj={};
//   return arr.reduce((pre,cur)=>{
//     obj[cur.id]?"":obj[cur.id]=true&&pre.push(cur);
//     return pre;
//   },[])
// }
// console.log(demo([{id:2,name:'asd'},{id:3,name:'222'},{id:2,name:'asd'}]))
// console.log(demo2([{id:2,name:'asd'},{id:3,name:'222'},{id:2,name:'asd'}]))

// let eventEmitter={};
// eventEmitter.list={};
// eventEmitter.on=function(event,fn){
//   let _this=this;
//   (_this.list[event]||(_this.list[event]=[])).push(fn)
//   return _this;
// }
// eventEmitter.emit=function(){
//   let _this=this;
//   let event=[].shift.call(arguments),
//   fns=[...this.list[event]];
//   if(!fns||fns.length===0){
//     return false;
//   }
//   fns.forEach(fn=>{
//     fn.apply(_this,arguments);
//   })
//   return _this;
// }

// eventEmitter.on('test',(content)=>{console.log("订阅1"+content)});
// eventEmitter.on('test',(content)=>{console.log("订阅2"+content)});
// eventEmitter.emit('test',"发布信息");

// console.log(1)
// setTimeout(() => {
// console.log(2)
// Promise.resolve().then(() => <font color="#999999">{</font>
// console.log(3) }) })

// new Promise((resolve) => {

// console.log(4)

// setTimeout(() => {

// console.log(5) resolve(); }, 2);

// }).then(res => {

// console.log(res) });

// let str=read_line();
// let res=0,temp=1,len=str.length;
// let flag=true;//用来标志回文串是不是单，双的
// while(temp<=len/2|0){
//     if(flag){
//         //单
//         let nums=0;
//         for(let j=0;j<temp;j++){
//             if(str[j]==str[2*temp-j]||(str[j]=="*"&&(2*temp-j<len))||str[2*temp-j]=="*"){
//                 nums+=2;
//             }
//         }
//         if(nums!=0){
//             nums++;
//             print(nums,flag);
//         	res=res>nums?res:nums;
//         }
//         flag=!flag;
//     }else{
//         //双
//         let nums=0;
//         for(let j=0;j<temp;j++){
//             if(str[j]==str[2*temp-1-j]||str[j]=="*"||str[2*temp-1-j]=="*"){
//                 nums+=2;
//             }
//         }
//         print(nums,flag);
//         res=res>nums?res:nums;
//         flag=!flag;
//         temp++;
//     }
// }
// print(res);

//约瑟夫环
// function MyCircularQueue() {
//   var items = [];
//   //向队列插入元素
//   this.enQueue = function (value) {
//     return items.push(value);
//   };
//   //删除元素
//   this.deQueue = function () {
//     return items.shift();
//   };
//   //查看队列长度
//   this.size = function () {
//     return items.length;
//   };
// }

// function countOff(m, n) {
//   var queue = new MyCircularQueue();
//   //将名单存入队列
//   for (var i = 1; i <= m; i++) {
//     queue.enQueue(i);
//   }
//   var loser = "";
//   while (queue.size() > 1) {
//     for (var i = 0; i < n - 1; i++) {
//       queue.enQueue(queue.deQueue());
//     }
//     loser = queue.deQueue();
//     console.log("被淘汰的人为：" + loser);
//   }
//   // return queue.deQueue();
//   console.log("获胜者：" + queue.deQueue());
// }
// // console.log('获胜者：' + countOff(100, 5));
// countOff(100, 5);

// function countOff(num, m) {
//   let players = [];
//   for (let i = 1; i <= num; i++) {
//     players.push(i);
//   }
//   let flag = 0;
//   while (players.length > 1) {
//     // 剩下一人，结束条件
//     let outPlayerNum = 0,
//       len = players.length;
//     for (let i = 0; i < len; i++) {
//       flag++;
//       if (flag === m) {
//         flag = 0;
//         console.log("出局：" + players[i - outPlayerNum]);
//         players.splice(i - outPlayerNum, 1);
//         outPlayerNum++;
//       }
//     }
//   }
//   // return players[0];
//   console.log("剩下：" + players[0]);
// }
// // console.log("剩下："+find(100,5))
// countOff(100, 5);

// let str="I am a student"
// console.log(str.toUpperCase().split(" ").reverse().join(" "));

// var x=1,y=2;
// var z=function(){
//     var x=2;
//     return {
//         x:x,
//         y:function(a,b){
//             x=a+b;
//         },
//         z:function(){
//             return x;
//         }
//     }
// }
// a=z();
// a.y(x,y);
// console.log(a.z(),a.x,x);

// function mockFetch(param) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(param);
//     }, 2000);
//   });
// }
// function limitedRequest(urls,maxNum){
//     const pool=[];
//     const initSize=Math.min(urls.length,maxNum);
//     for(let i=0;i<initSize;i++){
//         pool.push(run(urls.splice(0,1)));
//     }
//     function r(){
//         console.log('当前并发度：', pool.length);
//         if(urls.length===0){
//             //全部发完
//             console.log('并发请求已经全部发起');
//             return Promise.resolve();
//         }
//         return run(urls.splice(0,1));
//     }
//     function run(url){
//         // return mockFetch(url).then(r);
//         //模拟请求
//         return new Promise((resolve)=>{
//             setTimeout(()=>{
//                 resolve(url);
//             },2000);
//         }).then(r);
//     }
//     Promise.all(pool).then(()=>{
//         console.log("结束");
//     });
// }
// limitedRequest([1, 2, 3, 4, 5, 6, 7, 8], 3);

//ps是一个promise对象数组
// function limit(ps,max){
//     const pool=[];
//     const initSize=Math.min(ps.length,max);
//     // for(let i=0;i<initSize;i++){
//     //     pool.push(ps.splice(0,1));
//     // }
//     pool.push(...ps.splice(0,initSize));
//     console.log(pool);
//     console.log(ps);
//     Promise.all(pool).then(()=>{
//         console.log("=========");
//         console.log(ps);
//         if(ps.length===0){
//             return Promise.resolve();
//         }
//         return limit(ps,max);
//     })
// }

// let p=[new Promise((resolve)=>{
//     setTimeout(()=>{console.log("1");resolve()},2000)
// }),new Promise((resolve)=>{

//     setTimeout(()=>{console.log("2");resolve()},2000)
// }),new Promise((resolve)=>{

//     setTimeout(()=>{console.log("3");resolve()},2000)
// }),new Promise((resolve)=>{

//     setTimeout(()=>{console.log("4");resolve()},2000)
// }),new Promise((resolve)=>{

//     setTimeout(()=>{console.log("5");resolve()},2000)
// }),new Promise((resolve)=>{

//     setTimeout(()=>{console.log("6");resolve()},2000)
// }),new Promise((resolve)=>{
//     setTimeout(()=>{console.log("7");resolve()},2000)
// })]
// limit(p,3);

function f(n) {
  if (n == 1 || n == 2) {
    return 1;
  }
  return f(n - 1) + f(n - 2);
}
console.log(f(10));
