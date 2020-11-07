应用场景 3：使用 Symbol 定义类的私有属性/方法
我们知道在 JavaScript 中，是没有如 Java 等面向对象语言的访问控制关键字 private 的，类上所有定义的属性或方法都是可公开访问的。因此这对我们进行 API 的设计时造成了一些困扰。

而有了 Symbol 以及模块化机制，类的私有属性和方法才变成可能。例如：

在文件 a.js 中

```js
const PASSWORD = Symbol();

class Login {
  constructor(username, password) {
    this.username = username;
    this[PASSWORD] = password;
  }

  checkPassword(pwd) {
    return this[PASSWORD] === pwd;
  }
}

export default Login;
```

在文件 b.js 中

```js
import Login from "./a";

const login = new Login("admin", "123456");

login.checkPassword("123456"); // true

login.PASSWORD; // oh!no!
login[PASSWORD]; // oh!no!
login["PASSWORD"]; // oh!no!
```

由于 Symbol 常量 PASSWORD 被定义在 a.js 所在的模块中，外面的模块获取不到这个 Symbol，也不可能再创建一个一模一样的 Symbol 出来（因为 Symbol 是唯一的），因此这个 PASSWORD 的 Symbol 只能被限制在 a.js 内部使用，所以使用它来定义的类属性是没有办法被模块外访问到的，达到了一个私有化的效果。
