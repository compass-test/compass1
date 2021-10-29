const eslintAdapter = require('./eslint-adapter');
const getTechstackReport = require('./get-techstack-report');
const stricterAdapter = require('./stricter-adapter');
const { getTechstackConfig } = require('./utils');

module.exports = {
  eslintAdapter,
  stricterAdapter,
  getTechstackReport,
  getTechstackConfig,
};
