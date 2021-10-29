import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      disallowUnstableValues:
        'This function will result in different values each invocation resulting in server rendered markup being different to client rendered markup, consider using a prop passed from consumers instead. See http://go/dst-unstable-values for more information.',
    },
  },

  create(context) {
    const filename = context.getFilename();
    if (filename !== '<input>' && !context.getFilename().includes('src')) {
      // Forcibly ignore anything outside of the src folder.
      // We skip if filename is <input> for the testing run.
      return {};
    }

    const UNWANTED_FUNC_NAME = ['uuid', 'uid', 'Date'];
    const UNWANTED_FUNC_PROP = [
      { fnName: 'Date', fnProperty: 'now' },
      { fnName: 'Math', fnProperty: 'random' },
    ];

    return {
      CallExpression(node: any) {
        const { callee } = node;
        if (UNWANTED_FUNC_NAME.includes(callee.name)) {
          context.report({
            node,
            messageId: 'disallowUnstableValues',
          });
        }
      },

      MemberExpression(node: any) {
        const { object, property } = node;
        UNWANTED_FUNC_PROP.forEach(item => {
          if (object.name) {
            if (
              object.name === item.fnName &&
              property.name === item.fnProperty
            ) {
              context.report({
                node,
                messageId: 'disallowUnstableValues',
              });
            }
          }
        });
      },
    };
  },
};

export default rule;
