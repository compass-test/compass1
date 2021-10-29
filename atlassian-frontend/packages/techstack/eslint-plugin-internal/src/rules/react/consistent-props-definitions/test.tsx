// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

const blockListOptions = {
  blockList: [
    {
      name: 'overrides',
      message: 'Custom message!',
    },
    {
      name: 'cssFn',
    },
    {
      name: 'theme',
    },
    {
      name: 'style',
      disabled: true,
    },
    {
      pattern: '^on.+Requested$',
    },
  ],
};

const ensureOptions = {
  ensureOptional: [
    {
      name: 'testId',
    },
  ],
  ensureRequired: [
    {
      name: 'optional',
    },
  ],
};

ruleTester.run('react/consistent-props-definitions', rule, {
  valid: [
    {
      code: `
interface MyComponentProps {
  // eslint-disable-next-line
  theme: any;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
          `,
      options: [blockListOptions],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    `
function MyComponent(props) {
  return null;
}
            `,
    {
      code: `
interface MyComponentProps {
  isEnabled: boolean;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
              `,
      options: [blockListOptions],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
  invalid: [
    {
      code: `
interface MyComponentProps {
  overrides: any;
  cssFn: any;
  theme: any;
  style: any;
  onXyzRequested: any;
}

function MyComponent(props: MyComponentProps) {
  return null;
}
            `,
      options: [blockListOptions],
      errors: [
        {
          message: `Use of the "overrides" prop is not allowed. Custom message!`,
        },
        {
          message: `Use of the "cssFn" prop is not allowed.`,
        },
        {
          message: `Use of the "theme" prop is not allowed.`,
        },
        {
          message: `Use of the "onXyzRequested" prop is not allowed.`,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
interface FirstProps {
  overrides: any;
}

interface SecondProps {
  cssFn: any;
}

interface ThirdProps {
  theme: any;
}

type MyComponentProps = FirstProps & SecondProps & ThirdProps;

function MyComponent(props: MyComponentProps) {
  return null;
}
      `,
      options: [blockListOptions],
      errors: [
        {
          message: `Use of the "overrides" prop is not allowed. Custom message!`,
        },
        {
          message: `Use of the "cssFn" prop is not allowed.`,
        },
        {
          message: `Use of the "theme" prop is not allowed.`,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
interface ComponentProps {
  overrides: any;
}

function MyComponent(props: ComponentProps) {
  return null;
}
      `,
      options: [blockListOptions],
      errors: [
        {
          message: `Use of the "overrides" prop is not allowed. Custom message!`,
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code: `
interface ComponentPropTypes {
  testId: string;
  optional?: boolean;
}

function MyComponent(props: ComponentPropTypes) {
  return null;
}
      `,
      options: [ensureOptions],
      errors: [
        {
          message: `The "testId" prop should be marked as optional.`,
        },
        {
          message: 'The "optional" prop should be marked as required.',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
});
