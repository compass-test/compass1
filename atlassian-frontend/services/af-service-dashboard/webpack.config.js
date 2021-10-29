const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

module.exports = async () => ({
  stats: 'errors-only',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
    alias: {
      ...(await moduleResolveMapBuilder()),
      images: path.resolve(__dirname, './public/images'),
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/ui/index.tsx'),
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, './dist/static'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    port: 3000,
    disableHostCheck: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8080',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.svg',
    }),
  ],
});
