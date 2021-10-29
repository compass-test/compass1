import type { Rule } from 'eslint';

const prefixes = ['is', 'has', 'should'];
const validTypes = ['TSBooleanKeyword', 'TSUndefinedKeyword', 'TSNullKeyword'];

const isUpperCase = (str: string) => {
  return str.toUpperCase() === str;
};

const rule: Rule.RuleModule = {
  meta: {
    fixable: 'code',
    messages: {
      propShouldBeCamelCase: 'Prop should be CamelCase',
      propNeedsPrefix: `Prop should be prefixed with one of the following: "${prefixes.join(
        ', ',
      )}".`,
    },
  },
  create(context) {
    return {
      'TSInterfaceDeclaration[id.name=/(Props|PropTypes)$/] TSPropertySignature,TSTypeAliasDeclaration[id.name=/(Props|PropTypes)$/] TSPropertySignature': (
        node: any,
      ) => {
        const name = node.key.value || node.key.name;
        if (name.includes('-')) {
          // Prop most likely is kebab-case - abort!
          return;
        }

        if (node.typeAnnotation) {
          if (
            !['TSBooleanKeyword', 'TSUnionType'].includes(
              node.typeAnnotation.typeAnnotation.type,
            )
          ) {
            // Node is not a boolean - abort!
            return;
          }

          if (node.typeAnnotation.typeAnnotation.types) {
            let hasBoolean = false;

            const hasInvalidTypes = node.typeAnnotation.typeAnnotation.types.some(
              (type: any) => {
                if (type.type === 'TSBooleanKeyword') {
                  hasBoolean = true;
                }

                if (validTypes.includes(type.type)) {
                  return false;
                }

                return true;
              },
            );

            if (hasInvalidTypes || !hasBoolean) {
              // Prop has no boolean type or has invalid types - abort!
              return;
            }
          }
        }

        for (let i = 0; i < prefixes.length; i++) {
          const prefix = prefixes[i];
          if (name.startsWith(prefix)) {
            // Prop is prefixed - let's make sure its CamelCase
            const nextCharIndex = name.indexOf(prefix) + prefix.length;
            const nextChar = name[nextCharIndex];
            if (isUpperCase(nextChar)) {
              // We're good!
              return;
            }

            // Next char isn't upper case - error!
            context.report({
              node,
              messageId: 'propShouldBeCamelCase',
              fix: fixer => {
                let fixedName = name.split('');
                fixedName[nextCharIndex] = name[nextCharIndex].toUpperCase();
                fixedName = fixedName.join('');
                return fixer.replaceText(node.key, fixedName);
              },
            });

            return;
          }
        }

        // Prop is not prefixed - time to error!
        context.report({
          node,
          messageId: 'propNeedsPrefix',
        });
      },
    };
  },
};

export default rule;
