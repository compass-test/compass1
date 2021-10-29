module.exports = [
  {
    type: 'eslint',
    plugin: 'jsdoc',
    rule: 'jsdoc/no-bad-blocks',
    configuration: ['error'],
  },
  {
    type: 'eslint',
    plugin: 'jsdoc',
    rule: 'jsdoc/check-alignment',
    configuration: ['error'],
  },
  {
    type: 'eslint',
    plugin: 'jsdoc',
    rule: 'jsdoc/no-multi-asterisks',
    configuration: ['error'],
  },
  {
    type: 'eslint',
    plugin: 'jsdoc',
    rule: 'jsdoc/require-asterisk-prefix',
    configuration: ['error'],
  },
  {
    type: 'eslint',
    plugin: 'jsdoc',
    rule: 'jsdoc/multiline-blocks',
    configuration: [
      'error',
      {
        noSingleLineBlocks: true,
        singleLineTags: ['jsx'],
      },
    ],
  },
  {
    type: 'eslint',
    plugin: '@repo/internal',
    rule: '@repo/internal/react/require-jsdoc',
    href:
      'https://bitbucket.org/atlassian/atlassian-frontend/src/develop/packages/techstack/eslint-plugin-internal/src/rules/react/require-jsdoc/README.md',
  },
];
