const outdent = require('outdent');

const validateConfig = (...configs) => {
  const configPattern = outdent`
      ["error", {
        "paths": [{
          "name": "import-foo",
          "importNames": ["Bar"],
          "message": "Please use Bar from /import-bar/baz/ instead."
        }]
      }]
      `;

  configs.forEach(config => {
    const error = `Configuration ${config} for rule "no-restricted-imports" is invalid. Please provide config of the form: ${configPattern}`;
    if (config.length !== 2) {
      throw new Error(error);
    } else if (!config[1].paths) {
      throw new Error(error);
    }
  });
};

const resolver = (existingConfig, newConfig) => {
  validateConfig(existingConfig, newConfig);
  return [
    'error',
    {
      ...existingConfig[1],
      paths: [...existingConfig[1].paths, ...newConfig[1].paths],
    },
  ];
};

module.exports = resolver;
