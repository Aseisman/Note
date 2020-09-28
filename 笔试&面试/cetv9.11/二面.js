// 一根绳子从头烧到尾1一个小时，
// 不均匀
// 无限使用绳子
// 判断出来是15分钟

//防抖手撕
function a(fn, wait) {
    var timer = null;
    if (timer) {
        timer = null;
    }
    timer = setTimeout(fn, wait);
}

function test() {
    console.log('aaa');
}
let button = document.getElementById('button')
button.addEventListener(
    a(test, 800)
)


//promise发送10个请求，不确保10个请求中是否有数据是下一个请求需要的。
function request() {
    console.log("aaa");
    return '111';
}
async function b() {
    let temp = '';
    for (let i = 0; i < 10; i++) {
        let res = await a(temp, 'url');
        if (res) //有数据是我们想要的
        {
            temp = res.data;
        } else {
            temp = 'sasadsad0';
        }
    }
}

function a(data, url) {
    new Promise((resolve, reject) => {
        request();
    }).then(res => {
        return res;
    })
}



//快排
// function quicksort(arr) {
//     if (arr.length <= 1) return arr;
//     var index = Math.floor(arr.length / 2);
//     var p = arr.splice(index, 1)[0];
//     var left = [],
//         right = [];
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] < p) left.push(arr[i]);
//         else right.push(arr[i]);
//     }
//     return quicksort(left).concat([p], quicksort(right));
// }
// let arr = [1, 0, 5, 33, 11, 56, 33, 123, 666, 111, 45, 3, 21312]
// console.log(quicksort(arr));

//矩阵翻转,n*n,n*m
// let aa = [
//     [1, 2],
//     [3, 4],
//     [5, 6]
// ]
// let li = aa.length;
// let lj = aa[0].length;
// // for (let j = 0; j < lj; j++) {
// //     for (let i = 0; i < li; i++) {
// //         console.log(aa[i][j]);
// //     }
// // }

// // [
// //     [7,4,1],
// //     [8,5,2],
// //     [9,6,3]
// // ]

// // [
// //     [1,2],
// //     [3,4],
// //     [5,6]
// // ]
// // [
// //     [5,3,1],
// //     [6,4,2]
// // ]

// for (let i = 0; i < li; i++) {
//     for (let j = 0; j < lj; j++) {
//         if (i == j) {

//         } else if (i < j) {
//             [aa[i][j], aa[j][i]] = [aa[j][i], aa[i][j]];
//         }
//     }
//     //123,147,
//     aa[i].reverse();
// }

// j = 0 - lj;
// i = li - 0;
// console.log(aa);