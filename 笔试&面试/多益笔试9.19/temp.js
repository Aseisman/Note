// let a = function(M, N) {
//     var table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     var res = [];
//     let item = 0;
//     for (let i = 0; i < M; i++) {
//         let temp = [];
//         for (let j = 0; j < N; j++) {

//         }
//     }
// };
// // 10 11
let res = ['A B C D E F G H I J K',
        'L M N O P Q R S T U L',
        'K P Q R S T U V W V M',
        'J O L M N O P Q X W N',
        'I N K Z A B C R Y X O',
        'H M J Y F E D S Z Y P',
        'G L I X W V U T A Z Q',
        'F K H G F E D C B A R',
        'E J I H G F E D C B S',
        'D C B A Z Y X W V U T'
    ]
    // a(10, 11)


let pipei = function(ns, np) {
    if (ns === np) return true;
    var i;
    for (i = 0; i < ns.length; i++) {
        if (ns[i] != np[i]) break;
    }
    let oldp = ns.slice(0, i);
    let news = ns.slice(i);
    let newp = np.slice(i);
    if (newp[0] == "*") {
        //0-多
        //mimimi mi*mi
        //*是2个
        let temp = newp[1];
        if (temp != '*' || temp != '+' || temp != '.') {
            let j = news.indexOf(temp); //找到news中对应的newp的下一个数
        }

        // let j
        // for (j = 0; j < news.length; j++) {
        //     if (newp[j] !== news[i]) {
        //         //匹配的时候可以继续忽视*往下走。
        //         break;
        //     }
        // }
        // if(j==news.length)return true;
        // else{
        //     if(j==0){

        //     }else if()
        // }
    } else if (newp[0] == ".") {
        //单个
        return pipei(ns, oldp + news[0] + newp.slice(1))
    } else if (newp[0] == '+') {
        //1-多
    }
}
let ttt = piper('mihoyo', 'mih.*o')
console.log(ttt)