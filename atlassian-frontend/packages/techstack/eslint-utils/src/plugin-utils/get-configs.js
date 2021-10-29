const { readdirSync, statSync } = require('fs');
const { resolve, sep } = require('path');

const merge = require('lodash/merge');

const getConfigName = (configPath, rulesRoot) => {
  // remove root and separator, remove index.js, replace separator with "/"
  const result = configPath
    .substring(rulesRoot.length + 1)
    .split(sep)
    .slice(0, -1)
    .join('/');

  return result;
};

const getFilesList = dir => {
  const list = readdirSync(dir);
  const result = list.reduce((acc, file) => {
    const pathFile = resolve(dir, file);

    if (statSync(pathFile).isDirectory()) {
      return [...acc, ...getFilesList(pathFile)];
    }

    return [...acc, pathFile];
  }, []);

  return result;
};

const generateRecommendedConfig = configs => {
  return Object.entries(configs).reduce(
    (acc, [, config]) => {
      acc.config = merge(acc.config, config);
      return acc;
    },
    {
      meta: {
        docs: {
          description: 'The recommended config, includes all other configs',
        },
      },
      config: {},
    },
  );
};

const getConfigs = (configsRoot, configOnly = false) => {
  /*
    Assume every config has its own directory:
    - index.js - config code

    Config name = relative path from configsRoot to configs directory
    */
  const files = getFilesList(configsRoot);
  const result = files.reduce((acc, file) => {
    if (!/index\.js/i.test(file)) {
      return acc;
    }

    const ruleName = getConfigName(file, configsRoot);

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const configModule = require(file);
    acc[ruleName] = configOnly ? configModule.config : configModule;
    return acc;
  }, {});

  const recommendedConfig = generateRecommendedConfig(result);
  result.recommended = configOnly
    ? recommendedConfig.config
    : recommendedConfig;

  return result;
};

module.exports = getConfigs;
