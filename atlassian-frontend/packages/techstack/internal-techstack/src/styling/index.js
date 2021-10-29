const consistentCSSProp = {
  id: 'emotion',
  caption: 'Consistent styling rules using emotion.',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/consistent-css-prop-usage',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/consistent-css-prop-usage/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/styles/consistent-style-ordering',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/styles/consistent-style-ordering/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/styles/no-nested-styles',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/styles/no-nested-styles/README.md',
    },
  ],
};

module.exports = {
  id: 'styling',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'style my experiences',
  },
  solutions: [consistentCSSProp],
};
