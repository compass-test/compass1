// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

const options = [
  {
    unsafeOverrides: ['overrides', 'cssFn', 'theme'],
  },
];

ruleTester.run('react/no-unsafe-overrides', rule, {
  valid: [
    {
      code: '<Checkbox />',
      options,
    },
    {
      code: '<Checkbox isChecked />',
      options,
    },
  ],
  invalid: [
    {
      code: "<Checkbox overrides={{ text: 'testing' }} />",
      options,
      errors: [
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'overrides',
          },
        },
      ],
    },
    {
      code: '<Checkbox cssFn={() => {}} />',
      options,
      errors: [
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'cssFn',
          },
        },
      ],
    },
    {
      code: '<Checkbox theme={() => {}} />',
      options,
      errors: [
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'theme',
          },
        },
      ],
    },
    {
      code:
        "<Checkbox overrides={{ text: 'testing' }} cssFn={() => {}} theme={() => {}} />",
      options,
      errors: [
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'overrides',
          },
        },
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'cssFn',
          },
        },
        {
          messageId: 'noUnsafeOverrides',
          data: {
            propName: 'theme',
          },
        },
      ],
    },
  ],
});
