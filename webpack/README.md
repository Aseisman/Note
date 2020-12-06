https://blog.csdn.net/aria_miazzy/article/details/106235228


## webpack原理：

webpack根据配置找到入口，js文件，根据代码中的import ，require，解析推断出来这个文件所依赖的资源文件（css，img等），然后就解析对应的资源模块，生成对应的依赖关系树，递归这个依赖关系树，然后根据规则配置，交给对应的loader or plugins进行加载，然后最后放进去bundle.js，从而实现资源的打包。

功能：代码转换，文件优化，代码分割，模块合并，自动刷新，代码校验，自动发布。

webpack打包之后的文件：

 1、自执行函数
 2、参数通过对象的形式传递的
 - key：文件路径
 - value:是一个函数（执行当前文件的代码）
 - eval执行字符串代码
 - 多个相互依赖的文件最终打包成一个文件
 3、require方法，生成一个__webpack_require__方法通过递归调用自己，然后把自己相关的文件执行。


webpack的好处：
  打包：
    体积更小
    速度更快

  大纲：
    小白：webpack 所有的文件-->js文件
          优化：
               小白：使用懒加载，热更新，不用的不引入，大的包放到cdn上
               大牛：
                 自带的优化：
                   tree-sharking:依赖关系的解析-->不用的代码不打包
                     生产环境才有效
                   scope-hositing:作用域提升
                     变量-->结果 不会打包到代码中（`let a =10,b=20,c=30; console.log(a+b+c);`,此时不会把a，b，c打包到代码中，因为abc只用于计算）
                 自己做的优化：
                   速度：
                   
                   happypack：多线程打包
                   注意：体积比较小，打包的时候比较慢
                   
                   moment：时间插件 引入的时候会引入了很多不需要的语言包;
                   IgnorePlugin 就会把不需要的语言包删掉

                   html cdn地址
                   打包的时候可以忽略不打包的文件
                   
                   ```js
                   //不打包
                   externals：{
                     'jquery':"$"
                   }
                   ```
                  


## loader的作用：

1. 实现对不同格式文件的处理：sass->css，ts->js
2. 转换这些文件，从而使其能够被添加到依赖图中。

``` js
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
            ],
            exclude: /node_modules/
        }]
    },
```

常用loader：

* babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。  

babel有些复杂，所以大多数都会新建一个.babelrc进行配置

* css-loader, style-loader: 两个建议配合使用，用来解析css文件，能够解释@import, url()。如果需要解析less就在后面加一个less-loader

* file-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名

* url-loader: 功能类似 file-loader, 但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less, scss, stylus这些的时候，npm会提示你差什么插件，差什么，你就安上就行了

## plugins

plugins和loader很容易搞混

loaders负责的处理源文件的css，jsx，一次处理一个文件。

plugins并不是直接操作单个文件，

最直接：只用loaders去处理css文件，最后会写在我们的js文件里面，而我们用plugins去处理文件，则可以生成一个新的.css文件，与js文件分开。

ExtractTextWebpackPlugin: 它会将入口中引用css文件，都打包到独立的css文件中，而不是内嵌在js打包文件中。下面是他的应用

``` js
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var lessRules = {
    use: [{
            loader: 'css-loader'
        },
        {
            loader: 'less-loader'
        }
    ]
}
var baseConfig = {
    // ... 
    module: {
        rules: [
            // ...
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(lessRules)
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
}
```
