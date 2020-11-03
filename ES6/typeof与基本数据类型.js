/*
 *typeof运算符:基本类型有区分，引用类型不能区分，能区分函数
 *  + 所有的数据类型值在计算机中存储的都是按照“二进制”存储的
 *  + null -> 000000
 *  + function不是以000开头的
 *  + 只要是对象都是以 000 开始的
 *  + typeof检测的时候，是按照计算机存储的二进制的值来检测的
 *  + 所以 typeof null == Object 
 *  + typeof function == function
 *  + typeof Object == function 
 */
typeof NaN == 'number'
typeof null == 'object'

/* 判断NaN的方法 */
// let a = NaN;
// isNaN(a);
// Object.is(NaN, a)

/* 
    Number:包括NaN,Infinity;
    Symbol:给对象设置唯一的属性
    应用场景：在vuex/redux中做行为派发的时候，统一管理派发的行为标识，标识的值可以是唯一值
*/
let symb = Symbol()
console.log(symb == symb) //true
let test = new Symbol() //TypeError: Symbol is not a constructor

/* 
    bigint:大数：大于2^53次方后的数字：运算会不准
    这个时候可以用：9007199254740993n+1n=9007199254740994n
    即后面n标识可以正常运算。
*/