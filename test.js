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

function solution(harmList, totalHarm) {
    // write code here
    // let item = -1;
    // let huisu = function(total, it, res) {
    //     if (total < 0) {
    //         return;
    //     }
    //     if (total == 0) {
    //         if (item == -1) item = res;
    //         if (item > res) item = res;
    //         return;
    //     }
    //     for (let i = it; i < harmList.length; i++) {
    //         res++;
    //         huisu(total - harmList[i], i, res);
    //         res--;
    //     }
    // }
    // huisu(totalHarm, 0, 0);
    // console.log(item);
    // return item;

    //动态规划
    // const dp = [1]
    // harmList.sort((a, b) => a - b);
    // for (let i = 1; i <= totalHarm; i++) {
    //     dp[i] = 0
    //     for (let num of harmList) {
    //         if (i < num) break;
    //         dp[i] += dp[i - num];
    //     }
    // }
    // return dp[totalHarm];
}
console.log(solution([2, 3], 1));

// function solution(data) {
//     // write code here
//     // let digui=function(){
//     //     data.indexOf(']')
//     // }
//     let a = data.indexOf('['); //第一个]
//     let b = data.indexOf(']'); //第一个[
//     while (a != -1 && b != -1 && a < b) {
//         data = data.substring(0, a) + data.substring(a + 1, b) + data.substring(b + 1);
//         a = data.indexOf('[');
//         b = data.indexOf(']');
//     }
//     let c = data.indexOf('[');
//     let d = data.indexOf(']');
//     let e = data.indexOf('.')
//     while (c != -1 && e != -1 && c < e) {
//         data = data.substring(0, c) + data.substring(c + 1, e) + data.substring(e + 1);
//         e = data.indexOf('.');
//         c = data.indexOf('[')
//     }
//     while (d != -1 && e != -1 && e < d) {
//         data = data.substring(0, e) + data.substring(e + 1, d) + data.substring(d + 1);
//         d = data.indexOf(']');
//         e = data.indexOf('.')
//     }
//     let i = 0
//     while (data[i] && data[i] == ".") {
//         i++;
//     }
//     if (data.length == 0) return true;
//     if (data.length == i) {
//         return true;
//     } else return false;

// }
// console.log(solution("[].]]"))

// function solution(data) {
//     // write code here
//     let min = (a, b) => { return a < b ? a : b }
//     let n = data.length;
//     let left = 0,
//         right = n - 1;
//     let maxA = (right - left) * min(data[right], data[left]);
//     while (left < right) {
//         if (data[left] < data[right]) {
//             left++;
//         } else {
//             right--;
//         }
//         if (maxA < (right - left) * min(data[right], data[left])) {
//             maxA = (right - left) * min(data[right], data[left]);
//         }
//     }
//     return maxA;

// }
// console.log(solution([1, 8, 6, 2, 5, 4, 8, 3, 7]));

// function solution(tangCards, wangCards) {
//     // write code here
//     let res = 0;
//     tangCards.sort((a, b) => { return a - b })
//     wangCards.sort((a, b) => a - b);
//     wangCards.push(wangCards.shift());

//     for (let i = 0; i < wangCards.length; i++) {
//         if (tangCards[i] < wangCards[i]) res += 3;
//         else if (tangCards[i] == wangCards[i]) res++;
//     }
//     return res;
// }
// console.log(solution([4, 7, 9], [7, 4, 9]));