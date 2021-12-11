const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },  
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public', 'index.html'),
    },
    compress: true,
    port: 9002,
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
   }),
   new webpack.DefinePlugin({
    'process': JSON.stringify(process.env),
    'process.env.REACT_APP_SC_ATTR': JSON.stringify('data-styled-fullstack'),
    'process.env.SC_ATTR': JSON.stringify('data-styled-fullstack'),
    'process.env.REACT_APP_SC_DISABLE_SPEEDY': true
  })
  ],
  

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  
}