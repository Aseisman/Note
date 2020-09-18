//输入一个日期，一个格式，按照格式输出
//Y年 m月 d日 H小时 i 分 s秒
//注意，格式中变的只有上面6个字母
// '2008-08-08 20:00:01', 'H--i--s Y--m-M-d'====>20--00--01 2008-08-08

let a = function(t, rgx) {
    let time = new Date(t);
    let da = ['Y', 'm', 'd', 'H', 'i', 's'];
    let res = "";
    let data = [time.getFullYear(),
        time.getMonth() + 1 + '',
        time.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
    ];
    if (data[1] < 10) {
        data[1] = '' + 0 + data[1]
    }
    if (data[2] < 10) {
        data[2] = '' + 0 + data[2]
    }
    if (data[3] < 10) {
        data[3] = '' + 0 + data[3]
    }
    if (data[4] < 10) {
        data[4] = '' + 0 + data[4]
    }
    if (data[5] < 10) {
        data[5] = '' + 0 + data[5]
    }
    for (let t of rgx) {
        if (da.indexOf(t) != -1) {
            console.log(t, da.indexOf(t))
            res += data[da.indexOf(t)]
        } else {
            res += t;
        }
    }
    console.log(res);
}
a('2008-08-08 20:00:01', 'H--i--s Y--m-M-d')