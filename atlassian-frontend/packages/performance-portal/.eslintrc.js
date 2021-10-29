module.exports = {
  rules: {
    'import/dynamic-import-chunkname': [
      'warn',
      {
        webpackChunknameFormat: 'performance-portal-.+',
      },
    ],
    'relay/graphql-syntax': 'error',
    'relay/compat-uses-vars': 'error',
    'relay/graphql-naming': 'error',
    'relay/generated-flow-types': 'error',
    'relay/must-colocate-fragment-spreads': 'error',
    'relay/no-future-added-value': 'error',
    'relay/unused-fields': 'error',
    'relay/function-required-argument': 'error',
    'relay/hook-required-argument': 'error',
  },
  plugins: ['relay'],
};
