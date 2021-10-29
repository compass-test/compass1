/**
 * Wrapper around node's require.resolve method.
 * Allows easier mocking in tests via jest.mock.
 */
const getPkgRoot = require('./get-pkg-root');

const requireResolve = (source, dependency) => {
  try {
    return require.resolve(`${dependency}/package.json`, {
      paths: [`${getPkgRoot(source)}`],
    });
  } catch (e) {
    return false;
  }
};

module.exports = {
  requireResolve,
};
