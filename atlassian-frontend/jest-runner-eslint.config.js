const cliOptions = {};

// We use JSON reporting when we need to process eslint errors such as when automatically adding suppression comments
if (process.env.JSON_REPORTING) {
  cliOptions.format = 'json';
}

module.exports = {
  cliOptions,
};
