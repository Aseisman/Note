- script只能用来引入文件或者写东西（src与代码不能同时存在，如果引入了src，代码无效）

1、trim()函数：去除前后空格  
2、localstorage:
```
// 本地存储持久性
    var STORAGE_KEY = "todos-vuejs-2.0";
    var todoStorage = {
        //初始化并返回todos列表 和 初始化唯一主键uid
        fetch: function() {
            var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            todos.forEach(function(todo, index) {
                todo.id = index;
            });
            todoStorage.uid = todos.length; //唯一id,默认0
            return todos;
        },
        //保存todos列表到localStorage (更新覆盖)
        save: function(todos) {
            //转换todos数组为json格式数据并存储到Item中
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    };
```
3、watch的三个属性：
```
        //深度监听todos数组发送改变持久化到localStorage
        watch: {
            todos: {
                handler: function(todos) {
                    todoStorage.save(todos);
                },
                //immediate:true初始化的时候,立即触发handler方法
                deep: true
            }
        },
```
4、v-cloak：数据没有渲染时，会先显示{{message}}，加载完成后再渲染，用v-cloak可以防止这样。  
5、dataurl:webpack打包的时候都会转换成dataurl，提高加载速度
```
url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
```
6、dblclick 双击触发函数  

7、@keyup.enter=""回车键松开时触发函数；  
@blur:失去焦点触发函数  
@keyup.esc:esc触发函数  

8、自定义事件：
```
        directives: {
            "todo-focus": function(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        },
        //然后我们在html中就可以用自定义的指令：v-todo-focus
```
9、filter：  
10、computed与watch的区别  
11、  
```
//设置一个缓存字段保存title，取消修改时可以还原默认值
                    this.beforeEditCache = todo.title;	
```

12、组件化开发：代码重用
```
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  // 2.每个实例（独立的作用域）可以维护一份被返回对象的独立的拷贝：
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
//两个参数：data,template
```
- 一个组件的 data 选项必须是一个函数
- 全局注册与局部注册：  
全局注册：
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
- 组件传值之：父传子props
```
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```
- 组件传值之：子传父```||```父监听子： ```$emit(eventName,[...args])```
父定义一个eventName方法，然后子用$emit调用方法并且赋值。

13、插槽：在子组件中占位置slot，然后在父组件写template；
如
```
//父元素
<zizujian>插槽内容 </zizujian>

//子
<div><slot></slot></div>
```

- 注意：插槽在父组件写，则为父组件的作用域，访问不到子作用域的数据

14、 动态渲染组件：is属性
```
<!-- 2.动态渲染组件 is 属性指定组件名-->
<component :is="demo" class="tab"></component>

//3.动态拼接组件名实现 动态渲染组件
    computed: {
        demo:function(){
            return "tab-" + this.currentTab.toLowerCase();//返回当前点击对应的界面
        }
    }
```
15、keep-alive：不被选中的组件会缓存，不会被销毁
参数：include:字符串、正则表达式，只有匹配到的组件会被缓存
      exclude:字符串、正则表达式，任何匹配的组件都不会被缓存
```
        <!-- 失活的组件将会被缓存！-->
        <keep-alive>
            <component :is="dynamicComponentName" class="tab"></component>
        </keep-alive>
```
结合router缓存部分页面：
```
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
- keep-alive生命周期：activated，deactivated  
activated：组件被激活时调用.  
deactivated：组件被停用是调用。  
keep-alive顺序：created->mounted->activated  

16、vuex:
```
const store = new Vuex.Store({
            //状态：共享数据
            state: {},
            //修改状态的事件
            mutations: {},
            //异步处理机制，控制我们mutation的执行顺序
            action: {},
            //用域组件获取计算后的状态数据，先整理后返回到vue里面
            getter: {},
})
```
- State:单一状态树，用一个对象包含了全部的应用层级的状态，存放变量，然后全局共享；
- mapState:computed的辅助工具，简化不用```this.$state```,而是将state当作参数传递
```
// 在单独构建的版本中辅助函数为   
Vuex.mapState import { mapState } from 'vuex' 
export default { 

    computed: mapState({ 
        // 箭头函数可使代码更简练 
        count: state => state.count, 
        
        // 传字符串参数 'count' 等同于 `state => state.count` 
        countAlias: 'count', 
        
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数 countPlusLocalState (state) 
        { 
            return state.count + this.localCount 
        } 
    })
```
又或者有多个computed属性时：
```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
 <br/>

  
- Getter:对state中派生出一些状态，比如对列表进行过滤并计数：我们就可以把方法放在getter中方便其他调用。共享函数
```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },

    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    },

    getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
  }
})
```
- Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
```store.getters.doneTodosCount // -> 1```
- 也可以通过方法访问：返回一个函数，给getter传参，
```store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false } ```
- mapGetters:辅助函数
```
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
```

- mutation:唯一的修改state中值的通道：提交mutation：
- 不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 ```increment``` 的 ```mutation``` 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```store.commit('increment')```

- 可提供额外的参数payload;大多数情况下是个对象
```
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

- mutation另一种传参方式：直接使用包含type的对象
```
store.commit({
  type: 'increment',
  amount: 10
})

//注意mutation中的参数
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
- mutation中以新对象替换老对象，（或者添加新属性），可以这么写：
```
state.obj = { ...state.obj, newProp: 123 }
```
- 一条重要的原则就是要记住 mutation 必须是同步函数。



17、npm 命令：
- 初始化:```npm init```
- 下载```npm install --save -dev``` ：  
 save表示安装好后写入package.json的dependencies中（生产环境依赖）（vue，vuex等等）  
 dev表示安装好后写入package.json的devDepencies中（开发环境依赖）（代码压缩工具，生产环境用不到，就可以用这个dev）  
 默认就是```--save```
- 全局安装：```-g``` :表示把下载的东西放在一个公共的地方，比如说我们的c盘的node文件夹，然后所有的项目需要就去那里拿。容易损坏，需要重新安装。
- 局部安装：对于独立的文件夹进行下载安装。
- 更新：```npm update -g --save -dev```:  
- 搜索：``` npm search [<name><version>][-g]/[--save][-dev]```
- 查看已安装的模块：```npm list -g```

18、ES6
## var 、let 和 const 的作用域

> 为什么需要块级作用域?

| 关键字    | 声明         | 修改                     | 作用域         |
| --------- | ------------ | ------------------------ | -------------- |
| **var**   | 可以重复声明 | 无法限制修改（可以修改） | 没有块级作用域 |
| **let**   | 不能重复声明 | 变量--可以修改           | 块级作用域     |
| **const** | 不能重复声明 | 常量--不可以修改         | 块级作用域     |

块级作用域绑定结构。`let`是新的`var`。`const`是单人作业。静态限制会阻止分配前使用。

var太自由(不严谨)，尤其是在团队协同开发中编写的JS代码容易发生作用域和作用域链的问题！

故es6定制新标准：`let`和`const`关键字，解决作用域问题！

## ES5写const
```
const PI=3.14
```
```
Object.defineProperty(typeof global === "object" ? global : window, "PI", {
    value:        3.141593,
    enumerable:   true,
    writable:     false,
    configurable: false
})
```

## ES6 允许使用“箭头”（`=>`）定义函数。

```
() => {}
```

- =>的左边：为函数的参数列表。只有一个参数可以省略（），没有参数或多个参数则不可省略（）。
- =>的右边：为函数的返回值。
  - 如果箭头函数直接返回一个对象，必须在对象外面加上括号（）。
  - 如果箭头函数体只有一行语句，且不需要返回值void，就不用写**大括号**【花括号】｛｝了。  
  - ```pairs = evens.map(v => ({ even: v, odd: v + 1 }))```
  -``` (num1,num2)=> num1 + num2```
  

**箭头函数有几个使用注意点：**

1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
3. 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。
4. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。(rest参数就是ES6的展开运算符 [ ...res ] )
5. 箭头函数没有`this`对象 所以对于bind，call，apply的this转换的时候，是不会转换的。