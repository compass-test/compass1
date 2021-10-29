/**
 * @file Forbids and fixes the dangling "/" in imports
 */

const hasDanglingSlash = value => /\/$/.test(value);

module.exports = {
  meta: {
    docs: {
      description: "Disallow unnecessary trailing '/' in imports",
    },
    schema: [], // no options
    fixable: 'code',
    messages: {
      removeSlash: "Invalid import {{ value }}; no dangling '/' allowed",
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node && node.source && node.source.value) {
          const { value } = node.source;
          if (hasDanglingSlash(value)) {
            context.report({
              node,
              messageId: 'removeSlash',
              data: { value },
              fix: fixer =>
                fixer.replaceTextRange(
                  node.source.range,
                  `'${value.replace(/\/$/, '')}'`,
                ),
            });
          }
        }
      },
    };
  },
};
