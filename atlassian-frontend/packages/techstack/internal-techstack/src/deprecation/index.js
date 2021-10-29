const noDeprecated = {
  id: 'no-deprecated-imports',
  caption: 'No deprecated imports',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      rule: 'no-restricted-imports',
      resolverPlugin: '@atlassian/tangerine',
      configuration: [
        'error',
        {
          paths: [
            {
              name: '@atlaskit/global-navigation',
              message:
                'global-navigation is deprecated. Please use @atlaskit/atlassian-navigation instead.',
            },
            {
              name: '@atlaskit/navigation-next',
              message:
                'navigation-next is deprecated. Please use @atlaskit/atlassian-navigation instead.',
            },
            {
              name: '@atlaskit/field-base',
              message:
                'field-base is deprecated. Please use the @atlaskit/form package instead.',
            },
            {
              name: '@atlaskit/field-radio-group',
              message:
                'field-radio-group is deprecated. Please use @atlaskit/radio instead, and check the migration guide.',
            },
            {
              name: '@atlaskit/field-range',
              message:
                'field-range is deprecated. Please use @atlaskit/range instead.',
            },
            {
              name: '@atlaskit/field-text',
              message:
                'field-text is deprecated. Please use @atlaskit/textfield instead.',
            },
            {
              name: '@atlaskit/field-text-area',
              message:
                'field-text-area is deprecated. Please use @atlaskit/textarea instead.',
            },
            {
              name: '@atlaskit/navigation',
              message:
                'navigation is deprecated. Please use @atlaskit/atlassian-navigation instead.',
            },
            {
              name: '@atlaskit/global-navigation',
              message:
                'global-navigation is deprecated. Please use @atlaskit/atlassian-navigation for the horizontal nav bar, @atlaskit/side-navigation for the side nav, and @atlaskit/page-layout to layout your application.',
            },
            {
              name: '@atlaskit/input',
              message:
                'input is deprecated. This is an internal component and should not be used directly.',
            },
            {
              name: '@atlaskit/layer',
              message:
                'layer is deprecated. This is an internal component and should not be used directly.',
            },
            {
              name: '@atlaskit/single-select',
              message:
                'single-select is deprecated. Please use @atlaskit/select instead.',
            },
            {
              name: '@atlaskit/multi-select',
              message:
                'multi-select is deprecated. Please use @atlaskit/select instead.',
            },
            {
              name: '@atlaskit/droplist',
              message:
                'droplist is deprecated. For the pop-up behaviour please use @atlaskit/popup and for common menu components please use @atlaskit/menu.',
            },
            {
              name: '@atlaskit/item',
              message: 'item is deprecated. Please use @atlaskit/menu instead.',
            },
          ],
        },
      ],
    },
  ],
};

module.exports = {
  id: 'deprecation',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'avoid using deprecated packages',
  },
  solutions: [noDeprecated],
};
