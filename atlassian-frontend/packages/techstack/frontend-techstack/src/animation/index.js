const motion = {
  id: 'atlaskit-motion',
  caption: '@atlaskit/motion',
  href: 'https://atlaskit.atlassian.com/packages/helpers/motion',
  status: 'recommended',
  checks: () => [
    {
      type: 'libraries',
      configuration: '@atlaskit/motion',
    },
  ],
};

module.exports = {
  id: 'animation',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'create animated experiences',
  },
  tags: ['animation', 'transition', 'motion'],
  solutions: [motion],
};
