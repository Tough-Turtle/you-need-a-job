const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './client/index.js'),
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: 'build',
    },
    proxy: {
      '*': 'http://localhost:3001',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader', 'svg-url-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/client/index.html'),
      filename: 'index.html',
    }),
  ],
};
