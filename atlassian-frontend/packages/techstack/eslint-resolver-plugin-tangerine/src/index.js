const importNoExtraneousDependencies = require('./resolvers/import/no-extraneous-dependencies');
const noRestrictedImports = require('./resolvers/no-restricted-imports');

module.exports = {
  resolvers: {
    'import/no-extraneous-dependencies': importNoExtraneousDependencies,
    'react/button-has-type': () => 'error',
    'import/no-cycle': () => 'error',
    'no-restricted-imports': noRestrictedImports,
    '@atlassian/tangerine/import/no-relative-package-imports': () => 'error',
  },
};
