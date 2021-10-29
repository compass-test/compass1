import type { Rule, Scope } from 'eslint';

import { findIdentifiersReferencedInChildScopes } from '../../../utils/find-identifiers-referenced-in-child-scopes';

function isMapped(node: any) {
  return node.type === 'Identifier' && node.name === 'map';
}

function isChildrenType(node: any) {
  return node.type === 'Identifier' && node.name === 'children';
}

function getIdentifierHavingParentMemberExpressionType(
  identifierName: string,
  { scope }: { scope: Scope.Scope },
) {
  return findIdentifiersReferencedInChildScopes({
    scope,
    identifierName,
    scopeType: 'function',
  }).find((node: any) => node.parent.type === 'MemberExpression');
}

function checkChildrenPropertyAccess(
  node: any,
  { scope }: { scope: Scope.Scope },
) {
  const fnNode = node.arguments && node.arguments[0];

  if (!fnNode) {
    return { isAccessed: false, failingNode: null };
  }

  // Handle inline functions
  if (
    fnNode.type === 'FunctionExpression' ||
    fnNode.type === 'ArrowFunctionExpression'
  ) {
    const paramNode = fnNode.params && fnNode.params[0];

    if (!paramNode) {
      return { isAccessed: false, failingNode: null };
    }

    switch (paramNode.type) {
      // Handle identifier parameters
      case 'Identifier': {
        const identifierHavingParentMemberExpressionType = getIdentifierHavingParentMemberExpressionType(
          paramNode.name,
          {
            scope,
          },
        ) as any;

        return {
          isAccessed: !!identifierHavingParentMemberExpressionType,
          failingNode:
            identifierHavingParentMemberExpressionType &&
            identifierHavingParentMemberExpressionType.parent,
        };
      }

      // Handle destructuring
      case 'ObjectPattern': {
        const failingNode = paramNode.properties.length
          ? paramNode.properties[0].value
          : paramNode;

        return { isAccessed: true, failingNode };
      }

      default:
    }
  }

  return { isAccessed: false, failingNode: null };
}

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noChildrenPropertiesAccess: `Accessing props from "children" is not allowed as it breaks when consumers create custom components out of ours. Use React context instead to pass data from child to parent. See https://go/traversing-children for more information.`,
    },
  },
  create(context) {
    function handleChildrenPropertiesAccess(node: any) {
      const { isAccessed, failingNode } = checkChildrenPropertyAccess(node, {
        scope: context.getScope(),
      });

      if (isAccessed) {
        context.report({
          node: failingNode,
          messageId: 'noChildrenPropertiesAccess',
        });
      }
    }

    return {
      CallExpression(node) {
        const { callee } = node;

        if (callee.type === 'MemberExpression') {
          if (!isMapped(callee.property)) {
            return;
          }

          // children.map
          if (isChildrenType(callee.object)) {
            handleChildrenPropertiesAccess(node);
          } else if (callee.object.type === 'MemberExpression') {
            // props.children.map
            if (isChildrenType(callee.object.property)) {
              handleChildrenPropertiesAccess(node);
            }
          }
        }
      },
    };
  },
};

export default rule;
