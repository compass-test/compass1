#!/usr/bin/env node
const config = require('../tsconfig.tsnode.json');
require('ts-node').register(config);
require('../src/bin/get-tokens');
