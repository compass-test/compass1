/** Javascript wrapper around packages.ts, used when importing packages.ts from javascript files.
 *  Renamed with an -old suffix to prevent error TS5056 errors that occur when same filename exists with ts/js extensions in conjunction with `allowJS: true`
 */

/* eslint-disable global-require,import/no-dynamic-require */
const path = require('path');

const project = path.join(__dirname, 'tsconfig.json');
const entrypoint = path.join(__dirname, 'packages.ts');

if (!require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });
}

module.exports = require(entrypoint);
