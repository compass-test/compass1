/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const getCommonConfig = require('./webpack.common.config');

module.exports = async () => {
  return {
    ...(await getCommonConfig()),
    entry: path.resolve(__dirname, '../src/server/index.ts'),
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../dist/server'),
    },
    node: {
      __filename: false,
      __dirname: false,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        MICROS_ENV: 'local',
        USER: process.env.USER,
      }),
    ],
  };
};
