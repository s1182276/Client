const path = require('path');
// const HtmlPlugin = require('html-webpack-plugin')
// const CleanPlugin = require('clean-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: ['./src/App.js'],
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        liveReload: true,
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
};
