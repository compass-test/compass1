const legacyV1 = {
  id: 'old-theming-api',
  caption:
    'The theming solution powered by the themed() function, built on styled components.',
  status: 'deprecated',
  checks: () => [],
};

const legacyV2 = {
  id: 'new-theming-api',
  caption: 'The theming solution powered by React context.',
  status: 'deprecated',
  checks: () => [
    {
      type: 'eslint',
      rule: 'no-restricted-imports',
      resolverPlugin: '@atlassian/tangerine',
      configuration: [
        'error',
        {
          paths: [
            {
              name: '@atlaskit/theme',
              importNames: [
                'AtlaskitThemeProvider',
                'getTheme',
                'math',
                'themed',
              ],
              message: `This theme export is deprecated; check the \`theme\` documentation for more information on how to upgrade`,
            },
            {
              name: '@atlaskit/theme/math',
              message: `Theme's \`math\` exports are deprecated; please perform math operations using plain Javascript`,
            },
          ],
        },
      ],
    },
  ],
};

const tokens = {
  id: 'tokens',
  caption: 'Atlassian global theming powered by CSS.',
  status: 'unavailable',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@atlaskit/design-system',
      rule: '@atlaskit/design-system/ensure-design-token-usage',
      configuration: ['error', { shouldEnforceFallbacks: true }],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/design-system/eslint-plugin/src/rules/ensure-design-token-usage/README.md',
    },
  ],
};

module.exports = {
  id: 'theming',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'theme my components',
  },
  solutions: [legacyV1, legacyV2, tokens],
};
