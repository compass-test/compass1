#!/usr/bin/env node
// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node').register({
  transpileOnly: true,
});
require('./src/cli.ts');
