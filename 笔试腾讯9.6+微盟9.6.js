// 微盟笔试题：在字符串中间添加一个+号，微盟微盟云==>微盟+微盟云
function addIt(str) {
    // write code here
    let len = str.length
    console.log(len);
    if (len % 2 == 0) {
        //偶数
        var prestr = str.slice(0, len / 2);
        var oldstr = str.slice(len / 2);
        return prestr + "+" + oldstr
    } else {
        var newstr = str.slice(((len - 1) / 2));
        var prestr = str.slice(0, (len - 1) / 2);
        return prestr + "+" + newstr
    }
}
// 微盟笔试题：两个字符串互为xx串，abc<=>acb，调换顺序后可以变成对方。
function isEctopic(first, second) {
    // write code here
    let map = new Map()
    for (let i in first) {
        if (map.has(first[i])) {
            map.set(first[i], map.get(first[i]) + 1)
        } else {
            map.set(first[i], 1)
        }
    }
    for (let i in second) {
        if (map.has(second[i])) {
            if (map.get(second[i]) > 0) {
                map.set(second[i], map.get(second[i]) - 1)
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    let flag = true;
    map.forEach(item => {
        if (item > 0 && flag == true) {
            flag = false;
        }
    })
    return flag;
}
// 微盟笔试题 送巧克力，一大片巧克力(数组s)上面写着数字，然后日期d 月份m 切出一小片巧克力，使得切的这片巧克力的数字相加==d，这片巧克力要有m个数字
//也就是数组s，求长度m，相加得到和为d的子数组。
function iLoveYou(s, d, m) {
    // write code here
    //d是日期 总数
    if (s.length == 0) return 0;
    let sum = d;
    let tip = m;
    let res = 0;
    //m是月份 切割长度，
    for (let i = 0; i < s.length - m + 1; i++) {
        let sum = 0;
        for (let j = 0; j < tip; j++) {
            sum += s[i + j];
        }
        if (sum == d) {
            res++;
        }
    }
    return res;
}
// 腾讯笔试题：两个升序数组合并成一个升序数组
function marge(s1, s2) {
    if (s1.length == 0) {
        return s2;
    } else if (s2.length == 0) {
        return s1;
    } else if (s1.length == 0 && s2.length == 0) {
        return;
    }
    let p1 = 0;
    let p2 = 0;
    let newarr = [];
    while (p1 < s1.length || p2 < s2.length) {
        if (s1[p1] < s2[p2]) {
            newarr.push(s1[p1]);
            p1++;
        } else if (s1[p1] > s2[p2]) {
            newarr.push(s2[p2])
            p2++;
        } else {
            if (s1[p1]) newarr.push(s1[p1])
            if (s2[p2]) newarr.push(s2[p2])
            p1++;
            p2++;
        }
    }
    // print(newarr)
    console.log(newarr.join())
}
//腾讯笔试题：中位数：
//第一行输入n数字，表示数组长度
//第二行输入n个数字合成数组
//输出：n行，每一行的数字是数组除去对应的这个数后剩余数的中位数。
let s2 = [2, 4, 3, 6, 1, 5]
let len = s2.length;
let temp = [...s2].sort(function(a, b) { return a - b; });
for (let i = 0; i < len; i++) {
    if (s2[i] < temp[len / 2]) {
        print(temp[len / 2 - 1])
    } else {
        print(temp[len / 2])
    }
}

//腾讯笔试题：字符串消除：
//43211234=>432234=>4334=>44=>"" return 4 输出消除了几次
//101=>101 return 0

arr = ['43211234', '101']
var xiaochu = function(str, time) {
    if (str.length == 0) return time;
    let i;
    for (i = 0; i < str.length - 1; i++) {
        if (str[i] == str[i + 1]) {
            break;
        }
    }
    if (i == str.length - 1) {
        return time;
    }
    let s1 = str.slice(0, i);
    let s2 = str.slice(i + 2);
    let s = s1 + s2;
    time++;
    return xiaochu(s, time);
}
console.log(xiaochu(arr[0], 0));
console.log(xiaochu(arr[1], 0));