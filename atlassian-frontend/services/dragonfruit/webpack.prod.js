const merge = require('webpack-merge');
const CspWebPackPlugin = require('csp-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const constants = require('./build-config/constants');
const common = require('./webpack.common.js');

const SENTRY_AUTH_TOKEN = process.env.COMPASS_SENTRY_AUTH_TOKEN;

module.exports = async () =>
  merge(await common(), {
    mode: 'production',

    output: {
      // [contenthash] only changes if file contents change. This is good for long-term caching.
      filename: '[name].[contenthash].bundle.js',
    },
    plugins: [
      new CspWebPackPlugin({
        'base-uri': "'self'",
        'object-src': "'none'",
        'script-src': [
          "'self'",
          'http://localhost:3000',
          'https://widget.intercom.io/widget/r9osvpuz',
          'https://js.intercomcdn.com',
        ], // localhost:3000 is here so our frontend extension works
        'frame-ancestors': "'none'",
      }),
      // Upload compiled assets to Sentry so that we can de-minify our errors
      ...(SENTRY_AUTH_TOKEN
        ? [
            new SentryCliPlugin({
              include: 'dist',
              ignoreFile: '.sentrycliignore',
              ignore: ['node_modules', 'webpack.config.js'],
              authToken: SENTRY_AUTH_TOKEN,
              urlPrefix: '~/compass', // Assets are delivered from domain.com/compass
              release: constants.COMMIT_HASH, // Changes to the release number should be reflected in the Sentry client configuration
            }),
          ]
        : []),
    ],
    devtool: 'source-map',
  });
