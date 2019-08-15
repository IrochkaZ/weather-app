const commonConfig = require('./webpack.common');
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
]
});