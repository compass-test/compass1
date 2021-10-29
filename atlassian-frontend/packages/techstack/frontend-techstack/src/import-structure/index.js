const atlassianConventions = {
  id: 'atlassian-conventions',
  caption: 'Atlassian Conventions',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: 'import',
      rule: 'import/order',
      href:
        'https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md',
      configuration: [
        'error',
        {
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{@atlaskit,@atlassian,@af}/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    {
      type: 'eslint',
      rule: 'sort-imports',
      href: 'https://eslint.org/docs/rules/sort-imports',
      configuration: [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
    },
    {
      type: 'eslint',
      rule: 'no-duplicate-imports',
      href: 'https://eslint.org/docs/rules/no-duplicate-imports',
    },
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/no-dangling-index',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/no-dangling-index/README.md',
    },
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/no-dangling-slash',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/no-dangling-slash/README.md',
    },
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule:
        '@atlassian/tangerine/import/no-dot-prefix-in-upward-relative-imports',
      herf:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/no-dot-prefix-in-upward-relative-imports/README.md',
    },
  ],
};

module.exports = {
  id: 'import-structure',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'structure my import statements',
  },
  solutions: [atlassianConventions],
};
