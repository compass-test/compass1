// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/disallow-unstable-values', rule, {
  valid: ['functionCall();', 'Math.ceil(3-0)'],
  invalid: [
    {
      code: 'uuid()',
      errors: [
        {
          messageId: 'disallowUnstableValues',
        },
      ],
    },
    {
      code: 'uid()',
      errors: [
        {
          messageId: 'disallowUnstableValues',
        },
      ],
    },
    {
      code: 'Math.random()',
      errors: [
        {
          messageId: 'disallowUnstableValues',
        },
      ],
    },
    {
      code: 'Date.now()',
      errors: [
        {
          messageId: 'disallowUnstableValues',
        },
      ],
    },
    {
      code: 'Date()',
      errors: [
        {
          messageId: 'disallowUnstableValues',
        },
      ],
    },
  ],
});
