const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

ruleTester.run('export/no-export-all', rule, {
  valid: [
    "export { Something } from 'something';",
    "export { Something as X } from 'something';",
  ],
  invalid: [
    {
      code: "export * from 'something';",
      errors: [
        {
          messageId: 'noExportStar',
          data: { path: 'something' },
        },
      ],
    },
    {
      code: "export * as something from 'something';",
      errors: [
        {
          messageId: 'noExportStar',
          data: { path: 'something' },
        },
      ],
    },
  ],
});
