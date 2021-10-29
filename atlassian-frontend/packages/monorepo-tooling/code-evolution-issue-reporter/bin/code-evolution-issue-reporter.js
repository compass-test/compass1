#!/usr/bin/env node
/* eslint-disable */
/* prettier-ignore */

const fs = require('fs');
const path = require('path');
const paths = require('tsconfig-paths');

const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

if (dev && !require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  require('ts-node').register({ project });

  // We programatically register tsconfig paths here so it picks up the tsconfig here
  // instead of in root CWD.
  paths.register(paths.loadConfig(__dirname));
}

require(path.join('..', dev ? 'src/cli' : 'dist/cjs/cli'))
  .run()
  .catch((error) => {
    if (typeof error === 'number') {
      process.exit(error);
    }
    console.error(error);
    process.exit(1);
  });
