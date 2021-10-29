const path = require('path');

const pathIsInside = require('path-is-inside');

const getPkgRoot = require('../../../utils/get-pkg-root');
const { requireResolve } = require('../../../utils/require-resolve');
const { resolveImport } = require('../../../utils/resolve');
const { getErrorMessage } = require('../../../utils/shared-settings');

const isDescendant = (base, subject) => pathIsInside(subject, base);

const getPathDepth = (base, subject) => {
  const relativePath = path.relative(base, subject);

  return relativePath.split('').filter(p => p === path.sep).length;
};

/* Is subject a descendant of base by more than one level */
const isDeepDescendant = (currentDir, importSource) => {
  const resolvedSource = resolveImport(importSource, { currentDir });
  if (!resolvedSource) {
    return false;
  }
  if (!isDescendant(currentDir, resolvedSource)) {
    return false;
  }

  const depth = getPathDepth(currentDir, resolvedSource);

  if (depth > 1) {
    return true;
  }

  if (depth === 1) {
    // If the separator length is one, we need to resolve the file to determine
    // whether it is a dir or file
    // Files wouldn't be classified as deep whereas a dir would
    const requireResolvedSource = requireResolve(resolvedSource);
    if (!requireResolvedSource) {
      // eslint-disable-next-line no-console
      console.error('Error resolving source after it was already resolved...');
      return false;
    }
    // If dirnames are equal, the resolvedSource was a file, otherwise dir
    return path.dirname(resolvedSource) !== path.dirname(requireResolvedSource);
  }

  return false;
};

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow imports from descendant directories more than one level deep',
    },
    schema: [
      {
        type: 'object',
        properties: {
          basePath: {
            type: 'string',
          },
          dirs: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          message: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      invalidImport:
        'Importing from a descendant directory more than one level deep is not allowed{{dir}}{{message}}',
    },
  },
  create(context) {
    const configOptions = context.options[0] || {};

    const currentFilepath = path.resolve(context.getFilename());
    const currentDir = path.dirname(currentFilepath);

    const basePath = configOptions.basePath || getPkgRoot(currentFilepath);

    let matchedDir;
    if (configOptions.dirs != null) {
      matchedDir = configOptions.dirs.find(dir => {
        const dirPath = path.resolve(basePath, dir);
        return pathIsInside(currentFilepath, dirPath);
      });
      if (!matchedDir) {
        return {};
      }
    } else if (!pathIsInside(currentFilepath, basePath)) {
      return {};
    }

    return {
      ImportDeclaration: node => {
        if (!node || !node.source || !node.source.value) return;

        if (!isDeepDescendant(currentDir, node.source.value)) {
          return;
        }

        const errorMessage = getErrorMessage(context);
        const message = errorMessage ? `; ${errorMessage}` : '';

        const dir = matchedDir ? ` inside '${matchedDir}'` : '';

        context.report({
          node: node.source,
          messageId: 'invalidImport',
          data: {
            dir,
            message,
          },
        });
      },
    };
  },
};
