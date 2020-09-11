//  防抖
//防抖是什么：在一段时间内，多次执行某个方法，那我们就重新设定时间不让他执行，直到不再请求后的一段时间内我们再发送一个请求。
//防抖：即短时间内大量触发同一事件，只会执行一次函数，实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器。
function debounce(func, wait) {
    var timeout = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);

    }
}

function a() {
    console.log("1111111111111")
}
let b = debounce(a, 1000)
b()
b();
//  节流 
//节流是什么：节流是在一段时间内，多次执行某个方法，那我们设定一个时间段，在这个时间段内只执行一次。
//节流：防抖是延迟执行，而节流是间隔执行，函数节流即每隔一段时间就执行一次，实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器，
// 和防抖的区别在于，防抖每次触发事件都重置定时器，而节流在定时器到时间后再清空定时器
function throttle(func, wait) {
    let timeout = null;
    return function() {
        let context = this
        let args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }
}
let b = throttle(() => {
    console.log("sdsds")
}, 2000);
b();
b();