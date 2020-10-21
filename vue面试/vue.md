1. 响应式数据的理解  
核心答案：对象内部通过defineReactive方法；使用Object.defineProperity属性进行数据劫持(只会劫持已经存在的属性)，数组则是通过重写数组方法来实现的。  
（多层对象是通过递归来实现劫持，顺带提出vue3.0是使用proxy来实现响应式数据的）
  ```js
        let state = {
            count: 0
        };
        let active;
        //1、定义一个响应式数据的方法：
        function defineReactive(obj) {
            for (let key in obj) {
                let value = obj[key];
                //如果有多个watcher的话，就可以用dep去统一我们的watchers然后统一发送请求
                //每个变量都应该有个dep
                let dep = []
                    //defineProperty参数：对象，键，{get or set}
                Object.defineProperty(obj, key, {
                    get() {
                        if (active) {
                            dep.push(active);
                        }
                        return value;
                    },
                    set(newValue) {
                        value = newValue;
                        dep.forEach(watcher => watcher());
                    }
                })
            }
        }
        defineReactive(state);
        //2、数据发生变化了，通知视图
        //发布-订阅者模式：每一个数据的监听器Observer进行数据劫持，如果数据发生变化，就询问一下订阅者watcher是否需要更新数据
        //这里模拟多个订阅者watcher。
        const watcher = (fn) => {
            active = fn;
            fn();
            active = null;
        }
        watcher(() => {
            app.innerHTML = state.count;
        })
        watcher(() => {
            console.log(state.count);
        })
  ```
2. Vue检测数组变化，数组数据响应式  
数组考虑到性能原因没有用defineProperty对数组的每一项进行拦截，而是选择重写数组（push，pop，splice，unshift，shift,sort,reverse）方法进行重写。  
在vue中修改数组的索引和长度是无法控制的，需要调用上面7种方法才会触发数组对应的watcher进行更新，数组中如果是对象数据类型也会进行递归劫持。
```js
        let state = [1, 2, 3];
        let originalArray = Array.prototype;
        let arrayMethods = Object.create(originalArray);
        //1、定义一个响应式数组数据的方法：
        function defineReactive(obj) {
            //函数劫持
            arrayMethods.push = function(...args) {
                originalArray.push.call(this, ...args)
                render();
            }
            obj.__proto__ = arrayMethods
        }
        defineReactive(state);

        function render() {
            app.innerHTML = state;
        }
        render();
        setTimeout(() => {
            state.push(4)
        }, 2000);
```

3. Vue中模板的编译原理？  
答：  
&emsp;将template转换成render函数（转换的过程是用正则匹配的,render函数即为语法树），然后再继续产生虚拟节点，然后再编译为真实节点。  
&emsp;将template模板转换为ast语法树=>parseHTML；  
&emsp;在vue-loader中会用到一个包，vue-template-compiler
```js
        //模板引擎的原理：with+new Function实现生成render方法
        //包提供的变量
        //1、利用包提供的方法将template转换成render函数（ast树）
        let {
            ast,
            render
        } = VueTemplateCompiler.compile(`<div>zf</div>`)

        console.log(ast)
        console.log(render)
            //2、将render函数封装成一个方法Function,
        console.log(new Function(render).call(obj))
            //function anonymous(
            // ) {
            // with(this){return _c('div',[_v("zf")])}
            //}

        // with(this){return _c('div',[_v("zf")])}
        //with语法，创建一个节点div，然后[_v("zf")]是它的子节点，然后_v是vNode，虚拟节点，
        //调用render方法运行with里面的东西后就生成一个虚拟节点。
        //this表示Function中的obj,然后在obj里面找_c方法  _v方法·    
```

4. 生命周期钩子是如何实现的？  
答：生命周期钩子就是回调函数，当创建组件实例的过程中会调用对应的钩子方法。
内部主要是使用callHook方法来调用对应的方法，核心是一个发布订阅模式，将钩子订阅好（内部采用数组的方式存储），在对应的阶段进行发布。  
```js
        <script>
        function mergeHook(parentVal, childVal) {
            if (childVal) {
                if (parentVal) {
                    return [parentVal].concat(childVal)
                } else {
                    return [childVal]
                }
            } else {
                return parentVal;
            }
            //return处：将钩子函数封装成一个数组
        }

        function mergeOptions(parent, child) {
            let opts = [];
            for (let key in child) {
                //合并钩子方法，将多个beforecreate合并在一个数组中
                opts[key] = mergeHook(parent[key], child[key]);
            }
            return opts;
        }

        function Vue(options) { //合并操作
            this.options = mergeOptions(this.constructor.options, options);
            callHook(this, 'beforeCreate');
        }

        function callHook(vm, hookName) {
            //将数组中的方法依次执行。
            vm.options[hookName].forEach(element => {
                element()
            });
        }
        Vue.options = {
            beforeCreate() {
                console.log('before Create 2');
            }
        }; //默认的全局
        new Vue({
            beforeCreate() {
                console.log('before Create 1');
            }
        })
    </script>
```

5. Vue.mixin的使用场景和原理：  
答：Vue.mixin的作用就是抽离公共的业务逻辑，原理类似“对象的继承”，当组件初始化时会调用mergeOption的方法进行合并，采用策略模式针对不同的属性进行合并，会采用就近原则的组件数据为准。  
mixin中有很多缺陷，“明明冲突问题”，“依赖问题”。在vue3.0的时候已经把mixin取消掉了。
```js
        Vue.options = {
            // beforeCreate() {
            //     console.log('before Create 2');
            // }
        }; //默认的全局
        Vue.mixin = function(obj) {
            this.options = mergeOptions(this.options, obj);
            console.log(this.options)
        }
        Vue.mixin({
            beforeCreate() {
                console.log("before create 3");
            }
        })
```

6. nextTick在那里使用?原理是？  
答:nextTick中的回调是在下次DOM更新循环结束之后执行的延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM，原理就是异步方法（promise，settimeout等4个方法)。  
批处理，异步处理  
```js
let cbs = [];
        let pending = false;

        function flushCallBacks() {
            cbs.forEach(fn => fn());
            pending = false;
        }

        function nextTick(fn) {
            cbs.push(fn);
            if (!pending) {
                pending = true;
                Promise.resolve().then(flushCallBacks)
            }
        }

        function render() {
            console.log("渲染")
        }
        nextTick(render);
        nextTick(render);
        nextTick(render);
        console.log("更改状态")
        console.log("更改状态")
        console.log("更改状态")
```
7. Vue为什么需要虚拟DOM？  
答：Virtual DOM就是用js对象来描述真实DOM，是对真实DOM的抽象，由于直接操作DOM性能低，js层操作效率高，可以将DOM操作转化成对象操作，最终通过diff算法对比差异进行更新DOM。虚拟DOM不依赖真是平台环境，从而也可以实现跨平台。  
虚拟DOM的实现就是普通对象包含tag，data，children等属性对真实节点的描述。

8. Vue中的diff原理  
答：vue的diff算法是平级比较，不考虑跨级比较的情况。内部采用深度递归的方式+双指针的方式进行比较。  
先比较是否是相同节点；  
相同节点比较属性，并复用老节点；  
比较儿子节点，考虑吧老节点和新节点儿子的情况；  
优化比较：头头，尾尾，头尾，尾头；  
比对查找进行复用。
9. Vue.set方法是如何实现的  
答：$set可以触发更新，我们给对象和数组本身都添加了dep属性，当给对象新增不存在的属性，触发对象依赖的watcher去更新，当修改数组索引，我们调用数组本身的splice方法更新视图。  
```js
        Vue.set(target,'a',1)
        Vue.set([],0,100)//目标数组，索引，值

        Vue.set(target,key,val)
        //target是目标数组，key是键，val是值
        if(Array.isArray(target)&&key合法){
            //splice(从哪里开始，删除的数量，新增的值，新增的值，……，)
            target.splice(key,1,val)
            return val;
        }
        //target是目标对象，key是属性，val是值
        if(key in target && !(key in Object.prototype)){
            //如果有这个属性，那么我就直接赋值。注意这个值是响应式的
            target[key]=val
            return val    
        }
        //如果这个值不是响应式的
        if(!ob){
            target[key]=val
            return val
        }
        //给当前的对象定义成响应式
        defineReactive(ob.value,key,val);
        ob.dep.notify()//通知watcher更新
        return val
```
10. Vue生命周期有哪些，一般在哪一步发起请求？  
beforeCreate created beforeMount mounted beforeUpdate updated beforeDestory destoryed;  
一般在created实例已经创建完成。因为它是最早触发的。  
mounted 实例已经挂载，可以进行一些DOM操作。

11. Vue组件间传值的方式及之间的区别？  
- 传值方式：父传子、子传父、平级同行、跨级同行  
- 父传子：props.  
- 子传父：$emit.  
```js
//父调用子组件
<blog-post v-for="post in posts" :key="post.id"  :post="post" @enlarge-text="onEnlargeText"></blog-post>
//父方法
onEnlargeText:function( enlargeAmount , id , userId){
                    //this.postId = id;//监听postId 改变 调用 远程删除-更新
                    console.log("id:"+id)
                    console.log("userId:"+userId)
                    this.postFontSize += enlargeAmount
}

//子组件
<div class="blog-post">
    <h3>{{ post.title }}</h3>
    <button @click="$emit('enlarge-text', 0.1 , post.id , post.userId">Enlarge text</button>
    <div v-html="post.body"></div>
</div>
```

- 快速拿到父组件和子组件，获取当前组件的父组件和子组件：$parent $children  
注意：节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法。  

- provide与inject:   
provide:一个祖先向所有子孙（包括孙子，孙子的孙子等）注入一个依赖(与react的上下文content相似)  
inject:一个字符串数组 or 对象（对象的key是字符串or symbol）还有默认的from和default  
注意：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
- $attr与$listeners:  
A->B->C组件A的东西通过B传递给C，用props会很麻烦
那么就可以用$attr进行绑定传值，   
A组件的数据v-bind = "this.$attrs"即可
同理 $listeners:
A组件使用v-on="$listeners"，就可以将方法传给C组件；

- $refs
12. 
13. Vue的组件渲染流程？
答：渲染父组件时会创建父组件的虚拟节点（转换成ast树的过程，然后生成render函数，然后再继续），其中可能包含子组件的标签。在创建虚拟节点时获取组件的定义使用。Vue.extend()生成组件的构造函数。将虚拟节点转化成真实节点时，会创建组件的实例并且调用组件的$mount方法。   
Vue.extend()是获取当前组件的父类的构造函数。里面放个对象，对象就是子组件的定义，然后返回一个构造函数，然后调用$mount进行挂载处理。  
$el当前组件渲染后的真实节点。
1、父子组件渲染的先后顺序：先父后子。   
2、组件是如何渲染到页面上的。  

14. Vue组件中data为什么是一个函数？  
答：每次使用组件时都会对组件进行实例化操作，即new一个Vue实例出来，假设data是个对象，那么我在实例化后，每个组件都可以调用这个对象中的数据，那么就会乱了。如果我将data写成一个函数。在构造函数中对于每一个vue都有一个独立的data方法，我们在构造函数中调用data方法然后赋值

```js
class Vue{
    constructor(options){
        this.data=options
    }
}
let data={a:1}
let d1=new Vue(data);
let d2=new Vue(data);
d1.data.a=100;
console.log(d2)//d2里面的a也是100 所有d1，d2都是共用了一个data地址
```
```js
class Vue{
    constructor(options){
        this.data=options.data()
    }
}
let data=()=>({a:1})
let d1=new Vue({data});
let d2=new Vue({data});
d1.data.a=100;
console.log(d2)//d2里面的a是1,因为d1调用data方法后会创建一个新的地址。互不干扰
```

- 将data定义为object，通过组件名作为key，然后关联自己的data，这样子data就不会混了。  
- 用深拷贝替换函数的实现。会耗性能。

15. `v-if`和`v-show`的区别：
- v-if在编译的过程中会被转化成三元表达式，然后不满足就不会渲染节点。因此它不是一个指令。
- v-show会被编译成指令，条件不足时控制样式将对应节点隐藏。内部其他指令依旧会继续执行。
- v-if和v-show都会导致重绘，而v-if会导致重排。v-show不会。
- v-if和v-for不要连用。

16. Vue.use是干嘛的，原理是什么？  
Vue.use是用来使用插件的。我们可以在插件中扩展全局组件、指令、原型方法等。  
手写vuex和vue-router的时候用到  
有两种情况：
- 一、插件可能是一个函数`Vuex=function(){}`
- 二、插件可能是一个install方法`Vuex.install=function(){}`

```
Vue.use(Vuex,1,2,3)
->
Vue.use=function(参数plugin){
    //参数格式：Vue的构造函数_Vue，arguments 
    //1、判断插件是否重复下载
    //2、将参数拿出来,并将第一个参数去掉，
    const args=toArray(arguments,1)//从第1项开始，0去掉。
    args.unshift(this)//，将我们的this插入首位。
    //3、判断是install的还是普通方法
    if(typeof plugin.install==='function'){
        plugin,install.apply(plugin,args);
    }else if(typeof plugin === 'function'){
        pligun.apply(null,args)
    }
}
```
- 注意：Vue.use方法不依赖于Vue的版本，传进去的Vue的构造函数是哪个版本的我们就使用哪个。

17. vue-router有哪几种钩子函数，具体是什么及执行流程
答：钩子函数种类有全局守卫，路由守卫，组件守卫。
- 完成的导航解析流程：  
1、导航被触发  
2、在失火的组件里调用beforeRouteLeave守卫  
3、调用全局的beforeEach守卫  
4、在重用的组件里调用beforeRouteUpdate守卫  
5、在路由配置里调用beforeEnter守卫  
6、解析异步路由组件  
7、在被激活的组件里调用beforeRouteEnter  
8、调用全局的beforeResolve守卫  
9、导航被确认  
10、调用全局的afterEach钩子  
11、触发DOM更新  
12、调用beforeRouteEnter守卫传给next的回调函数，创建好的组件实例会作为回调函数的参数传入。
- 所有的钩子放在数组里面，然后进行顺序调用。

18. vue-router的两种模式的区别？
- hash模式：#，hash+hashchange 兼容性好但是不美观
- history模式：无#  historyApi+popState 美观，但是如果出现了404需要后端配置

- 当URL的片段标识符更改时，将触发hashchange事件(跟在＃符号后面的URL部分，包括＃符号)
- history匹配不到，就跳到首页。
- react||vue history 在webpack调用了historyfallback这个包，一定要后端支持。

19. v-if与v-for的优先级  
v-for和v-if进行不要再同一个标签中，因为解析时先解析v-for再解析v-if 如果遇到需要同时使用时可以考虑写成计算属性的方式。
- 生成代码 `v-for`-> `v-if`
- 先计算出来，再进行v-if的判断
- for循环内尽量不要绑定事件，可以用事件委托的方式。

20. 组件中的name选项有哪些好处及作用？  
可以通过名字找到对应的组件；通过名字去渲染。（递归组件）  
可以通过name属性实现缓存功能（keep-alive）  
可以通过name来识别组件（跨级组件$emit||eventbus通信时非常重要）  

21. Vue事件修饰符有哪些？其实现原理是什么？  
答：capture，once，passive，stop，self，prevent。
### .stop
- 调用 event.stop，阻止事件冒泡
  ```html
  <!-- 此时只弹出button -->
  <div id="app">
    <div @click="alert('div')">
      <button @click.stop="alert('button')">点击</button>
    </div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str); }
    }
  })
  ```
### .prevent
- 调用 event.preventDefault()，阻止默认事件
  ```html
  <!-- 点击提交按钮后，页面不会重载 -->
  <div id="app">
    <form v-on:submit.prevent="onSubmit">
      <input type="submit">
    </form>
    <!-- 也可以只有修饰符 -->
    <form v-on:submit.prevent>
      <input type="submit">
    </form>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      onSubmit() { console.log('submit'); }
    }
  })
  ```
### .capture
- 事件捕获模式
  ```html
  <!-- 此时先弹出div再弹出button -->
  <div id="app">
    <div @click.capture="alert('div')">
      <button @click="alert('button')">点击</button>
    </div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })  
  ```
### .self
- 只当事件是从侦听器绑定的元素本身触发时才触发回调
  ```html
  <!-- 点击button时，只弹出 button -->
  <div id="app">
    <div id="app">
      <div :style="{ backgroundColor: 'red' }" 
      @click.self="alert('div')">
        <button @click="alert('button')">点击</button>
      </div>
    </div>
  </div>
  ```

  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })
  ```  
### .once 
- 只触发一次回调
- 2.1.4新增
  ```html
  点击两次button按钮，只弹出一次button
  <div id="app">
    <button @click.once="alert('button')">点击</button>
  </div>
  ```

  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })
  ```
### .passive
- 设置 addEventListener 中的 passive 选项
- 能够提升移动端的性能
- 2.3.0新增
> why passive？
- 即使在触发触摸事件时，执行了一个空的函数，也会让页面卡顿。因为浏览器不知道监听器到底会不会阻止默认事件，所以浏览器要等到执行完整个函数后，才能决定是否要滚动页面。passive事件监听器，允许开发者告诉浏览器，监听器不会阻止默认行为，从而浏览器可以放心大胆的滚动页面，这样可以大幅度提升移动端页面的性能，因为据统计只有20%的触摸事件会阻止默认事件。
- .passive 会告诉浏览器你不想阻止事件的默认行为

### 注意
1. 使用修饰符时，顺序很重要。相应的代码会以同样的顺序产生。因此，
  v-on:click.prevent.self 会阻止所有的点击的默认事件
  v-on:click.self.prevent 只会阻止对元素自身点击的默认事件
2. 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。


22. Vue.directive:自定义指令？  
答：指令实现的原理：编译原理-代码生成-指令钩子实现进行描述
- 1在生成ast语法树时，遇到指令会给当前元素添加directive属性
- 2通过genDirectives生成指令代码
- 3在patch前将指令的钩子提取到cbs中，在patch过程中调用对应的钩子
- 4当执行指令对应钩子函数时，调用对应指令定义的方法
- https://cn.vuejs.org/v2/guide/custom-directive.html
```js
ast:{
    directives:[
        {
            name,
            rawName,
            value,
        },{
            name,
            rawName,
            value,
        }//directive里面的对象，就是元素，
    ]
}
_c(div,directives:[{name,rawName}])//ast然后生成render，生成虚拟节点

cbs[created,update,active,destory……]
```

23. vuex的个人理解：  
答：vuex内部核心原理就是创造了一个全局的vue实例（new Vue），我们可以去修改vue实例，达到数据共享，数据缓存的目的。（无法持久化）

action和mutation的问题：action写的是异步逻辑，mutation可以更新状态。  
核心方法：replacesState、subscribe，registerModule，namespace(modules)  
用过命名空间吗：namespaced.

24. slot是如何实现的？什么时候用它？  
- 普通插槽：渲染是在父组件中渲染的
- 作用域插槽：是在子组件中渲染的，可以做数据通信。

25. keep-alive？  
- keep-alive主要是缓存，采用的是LRU算法，最近最久未使用。 
- 缓存的是虚拟DOM

26. refs是如何实现的?  
27. vue中的设计模式？  
- 工厂模式：传入参数即可创建实例，不同的参数创建不同的实例。
- 单例模式：vuex，vue-router等。整个程序中就只有一个实例。
- 发布订阅模式：订阅者把自己想订阅的事件注册到调度中心，集中在一起，然后事件触发的时候，发布者发布该事件到调度中心，调度中心统一给订阅者发布通知。
- 观察者模式：watcher&dep的关系（观察者模式和发布订阅模式的区别）
- 代理模式：vue3.0中的proxy
- 装饰模式：用vue2.0写ts
- 中介者模式：vuex，可以通过一个中介进行服务
- 策略模式：策略模式指对象有某个行为，但是在不同的场景中该行为有不同的实现方案。
- 外观模式、适配器模式、迭代器模式、模板方法模式。

28. vue3和vue2的区别
- 对typeScript支持不友好，（所有属性都放在了this对象上，难以推倒组件的数据类型）
- 大量的API挂载在Vue对象的原型上，难以实现TreeShaking。
- 在vue源码中写入跨平台代码不友好。
- componsitionAPI，受reactHook启发
- 虚拟DOM进行重写，对摸板的编译进行了优化操作。
