https://blog.csdn.net/aria_miazzy/article/details/106235228

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
