const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

jest.mock('pkg-up', () => ({
  sync: () => '/a/b/package.json',
}));

const fixTest = ({ code, errors }) => ({
  code,
  filename: '/a/b/c/file.js',
  errors: errors || undefined,
});

const validTestCases = [
  {
    code: `
        // should be valid for package imports 
        import X from 'foo';
      `,
  },
  {
    code: `
        // should be valid when imported from down the hierarchy 
        import X from './d';
      `,
  },
  {
    code: `
        // should be valid when imported from up the hierarchy, within the package boundaries
        import X from '../foo';
      `,
    options: { default: 1 },
  },
].map(fixTest);

const invalidTestCases = [
  {
    code: `
        // should be invalid when imported using a relative import from outside the package
        import X from '../../foo';
      `,
    errors: [
      {
        messageId: 'invalidImport',
        data: { from: '../../foo' },
      },
    ],
  },
].map(fixTest);

ruleTester.run('import/no-relative-package-imports', rule, {
  valid: validTestCases,
  invalid: invalidTestCases,
});
