// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-clone-element', rule, {
  valid: [
    'function Component() { return <div>Hello World</div> }',
    'const a = React.cloneElement',
    "import {cloneElement} from 'react'",
  ],
  invalid: [
    {
      code: 'function Component() { return cloneElement(Component2); }',
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: 'function Component() { return React.cloneElement(Component2); }',
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return cloneElement(props.editView, { ref: {}, focus: true });
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return React.cloneElement(props.editView, { ref: {}, focus: true });
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return props.children.map((child, index) =>
            cloneElement(child, { id: index }))
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return props.children.map((child, index) =>
            React.cloneElement(child, { id: index }))
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          const recursivelyTraverseChildrenToInjectProps = (node) => {
            if (node.type === 'Component2') {
              return cloneElement(node, { extra: 'props '});
            }

            return node;
          };

          return props.children.map(recursivelyTraverseChildrenToInjectProps);
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          const recursivelyTraverseChildrenToInjectProps = (node) => {
            if (node.type === 'Component2') {
              return React.cloneElement(node, { extra: 'props '});
            }

            return node;
          };

          return props.children.map(recursivelyTraverseChildrenToInjectProps);
        }
      `,
      errors: [
        {
          messageId: 'noCloneElement',
        },
      ],
    },
  ],
});
