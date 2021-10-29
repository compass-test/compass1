#!/usr/bin/env node

const meow = require('meow');

const updateTechStackConfig = require('../cli-utils/update-techstack-config');
const validate = require('../cli-utils/validate');

/*******************************************/

const cli = meow(
  `
    Usage
      $ techstack update <add|remove>
      $ techstack validate

    Examples
      $ techstack update add
      $ techstack update delete
      $ techstack validate
`,
  {},
);

if (cli.input[0] === 'update') {
  updateTechStackConfig(cli.input[1]);
} else if (cli.input[0] === 'validate') {
  validate();
}
