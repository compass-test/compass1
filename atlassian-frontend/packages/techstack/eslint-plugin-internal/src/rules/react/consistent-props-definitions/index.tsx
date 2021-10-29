import type { Rule } from 'eslint';

import { RuleList, ruleSchema } from './schema';

const getPropInList = (list: RuleList[] | undefined, propName: string) => {
  if (!list) {
    return undefined;
  }

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.disabled) {
      if (item.name === propName) {
        // Matches exactly! Return the item.
        return item;
      }

      if (item.pattern && new RegExp(item.pattern).test(propName)) {
        // The prop name matches the pattern! Return the item.
        return item;
      }
    }
  }

  return undefined;
};

const getCustomMessage = (propValue: string | undefined) => {
  return propValue ? ` ${propValue}` : '';
};

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces consistent definitions of props declared on types or interfaces suffixed with "Props".',
      recommended: false,
    },
    messages: {
      propNotAllowed:
        'Use of the "{{propName}}" prop is not allowed.{{customMessage}}',
      propShouldBeRequired:
        'The "{{propName}}" prop should be marked as required.{{customMessage}}',
      propShouldBeOptional:
        'The "{{propName}}" prop should be marked as optional.{{customMessage}}',
    },
    schema: ruleSchema,
  },

  create(context) {
    const [options] = context.options;
    if (!options) {
      return {};
    }

    return {
      'TSInterfaceDeclaration[id.name=/(Props|PropTypes)$/] TSPropertySignature,TSTypeAliasDeclaration[id.name=/(Props|PropTypes)$/] TSPropertySignature': (
        node: any,
      ) => {
        const propName = node.key.name || node.key.value;

        if (options.blockList) {
          const blockListProp = getPropInList(options.blockList, propName);

          if (blockListProp) {
            context.report({
              node,
              messageId: 'propNotAllowed',
              data: {
                propName,
                customMessage: getCustomMessage(blockListProp.message),
              },
            });
          }
        }

        if (options.ensureOptional) {
          const optionalProp = getPropInList(options.ensureOptional, propName);

          if (optionalProp && !node.optional) {
            context.report({
              node,
              messageId: 'propShouldBeOptional',
              data: {
                propName,
                customMessage: getCustomMessage(optionalProp.message),
              },
            });
          }

          if (options.ensureRequired) {
            const requiredProp = getPropInList(
              options.ensureRequired,
              propName,
            );

            if (requiredProp && node.optional) {
              context.report({
                node,
                messageId: 'propShouldBeRequired',
                data: {
                  propName,
                  customMessage: getCustomMessage(requiredProp.message),
                },
              });
            }
          }
        }
      },
    };
  },
};

export default rule;
