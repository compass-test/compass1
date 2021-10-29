// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-class-components', rule, {
  valid: [
    'class NotAComponent {}',
    'const a = React.Component',
    "import {Component} from 'react'",
  ],
  invalid: [
    {
      code: 'class ClassComponent extends React.Component {}',
      errors: [
        {
          messageId: 'noClassComponent',
        },
      ],
    },
    {
      code: 'class ClassComponent extends React.PureComponent {}',
      errors: [
        {
          messageId: 'noClassComponent',
        },
      ],
    },
    {
      code: 'class ClassComponent extends Component {}',
      errors: [
        {
          messageId: 'noClassComponent',
        },
      ],
    },
    {
      code: 'class ClassComponent extends PureComponent {}',
      errors: [
        {
          messageId: 'noClassComponent',
        },
      ],
    },
  ],
});
