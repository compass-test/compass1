# i18n/messages-are-spelled-correctly

> Ensures that i18n messages do not contain spelling errors.

This rule identifies spelling mistakes in i18n messages. It can work with any i18n library, as long
as the i18n messages are defined in JavaScript and can be identified with ESLint selectors. The
examples below are for `react-intl`, but the rule can also be configured to work with
`react-i18next`, `@lingui`, or other libraries.

## Rationale

It's easy for typos and spelling mistakes to slip through pull requests and make it out to
production. Once they're there, it can take months or years for them to be noticed and fixed. This
rule causes spelling mistakes to show up as lint errors, stopping them as soon as they're
introduced.

## Examples

👎 Examples of **incorrect** code for this rule:

```jsx
/* eslint tangerine/i18n/messages-are-spelled-correctly: [
  "error",
  {
    language: 'en-US',
    messageSelectors: [
      'JSXOpeningElement[name.name="FormattedMessage"] JSXAttribute[name.name="defaultMessage"] Literal'
    ]
  }
] */

const message = (
  <FormattedMessage id="example" defaultMessage="Speling is triky!" />
);
```

👍 Examples of **correct** code for this rule:

```jsx
/* eslint tangerine/i18n/messages-are-spelled-correctly: [
  "error",
  {
    language: 'en-US',
    messageSelectors: [
      'JSXOpeningElement[name.name="FormattedMessage"] JSXAttribute[name.name="defaultMessage"] Literal'
    ]
  }
] */

const message = (
  <FormattedMessage id="example" defaultMessage="Spelling is tricky!" />
);
```

## Options

The rule takes a configuration object of the following shape:

```js
{
    language: string, // e.g. 'en-US'
    messageSelectors: string[], // e.g. ['Literal'] (see below for more realistic examples)
    additionalWords: {
      caseSensitive: string[], // e.g. ['Atlassian', 'Jira', 'Statuspage']
      caseInsensitive: string[], // e.g. ['kanban', 'addon', 'username']
    }
}
```

### `language` (required)

This determines which dictionary will be used for spellchecking. For example, 'en-US' will use an
American English dictionary. Currently supported language codes are:

- de-DE
- en-GB
- en-US
- es-ES
- es-MX
- fr-FR
- it-IT
- lt-LT
- nl-NL
- pl-PL
- pt-BR
- sv-SE

### `messageSelectors` (required)

This tells the lint rule how to identify the i18n messages in your codebase. It is a list of
[ESLint selectors](https://eslint.org/docs/developer-guide/selectors). These are conceptually
similar to CSS selectors, but operate on the JavaScript Abstract Syntax Tree (AST) rather than on
CSS. [AST Explorer](https://astexplorer.net) is very helpful for understanding the structure of your
code and writing these selectors.

Let's say you're using the `FormattedMessage` and `defineMessages` APIs from the `react-intl`
library. In your codebase i18n messages are defined like this:

```jsx
const message = (
  <FormattedMessage id="example-id.one" defaultMessage="Example message 1" />
);
```

And like this:

```js
const messages = defineMessages({
  exampleMessage: {
    id: 'example-id.two',
    defaultMessage: 'Example message 2',
  },
});
```

To get the lint rule spellchecking these messages, we can pass it selectors that identify them:

```js
messageSelectors: [
  'JSXOpeningElement[name.name="FormattedMessage"] JSXAttribute[name.name="defaultMessage"] Literal',
  'CallExpression[callee.name="defineMessages"] Property[key.name="defaultMessage"] Literal',
];
```

### `additionalWords` (optional)

There will likely be some words used in the context of your project that don't appear in the
standard dictionary. Having to ignore the lint rule wherever those words are used would be
repeditive and annoying, so you can instead add them to `additionalWords`.

As an example, consider the words "admin", "username" and "Jira". They might be valid in the context
of the product, but they don't appear in the American English dictionary bundled with this rule. We
can mark them as valid by passing in this configuration:

```js
additionalWords: {
  caseSensitive: ["Jira"],
  caseInsensitive: ["admin", "username"]
}
```
