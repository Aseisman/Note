// let line=read_line();
// let lines=line.split(' ');
// let m=lines[0];
// let n=lines[1];
// let re=m-n;
// let res=[];
// if((re+'').length<6){
//     for(let i=0;i<(6-(re+'').length),i++){
//         //只有后面几位是可以改动的，前面几位都是固定的
//         res[i]=m[i];
//         //把几个固定的放在数组中
//     }
//     print(res);
// }else{

// }
// if(parseInt(lines[1])>parseInt(lines[0]){ print('No') return;}
// if(lines[1]>lines[0]){ print('No') return;}
// let i=0,j=0;
// let res=0;
// for(i=0;i<s.length;i++){
//     if(s[i]==t[j]&&j<t.length){
//         j++;
//         res=res+i+1;
//     }
// }
// if(j==t.length-1){
//     //j到头了。。可行
//     print('Yes');
//     print(res)
// }


// let line = read_line();
// let lines = line.split(' ');
// let m = lines[0];
// let n = lines[1];
// let re = m - n;
// let res = 0;
// let arr = [];
// for (let i = parseInt(m); i <= parseInt(n); i++) {
//     let temp = i;
//     while (temp > 0) {
//         arr.unshift(temp % 100); //最后一位丢进去;
//         temp = parseInt(temp / 100);
//     }
//     if (arr.length == 3) {
//         let a = arr[0].split('');
//         let b = arr[0].split('');
//         let c = arr[0].split('');
//         if (arr[0] + arr[1] == arr[2] && arr[0] >= 10 && arr[1] >= 10 && arr[2] >= 10) res++;
//     }
// }
// print(res);


//1、暴力for循环
//100000 1100000
//2、构造6个数字，比如A只能是1，B只能是0 or 1 C d e f 可以是0-9
//构造好一点吧,
//暴力 也好麻烦.
let line = read_line();
let lines = line.split(' ');
let m = lines[0];
let n = lines[1];
let re = m - n;
let res = 0;
let arr = [];
//第一步，找出这6个数的取值范围；
//假设re是个6位数 or 5位数
if (re >= 100000) {
    //6位数
    //则后面5位可以是0-9;
    //a则是0-(n-re)/1000000
    arr[0] = parseInt((n - re) / 100000);
    for (let i = 1; i <= 5; i++) {
        arr[i] = 9;
    }
    //arr[x,9,9,9,9,9]
    for (let a = 1; a < arr[0]; a++) {
        for (let b = 0; b < arr[1]; b++) {
            if (b != a) {
                for (let c = 0; c < arr[2]; c++) {
                    if (c != a && c != b) {
                        for (let d = 0; d < arr[3]; d++) {
                            if (d != a && d != b && d != c) {
                                for (let e = 0; e < arr[4]; e++) {
                                    if (e != a && e != b && e != c && e != d) {
                                        for (let f = 0; f < arr[5]; f++) {
                                            if (f !== a && f != b && f != c && f != d && f != e) {
                                                if (parseInt('' + a + b) + parseInt('' + c + d) == parseInt('' + e + f)) {
                                                    res++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} else {
    //5位数
    arr[0] = 0;
    for (let i = 1; i <= 5; i++) {
        arr[i] = 9;
    }
    //arr[x,9,9,9,9,9]
    for (let b = 0; b < arr[1]; b++) {
        if (b != a) {
            for (let c = 0; c < arr[2]; c++) {
                if (c != a && c != b) {
                    for (let d = 0; d < arr[3]; d++) {
                        if (d != a && d != b && d != c) {
                            for (let e = 0; e < arr[4]; e++) {
                                if (e != a && e != b && e != c && e != d) {
                                    for (let f = 0; f < arr[5]; f++) {
                                        if (f !== a && f != b && f != c && f != d && f != e) {
                                            if (parseInt('' + a + b) + parseInt('' + c + d) == parseInt('' + e + f)) {
                                                res++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    print(res);
}