const path = require('path');

const escapeStringRegexp = require('escape-string-regexp');
const _ = require('lodash');

function isKebabCase(string) {
  return _.kebabCase(string) === string;
}

function isCamelCase(string) {
  return _.camelCase(string) === string;
}

const casePredicates = {
  kebab: isKebabCase,
  camel: isCamelCase,
};

function stripOneSuffix(string, suffixes) {
  const escapedSuffixes = suffixes.map(escapeStringRegexp);
  const suffixMatchingRegex = new RegExp(`(${escapedSuffixes.join('|')})$`);
  return string.replace(suffixMatchingRegex, '');
}

function isCase(caseStyle, string) {
  const predicate = casePredicates[caseStyle];

  return predicate ? predicate(string) : false;
}

function getOption(context, option, defaultValue) {
  if (context.options && context.options[0] && context.options[0][option]) {
    return context.options[0][option];
  }

  return defaultValue;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce consistent casing for file and directory names',
    },
    messages: {
      invalidFileName:
        "Invalid file name '{{ baseFileName }}'. Use {{ case }}-case only.",
      invalidFolderName:
        "Invalid folder names '{{ invalidFoldersString }}'" +
        ' in {{ fileName }}. Use {{ case }}-case only.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          case: {
            type: 'string',
            enum: ['kebab', 'camel'],
          },
          suffixes: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      'Program:exit': node => {
        const fileName = context.getFilename();
        const parsedFileName = path.parse(fileName);
        const baseFileName = parsedFileName.name;
        const caseStyle = getOption(context, 'case', 'kebab');
        const allowedSuffixes = getOption(context, 'suffixes', []);
        const unSuffixedBaseFileName = stripOneSuffix(
          baseFileName,
          allowedSuffixes,
        );

        if (!isCase(caseStyle, unSuffixedBaseFileName)) {
          context.report({
            node,
            messageId: 'invalidFileName',
            data: { baseFileName, case: caseStyle },
          });
        }

        const directoryName = parsedFileName.dir.replace(process.cwd(), '');
        const folders = directoryName.split(path.sep);
        const invalidFolders = folders.filter(
          folder => !isCase(caseStyle, folder),
        );

        if (invalidFolders.length) {
          context.report({
            node,
            messageId: 'invalidFolderName',
            data: {
              invalidFoldersString: invalidFolders.join(', '),
              fileName,
              case: caseStyle,
            },
          });
        }
      },
    };
  },
};
