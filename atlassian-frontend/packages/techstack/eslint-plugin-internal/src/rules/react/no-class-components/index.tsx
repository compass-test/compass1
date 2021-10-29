import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noClassComponent: `Class components should be replaced with function components where possible for a cleaner and more performant implementation that supports Hooks`,
    },
  },
  create(context) {
    return {
      'ClassDeclaration > MemberExpression[object.name="React"][property.name=/(Pure)?Component/]': (
        node: Rule.Node,
      ) => {
        context.report({
          node,
          messageId: 'noClassComponent',
        });
      },
      'ClassDeclaration[superClass.name=/(Pure)?Component/]': (
        node: Rule.Node,
      ) => {
        context.report({
          node,
          messageId: 'noClassComponent',
        });
      },
    };
  },
};

export default rule;
