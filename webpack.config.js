// for resolving the absolute path to our project
// necessary for webpack
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // where our app "starts"
  // add the promise and fetch polyfill first
  entry: ['promise-polyfill', 'whatwg-fetch', './src/index.js'],
  // where to put the transpiled javascript
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },

  // babel config
  module: {
    rules: [
      {
        // any file that ends with '.js'
        test: /\.js$/,
        // except those in "node_modules"
        exclude: /node_modules/,
        // transform with babel
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  // allows us to see how the transpiled js relates to the untranspiled js
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 1313,
    compress: true,
    watchContentBase: true,
    // send requests that start with "/api" to our api server
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api': ''}
      }
    }
  }
};