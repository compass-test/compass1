import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noCSSStringLiterals:
        'Use of CSS template literals is not allowed, please use CSS objects instead: `css({})`.',
    },
  },

  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (node.tag.type === 'Identifier' && node.tag.name === 'css') {
          context.report({ node, messageId: 'noCSSStringLiterals' });
        }
      },
    };
  },
};

export default rule;
