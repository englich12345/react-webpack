const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { APP_ENV } = process.env;
const mode = APP_ENV || 'development';
const isDev = () => mode !== 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./index.js'],
  devtool: isDev() ? 'source-map' : 'none',
  output: {
    publicPath: '/',
    path: isDev()
      ? path.join(__dirname, 'public')
      : path.join(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  //Run server
  devServer: {
    //Chứa đường dẫn tương đối đến file index.html
    contentBase: path.join(__dirname, 'src'),
    port: 8000,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // style-loader, css-loader giúp import được css vào file js
      // sass, sass-loader giúp biên dịch scss sang css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: './index.html',
      inject: 'body',
      templateParameters: {
        title: 'Webpack'
      }
    })
  ]
};