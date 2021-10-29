#!/usr/bin/env node

/* eslint-disable */
/* prettier-ignore */

const fs = require('fs');
const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

if (dev) {
  require('ts-node').register({
    project,
  });
}

require(path.join(dev ? '../src/cli.ts' : '../dist/cjs/cli'))
  .run({
    dev,
  })
  .catch((error) => {
    if (typeof error === 'number') {
      process.exit(error);
    }
    console.error(error);
  });
