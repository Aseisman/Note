//1.冒泡排序
function bubbleSort(arr) {
    //小到大
    var len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    console.log(arr);
    //方式二
    // for(let i=0;i<len-1;i++){
    //     for(let j=len-1-i;j>0;j--){
    //         if(arr[j]<arr[j-1]){
    //             [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
    //         }
    //     }
    // }
    //大到小
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 + i; j++) {
            if (arr[j] < arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    console.log(arr);
    return arr;
}
bubbleSort([5, 2, 4, 6, 1, 7]);

//2.选择排序
function selectSort(arr) {
    //小到大
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let temp = i;
        for (let j = i; j < len; j++) {
            if (arr[temp] > arr[j]) {
                temp = j;
            }
        }
        [arr[temp], arr[i]] = [arr[i], arr[temp]]
    }
    console.log(arr)
    return arr
}
selectSort([5, 2, 4, 6, 1, 7])

//3.插入排序
//以第一个开始，把这个元素认定为已经排序好了的元素；
//从第二个开始，与前一个比较，如果比前一个小，就继续往前比较，直到大，就把这个数插进去这个位置。
//继续循环。
function insertionSort(arr) {
    let len = arr.length;
    var preIndex, temp;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        temp = arr[i];
        while (temp < arr[preIndex] && preIndex >= 0) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = temp;
    }
    console.log(arr);
    return arr;
}
insertionSort([5, 2, 4, 6, 1, 7])

//4.快速排序
//