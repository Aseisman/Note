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


// function a() {}
// a.prototype.b = 200;
// let aa = new a();
// console.log(aa.b)
// aa.b = 100;
// console.log(a.prototype.b)
// console.log(a.b)

// function a() {}
// a.prototype.b = 200;
// let aa = new a();
// a.prototype.b = 100;
// console.log(aa.b);
// console.log(a)