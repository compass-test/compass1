#!/usr/bin/env node
const path = require('path');

require('ts-node').register({
  // avoid dead locks tsconfig.entry-points.json
  transpileOnly: true,
  project: path.join(__dirname, '../tsconfig.json'),
});

require('../src/cli/get-tsconfig-paths');
