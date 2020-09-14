// 16进制格式#ff0000
//支持大小写
//输入需要支持的16进制颜色编写#CCC
//输出：=>rbg(xxx,xxx,xxx)
//如果不足16进制，就返回原始的字符串

//#FFFFFF
//rgb(255,255,255)

function tranRgb(str) {
    //先判断返回原始字符串
    let s = str.slice(1)
    let j = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15
    }
    let res = 'rgb(';
    if (!(s.length == 3 || s.length == 6)) {
        return str;
    }
    if (s.length == 6) {
        for (let i = 0; i < s.length; i = i + 2) {
            let temp = j[s[i]] * 16 + j[s[i + 1]];
            res += temp;
            if (i < 4) res += ","
        }
        return res + ")";
    } else if (s.length == 3) {
        for (let i = 0; i < 3; i++) {
            let temp = j[s[i]] * 16 + j[s[i]];
            res += temp;
            if (i < 2) res += ","
        }
        return res + ")"
    }
    return str;
}
console.log(tranRgb('#CCC'));