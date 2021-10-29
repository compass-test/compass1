const liteMode = {
  id: 'lite-mode',
  caption: 'Lite mode component rules',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-class-components',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-internal/src/rules/react/no-class-components/README.md',
    },
    {
      type: 'eslint',
      plugin: 'react',
      rule: 'react/no-did-mount-set-state',
      configuration: ['error', 'disallow-in-func'],
    },
    {
      type: 'eslint',
      plugin: 'react',
      rule: 'react/no-did-update-set-state',
      configuration: ['error', 'disallow-in-func'],
    },
    {
      type: 'eslint',
      plugin: '@repo/internal',
      rule: '@repo/internal/react/no-set-state-inside-render',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-internal/src/rules/react/no-set-state-inside-render/README.md',
    },
  ],
};

module.exports = {
  id: 'ui-components',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'develop performant UI components',
  },
  solutions: [liteMode],
};
