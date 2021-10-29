// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('import/no-import-all', rule, {
  valid: [
    "import { Something } from 'something';",
    "import { Something as X } from 'something';",
  ],
  invalid: [
    {
      code: "import * as something from 'something';",
      errors: [
        {
          messageId: 'noImportStar',
          data: { path: 'something' },
        },
      ],
    },
  ],
});
