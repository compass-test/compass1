import type { Rule } from 'eslint';
// @ts-expect-error
import a from 'indefinite';
import startCase from 'lodash/startCase';

const sentenceCase = (str: string) => {
  const result = startCase(str);
  return `${result[0]}${result.slice(1).toLowerCase()}`;
};

const getHookJsdocTemplate = () => `// TODO: Fill in the hook {description}.
/**
 * {description}.
 */
`;

const getComponentJsdocTemplate = (componentName: string) => {
  const name = sentenceCase(componentName);

  return `// TODO: Fill in the component {description} and ensure links point to the correct {packageName} location.
// Remove links that the component does not have (such as usage). If there are no links remove them all.
/**
 * __${name}__
 *
 * ${a(name.toLowerCase(), { capitalize: true })} {description}.
 *
 * - [Examples](https://atlassian.design/components/{packageName}/examples)
 * - [Code](https://atlassian.design/components/{packageName}/code)
 * - [Usage](https://atlassian.design/components/{packageName}/usage)
 */
`;
};

const rule: Rule.RuleModule = {
  meta: {
    fixable: 'code',
    messages: {
      missingComponentJsdoc:
        'Exported components need a jsdoc description - get the template by using the code fixer.',
      missingHookJsdoc:
        'Exported custom hooks need a jsdoc description - get the template by using the code fixer.',
    },
  },
  create(context) {
    const filename = context.getFilename();
    if (filename !== '<input>' && !context.getFilename().includes('src')) {
      // Forcibly ignore anything outside of the src folder.
      // We skip if filename is <input> for the testing run.
      return {};
    }

    const nodeHasBlockComment = (node: any) => {
      const sourceCode = context.getSourceCode();
      const comments = sourceCode.getAllComments();
      const commentEndLine = node.loc && node.loc.start.line - 1;

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (
          comment.loc &&
          comment.loc.end.line === commentEndLine &&
          comment.type === 'Block'
        ) {
          return true;
        }
      }

      return false;
    };

    return {
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier[name=/^[A-Z]([^A-Z]\\D)[a-z]*/]': (
        node: any,
      ) => {
        if (!nodeHasBlockComment(node)) {
          context.report({
            node,
            messageId: 'missingComponentJsdoc',
            fix: fixer => {
              return fixer.insertTextBefore(
                node.parent.parent.parent,
                getComponentJsdocTemplate(node.name),
              );
            },
          });
        }
      },

      'ExportDefaultDeclaration > Identifier[name=/^[A-Z]([^A-Z]\\D)[a-z]*/]': (
        node: any,
      ) => {
        const variable = context.getScope().set.get(node.name);
        if (variable) {
          const identifier: any = variable.identifiers[0];
          if (!identifier) {
            return;
          }

          if (!nodeHasBlockComment(identifier)) {
            context.report({
              node,
              messageId: 'missingComponentJsdoc',
              fix: fixer => {
                return fixer.insertTextBefore(
                  identifier.parent.parent,
                  getComponentJsdocTemplate(node.name),
                );
              },
            });
          }
        }
      },

      'ExportNamedDeclaration > FunctionDeclaration[id.name=/^use[A-Z][a-z].+/]': (
        node: any,
      ) => {
        if (!nodeHasBlockComment(node)) {
          context.report({
            node,
            messageId: 'missingHookJsdoc',
            fix: fixer => {
              return fixer.insertTextBefore(
                node.parent,
                getHookJsdocTemplate(),
              );
            },
          });
        }
      },

      'ExportDefaultDeclaration > FunctionDeclaration[id.name=/^use[A-Z][a-z].+/]': (
        node: any,
      ) => {
        if (!nodeHasBlockComment(node)) {
          context.report({
            node,
            messageId: 'missingHookJsdoc',
            fix: fixer => {
              return fixer.insertTextBefore(
                node.parent,
                getHookJsdocTemplate(),
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
