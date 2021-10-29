import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noSetStateInsideRender: `Calling setState inside of the render function can cause double renders.`,
    },
  },
  create(context) {
    return {
      "MethodDefinition[key.name='render'] > FunctionExpression > BlockStatement > :not(ReturnStatement) Identifier[name='setState']": (
        node: Rule.Node,
      ) => {
        context.report({
          node,
          messageId: 'noSetStateInsideRender',
        });
      },
    };
  },
};

export default rule;
