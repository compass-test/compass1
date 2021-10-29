module.exports = {
  meta: {
    messages: {
      noExportStar:
        "'export *' makes it difficult to a.) reason about, and b.) tree shake (https://webpack.js.org/guides/tree-shaking/) code. Use export { name1, name2, ..., nameN } from '{{ path }}' instead;",
    },
  },
  create(context) {
    return {
      ExportAllDeclaration: node => {
        context.report({
          node,
          messageId: 'noExportStar',
          data: {
            path: node.source.value,
          },
        });
      },
      'ExportNamedDeclaration > ExportNamespaceSpecifier': node => {
        context.report({
          node: node.parent,
          messageId: 'noExportStar',
          data: {
            path: node.parent.source.value,
          },
        });
      },
    };
  },
};
