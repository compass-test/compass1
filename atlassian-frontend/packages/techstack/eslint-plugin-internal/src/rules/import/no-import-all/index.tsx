import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noImportStar:
        "'import *' makes it difficult to a.) reason about, and b.) tree shake (https://webpack.js.org/guides/tree-shaking/) code. Use import { name1, name2, ..., nameN } from '{{ path }}' instead;",
    },
  },
  create(context) {
    return {
      'ImportDeclaration > ImportNamespaceSpecifier': (node: Rule.Node) => {
        const path: string =
          node.parent.type === 'ImportDeclaration'
            ? String(node.parent.source.value)
            : '';

        context.report({
          node: node.parent,
          messageId: 'noImportStar',
          data: {
            path,
          },
        });
      },
    };
  },
};

export default rule;
