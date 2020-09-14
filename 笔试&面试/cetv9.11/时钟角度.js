//第一题：时钟角度
//求时针与分针与秒针之间各自的角度差的最小值

//时针与分针
function calcul(h, m) {
    if (h < 24 && m < 60) {
        //时针每走一小时30度，一分钟走0.5度
        //时针走的度数
        let num1 = h % 12 * 30 + m * 0.5;
        //分针每走一分钟是6度
        //分针走的度数
        let num2 = m * 6;
        //夹角
        return Math.abs(num1 - num2);
    }
}
console.log(calcul(5, 50));