const path = require('path');
const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

const getCommonConfig = async () => ({
  stats: 'errors-only',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
    alias: {
      ...(await moduleResolveMapBuilder()),
      // Workaround for pg/babel transpilation issue: https://stackoverflow.com/a/59652739
      'pg-native': path.resolve(__dirname, 'workaround.js'),
      dns: path.resolve(__dirname, 'workaround.js'),
      sqlite3: path.resolve(__dirname, 'workaround.js'),
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
            cacheDirectory: false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|svg|gif)?$/,
        use: 'url-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  devtool: 'source-map',
});

module.exports = getCommonConfig;
