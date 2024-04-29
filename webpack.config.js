const path = require('path');

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
    },
};
