# styles/no-nested-styles

> Disallows using nested styles.

## Rationale

Nested styles can change unexpectedly when child markup changes and result in duplicates when extracting to CSS.

## How the rule works

This rule checks for nested styles inside `css` objects.
This rule has no options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/style/no-nested-styles: "error" */
css({
  div: {
    color: 'red',
  },
})
```

👍 Example of **correct** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/style/no-nested-styles: "error" */
css({
  color: 'red',
  ':hover': {
    color: 'black',
  }
})
```
