// 任务列队
//宏仁务：script、setTimeout、setInterval、I/O、setImmediate(node环境)
//微任务：promise、mutationObserver、process.nextTick()

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});

console.log('script end');

// 整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 script start
// 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中
// 遇到 Promise，其 then函数被分到到微任务 Event Queue 中,记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2
// 遇到 console.log，输出 script end

//1、主线程：一开始第一个宏仁务进入；遇到其他宏仁务，放置到宏仁务列队中，遇到微任务，放置到微任务列队中
//2、然后等主线程宏仁务做完，就检查是否有微任务，然后就做完微任务，
//3、微任务做完后，再看看有没有宏仁务，有的话就继续做宏仁务。