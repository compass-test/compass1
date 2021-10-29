# react/consistent-css-prop-usage

> Ensures consistency with CSS prop usage.

## Rationale

Every product should be defining styles in the same way, using the same tools, enforced by the same linting rules, which we can then all evolve and scale together.

## How the rule works

This rule checks for the following cases:

- When styles are defined inline.
- When styles are not using `css` object api.
- When styles are coming from outside of the module i.e. using imports.
- When styles are spread inside another styles and not using array composition.

This rule has no options.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/consistent-css-prop-usage: "error" */
function Button({children}) {
  return <button css={css({})}>{children}</button>;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/consistent-css-prop-usage: "error" */
const container = {
  padding: 10,
}

function Button({children}) {
  return <button css={container}>{children}</button>;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/consistent-css-prop-usage: "error" */
import { container } from './styles';

function Button({children}) {
  return <button css={container}>{children}</button>;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/consistent-css-prop-usage: "error" */
const baseContainer = css({
  padding: 10,
});

const container = css({
  ...baseContainer,
  padding: 8,
});

function Button({children}) {
  return <button css={container}>{children}</button>;
}
```

👍 Example of **correct** code for this rule:

```js
const container = css({
  padding: 10,
});

function Button({children}) {
  return <button css={container}>{children}</button>;
}
```

```js
const baseContainer = css({
  padding: 10,
});

const container = css({
  padding: 8,
});

function Button({children}) {
  return <button css={[container, baseContainer]}>{children}</button>;
}
```
