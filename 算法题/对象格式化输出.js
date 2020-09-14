const info = {
    name: '子君',
    sex: '男',
    gzh: '前端有的玩',
    job: '划水摸鱼工程师'
}
const props = [{
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'sex',
        label: '性别'
    },
    {
        prop: 'gzh',
        label: '公众号'
    },
    {
        prop: 'job',
        label: '工作'
    }
];
//一、
// function combo(info, props) {
//     // 请实现此函数
//     for (let i in props) {
//         if (info[props[i].prop]) {
//             info[props[i].label] = info[props[i].prop];
//             delete info[props[i].prop];
//         }
//     }
//     return info
// }
// combo(info, props)
// console.log(info)

// 二、
function combo(info, props) {
    return props.reduce((obj, item) => {
        //这里的obj是个累加器，本来应该是item的第一项，但是我们在后面传了个{}，这个{}也就是callback函数的第一个参数，然后慢慢累加东西。item是每个项{prop: 'name',label: '姓名'}
        obj[item.label] = info[item.prop]
        return obj
    }, {})
}
console.log(combo(info, props))