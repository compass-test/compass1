#!/usr/bin/env node
const path = require('path');

require('ts-node').register({
  cache: true,
  transpileOnly: true,
  project: path.join(__dirname, '../tsconfig.json'),
});

require('../src/cli/build.ts');
