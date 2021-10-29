# react/require-jsdoc

Ensures jsdoc exists in a specific format for **exported** React components and hooks.

## How the rule works

Checks the AST for anything that looks like a React component or hook and requires there be a jsdoc of a specific format.

## Examples

👎 Example of **incorrect** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/require-jsdoc: "error" */
export function Component() {
  return <div />;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/require-jsdoc: "error" */
export function useCustomHook() {
}
```

👍 Example of **correct** code for this rule:

```js
/*eslint @internal/eslint-plugin-internal/react/require-jsdoc: "error" */
function Component() {
  return <div />;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/require-jsdoc: "error" */
/**
 * ## Component name
 * 
 * A modal dialog displays content that requires user interaction, in a layer above the page.
 * 
 * - Examples: https://atlassian.design/components/component-name/examples
 * - Props: https://atlassian.design/components/component-name/code
 * - Usage: https://atlassian.design/components/component-name/usage
 */
export function ComponentName() {
  return <div />;
}
```

```js
/*eslint @internal/eslint-plugin-internal/react/require-jsdoc: "error" */
/**
 * Description of the hook.
 */
export function useCustomHook() {
}
```
