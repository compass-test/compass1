const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

const constants = require('./build-config/constants');

module.exports = async () => ({
  entry: {
    // Make sure react-hot-loader is required before react and react-dom
    app: ['react-hot-loader/patch', path.resolve(__dirname, './src/index.tsx')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: constants.PUBLIC_PATH,
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/compass.ico',
    }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: './public/favicon.svg',
          to: 'favicon.svg',
        },
        // Icons for smart links
        {
          from: './public/service.svg',
          to: 'service.svg',
        },
        {
          from: './public/application.svg',
          to: 'application.svg',
        },
        {
          from: './public/other.svg',
          to: 'other.svg',
        },
        {
          from: './public/library.svg',
          to: 'library.svg',
        },
      ],
    }),
    new MomentLocalesPlugin({
      // Only keep languages/locales officially supported by Compass to reduce bundle size
      // e.g. see packages/dragonfruit/components/src/i18n/index.ts for a list of supported languages
      localesToKeep: [
        'cs',
        'da',
        'de',
        'en',
        'es',
        'et',
        'fi',
        'fr',
        'hu',
        'it',
        'ja',
        'ko',
        'nb',
        'nl',
        'pl',
        'pt',
        'ru',
        'sk',
        'sv',
        'th',
        'tr',
        'uk',
        'vi',
        'zh-cn',
        'zh-tw',
      ],
    }),
    new webpack.DefinePlugin({
      __SERVER__: false,
      COMPASS_BUILD_COMMIT_HASH: JSON.stringify(constants.COMMIT_HASH),
      COMPASS_BUILD_KEY: JSON.stringify(process.env.BITBUCKET_BUILD_NUMBER),
      COMPASS_PUBLIC_PATH: JSON.stringify(constants.COMPASS_PUBLIC_PATH),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
    alias: {
      ...(await moduleResolveMapBuilder()),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            envName: 'production:es2019',
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|svg|gif)?$/,
        use: 'url-loader',
      },
    ],
  },
});
