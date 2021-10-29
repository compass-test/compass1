const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

const config = async () => ({
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
  devtool: 'source-map',
});

module.exports = config();
