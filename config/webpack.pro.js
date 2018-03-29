/* 生产环境 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config');
const cssConfig = require('./css.config');
const sassConfig = require('./sass.config');
const babelConfig = require('./babel.config');

/* 合并配置 */
module.exports = config({
  entry: {
    app: path.join(__dirname, '../src/app.js')
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'script/[name]_[chunkhash].js',
    chunkFilename: 'script/[name]_[chunkhash]_chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { // sass
        test: /^.*\.sass$/,
        use: [MiniCssExtractPlugin.loader, cssConfig, sassConfig]
      },
      { // css
        test: /^.*\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      { // vue
        test: /^.*\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: [babelConfig],
                css: [MiniCssExtractPlugin.loader, cssConfig, sassConfig]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: path.join(__dirname, '../src/index.pug'),
      minify: {
        minifyCSS: true,
        minifyJS: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name]_[chunkhash].css',
      chunkFilename: 'style/[name]_[chunkhash]_chunk.css'
    }),
    new OptimizeCssAssets()
  ]
});