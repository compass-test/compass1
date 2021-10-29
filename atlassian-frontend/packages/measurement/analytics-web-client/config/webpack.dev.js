/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  entry: {
    example: path.resolve(__dirname, '../example/index.js'),
  },

  output: {
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
});
