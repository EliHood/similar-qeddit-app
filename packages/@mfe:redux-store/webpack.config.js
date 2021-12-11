const webpack = require('webpack');
const path = require('path');
module.exports = {
   entry: "./index.ts",
   mode: 'development',
   output: {
       filename: "index.js",
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
      
    ],
    
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", '.tsx']
  },

}