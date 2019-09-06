const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  mode: 'development',

  entry: ['./src/app.js'],

  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(js|jsx|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    
  ],
}

module.exports = config;
