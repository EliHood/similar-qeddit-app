const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Main.tsx',
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
        test: /\.tsx?$/,
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
    extensions: ['.ts', '.tsx', '.js']
  },
  
}