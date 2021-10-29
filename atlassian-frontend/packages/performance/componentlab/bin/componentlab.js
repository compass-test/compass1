#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');
const dotenv = require('dotenv');

const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

dotenv.config();

if (dev && !require.extensions['.ts']) {
  // ts-node can only handle being registered once, see https://github.com/TypeStrong/ts-node/issues/409
  tsNode.register({
    project,
    transpileOnly: true,
  });
}

// eslint-disable-next-line import/no-dynamic-require
require(dev ? '../src/cli.ts' : '../dist/cjs/src/cli');
