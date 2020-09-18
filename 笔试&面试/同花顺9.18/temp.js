// for (let index of['a', 'b'].keys()) {
//     console.log(index);
// }​
// for (let values of['a', 'b'].values()) {
//     console.log(values);
// }​
// for (let [index, values] of['a', 'b'].entries()) {
//     console.log(index, values);
// }​
// let x = ['a', 'b', 'c']
// let entries = x.entries();
// entries.next().value​
for (let index of['a', 'b'].keys()) {
    console.log(index); //0,1
}
for (let values of['a', 'b'].values()) {
    console.log(values); //a,b
}
for (let [index, values] of['a', 'b'].entries()) {
    console.log(index, values);
}
let x = ['a', 'b', 'c']
let entries = x.entries();
console.log(entries.next().value);
// class A {
//     constructor() {
//         this.x = 1;
//     }
//     print() {
//         console.log(this.x)
//     }
// }
// class B extends A {
//     constructor() {
//         super();
//         this.x = 2;
//     }
//     m() {
//         super.print();
//     }
// }
// var b = new B();
// b.m()

//500万数里面找30个数，那种排序算法最好，时间复杂度最低。
//高内聚，低耦合
//以下哪个对象不可能包含SQL语句
//image的预加载，用promise请求，成功了就resolve，失败就reject
//[“1”,“2”,“3”].map(parseInt)
//js并行处理，两个Promise A,B，先执行A，不管A成功与否，再执行B
//js检测异常的产生并收集以监控线上代码状态
//判断用户是否切换浏览器tab或切换任务Page。。chrome中打开一个网页，如何判断用户切换了tab到另外一个页面?