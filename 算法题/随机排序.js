var arr=[1,2,3,4];
//重新生成一个数组
function randomSort(){
    var a=[...arr];
    var res=[];
    for(let i=0,len=a.length;i<len;i++){
        var randomIndex=Math.floor(Math.random()*a.length);
        res[i]=a[randomIndex];
        //删掉原数组中的数
        a.splice(randomIndex,1);
    }
    return res;
}
//交换着来
function randomSort2(){
    var a=[...arr];
    for(let i=0;i<a.length;i++){
        var randomIndex=i+Math.floor(Math.random()*(a.length-i));
        [a[i],a[randomIndex]]=[a[randomIndex],a[i]];
    }
    return a;
}
console.log(randomSort());
console.log(randomSort2());
