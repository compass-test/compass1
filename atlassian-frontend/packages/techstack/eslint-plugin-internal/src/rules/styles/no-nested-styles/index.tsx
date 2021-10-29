import type { Rule } from 'eslint';

const allowedPrefix = [':', '&:'];

const parseSelector = (rawSelector: unknown): string[] => {
  if (typeof rawSelector !== 'string') {
    throw new Error('expected string');
  }

  const selectors = rawSelector.split(',').map(selector => selector.trim());
  return selectors;
};

const getKeyValue = (node: Rule.Node): string => {
  if (node.type === 'Identifier') {
    return node.name;
  }

  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  }

  return '';
};

const isAllowedNestedSelector = (rawSelector: string): boolean => {
  if (rawSelector.trim() === '&') {
    // This can be written without the nest.
    return false;
  }

  const selectors = parseSelector(rawSelector);
  if (selectors[0].startsWith('@')) {
    // Bail early as it's an at selector.
    return true;
  }

  return selectors.every(selector => {
    return (
      selector === '&' ||
      allowedPrefix.find(prefix => selector.startsWith(prefix))
    );
  });
};

const isUsingDirectDataAttribute = (rawSelector: string): boolean => {
  const selectors = parseSelector(rawSelector);
  return selectors.some(selector => selector.startsWith('&['));
};

const rule: Rule.RuleModule = {
  meta: {
    messages: {
      noNestedStyles:
        'Nested styles are not allowed as they can change unexpectedly when child markup changes and result in duplicates when extracting to CSS.',
      noDirectNestedStyles: `Styles applied with data attributes are not allowed, split them into discrete CSS declarations and apply them conditionally with JavaScript.

\`\`\`
const disabledStyles = css({ opacity: 0.5 });

<div css={isDisabled && disabledStyles} />
\`\`\`
`,
    },
  },
  create(context) {
    return {
      'CallExpression[callee.name=css] > ObjectExpression Property': (
        node: Rule.Node,
      ) => {
        if (
          node.type !== 'Property' ||
          node.value.type !== 'ObjectExpression'
        ) {
          return;
        }

        if (isUsingDirectDataAttribute(getKeyValue(node.key as Rule.Node))) {
          context.report({
            node,
            messageId: 'noDirectNestedStyles',
          });

          return;
        }

        if (!isAllowedNestedSelector(getKeyValue(node.key as Rule.Node))) {
          context.report({
            node,
            messageId: 'noNestedStyles',
          });

          return;
        }
      },
    };
  },
};

export default rule;
