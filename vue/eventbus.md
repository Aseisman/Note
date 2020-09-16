- EventBus 又称为事件总线。  
  在Vue中可以使用 EventBus 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的“灾难”，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

## 一、初始化
首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它。我们可以通过两种方式来处理。先来看第一种，新创建一个 .js 文件，比如 event-bus.js
```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```
实质上EventBus是一个不具备 DOM 的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

另外一种方式，可以直接在项目中的 main.js 初始化 EventBus :

```js
// main.js
Vue.prototype.$EventBus = new Vue()
```
注意，这种方式初始化的EventBus是一个全局的事件总线。稍后再来聊一聊全局的事件总线。

现在我们已经创建了 EventBus ，接下来你需要做到的就是在你的组件中加载它，并且调用同一个方法，就如你在父子组件中互相传递消息一样。

## 二、发送事件
假设你有两个Vue页面需要通信： A 和 B ，A页面 在按钮上面绑定了点击事件，发送一则消息，想=通知 B页面。
```js
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```
接下来，我们需要在 B页面 中接收这则消息。

三、接收事件

```js
<template>
  <p>{{msg}}</p>
</template>

<script> 
import { 
  EventBus 
} from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```
前面提到过，如果使用不善，EventBus会是一种灾难，到底是什么样的“灾难”了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理EventBus在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus事件监听。

## 移除事件监听者
如果想移除事件的监听，可以像下面这样操作：
```JS
import { 
  eventBus 
} from './event-bus.js'
EventBus.$off('aMsg', {})
```

你也可以使用 EventBus.$off('aMsg') 来移除应用内所有对此某个事件的监听。或者直接调用 EventBus.$off() 来移除所有事件频道，不需要添加任何参数 。

上面就是 EventBus 的使用方法，是不是很简单。上面的示例中我们也看到了，每次使用 EventBus 时都需要在各组件中引入 event-bus.js 。事实上，我们还可以通过别的方式，让事情变得简单一些。那就是创建一个全局的 EventBus 。接下来的示例向大家演示如何在Vue项目中创建一个全局的 EventBus 。

全局EventBus

它的工作原理是发布/订阅方法，通常称为 Pub/Sub 。

创建全局EventBus
```js
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```