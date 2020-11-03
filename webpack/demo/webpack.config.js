/**
 * 单个入口文件
var baseConfig={
    entry:"./src/index.js",
}
*/

/**
 * 多个入口文件
var baseConfig={
    entry:{
        main:'./src/index.js',
    }
}
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var baseConfig = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'main.js',
        path: path.resolve('./build')
    },
    /**
     * output:{
     *      filename:'[name].js',
     *      path:path.resolve('./build')
     * }
     */

    devServer: {
        //post:8080//监听端口，默认8080
        contentBase: './src',
        // 本地服务器所加载的页面所在目录
        historyApiFallBack: true, //不跳转，依赖HTML5 history API,true的话所有页面跳转指向index.html
        inline: true //实时刷新，源文件发生改变自动刷新
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' }
            ],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            //正则表达式：$结尾表示以.css结尾
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }]
    },
    plugins: [
        //对html模板进行处理，生成对应的html,引入需要的资源模块
        new HtmlWebpackPlugin({
            template: './src/index.html', //模板文件
            filename: 'index.html', //目标文件
            // chunks: ['main'], //对应加载的资源
            // inject: true, //资源加入到底部
            // hash: true //加入版本号
        })
    ]
};
module.exports = baseConfig