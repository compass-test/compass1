#!/usr/bin/env node
/* eslint-disable */
/* prettier-ignore */

const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');

// There is no dev/prod mode switch here because we do not build a prod bundle since the package is private
require('ts-node').register({ project });
require(path.join('..', 'src/cli'))
  .run()
  .catch(error => {
    if (typeof error === 'number') {
      process.exit(error);
    }
    console.error(error);
    process.exit(1);
  });
