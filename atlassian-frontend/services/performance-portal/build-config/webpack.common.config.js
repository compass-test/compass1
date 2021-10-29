const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

const getCommonConfig = async () => ({
  stats: 'errors-only',
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
