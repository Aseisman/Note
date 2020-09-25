let aa = {
    temp: 1,
    bb: {
        cc: function() {
            console.log(this.temp);
        }
    }
}
let a1 = aa.bb;
let a2 = aa.bb.cc;
aa.bb.cc();
a1.cc();
a2();