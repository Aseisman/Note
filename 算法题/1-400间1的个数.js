var countDigitOne = function(n) {
    // 这种题就要找规律，与之前做的那道找某个位置是什么数字的类似
    // 现在有一个函数f(n)，代表n位上有多少个1
    //         f(0) = 0
    //  0~9    f(1) = 1
    //  0~99   f(2) = 10 + 10*f(1) = 20  (10+为  10~19中十位有10个1)
    //  0~999  f(3) = 100 + 10*f(2) = 300  (100+为  100~199中百位有100个1)
    //  0~9999 f(4) = 1000 + 10*f(3) = 4000 (...)
    // ...
    // 如 5467 中有多少个1
    // 1. 0~5000中有 5 * f(3) + 1000 = 2500个
    // 2. 0~400中有 4 * f(2) + 100 = 180个
    // 3. 0~60中有 6 * f(1) + 10 = 16个
    // 4. 0~7中有 7 * f(0) + 1 = 1个
    // 所以5467中有2697个1

    let f = [0, 1, 20, 300, 4000, 50000, 600000, 7000000, 80000000, 900000000, 10000000000];
    let res = 0;
    let str = n + '';
    const len = str.length;
    let m = Math.pow(10, len - 1);
    let p = len - 1; //解析中的n
    for (let i = 0; i < len; i++) {
        res += str[i] * f[p];
        if (str[i] === '1' && i !== len - 1) { //中间为1时后面的每一个数都要加一个1，再加上第一个1，比如12中10，11,12三个数的十位有3个1，需要加上，也就是2+1个1要加上
            res += Number(str.slice(i + 1)) + 1;
        } else if (str[i] === '1' && i === len - 1) { //解决末尾为1但未加上的bug
            res += 1;
        }
        if (str[i] > 1) res += m;
        m /= 10, p -= 1;
    }
    return res;
};
console.log(countDigitOne(9999));