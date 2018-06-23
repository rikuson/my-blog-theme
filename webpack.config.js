const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const config = {
  entry: {
    index: './_src/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname,
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      '~': path.join(__dirname),
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
            presets: ['env'],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '_site'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // TODO: set option
    new MinifyPlugin({}, {}),
  ],
  mode: 'production',
};

module.exports = config;

