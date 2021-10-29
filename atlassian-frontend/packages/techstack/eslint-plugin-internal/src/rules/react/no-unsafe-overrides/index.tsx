import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noUnsafeOverrides: `The prop "{{propName}}" is considered dangerous and a performance concern.
Think twice if you need to use them as we are looking to move away from them.

Some alternatives:
- Move to a composable API
- Implement this as another component
- Add as a feature in the owning component

Make sure to get design input too.`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          unsafeOverrides: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    ],
  },
  create(context) {
    const configuration = context.options[0] || {};
    const unsafeOverrides = configuration.unsafeOverrides || [];

    return {
      JSXAttribute(node: any) {
        if (unsafeOverrides.includes(node.name.name)) {
          context.report({
            node,
            messageId: 'noUnsafeOverrides',
            data: { propName: node.name.name },
          });
        }
      },
    };
  },
};

export default rule;
