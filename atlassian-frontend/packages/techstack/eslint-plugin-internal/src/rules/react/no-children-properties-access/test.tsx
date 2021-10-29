// @ts-expect-error
import { ruleTester } from '@atlassian/eslint-utils';

import rule from './index';

ruleTester.run('react/no-children-properties-access', rule, {
  valid: [
    'function Component(props) { return props.children.map((node) => <div>{node}</div>); }',
    'function Component({ children }) { return children.map((node) => <div>{node}</div>); }',
    `
      function Component(props) {
        const a = props.children;

        return a.map((node) => <div>{node.type}</div>);
      }
    `,
  ],
  invalid: [
    {
      code: `
        function Component(props) {
          return props.children.map((node) => {
            if (node.type === 'Component2') {
              return <div>Component2</div>
            }

            return <div>Component</div>;
          });
        }
      `,
      errors: [
        {
          messageId: 'noChildrenPropertiesAccess',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return props.children.map(function(node) {
            if (node.type === 'Component2') {
              return <div>Component2</div>
            }

            return <div>Component</div>;
          });
        }
      `,
      errors: [
        {
          messageId: 'noChildrenPropertiesAccess',
        },
      ],
    },
    {
      code: `
        function Component({ children }) {
          return children.map((node) => {
            if (node.type === 'Component2') {
              return <div>Component2</div>
            }

            return <div>Component</div>;
          });
        }
      `,
      errors: [
        {
          messageId: 'noChildrenPropertiesAccess',
        },
      ],
    },
    {
      code: `
        function Component(props) {
          return props.children.map(({ type }) => {
            if (type === 'Component2') {
              return <div>Component2</div>
            }

            return <div>Component</div>;
          });
        }
      `,
      errors: [
        {
          messageId: 'noChildrenPropertiesAccess',
        },
      ],
    },
  ],
});
