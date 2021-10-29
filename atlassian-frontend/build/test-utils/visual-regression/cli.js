#!/usr/bin/env node

/**
 * We use this programmatic style instead of a tsconfig.json
 * due to ts-node not working well with "paths" options and
 * chosing the wrong config file
 */
require('ts-node').register({
  extends: '../../../tsconfig.json',
  include: ['**/*.ts', 'typings/*.ts'],
  compilerOptions: {
    baseUrl: '.',
    module: 'commonjs',
    target: 'es2018',
    types: ['node', 'jest'],
    typeRoots: ['../../../typings', './node_modules/@types'],
  },
});
require('./index');
