/**
 * This is a custom `main` entrypoint that switches between source/dist depending on environment, similar to the /bin entrypoint
 */
/* eslint-disable global-require,import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');

const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

const entrypoint = path.join(__dirname, 'worker');
if (dev) {
  if (!require.extensions['.ts']) {
    // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
    tsNode.register({
      project,
      transpileOnly: true,
    });
  }
}

module.exports = require(entrypoint);
