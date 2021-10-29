/**
 * @file Access other packages only through package imports.
 */

const path = require('path');

const pkgUp = require('pkg-up');

module.exports = {
  meta: {
    docs: {
      description: 'Access other packages only through package imports.',
    },
    schema: [], // no options
    messages: {
      invalidImport:
        "Relative import '{{from}}' from outside the package is not allowed, as it breaks your package's package boundaries. Please use a package import (e.g., import x from 'other-page') instead. For clarifications, please see http://go.atlassian.com/import-no-relative-package-imports, or ask for help in the #tangerine channel.",
    },
  },

  create(context) {
    return {
      ImportDeclaration: node => {
        if (
          !node ||
          !node.source ||
          !node.source.value ||
          !node.source.value.startsWith('.')
        ) {
          return;
        }

        const currentFolderPath = path.parse(context.getFilename()).dir;
        const packagePath = path.parse(pkgUp.sync({ cwd: currentFolderPath }))
          .dir;

        const targetPath = path.resolve(currentFolderPath, node.source.value);

        if (path.relative(packagePath, targetPath).startsWith('..')) {
          context.report({
            node,
            messageId: 'invalidImport',
            data: {
              from: node.source.value,
            },
          });
        }
      },
    };
  },
};
