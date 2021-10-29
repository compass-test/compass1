module.exports = {
  config: {
    rootPath: '.',
    eslintConfigPath: '.',
    pathToPackages: 'packages',
    exclusions: ['__fixtures__'],
  },
  repository: {
    '@atlassian/frontend': {
      typing: ['typescript'],
      'code-structure': ['tangerine-next'],
      'package-boundaries': ['linting'],
      'tree-shaking': ['atlassian-conventions'],
      'import-structure': ['atlassian-conventions'],
      'circular-dependencies': ['file-level'],
    },
    '@repo/internal': {
      'tree-shaking': ['no-import-all', 'no-export-all'],
      analytics: ['analytics-next'],
      theming: ['new-theming-api'],
      'ui-components': ['lite-mode'],
      deprecation: ['no-deprecated-imports'],
      'design-system': ['v1'],
    },
  },
  default: {
    '@atlassian/frontend': {
      typing: ['typescript'],
      'tree-shaking': ['atlassian-conventions'],
      'package-boundaries': ['linting'],
    },
  },
};
