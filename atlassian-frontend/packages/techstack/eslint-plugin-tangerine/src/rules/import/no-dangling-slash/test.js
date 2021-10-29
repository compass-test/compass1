const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

ruleTester.run('import/no-dangling-slash', rule, {
  valid: [
    "import something from 'some/path/with/no/slash/at/the/end'",
    "import something from './index'",
    "import something from '.././.././../src'",
    "import something from '../packages/something'",
    "import something from './packages/something'",
    "import something from '/packages/something'",
  ],
  invalid: [
    {
      code: "import something from '/some/absolute/path/'",
      errors: [
        {
          messageId: 'removeSlash',
          data: { value: '/some/absolute/path/' },
        },
      ],
      output: "import something from '/some/absolute/path'",
    },
    {
      code: "import something from '../../some/relative/path/'",
      errors: [
        {
          messageId: 'removeSlash',
          data: { value: '../../some/relative/path/' },
        },
      ],
      output: "import something from '../../some/relative/path'",
    },
  ],
});
