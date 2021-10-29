const dummy = {
  id: 'dummy',
  caption: 'dummy',
  status: 'recommended',
  checks: () => [
    {
      type: 'stricter',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/dummy',
      configuration: {
        level: 'error',
        config: {},
      },
    },
  ],
};

const dummyFail = {
  id: 'dummy-fail',
  caption: 'dummy-fail',
  status: 'recommended',
  checks: () => [
    {
      type: 'stricter',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/dummy-fail',
      configuration: {
        level: 'error',
        config: {},
      },
    },
  ],
};

module.exports = {
  id: 'dummy',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'test the techstack tooling',
  },
  solutions: [dummy, dummyFail],
};
