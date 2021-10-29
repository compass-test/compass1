/* eslint-disable global-require, import/no-dynamic-require */
module.exports = function _default(env) {
  const envSuffixName = env.includes('prod') ? 'prod' : 'dev';
  return require(`./webpack.${envSuffixName}.js`);
};
/* eslint-enable global-require, import/no-dynamic-require */
