// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('props/type-name-no-type-suffix-nor-props', rule, {
  valid: [
    {
      code: "type Size = 'small' | 'medium' | 'large';",
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'interface Data { keywords: string[]; componentName: string; package: string; }',
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'type ButtonProps = { appearance?: Appearance; autoFocus?: boolean; className?: string; };',
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'interface ButtonProps { appearance?: Appearance; autoFocus?: boolean; className?: string; }',
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
  invalid: [
    {
      code: "type SizeType = 'small' | 'medium' | 'large';",
      errors: [
        {
          messageId: 'noTypeSuffix',
          data: { typeName: 'SizeType' },
        },
      ],
      output: "type Size = 'small' | 'medium' | 'large';",
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'interface DataTypes { keywords: string[]; componentName: string; package: string; }',
      errors: [
        {
          messageId: 'noTypeSuffix',
          data: { typeName: 'DataTypes' },
        },
      ],
      output:
        'interface Data { keywords: string[]; componentName: string; package: string; }',
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'type Props = { appearance?: Appearance; autoFocus?: boolean; className?: string; };',
      errors: [
        {
          messageId: 'noPropsName',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
    {
      code:
        'interface Props { appearance?: Appearance; autoFocus?: boolean; className?: string; }',
      errors: [
        {
          messageId: 'noPropsName',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
    },
  ],
});
