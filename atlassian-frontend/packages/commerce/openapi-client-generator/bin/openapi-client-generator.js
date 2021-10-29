#!/usr/bin/env node

/* eslint-disable global-require,import/no-dynamic-require */

const fs = require('fs');
const path = require('path');

const project = path.join(__dirname, '../tsconfig.json');
const dev = fs.existsSync(project);

if (dev) {
  require('ts-node').register({
    project,
    transpileOnly: true,
  });
}

require(path.join(dev ? '../src/index.ts' : '..'));
