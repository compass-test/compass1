import type { Rule } from 'eslint';

const CLONE_ELEMENT_NAME = 'cloneElement';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noCloneElement: `'${CLONE_ELEMENT_NAME}' should be replaced with render props and React context to ensure components are resilient to API changes and differing requirements over time.`,
    },
  },
  create(context) {
    return {
      CallExpression(node: any) {
        const { callee } = node;

        switch (callee.type) {
          case 'Identifier':
            if (callee.name === CLONE_ELEMENT_NAME) {
              context.report({
                node,
                messageId: 'noCloneElement',
              });
            }
            break;

          case 'MemberExpression':
            if (
              callee.object.name === 'React' &&
              callee.property.name === CLONE_ELEMENT_NAME
            ) {
              context.report({
                node,
                messageId: 'noCloneElement',
              });
            }
            break;
          default:
        }
      },
    };
  },
};

export default rule;
