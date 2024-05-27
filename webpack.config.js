const path = require('path');
const dotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/App.js'],
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        liveReload: true,
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 8030,
        open: true,
        hot: true,
        compress: true,
        allowedHosts: "all",
        historyApiFallback: true,
        client: {
            overlay: {
                warnings: true,
                errors: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new dotEnv({
            path: path.join(__dirname, '.client.env')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/Css/tinymce.min.css', to: 'css' },
                { from: 'src/manifest.json', to: '../manifest.json' },
                { from: 'lib/jquery-3.7.1.js', to: 'lib/jquery-3.7.1.js' }
            ]
        })
    ]
};
