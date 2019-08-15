const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'},
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Weather App',
      filename: 'index.html',
      template: 'src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.85',
      },
    })],
};
