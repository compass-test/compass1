// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/boolean-prop-naming-convention', rule, {
  valid: [
    {
      code: `
        interface ButtonProps {
          weird: boolean | string;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          'aria-hidden': boolean;
          ['aria-hidden']: boolean;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          isDisabled: boolean;
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
  invalid: [
    {
      code: `
        interface ButtonProps {
          disabled: boolean;
        }
      `,
      errors: [
        {
          message:
            'Prop should be prefixed with one of the following: "is, has, should".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          disabled: boolean | null | undefined;
        }
      `,
      errors: [
        {
          message:
            'Prop should be prefixed with one of the following: "is, has, should".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          disabled: boolean | null;
        }
      `,
      errors: [
        {
          message:
            'Prop should be prefixed with one of the following: "is, has, should".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          disabled: boolean | undefined;
        }
      `,
      errors: [
        {
          message:
            'Prop should be prefixed with one of the following: "is, has, should".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
        interface ButtonProps {
          isdisabled: boolean;
        }
      `,
      output: `
        interface ButtonProps {
          isDisabled: boolean;
        }
      `,
      errors: [
        {
          messageId: 'propShouldBeCamelCase',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
});
