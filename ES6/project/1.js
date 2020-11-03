/*
 * 一道虐哭99.99%面试者的“变量提升”题目 
 * 
 * http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
 *   If the function’s formal parameters do not include any default value initializers then the body declarations are instantiated in the same Environment Record as the parameters. If default value parameter initializers exist, a second Environment Record is created for the body declarations. 
 *   如果函数形参不含有默认参数，那么函数体声明和参数在同一个“独立作用域”中初始化，否则将为函数体声明创建第二个“独立作用域”...
 * 
 * 延展：词法解析/变量提升/EC/ECStack/AO/VO/GO/SCOPE/SCOPE-CHAIN/GC/闭包的理解...
 */

/* 
var x=1;
function func(x,y=function(){x=2}){
    x=3;
    y();
    console.log(x); //2
}
func(5);
console.log(x);//1 
*/

/* debugger;
var x=1;
function func(x,y=function(){x=2}){
    var x=3;
    y();
    console.log(x);
}
func(5);
console.log(x); */

/* debugger;
var x=1;
function func(x,y=function(){x=2}){
    var x=3;
    var y=function(){x=4};
    y();
    console.log(x);
}
func(5);
console.log(x); */