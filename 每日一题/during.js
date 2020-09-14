var func = function course() {
    course = 1; //无法被修改
    console.log(typeof course) //function
}
func();
console.log(typeof course)

//具名函数表达式：顾名思义function后面有个course名称然后赋值给func这个整个操作。
//函数名称名称：可以在函数内部被访问到,无法被修改。
//对于立即执行函数来说，也是具有这样子的情况：name无法被修改，且只有函数内部能够访问到name