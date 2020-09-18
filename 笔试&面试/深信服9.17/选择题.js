Function.prototype.san = function() {

    return Function.prototype.call.bind(this);

}
console.log(Array.prototype.push.san()([], 0, 1, 2)) //3
console.log(Array.prototype.push.san()(0, 1, 2)) //2
console.log(Array.prototype.push.san()([3, 4], 0, 1, 2)) //5
console.log(Array.prototype.push.call(0, 1, 2)) //2

Array.prototype.push.san()([], 0, 1, 2) == Array.prototype.push.call([], 0, 1, 2)
    //返回的是call函数，然后第一个参数是this
    //所以Array.prototype.push.san()([], 0, 1, 2)==Array.prototype.push.call([],0,1,2)

// Function.prototype.call() //借用方法，执行我们后面bind返回的函数。
// rgs = Array.prototype.slice.call(arguments); //arguments是个类数组，里面没有其他数组方法，然后我们调用slice去切割这个arguments返回一个真实数组。
var dd = [3, 4]
var c = dd.push.call(0, 1, 2)
console.log(c, dd)

let oo = {
    get san() {
        console.log('get')
    },
    set san(v) {
        console.log('set')
    }
}
oo.san = '100'
console.log(oo.san);


null === null //true
undefined === undefined //true
Symbol.for('a') === Symbol.for('a') //true

// Content-Length用于描述HTTP消息实体的传输长度

function a() {} //构造函数
a.prototype.name = 100
console.log(a.name)
a.prototype.name = 200
console.log(a.name)
a.prototype = { name: 300 }
console.log(a.name)