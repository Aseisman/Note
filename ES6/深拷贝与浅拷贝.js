//深拷贝的具体实现方法，，concat返回一个新的数组，不改变原来的数组。同理 slice，扩展运算符等均可。
//对象进行深拷贝：Object.assign();JSON.stringify()与JSON.parse() 展开运算符a={a:0} b={...a}

//数组
// 1、for循环
var arr1 = [1, 2, 3];
var arr2 = [];
for (var i = 0; i < arr1.length; i++) {
    arr2.push(arr1[i]);
}
arr1[0] = 4;
console.log(arr1); //4, 2, 3
console.log(arr2); //1, 2, 3
//2、concat、slice
var arr1 = [1, 2, 3];
var arr2 = arr1.concat();
var arr3 = arr1.slice(0);
arr1[0] = 4;
console.log(arr1); //4, 2, 3
console.log(arr2); //1, 2, 3
console.log(arr3)

//对象
//1
var obj = { a: 1 };
var str = JSON.stringify(obj); //序列化对象
var newobj = JSON.parse(str); //还原

var obj = { a: new Date() }
console.log(obj)
var json = JSON.stringify(obj);
var obj2 = JSON.parse(json);
console.log(new Date(obj2.a))

//2
var a = { a: 0 }
var b = {...a }

//3 
var obj1 = {
    a: 1,
    b: 2,
    c: 3
}
var obj2 = Object.assign({}, obj1);
obj2.b = 5;
console.log(obj1.b); // 2
console.log(obj2.b); // 5