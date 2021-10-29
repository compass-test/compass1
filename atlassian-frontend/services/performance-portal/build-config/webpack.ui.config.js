/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getCommonConfig = require('./webpack.common.config');

const getWebpackAnalyzerConfig = (analyzeEnabled) => {
  if (analyzeEnabled) {
    return [new BundleAnalyzerPlugin()];
  }
  return [];
};

module.exports = async (env, argv) => {
  const faviconPath = `./public/${
    argv.mode === 'development' ? 'favicon-dev.svg' : 'favicon.svg'
  }`;

  const webpackAnalyzerEnabled =
    argv.analyze !== null && argv.analyze !== undefined;

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
      host: '0.0.0.0',
      disableHostCheck: true,
    },
    plugins: [
      ...getWebpackAnalyzerConfig(webpackAnalyzerEnabled),
      new webpack.EnvironmentPlugin({
        MICROS_ENV: 'local',
        USER: process.env.USER,
      }),
      new GenerateSW(),
      new HtmlWebPackPlugin({
        inject: true,
        hash: true,
        template: './public/index.html',
        filename: 'index.html',
        favicon: faviconPath,
      }),
    ],
  };
};
