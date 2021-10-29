import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noTypeSuffix:
        'type name "{{ typeName }}" is not supposed to end with "Type(s)"',
      noPropsName:
        'type name should be more specific, e.g. use "ButtonProps" instead of only "Props"',
    },
    fixable: 'code',
  },
  create: context => {
    const reportTypeSuffixed = (node: any) => {
      const trimmedTypeName = node.id.name.match(/(.*)Types?$/)[1];

      if (trimmedTypeName) {
        context.report({
          messageId: 'noTypeSuffix',
          node,
          data: { typeName: node.id.name },
          fix: fixer => fixer.replaceText(node.id, trimmedTypeName),
        });
      }
    };

    const reportPropsName = (node: any) => {
      context.report({
        messageId: 'noPropsName',
        node,
      });
    };

    return {
      'TSTypeAliasDeclaration[id.name=/.*Types?$/]': (node: any) =>
        reportTypeSuffixed(node),
      'TSInterfaceDeclaration[id.name=/.*Types?$/]': (node: any) =>
        reportTypeSuffixed(node),
      'TSTypeAliasDeclaration[id.name=Props]': (node: any) =>
        reportPropsName(node),
      'TSInterfaceDeclaration[id.name=Props]': (node: any) =>
        reportPropsName(node),
    };
  },
};

export default rule;
