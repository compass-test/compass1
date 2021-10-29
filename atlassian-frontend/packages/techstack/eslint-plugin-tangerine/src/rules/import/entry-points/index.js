/**
 * @file Import from packages via their intended entry points only.
 */

const fs = require('fs');

const defaults = require('lodash/defaults');
const isPlainObject = require('lodash/isPlainObject');
const isString = require('lodash/isString');
const uniq = require('lodash/uniq');
const minimatch = require('minimatch');

const { getFromCache } = require('../../../utils/get-from-cache');
const { requireResolve } = require('../../../utils/require-resolve');

const dependencyPackageJsonCache = {};

const validateAgainstPackageDeclaration = (source, importStatement) => {
  const { dependency, importPath, importPathDepth } = importStatement;

  const dependencyPackageJson = getFromCache(
    dependencyPackageJsonCache,
    dependency,
    () => {
      const dependencyPackageJsonPath = requireResolve(source, dependency);

      if (dependencyPackageJsonPath) {
        return JSON.parse(fs.readFileSync(dependencyPackageJsonPath, 'utf8'));
      }
      return undefined;
    },
  );

  // no package.json found; ignore for now (in the future, this could also throw an error)
  if (!dependencyPackageJson) {
    return undefined;
  }

  const { allowedImportDepth } = dependencyPackageJson;

  const exportsDeclaration =
    dependencyPackageJson['af:exports'] || dependencyPackageJson.exports;

  // if 'exports' exists and is an object; see https://github.com/jkrems/proposal-pkg-exports
  if (
    exportsDeclaration &&
    isPlainObject(exportsDeclaration) &&
    Object.keys(exportsDeclaration).length > 0
  ) {
    const sanitisedExports = Object.keys(exportsDeclaration).map(key => {
      if (key === '.' || key === './') {
        return '';
      }
      return key.substr('./'.length);
    });
    return { valid: sanitisedExports.includes(importPath) };
  }

  // if 'allowedImportDepth' exists and is a number
  if (Number.isInteger(allowedImportDepth)) {
    if (allowedImportDepth < 0) {
      return { valid: true };
    }
    return { valid: importPathDepth <= allowedImportDepth };
  }

  return undefined;
};

const validateAgainstCustomConfiguration = (custom, importStatement) => {
  const { dependency, importPath, importPathDepth } = importStatement;

  if (dependency in custom) {
    const config = custom[dependency];
    if (Number.isInteger(config)) {
      return { valid: config >= importPathDepth };
    }
    if (isString(config)) {
      return { valid: minimatch(importPath, config) };
    }
    if (Array.isArray(config)) {
      return {
        valid: config.some(pattern => minimatch(importPath, pattern)),
      };
    }
  }
  return undefined;
};

const validate = (source, from, configOptions) => {
  // relative path, nothing to do
  if (from.startsWith('.')) {
    return { valid: true };
  }

  const dependencyPartsCount = from.startsWith('@') ? 2 : 1;

  const dependency = from.split('/').splice(0, dependencyPartsCount).join('/');

  const importPath = from.substr(`${dependency}/`.length);

  let importPathDepth;
  // e.g., '@x/y/'
  if (from === `${dependency}/`) {
    importPathDepth = 1;
  }
  // e.g., '@x/y'
  else if (importPath === '') {
    importPathDepth = 0;
  }
  // e.g., '@x/y/z'
  else {
    importPathDepth = importPath.split('/').length;
  }

  const importStatement = { dependency, importPath, importPathDepth };

  const { default: defaultAllowedDepth, excluded, custom } = configOptions;

  // ignore excluded dependencies
  if (excluded.includes(dependency)) {
    return { valid: true };
  }

  return (
    validateAgainstCustomConfiguration(custom, importStatement) ||
    validateAgainstPackageDeclaration(source, importStatement) || {
      valid: importPathDepth <= defaultAllowedDepth,
    }
  );
};

module.exports = {
  meta: {
    docs: {
      description: 'Import from packages via their intended entry points only.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          default: { type: 'number' },
          custom: {
            type: 'object',
            properties: {},
            additionalProperties: true,
          },
          excluded: {
            type: 'array',
            items: {
              type: 'string',
            },
            additionalItems: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      invalidImport:
        "Import from '{{from}}' entry point is restricted. Please import from the package's official entry points declared in package.json",
    },
  },

  create(context) {
    const settings = defaults({}, context.settings['entry-points'] || {}, {
      default: 0,
      custom: {},
      excluded: [],
    });

    const configOptions = defaults({}, context.options[0] || {}, {
      default: undefined,
      custom: {},
      excluded: [],
    });

    const aggregatedOptions = {
      default:
        configOptions.default !== undefined
          ? configOptions.default
          : settings.default,
      custom: defaults({}, configOptions.custom, settings.custom),
      excluded: uniq([...configOptions.excluded, ...settings.excluded]),
    };

    return {
      ImportDeclaration: node => {
        if (!node || !node.source || !node.source.value) {
          return;
        }

        const { valid, messageId } = validate(
          context.getFilename(), // source file name containing the import statement
          node.source.value,
          aggregatedOptions,
        );
        if (!valid) {
          context.report({
            node,
            messageId: messageId || 'invalidImport',
            data: {
              from: node.source.value,
            },
          });
        }
      },
    };
  },
};
