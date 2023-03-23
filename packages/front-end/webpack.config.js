const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        app: {
            import: './src/index.ts',
        },
        runtimeConfig: './config/runtimeConfig.ts',
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app/[name].[contenthash].js',
        chunkFilename: 'chunks/[name].[chunkhash].js',
        assetModuleFilename: 'media/[name][hash][ext][query]',
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /node_modules\/vfile\/core\.js/,
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            type: 'commonjs',
                            imports: ['single process/browser process'],
                        },
                    },
                ],
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
                use: ['ts-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist', 'index.html'),
        },
        historyApiFallback: true,
        compress: true,
        port: 9002,
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/public/index.html`,
            filename: './index.html',
            contentBase: path.join(__dirname, 'dist'),
            chunksSortMode: 'manual',
            chunks: ['runtimeConfig', 'app'] // runtime config should be populated at the moment of app loading
        }),

        new webpack.DefinePlugin({
            process: JSON.stringify(process.env),
            'process.env.REACT_APP_SC_ATTR': JSON.stringify(
                'data-styled-fullstack'
            ),
            'process.env.SC_ATTR': JSON.stringify('data-styled-fullstack'),
            'process.env.REACT_APP_SC_DISABLE_SPEEDY': true,
            'process.env.REACT_APP_BASE_URL': JSON.stringify(
                'http://localhost:3001'
            ),
            'window.process': { cwd: () => '' },
        }),
    ],

    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        alias: {
            '@redux-store': path.resolve(__dirname, '../@mfe/redux-store'),
            'config': path.resolve(__filename, '../@core/config')
        },
    },
}
