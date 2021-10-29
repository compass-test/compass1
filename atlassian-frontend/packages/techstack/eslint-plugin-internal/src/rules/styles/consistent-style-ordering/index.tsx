import type { Rule } from 'eslint';
// eslint-disable-next-line import/no-unresolved
import type { Expression, ObjectExpression, Property } from 'estree';

import { styleOrder } from './order';

const cleanedStyleOrder = styleOrder.map(key => key.replace(/-/g, ''));

const cleanKey = (key: Expression) => {
  const value = getKeyValue(key);
  return String(value).replace(/-/g, '').toLowerCase();
};

const getKeyValue = (key: Expression, useRaw: boolean = false) => {
  const value =
    key.type === 'Identifier'
      ? key.name
      : key.type === 'Literal'
      ? useRaw
        ? key.raw
        : key.value
      : '';

  return value;
};

const isExoticNode = (prop: any) =>
  prop.type === 'SpreadElement' || prop.type === 'ExperimentalSpreadProperty';

const isOrderedCSSProperty = (prop: any) =>
  isExoticNode(prop) || cleanedStyleOrder.indexOf(cleanKey(prop.key)) >= 0;

const sort = (props: Property[]) => {
  const hardCodedSort = props
    .filter(isOrderedCSSProperty)
    .sort((firstProp: any, secondProp: any) => {
      if (isExoticNode(firstProp) || isExoticNode(secondProp)) {
        return 0;
      }

      const firstName = cleanKey(firstProp.key);
      const secondName = cleanKey(secondProp.key);
      const firstPropIndex = cleanedStyleOrder.indexOf(firstName);
      const secondPropIndex = cleanedStyleOrder.indexOf(secondName);

      return firstPropIndex - secondPropIndex;
    });

  const remainderSort = props
    .filter(
      prop =>
        !isOrderedCSSProperty(prop) && prop.value.type !== 'ObjectExpression',
    )
    .sort((firstProp, secondProp) => {
      const firstName = cleanKey(firstProp.key);
      const secondName = cleanKey(secondProp.key);

      if (firstName > secondName) {
        return 1;
      }

      if (firstName < secondName) {
        return -1;
      }

      return 0;
    });

  const nestedStyles = props.filter(
    prop =>
      !isOrderedCSSProperty(prop) && prop.value.type === 'ObjectExpression',
  );

  return hardCodedSort.concat(remainderSort, nestedStyles);
};

const toPropNames = (props: Property[]): string => {
  return props.map(prop => cleanKey(prop.key || prop.type)).toString();
};

const space = (spaces: number = 0) => {
  return ' '.repeat(spaces);
};

const createObjectExpression = (
  node: ObjectExpression,
  context: Rule.RuleContext,
  props = node.properties,
) => {
  const sourceCode = context.getSourceCode();
  const stringifiedProps = props.reduce((acc, prop) => {
    const key = `${space(prop.loc?.start.column)}${getKeyValue(
      prop.key,
      true,
    )}`;
    const value = sourceCode.getText(prop.value);

    return `${acc}${key}: ${value},\n`;
  }, '');

  const column = node.loc?.end.column || 1;

  return `{\n${stringifiedProps}${space(column - 1)}}`;
};

const rule: Rule.RuleModule = {
  meta: {
    fixable: 'code',
    messages: {
      incorrectOrder: 'Styles should be alpha-semantically ordered.',
    },
  },
  create(context) {
    return {
      'CallExpression[callee.name=css] ObjectExpression': (
        node: ObjectExpression,
      ) => {
        const sortedProps = sort(node.properties);
        if (toPropNames(sortedProps) !== toPropNames(node.properties)) {
          context.report({
            node,
            messageId: 'incorrectOrder',
            fix: fixer => {
              return fixer.replaceText(
                node,
                createObjectExpression(node, context, sortedProps),
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
