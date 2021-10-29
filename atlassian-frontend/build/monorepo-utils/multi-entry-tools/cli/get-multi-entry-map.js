#!/usr/bin/env node
const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, '../tsconfig.json'),
});

require('../src/cli/get-multi-entry-map');
