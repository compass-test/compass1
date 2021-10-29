module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/examples.tsx',
          // __tests__ dirs inside src
          '**/__tests__/**/*.{js,ts,tsx}',
          // Storybook
          '.storybook/*',
          // Examples
          '**/examples/**/*.tsx',
          //Docs
          '**/docs/*',
          // Integration tests
          '**/analytics-integration-tests/**/*',
        ],
      },
    ],
    'import/no-internal-modules': ['warn'],
  },
};
