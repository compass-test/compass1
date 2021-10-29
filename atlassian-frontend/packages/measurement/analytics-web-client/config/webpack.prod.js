/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const indexPath = path.resolve(__dirname, '../src/index.ts');

const baseConfig = merge(commonConfig, {
  mode: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});

const excludeDepsConfig = {
  externals: [/^@segment\/.*/, /^@atlassian\/.*/],
};

const umdConfig = {
  output: {
    library: {
      root: 'AnalyticsWebClient',
      amd: 'analytics-web-client',
      commonjs: 'analytics-web-client',
    },
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

const amdConfig = {
  output: {
    library: 'analytics-web-client',
    libraryTarget: 'amd',
    umdNamedDefine: true,
  },
};

module.exports = [
  // UMD without dependencies
  merge(baseConfig, excludeDepsConfig, umdConfig, {
    entry: {
      'analytics-web-client': indexPath,
    },
    optimization: {
      minimize: false
    },
  }),

  // UMD without dependencies minified
  merge(baseConfig, excludeDepsConfig, umdConfig, {
    entry: {
      'analytics-web-client.min': indexPath,
    },
    optimization: {
      minimize: true
    },
  }),

  // UMD with dependencies
  merge(baseConfig, umdConfig, {
    entry: {
      'analytics-web-client.with-deps': indexPath,
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        defaultSizes: 'parsed',
        generateStatsFile: true,
        statsFilename: 'stats.json',
      }),
    ],
  }),

    // UMD with dependencies minified
    merge(baseConfig, umdConfig, {
      entry: {
        'analytics-web-client.with-deps.min': indexPath,
      },
      optimization: {
        minimize: true
      },
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
          defaultSizes: 'parsed',
          generateStatsFile: true,
          statsFilename: 'stats.json',
        }),
      ],
    }),

  // AMD without dependencies
  merge(baseConfig, excludeDepsConfig, amdConfig, {
    entry: {
      'analytics-web-client.amd': indexPath,
    },
    optimization: {
      minimize: false
    },
  }),

  // AMD without dependencies minified
  merge(baseConfig, excludeDepsConfig, amdConfig, {
    entry: {
      'analytics-web-client.amd.min': indexPath,
    },
    optimization: {
      minimize: true
    },
  }),

  // AMD with dependencies
  merge(baseConfig, amdConfig, {
    entry: {
      'analytics-web-client.with-deps.amd': indexPath,
    },
    optimization: {
      minimize: false
    },
  }),

  // AMD with dependencies minified
  merge(baseConfig, amdConfig, {
    entry: {
      'analytics-web-client.with-deps.amd.min': indexPath,
    },
    optimization: {
      minimize: true
    },
  }),
];
