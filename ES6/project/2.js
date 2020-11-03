/*
 * 字节：手写函数节流throttle及在vue中的应用
 * 延展：函数防抖「含触发边界处理」+ JS高阶编程技巧及其实战应用+ 图片延迟加载的N种实现方案 ！！
 */

// 防抖 VS 节流 ：频繁触发事件或者操作的时候
//   + 频繁操作(自己规定时间)中只会识别一次
//   + 频繁操作中，按照自己设定的时间，每间隔多长时间识别一次
function throttle(func, wait) {
    typeof wait === "undefined" ? wait = 500 : null;
    let timer = null,
        previous = 0;
    return function proxy(...params) {
        let now = new Date(),
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 立即执行
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
}
document.body.onmousemove = throttle(function () {
    console.log('OK');
});
// document.body.onmousemove=proxy;