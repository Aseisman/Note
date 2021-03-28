const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const bootstrap = path.resolve('node_modules/bootstrap/dist/css/bootstrap.css');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
//module.exports传参是一个env，通过命令行传值，
// 命令行中传入的任何参数会在配置文件中映射为对应的参数。若想在webpack.config.js中获得命令行的环境配置，需将module.exports写成function。
//env对象解构赋值可以得到两个变量，看对应的传参是啥
module.exports = ({ development, production }) => {
    const isEnvDevelopment = development === 'development'; //开发环境
    const isEnvProduction = production === 'production'; //生产环境
    const getStyleLoaders = cssOptions => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && MiniCssExtractPlugin.loader,
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            'postcss-loader',
        ].filter(Boolean);
        return loaders;
    };
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment ? 'development' : 'development',
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        cache: {
            type: 'memory',
        },
        entry: {
            main: './src/index.js',
        },
        //优化
        optimization: {
            minimize: isEnvProduction, //生产环境会启动压缩
            minimizer: [
                new TerserPlugin({ parallel: true }), //  压缩JS 多进程压缩
                new OptimizeCSSAssetsPlugin(), //压缩CSS
            ],
            splitChunks: {
                chunks: 'all', //支持 asynchronous和同步 all表示同步异步都分包
                minSize: 0, //最小大小
                minRemainingSize: 0, //分割出去剩下的大小
                maxSize: 0, //最大大小
                minChunks: 1, //最小引用次数
                maxAsyncRequests: 30, //异步模块最大并请求 import('./entry.js')
                maxInitialRequests: 30, //同步模块最大并发请求数 import
                enforceSizeThreshold: 50000, //如果一个代码块大小超过50000，则强行打包
                cacheGroups: {
                    //第三方模块
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2, //一个模块被引用2次的话会进行单独提取
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            runtimeChunk: {
                //运行时代码要单独分割
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
            moduleIds: isEnvProduction ? 'deterministic' : 'named',
            chunkIds: isEnvProduction ? 'deterministic' : 'named',
        },
        //解析方式
        resolve: {
            modules: [path.resolve('node_modules')], //配置模块的查找范围
            extensions: ['.js'], //[.js,.jsx,ts,tsx]，这里匹配扩展名
            alias: {
                bootstrap,
            }, //别名，在webpack先导入，然后别的地方就可以直接导入别名；
            fallback: {
                crypto: false, //假如说你引的一个包里有node核心模块，你用不到，就可以在这里false
                buffer: false,
                stream: false,
            },
        },
        //module:导入编译的规则rules，可以对js、css、等进行编译
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: ['@babel/preset-react'],
                                plugins: ['@babel/plugin-proposal-class-properties'],
                            },
                        },
                    ],
                    include: path.resolve('src'),
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: getStyleLoaders({ importLoaders: 1 }),
                },
            ],
        },
        devServer: {},
        plugins: [
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: './public/index.html',
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined
                )
            ),
            new HtmlWebpackExternalsPlugin({
                externals: [
                    //不打包
                    {
                        module: 'lodash',
                        entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js',
                        global: '_',
                    },
                ],
            }),
        ],
    };
};
