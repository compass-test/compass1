const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, path.resolve(__dirname, '../../packages')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    development: true,
                  },
                ],
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@atlassian/react-render-analyzer/babel',
                'react-hot-loader/babel',
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // eslint-disable-next-line
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
