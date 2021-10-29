// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

jest.mock('read-pkg-up', () => {
  const items = [
    {
      'atlaskit:src': 'src/index.tsx',
    },
    {
      'atlaskit:src': 'src/index.ts',
    },
    {
      'atlaskit:src': 'src/index.ts',
    },
    {
      'atlaskit:src': 'src/index.tsx',
    },
    {},
  ];

  return {
    sync: () => ({
      packageJson: items.shift(),
    }),
  };
});

ruleTester.run('fs/package-json-entry-match', rule, {
  valid: [
    {
      code: '',
      filename: 'packages/design-system/motion/src/index.tsx',
    },
    {
      code: '',
      filename: 'packages/analytics/analytics/src/index.js',
    },
    {
      code: '',
      filename: 'packages/design-system/button/src/index.ts',
    },
  ],
  invalid: [
    {
      code: '',
      filename: 'packages/design-system/motion/src/index.tsx',
      errors: [
        {
          messageId: 'incorrectEntry',
        },
      ],
    },
    {
      code: '',
      filename: 'packages/design-system/button/src/index.ts',
      errors: [
        {
          messageId: 'incorrectEntry',
        },
      ],
    },
    {
      code: '',
      filename: 'packages/design-system/button/src/index.ts',
      errors: [
        {
          messageId: 'missingEntry',
        },
      ],
    },
  ],
});
