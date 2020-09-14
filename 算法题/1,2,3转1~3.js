//首先变成[1,2,3,undefined,5,undefind,7,8,undefined,10]
const str = "1,2,3,5,7,8,10";

function translate(str) {
    const array = str.split(",").reduce((arr, item) => {
        arr[parseInt(item)] = item;
        return arr;
    }, [].fill(undefined));
    let start = undefined,
        current;
    const result = [],
        len = array.length;
    for (let i = 0; i < len + 1; i++) {
        current = array[i];
        if (current && start === undefined) {
            start = current;
        }
        if (start && current === undefined) {
            result.push(start === array[i - 1] ? start : `${start}~${array[i - 1]}`);
            start = undefined;
        }
    }
    return result.join(",");
}
// 输出 1~3, 5, 7~8, 10
console.log(translate(str));