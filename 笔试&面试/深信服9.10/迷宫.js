function migong(s) {
    let mi = []
    let str = s.split(";");
    console.log(str)
    for (let i in str) {
        mi.push(str[i].split(","));
    }
    let flag = false;
    let huisu = function(startx, starty) {
        if (flag == true) return;
        if (startx == mi.length - 1 && starty == mi[0].length - 1 && mi[startx][starty] == 0) { flag = true; return; }
        if ((startx < mi.length && starty < mi[0].length) && mi[startx][starty] == 0) {
            huisu(startx + 1, starty);
            huisu(startx, starty + 1);
        }
        return;
    }
    huisu(0, 0);
    return flag;
}
console.log(migong("0,0,0,1,1;1,1,0,0,1;1,1,1,0,0"));