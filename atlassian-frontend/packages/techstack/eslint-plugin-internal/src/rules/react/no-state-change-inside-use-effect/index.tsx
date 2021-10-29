import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noStateChangeInsideUseEffect: `Calling a state setter inside of an effect can cause double renders.`,
    },
  },
  create(context) {
    return {
      "CallExpression[callee.name='useEffect'] ExpressionStatement[expression.callee.name=/set[A-Z].*/]": (
        node: Rule.Node,
      ) => {
        context.report({
          node,
          messageId: 'noStateChangeInsideUseEffect',
        });
      },
    };
  },
};

export default rule;
