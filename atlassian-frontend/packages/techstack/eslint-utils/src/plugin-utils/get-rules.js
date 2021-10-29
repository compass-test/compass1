const { readdirSync, statSync } = require('fs');
const { resolve, sep } = require('path');

const getRuleName = (rulePath, rulesRoot) => {
  // remove root and separator, remove index.js, replace separator with "/"
  const result = rulePath
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

const getRules = rulesRoot => {
  /*
    Assume every rule has its own directory:
    - index.js - rule code
    - README.md - documentation

    Rule name = relative path from rulesRoot to rule directory
    */
  const files = getFilesList(rulesRoot);
  const result = files.reduce((acc, file) => {
    if (!/index\.(js|tsx?)/i.test(file)) {
      return acc;
    }

    const ruleName = getRuleName(file, rulesRoot);

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const module = require(file);
    acc[ruleName] = module.default || module;

    return acc;
  }, {});

  return result;
};

module.exports = getRules;
