/**
 * This is a custom `main` entrypoint that switches between source/dist depending on environment, similar to the /bin entrypoint
 */
/* eslint-disable global-require,import/no-dynamic-require */

const path = require('path');

const project = path.join(__dirname, 'tsconfig.json');
const entrypoint = path.join(__dirname, 'src', 'index.ts');

if (!require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });
}

module.exports = require(entrypoint);
