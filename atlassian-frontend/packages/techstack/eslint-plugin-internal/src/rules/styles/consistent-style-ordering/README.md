# styles/consistent-style-ordering

> Ensures consistent style ordering in CSS objects.

## Rationale

Everyone has their own opinion how best to order styles.
This rule aims to take opinion out of the equation,
and provide a single way to order styles that can be automatically fixed.

## How the rule works

This rule checks style ordering in `css` objects.
This rule has no options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/style/consistent-style-ordering: "error" */
css({
  color: 'red',
  display: 'block',
})
```

👍 Example of **correct** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/style/consistent-style-ordering: "error" */
css({
  display: 'block',
  color: 'red',
})
```
