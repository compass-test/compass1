module.exports = {
  extends: './babel.config.shared',
  babelrcRoots: [
    // Keep the root as a root
    '.',
    // Also consider monorepo packages "root" and load their .babelrc.json files.
    './packages/*/*',
  ],
};
