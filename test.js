function quicksort(arr) {
    if (arr.length <= 1) return arr;
    var index = Math.floor(arr.length / 2);
    var p = arr.splice(index, 1)[0];
    var left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < p) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return quicksort(left).concat([p], quicksort(right));
}
let arr = [1, 0, 5, 33, 11, 56, 33, 123, 666, 111, 45, 3, 21312]
console.log(quicksort(arr));

let aa = [
    [1, 2],
    [3, 4],
    [5, 6]
]
let li = aa.length;
let lj = aa[0].length;
// for (let j = 0; j < lj; j++) {
//     for (let i = 0; i < li; i++) {
//         console.log(aa[i][j]);
//     }
// }

// [
//     [7,4,1],
//     [8,5,2],
//     [9,6,3]
// ]

// [
//     [1,2],
//     [3,4],
//     [5,6]
// ]
// [
//     [5,3,1],
//     [6,4,2]
// ]

for (let i = 0; i < li; i++) {
    for (let j = 0; j < lj; j++) {
        if (i == j) {

        } else if (i < j) {
            [aa[i][j], aa[j][i]] = [aa[j][i], aa[i][j]];
        }
    }
    //123,147,
    aa[i].reverse();
}

j = 0 - lj;
i = li - 0;
console.log(aa);