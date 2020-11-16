// let data ={
//     name: "张三",
//     age: 20,
//     specials: [
//         "傻逼1",
//         {dd:11},
//         {special:"special2",item:22}
//     ]
// }

// //把data格式化成
// /**
//  * data=[{
//  *     name:"张三",
//  *     age:20,
//  *     special1:11,
//  *     special2:22
//  * }]
//  */
// let obj={}
//  for(let i in data){
//     //  console.log(data[i]);
//      if(data[i] instanceof Array){
//          //如果是数组，继续遍历
//          for(let j=1;j<=data[i].length;j++){
//              let name=""+i+"."+j;
//             //  这里可能是对象
//             //深拷贝过来
//              obj[name]=JSON.parse(JSON.stringify(data[i][j-1]));
//         }
//      }else{
//          obj[i]=data[i];
//      }
//  }
//  console.log(obj);

/* let data = [
  {
    name: "张三",
    age: 20,
    specials: ["傻逼1", { dd: 11 }, { special: "special2", item: 22 }],
  },
  {
    name: "李四",
    age: 20,
    specials: ["傻逼1", { dd: 11 }, { special: "special2", item: 22 }],
  },
];
let arr = {};
for (let d of data) {
  let n;
  //判断是否有name属性
  if (d.hasOwnProperty("name")) {
    n = "" + d["name"];
    arr[n] = {};
    //建立出空对象后，进行丢数据
    for (let i in d) {
      if (i == "name") continue;
      else {
        //再继续判断是不是数组
        if (d[i] instanceof Array) {
            //如果是数组，就继续遍历
            for (let j = 1; j <= d[i].length; j++) {
                let name = "" + i + "." + j;
                //  这里可能是对象
                //深拷贝过来
                arr[n][name] = JSON.parse(JSON.stringify(d[i][j - 1]));
            }
        }else{
            arr[n][i] = d[i];            
        }
      }
    }
  } else {
    //没有怎么搞，没有就结束
    return;
  }
}
console.log(arr); */

let data = [
    {
      name: "张三",
      age: 20,
      specials: [{ special: "special1", item: 11 },{ special: "special2", item: 22 }],
    },
    {
      name: "李四",
      age: 20,
      specials: ["傻逼1", { dd: 11 }, { special: "special2", item: 22 }],
    },
  ];

  /**
   * let data = [
    
     "张三"{
      age: 20,
      specials1:11,
      specials2:22,
    },
    {
      name: "李四",
      age: 20,
      specials: ["傻逼1", { dd: 11 }, { special: "special2", item: 22 }],
    },
  ];
   */
  let arr = {};
  for (let d of data) {
    let n;
    //判断是否有name属性
    if (d.hasOwnProperty("name")) {
      n = "" + d["name"];
      arr[n] = {};
      //建立出空对象后，进行丢数据
      for (let i in d) {
        if (i == "name") continue;
        else {
          //再继续判断是不是数组
          if (d[i] instanceof Array) {
              //如果是数组，就继续遍历
              for (let j = 1; j <= d[i].length; j++) {
                  let name = "" + i + "." + j;
                  //  这里可能是对象
                  //深拷贝过来
                  arr[n][name] = JSON.parse(JSON.stringify(d[i][j - 1]));
              }
          }else{
              arr[n][i] = d[i];            
          }
        }
      }
    } else {
      //没有怎么搞，没有就结束
      return;
    }
  }
  console.log(arr);
