var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push,
}
obj.push(1)
obj.push(2)
console.log(obj);
//chrome输出：[empty,empty,1,2,splice:f,push:f]
//node输出：{'2':1,'3':2,length:4,splice:[Function:splice],push[Function:push] }


//类数组的定义：类数组就是拥有length属性，且其他属性为非负整数的对象，且不具备数组所用于的方法。常见的arguments、NodeList都是类数组。
//类数组转为数组的方法：Array.prototype.slice.call(aa) || [...aa]
//aa是类数组

//对于push方法；具有通透性。push和call或apply一起使用时，可应用在类似数组的对象上
//push根据length来决定从哪里开始插入给定的值。如果length不能转成一个数值时，则插入的元素索引为0，包括length不存在时会创建。

//obj.push(1)是看length的长度插入的，也就是length=2 ==> obj[2]=1，替换掉2':3
//obj.push(2)==> obj[3]=2,替换掉'3':4

//chrome是根据length和splice来判断将数组以什么形式实现的。
//node则正常显示。