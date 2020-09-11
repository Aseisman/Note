function F() {
    this.y = 2;
}

function fn() {
    this.x = 1;
}
var c = new fn();
console.log(c)