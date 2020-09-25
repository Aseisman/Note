//工厂加工零件，0-9十种零件，每次加工需要消耗一个单位时间，连续加工相同的零件需要等待n个单位时间去将我们的零件生产出来。
//即 1, 1, 1, 2, 3, 3, 3 n=2
//1 空两个单位时间 1 空两个单位时间 1
//3 空两个单位时间 3 空两个单位时间 3
//求最短时间。
//  答案：
//  1 3 2 1 3 空 1 3
//  8
function a(tasks, n) {
    if (tasks.length == 0) return 0;
    let map = new Map();
    n = n + 1;
    let res = [];
    let flag = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (map.has(tasks[i])) {
            map.set(tasks[i], map.get(tasks[i]) + 1);
        } else {
            map.set(tasks[i], 1)
        }
    }
    let cc = [...map];
    console.log(cc);
    cc.sort((a, b) => {
        return b[1] - a[1];
    })
    cc.forEach((value) => {
        let temp = flag;
        if (value[1] > 1) {
            for (let i = temp; i < (value[1] + flag); i++) {
                res[temp] = value[0];
                temp += n;
            }
            flag++;
            while (res[flag] != undefined) {
                flag++;
            }
        } else {
            res[temp] = value[0];
            flag++;
            while (res[flag] != undefined) {
                flag++;
            }
        }
    })
    return res.length
}
console.log(a([1, 1, 1, 2, 3, 3, 3], 3));