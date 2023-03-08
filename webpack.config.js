const path = require('path');//引入一个模块，主要用于拼接路径
const MineCssExtractPlugin = require('mini-css-extract-plugin');//将css语法提取到单独的css文件
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html插件，用于自动生成html模版文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(__dirname,'A')

//webpack所有的配置信息都配置在这里module.export
module.exports = {
    //入口文件
    entry:'./src/index.ts',
    //打包文件
    output:{
        //打包到哪里
        path:path.resolve(__dirname,'dist'),
        //打包后的文件
        filename:'static/js/gluttonous.snake.games.[hash].js',
        //配置图片打包路径
        // publicPath:'./',
        //配置打包环境,
        environment:{
            arrowFunction:false //配置不使用箭头函数，用于兼容ie不支持es6剪头函数语法。
        }
    },
    //制定webpack打包需要的模块
    module:{
        //制定打包规则
        rules:[
            {
                //test指定的规则生效文件
                test:/\.ts$/,
                //要使用的loader
                use:[
                    //配置babel
                    {
                        //指定加载器
                        loader:'babel-loader',
                        //设置babel
                        options:{
                            presets:[
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的浏览器
                                        targets:{
                                            "chrome":"58",
                                            "ie":'11'
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                        //使用corejs的方式，"usage"表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude:/node-modules/,
            },
            //设置scss文件的处理
            {
                test:/\.less$/,
                use:[
                    MineCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    //引入postcss
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers:'last 3 versions'
                                        }
                                    ]
                                ]
                            },
                        }
                    },
                    {
                        loader:'less-loader',
                        options:{
                            // publicPath:'./images/'
                        }
                    }
                    // 'less-loader'
                ]
            },
            //配置图片打包
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 10000,
                            name: 'static/images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/medias/[name].[hash:7].[ext]'
                        }
                    }
                ]
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
              }
        ]
    },
    //配置webpack插件
    plugins:[
        new MineCssExtractPlugin({
            filename: 'static/css/gluttonous.snake.games.[hash].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
    ],
    //用来引用设置模块
    resolve:{
        extensions:['.ts','.js'],//凡是以ts和js的后缀名都可以作为模块引入
    },
    mode:'production',//设置mode，webpack4.0对语法要求更加严格，要求我们在运行 webpack 时必须在 “开发或者生产” 中选择一种模式，没有设置webpack模式，就会产生报错。
};
