const entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

// 要求转换成如下对象
const output = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

function transform(entry) {
    const obj = {}
    Object.entries(entry).forEach(([key, value]) => {
        let current = obj; //current是指针，在后面的foreach中用单链表的方式去存储对象。
        const keys = key.split('.')
        const len = keys.length
        console.log(len, keys)
        keys.forEach((item, index) => {
            current = current[item] = index === len - 1 ? value : current[item] || {};
            //current->obj;
            //current[a]属于obj;
            //current=current[a],指针current指向current[a]这个内存;
        })
    })
    return obj
}
console.log(transform(entry))