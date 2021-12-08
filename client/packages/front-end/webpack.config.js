const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.ts',
  mode: 'development',
  output: {
    filename: '[name]_[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'umd'
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
      { test: /\.(ts|js)x?$/, loader: 'ts-loader' },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public', 'index.html'),
    },
    compress: true,
    port: 9000,
  },
   plugins: [
    new HtmlWebpackPlugin(),    
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  
}