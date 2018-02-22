const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts', './src/main.scss'],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        open: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin()
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.html$/, use: ['html-loader']},
            { test: /\.tsx?$/, use: ['ts-loader']},
            { test: /\.(sass|scss)$/, use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }
            ]}
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
