/* eslint-disable no-param-reassign */
const path = require('path');
const webpackConfig = require('@atlaskit/webpack-config');

function buildCacheGroups(statsGroups /*:Array<Object> */) {
  return statsGroups.reduce((acc, group) => {
    return group.stats.reduce((cacheGroups, item) => {
      if (item.cacheGroup) {
        cacheGroups[item.cacheGroup.name] = item.cacheGroup;
      }
      if (item.group) {
        cacheGroups = { ...cacheGroups, ...buildCacheGroups([item]) };
      }
      return cacheGroups;
    }, acc);
  }, {});
}

async function createWebpackConfig(
  {
    entryPoint,
    outputDir,
    optimization,
    isAnalyze = false,
  } /*: { entryPoint: string | [string],  outputDir: string, optimization: string, isAnalyze: boolean} */,
) {
  const config = await webpackConfig.createWebpackConfig({
    mode: 'production',
    websiteEnv: 'production',
    noMinimize: false,
    report: isAnalyze,
    entry: entryPoint,
    output: {
      filename: '[name].js',
      path: outputDir,
      publicPath: '/',
    },
  });
  config.plugins = config.plugins.slice(2);
  /**
   * Resolve some of the common deps to empty files,
   * so they are not affecting a package bundle size.
   */
  config.resolve.alias = {
    ...config.resolve.alias,
    'styled-components': path.resolve(__dirname, '..', 'noop.js'),
    react: path.resolve(__dirname, '..', 'noop.js'),
    'react-dom': path.resolve(__dirname, '..', 'noop.js'),
    'prop-types': path.resolve(__dirname, '..', 'noop.js'),
    tslib: path.resolve(__dirname, '..', 'noop.js'),
  };

  if (optimization) {
    config.optimization = optimization;
  }

  return config;
}

module.exports = { buildCacheGroups, createWebpackConfig };
