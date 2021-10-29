const outdent = require('outdent');

const validateConfig = (...configs) => {
  const configPattern = outdent`
      ["error", {
        "devDependencies": ["glob-a", "glob-b", ... ]
      }]
      `;

  configs.forEach(config => {
    const error = `Configuration ${config} for rule "import/no-extraneous-dependencies" is invalid. Please provide config of the form: ${configPattern}`;
    if (config.length !== 2) {
      throw new Error(error);
    } else if (!config[1].devDependencies) {
      throw new Error(error);
    }
  });
};

const resolver = (existingConfig, newConfig) => {
  validateConfig(existingConfig, newConfig);
  return [
    'error',
    {
      devDependencies: [
        ...existingConfig[1].devDependencies,
        ...newConfig[1].devDependencies,
      ],
    },
  ];
};

module.exports = resolver;
