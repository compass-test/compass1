/* eslint-disable global-require */

export async function getEditorMobileBridgeWebpackConfig() {
  const createWebpackConfig = require('@atlaskit/editor-mobile-bridge/webpack.test.config');
  const webpackConfig = await createWebpackConfig(undefined, {});
  return webpackConfig;
}

export function getEditorMobileBridgePort() {
  const buildUtils = require('@atlaskit/editor-mobile-bridge/build/utils');
  return buildUtils.PORT;
}
