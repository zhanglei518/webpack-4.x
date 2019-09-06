const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "js/[name].bundle.[hash].js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../css',
            }
          },
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    // new OptimizeCSSAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   // cssProcessorOptions: cssnanoOptions,
    //   cssProcessorPluginOptions: {
    //     preset: ['default', {
    //       discardComments: {
    //         removeAll: true,
    //       },
    //       normalizeUnicode: false
    //     }]
    //   },
    //   canPrint: true
    // })
  ],
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourcMap: true
      // }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {  // 抽离自己写的公共代码
            chunks: "initial",
            name: "common", // 打包后的文件名，任意命名
            minChunks: 2,//最小引用2次
            minSize: 0 // 只要超出0字节就生成一个新包
        },
        vendor: {   // 抽离第三方插件
            test: /node_modules/,   // 指定是node_modules下的第三方包
            chunks: 'initial',
            name: 'vendor',  // 打包后的文件名，任意命名
            // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            priority: 10
        },
      }
    }
  },
  devServer: {//配置此静态文件服务器，可以用来预览打包后项目
    inline: true,//打包后加入一个websocket客户端
    hot: true,//热加载
    contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
    host: 'localhost',//主机地址
    port: 9090,//端口号
    compress: true//开发服务器是否启动gzip等压缩
  },
}