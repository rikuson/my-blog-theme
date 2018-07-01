const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const config = {
  entry: {
    index: './_src/index.js',
    category: './_src/category.js',
    default: './_src/default.js',
    search: './_src/search.js',
  },
  output: {
    filename: './dist/[name].js',
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
  ],
  mode: process.env.NODE_ENV,
};

if(process.env.NODE_ENV === 'production'){
  // TODO: set option
  config.plugins.push(new MinifyPlugin({}, {}));
}

module.exports = config;

