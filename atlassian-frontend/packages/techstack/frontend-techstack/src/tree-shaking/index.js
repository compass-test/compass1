const atlassianConventions = {
  id: 'atlassian-conventions',
  caption: 'Atlassian Conventions',
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

module.exports = {
  id: 'tree-shaking',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'enable tree shaking',
  },
  solutions: [atlassianConventions],
};
