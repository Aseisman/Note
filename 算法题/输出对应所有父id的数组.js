// 请实现下面代码中的函数fn,使其可以输出指定id对应的所有父id
const data = [{
    id: 1,
    name: '222',
    children: [{
        id: 2,
        name: '34',
        children: [{
            id: 112,
            name: '334',
        }, {
            id: 113,
            name: '354',
        }]
    }, {
        id: 333,
        name: "333",
    }]
}]

function fn(id) {
    //回溯算法
    var res = [];
    let backtrack = function(root, temp) {
        root = root || [];
        for (let i = 0; i < root.length; i++) {
            temp.push(root[i].id);
            if (root[i].id == id) {
                res = [...temp];
                return;
            } else {
                backtrack(root[i].children, temp);
                temp.pop();
            }
        }
    }
    backtrack(data, [])
    return res;
}

// 输出  [1, 2, 112]
console.log(fn(112))