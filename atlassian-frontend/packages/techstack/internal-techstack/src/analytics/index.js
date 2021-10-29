const withAnalyticsEvents = {
  id: 'with-analytics-events',
  caption:
    'The HoC-based analytics export from `analytics-next` in atlassian-frontend',
  status: 'discouraged',
  checks: () => [],
};

const useAnalytics = {
  id: 'use-analytics-events',
  caption: 'The newer, hooks-based analytics solution in atlassian-frontend',
  resolverPlugin: '@atlassian/tangerine',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      rule: 'no-restricted-imports',
      configuration: [
        // Not recommended, but there are legimiate use cases
        'error',
        {
          paths: [
            {
              name: '@atlaskit/analytics',
              importNames: ['withAnalytics'],
              message: `Don’t use the withAnalytics HOC (you should avoid all HOCs). Use useAnalytics hook instead`,
            },
            {
              name: '@atlaskit/analytics-next',
              importNames: ['withAnalyticsEvents'],
              message: `Don’t use the withAnalytics HOC (you should avoid all HOCs). Use useAnalytics hook instead`,
            },
          ],
        },
      ],
    },
  ],
};

module.exports = {
  id: 'analytics',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'instrument React components',
  },
  solutions: [useAnalytics, withAnalyticsEvents],
};
