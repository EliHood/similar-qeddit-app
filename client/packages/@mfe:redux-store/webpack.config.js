const webpack = require('webpack');
const path = require('path');
module.exports = {
   entry: "./index",
   mode: 'development',
   output: {
       filename: "index.js",
       path: path.resolve(__dirname, 'dist')
   },
   module: {
    rules: [
        { test: /\.(ts|js)x?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx"]
  },

  plugins: [
    new webpack.ProvidePlugin({
           process: 'process/browser',
    }),
  ]
}