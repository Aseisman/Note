/* 
配置网络时，经常需要配置端口号，但是从UI传进来的端口格式虽然是正确的，但经常出现端口有交叉、或者重复的，为了更加友好，需要写一个函数把这些重复或者交叉的端口号格式化成最简单的形式。

初始条件：
1、输入的端口支持多个，多个端口号之间用英文的逗号“,”分隔。例如：80,88
2、输入的端口支持范围，起始端口跟结束端口用“-”分隔。例如：80-88
3、输入的起始端口号小于结束端口号
4、端口port满足：1 <= port <= 65535
5、用户输入的端口号已经是合法的，无需再做判断，仅需要合并后输出即可

输入描述
输入只有一行，即未合并过的端口号

输出描述
合并端口后输出结果，如果单个端口号可以用区间的形式表示，则优先使用区间；输出结果要按照端口号从小到排列

示例1
输入
6553,1,-655,5-1010,1011,1012
输出
1-1012,6553

示例2
输入
5,4,3,2,100,103
输出
2-5,100-101,103
*/
// 6553,1-655,5-1010,1011,1012
// 1-1012,6553
let a = function(t) {
    let res = [];
    let arr = t.split(",");
    arr.sort((a, b) => {
        if (a.indexOf('-') != -1) {
            if (b.indexOf('-') != -1) return a.slice(0, a.indexOf('-')) - b.slice(0, b.indexOf('-'));
            else {
                return a.slice(0, a.indexOf('-')) - b;
            }
        } else {
            if (b.indexOf('-') != -1) return a - b.slice(0, b.indexOf('-'));
            else {
                return a - b;
            }
        }
    })
    let len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        if (arr[i].indexOf('-') != -1) {
            //i是范围
            if (arr[i - 1].indexOf('-') != -1) {
                // i-1 也是范围
                //1-3 2-4
                let f1 = arr[i].slice(0, arr[i].indexOf('-')); //头
                let f2 = arr[i - 1].slice(0, arr[i - 1].indexOf('-')); //头
                let l1 = arr[i].slice(arr[i].indexOf('-') + 1); //尾
                let l2 = arr[i - 1].slice(arr[i - 1].indexOf('-') + 1); //尾
                if (parseInt(l2) > parseInt(f1) && parseInt(l1) > parseInt(l2)) {
                    arr[i - 1] = f2 + '-' + l1;
                    arr = arr.slice(0, i).concat(arr.slice(i + 1));

                }
                //1-2 3-4
                else if (parseInt(l2) + 1 == parseInt(f1)) {
                    arr[i - 1] = f2 + '-' + l1;
                    arr = arr.slice(0, i).concat(arr.slice(i + 1));

                }
                //1-4 2-3
                else if (parseInt(l2) > parseInt(l1)) {
                    arr = arr.slice(0, i).concat(arr.slice(i + 1));

                }
                //1-2 2-3
                else if (parseInt(l2) == parseInt(f1)) {
                    arr[i - 1] = f2 + '-' + l1;
                    arr = arr.slice(0, i).concat(arr.slice(i + 1));

                }
            } else {
                // i-1不是范围
                //1011 1012-1013
                let fn = arr[i].slice(0, arr[i].indexOf('-'));
                if (parseInt(arr[i - 1]) + 1 == fn) {
                    arr[i] = arr[i - 1] + arr[i].slice(arr[i].indexOf('-'));
                    //把arr[i-1]删掉
                    arr = arr.slice(0, i - 1).concat(arr.slice(i));

                }
            }
        } else {
            //i不是范围
            if (arr[i - 1].indexOf('-') != -1) {
                // i-1 是范围
                if (parseInt(arr[i - 1].slice(arr[i - 1].indexOf('-') + 1)) + 1 >= arr[i]) {
                    arr[i - 1] = arr[i - 1].slice(0, arr[i - 1].indexOf('-') + 1).concat(arr[i]);
                    arr = arr.slice(0, i).concat(arr.slice(i + 1));

                }
            } else {
                // i-1不是范围
                if (parseInt(arr[i - 1]) + 1 == arr[i]) {
                    //1012+1==1013
                    //arr是数组，arr[i]是string,
                    arr = arr.slice(0, i - 1).concat([arr[i - 1] + '-' + arr[i]], arr.slice(i + 1));

                }
            }
        }
    }
    return arr;
};
let demp = a('1014,1-655,5-1010,1011,1012');
let aaa = a('1-3,5-10,4-7,14-17');
console.log(demp);
console.log(aaa);