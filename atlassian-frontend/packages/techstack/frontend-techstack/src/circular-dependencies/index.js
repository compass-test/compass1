const fileAndFolderLevel = {
  id: 'file-and-folder-level',
  caption: 'File and folder level',
  status: 'recommended',
  checks: () => [
    {
      type: 'stricter',
      rule: 'stricter/circular-dependencies',
      href:
        'https://github.com/stricter/stricter#strictercircular-dependencies',
      configuration: {
        level: 'error',
        config: {
          checkSubTreeCycle: true,
        },
      },
    },
  ],
};

const fileLevel = {
  id: 'file-level',
  caption: 'File level',
  checks: () => [
    {
      type: 'eslint',
      plugin: 'import',
      resolverPlugin: '@atlassian/tangerine',
      rule: 'import/no-cycle',
      href:
        'https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md',
    },
  ],
};

module.exports = {
  id: 'circular-dependencies',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'avoid circular dependencies within my package',
  },
  solutions: [fileAndFolderLevel, fileLevel],
  description: `See [the most important page on Hello](https://hello.atlassian.net/wiki/spaces/~oburn/blog/2017/06/22/183658960/Is+your+code+a+big+ball+of+mud).`,
};
