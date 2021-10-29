const path = require('path');

const storybookExamples = {
  id: 'storybook-examples',
  caption: 'Storybook "Examples"',
  status: 'recommended',
  checks: ({ pathToPackages, packageRootPath }) => [
    {
      type: 'eslint',
      plugin: 'import',
      rule: 'import/no-extraneous-dependencies',
      resolverPlugin: '@atlassian/tangerine',
      configuration: [
        'error',
        {
          devDependencies: [
            'examples.{js,ts,tsx}',
            'storybook-utils/**/*.{js,ts,tsx}',
          ].map(
            glob =>
              `${path.join(
                pathToPackages,
                packageRootPath.relative,
              )}/src/**/${glob}`,
          ),
        },
      ],
    },
  ],
};

module.exports = {
  id: 'isolated-component-development',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'develop components in isolation',
  },
  solutions: [storybookExamples],
};
