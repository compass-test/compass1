const { join } = require('path');

const { getRules } = require('@atlassian/eslint-utils');
const { getConfigs } = require('@atlassian/eslint-utils');

module.exports = {
  configs: getConfigs(join(__dirname, 'configs'), true),
  rules: getRules(join(__dirname, 'rules')),
};
