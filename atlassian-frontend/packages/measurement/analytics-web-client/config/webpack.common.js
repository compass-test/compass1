const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
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
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [],
};
