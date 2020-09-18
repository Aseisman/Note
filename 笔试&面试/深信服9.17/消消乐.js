//字符串消消乐
let a = function(t) {
    if (t.length == 0) { return 'SANGFOR'; }
    let temp = 1;
    let index = -1;
    for (let i = 0; i < t.length; i++) {
        if (t[i] == t[i + 1]) {
            temp++;
            if (index == -1) {
                index = i;
            }
        } else if (temp != 1 && t[i] != t[i + 1]) break;
    }
    //找不到就返回；
    if (temp == 1 && index == -1) { return t; }
    //取出temp后
    let res = '';
    if (temp >= 3) {
        //消除前后一个
        if (index != 0) {
            res = t.substring(0, index - 1).concat(t.substring(index + temp + 1));
        } else {
            res = t.substring(index + temp + 1);
        }
    } else {
        if (index != 0) {
            res = t.substring(0, index).concat(t.substring(index + temp));
        } else {
            res = t.substring(index + temp);
        }
    }
    return a(res);
}
console.log(a('aaaaaffssfdddss'))

// aaaaaffssfds  -> a有5个，消除5个a和前后各一个字母（大于等于三的时候消除），即fssfds  ->s有2,消除两个s,即 ffds ->两个ff->ds