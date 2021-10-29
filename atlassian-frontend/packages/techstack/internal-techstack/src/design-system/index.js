const jsdocChecks = require('./checks/jsdoc');

const designSystemV1 = {
  id: 'v1',
  caption: 'Design system linting rules',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/boolean-prop-naming-convention',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/boolean-prop-naming-convention/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-css-string-literals',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/no-css-string-literals/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/consistent-props-definitions',
      configuration: [
        'error',
        {
          blockList: [
            {
              name: 'theme',
              message:
                'Theme is a performance and maintenance liability, instead rethink if this is needed, use global theming, consider moving logic into the owning component, or create a new component.',
            },
            {
              name: 'overrides',
              message:
                'Overrides are a performance and maintenance liability, instead consider idiomatic composition patterns instead.',
            },
            {
              name: 'cssFn',
              message:
                'CSSFn is a performance and maintenance liability, instead rethink if this is needed, consider moving logic into the owning component, or create a new component.',
            },
            {
              name: 'component',
              message:
                'Component prop suffers from re-mounting issues when needing to access props/state from a parent. Use "render" props instead.',
            },
            {
              pattern: 'i18n',
              message:
                'Translatable text should be in the format "(xyz)?Label".',
            },
            {
              pattern: '^ariaLabel',
              message: 'Use "label" instead.',
            },
            {
              pattern: '^aria([A-Z])',
              message:
                'Use the kebab case name instead, think through if this can be abstracted away instead of giving aria directly.',
            },
            {
              pattern: '(l|L)abel.+',
              message: 'Translatable text should end in "label".',
            },
            {
              name: 'text',
              message:
                'Use "children" instead, or "label" if this is translatable text.',
            },
            {
              pattern: '^on.+Requested$',
              message: 'Requested is redundant you can remove it.',
            },
            {
              name: 'beforeElem',
              message: 'Use beforeIcon instead.',
            },
            {
              name: 'afterElem',
              message: 'Use afterIcon instead.',
            },
            {
              pattern: '(data|items)$',
              message:
                'Instead of taking data consider using idiomatic composition patterns instead.',
            },
          ],
          ensureRequired: [],
          ensureOptional: [
            {
              name: 'testId',
            },
          ],
        },
      ],
    },
    {
      rule: 'no-restricted-imports',
      resolverPlugin: '@atlassian/tangerine',
      configuration: [
        'error',
        {
          paths: [
            {
              name: 'styled-components',
              message: `Package disallows styled-components. Please use emotion CSS prop instead. See: https://emotion.sh/docs/object-styles.`,
            },
            {
              name: '@emotion/styled',
              message: `Package disallows styled. Please use emotion CSS prop instead. See: https://emotion.sh/docs/object-styles.`,
            },
          ],
        },
      ],
      href: 'https://eslint.org/docs/rules/no-restricted-imports#rule-details',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-clone-element',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/no-clone-element/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/consistent-types-definitions',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/consistent-types-definitions/README.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/fs/filename-pattern-match',
      configuration: [
        'error',
        [
          {
            test: '.*',
            shouldMatch: '^_?[a-z0-9-./]+$',
            message: 'Expect file name to be kebab-case',
          },
          {
            test: '^.*\\.ts$',
            shouldMatch: '^.*\\.tsx$',
            message: 'Expect ts files to be tsx',
          },
        ],
      ],
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/fs/package-json-entry-match',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-unsafe-overrides',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/no-unsafe-overrides/README.md',
      configuration: [
        'error',
        {
          unsafeOverrides: ['overrides', 'cssFn', 'theme'],
        },
      ],
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-children-properties-access',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/no-children-properties-access/README.md',
    },
    {
      type: 'eslint',
      resolverPlugin: '@atlassian/tangerine',
      rule: 'react/button-has-type',
      configuration: ['error'],
      href:
        'https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md',
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/disallow-unstable-values',
      configuration: ['error'],
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/disallow-unstable-values/README.md',
    },
    ...jsdocChecks,
  ],
};

module.exports = {
  id: 'design-system',
  caption: {
    'as-a': 'design system engineer',
    'i-want-to': 'develop design system packages in a consistent way',
  },
  solutions: [designSystemV1],
};
