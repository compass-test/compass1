/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getCommonConfig = require('./webpack.common.config');

module.exports = async (env, argv) => {
  const faviconPath = `./public/${
    argv.mode === 'development' ? 'favicon-dev.svg' : 'favicon.svg'
  }`;

  const HTMLPageTitle = 'Scheduled Releases Dashboard';

  return {
    ...(await getCommonConfig()),
    entry: path.resolve(__dirname, '../src/ui/index.tsx'),
    output: {
      filename: '[name].[hash].bundle.js',
      path: path.resolve(__dirname, '../dist/static'),
      publicPath: '/',
    },
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      port: 3001,
      disableHostCheck: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.EnvironmentPlugin(['MICROS_ENV']),
      new HtmlWebPackPlugin({
        inject: true,
        hash: true,
        template: './public/index.html',
        filename: 'index.html',
        favicon: faviconPath,
        title: HTMLPageTitle,
      }),
    ],
  };
};
