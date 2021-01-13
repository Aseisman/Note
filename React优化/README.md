```
yarn init -y
yarn add react react-dom lodash bootstrap immutable is-array reselect redux react react-tiny-virtual-list
yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin optimize-css-assets-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react style-loader css-loader postcss-loader html-webpack-externals-plugin @babel/plugin-syntax-class-properties mini-css-extract-plugin --dev
```

## 2. 编译阶段的优化

-   开发环境时重复构建

    -   include
        -   使用 babel 编译的时候，我们可以`include`编译的路径，`exclude`不要编译的目录，如 node_modules
    -   resolve
        -   解析方式：对我们的指定模块的查找范围的解析，可以设置匹配后缀更快查找
        -   `modules`: 配置模块的查找范围
        -   `extensions`: 这里匹配扩展名
        -   `alias`: 别名，在 webpack 先导入，然后别的地方就可以直接导入别名；
        -   `fallback: crypto: false`,//假如说你引的一个包里有 node 核心模块，你用不到，就可以在这里 false
    -   plugin 中的 `external`: 插件打包的时候不打包我们 `external` 中的东西
    -   编译缓存
        -   使用 babel-loader 进行编译我们 js 文件的时候，我们可以在 `options` 中开启我们的缓存 `cacheDirectory：true`
        -   cache 对象可设置：type:`filesystem` or `memory`:在硬盘 或者 内存进行缓存
    -   开启多进程
        - 压缩代码多进程：`optimization`中的`minimizer`:压缩配置对象中`parallel:true`

-   生产环境时文件更小，加载更快
    -   开启 tree-shaking
    -   scope-hosting
    -   splitChunks
    -   提供 node 的空 mocks
    -   持久化缓存:`moduleIds:deterministic`和`chunkIds:deterministic`
    -   minimize 启动压缩

## 3. 路由切换优化

-   路由懒加载
    -   React.Suspense 与 React.Lazy 一起使用，进行组件的懒加载，然后组件懒加载的方式根据路由异步调用`()=>import("xx/xx")`进行回调、
    ```js
    let loadComponent = () => import('./components/Home');
    loadComponent().then(result => {
        this.setState({ Component: result.default });
    });
    ```
    -   prefetch:浏览器在空闲的时候自己加载组件:
        -   原理：在 header 中加一个
        ```html
        <link rel="prefetch" as="script" href="xxxxxx" />
        ```
        -   用法:
        ```js
        () => import(/*webpackPrefetch:true*/ './components/Home');
        ```

## 4. 更新时的优化
- shouldUpdateComponent:仅仅检查 props 或 state 是否改变，如果没有变化，组件就不会更新。
- pureComponent:进行浅比较
- React.memo:hooks版的pureComponent
- reselect(Redux):缓存部分组件，当组件中的propsorstate没改变时，就不需要刷新

## 5. 时间分片
- 1万条数据进行渲染时卡顿，无法操作其他的元素等
- 每个时间段内加载部分元素
- setTimeout：不是很流畅
- requestAnimationFrame 每次浏览器渲染前执行
- requestIdleCallback 在浏览器空闲的时候执行，不会阻塞优化级比较高的工作    

- 虚拟列表
  - 在固定的高度的界面下，只显示对应的几条数据的数组，上拉或下拉，则监听然后重新渲染展示的数组

  
## 零碎
-   module.exports 传参是一个 env，通过命令行传值，
    -   命令行中传入的任何参数会在配置文件中映射为对应的参数。若想在 webpack.config.js 中获得命令行的环境配置，需将 module.exports 写成 function。
