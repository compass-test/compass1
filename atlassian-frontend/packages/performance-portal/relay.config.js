module.exports = {
  src: './src',
  schema: '../schema.graphql',
  language: 'typescript',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    '**/__generated__/graphql.ts',
    '**/common/graphql/**/*.graphql',
  ],
  customScalars: {
    DateTime: 'String',
    Date: 'String',
  },
};
