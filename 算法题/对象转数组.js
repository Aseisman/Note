const obj = { 1: 111, 2: 222, 5: 555 };

function translate(obj) {
    // 请在此处添加代码
    let res = new Array(13).fill(null);
    for (let i in obj) {
        res[i] = obj[i]
    }
    res.splice(0, 1);
    return res;
}
// 输出 `[111, 222, null, null, 555, null, null, null, null, null, null, null]`
console.log(translate(obj));