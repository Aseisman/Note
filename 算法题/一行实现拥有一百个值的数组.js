//请用一行代码实现拥有一百个值的数组，且值是数组下标
new Array(100).fill(0).map((item, idx) => idx);
//Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
Array.from({ length: 100 }, (item, idx) => idx)
Array.from("*".padEnd(100, '*'), (i, idx) => idx)
new Array(100).fill(0).forEach((item, idx) => idx)