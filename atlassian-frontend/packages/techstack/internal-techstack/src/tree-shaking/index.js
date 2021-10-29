const noExportAll = {
  id: 'no-export-all',
  caption: 'No export *',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/export/no-export-all',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/export/no-export-all/README.md',
    },
  ],
};

const noImportAll = {
  id: 'no-import-all',
  caption: 'No import *',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/import/no-import-all',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-internal/src/rules/import/no-import-all/README.md',
    },
  ],
};

module.exports = {
  id: 'tree-shaking',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'enable tree shaking',
  },
  solutions: [noExportAll, noImportAll],
};
