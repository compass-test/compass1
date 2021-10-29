/* eslint-disable global-require */
const path = require('path');

if (!require.extensions['.ts']) {
  require('ts-node').register({
    project: path.join(__dirname, 'tsconfig.json'),
  });
}

module.exports = require('./src/index.ts');
