#!/usr/bin/env node
/* eslint-disable */
/* prettier-ignore */
const path = require('path');
const project = path.join(__dirname, '../tsconfig.json');
require('ts-node').register({ project });

require('../scripts/cli')
  .run()
  .catch(error => {
    if (typeof error === 'number') {
      process.exit(error);
    }
    console.error(error);
    process.exit(1);
  });
