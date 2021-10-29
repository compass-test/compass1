# react/no-unsafe-overrides

# Forbid certain props on Components (react/no-unsafe-overrides)

By default this rule prevents passing of props that add lots of complexity (`overrides`, `cssFn`) to Components, more details can be found [here](https://hello.atlassian.net/wiki/spaces/DST/pages/974848300/DACI+Removing+the+overrides+API). The list of forbidden props can be customized with the `unsafeOverrides` option.

## Rule Details

This rule checks all JSX elements and verifies that no forbidden props are used
on Components. This rule is off by default.

Examples of **incorrect** code for this rule:

```jsx
<Checkbox overrides={{}} />
```

```jsx
<Checkbox cssFn={() => {}} />
```

Examples of **correct** code for this rule:

```jsx
<Checkbox label="Joe" />
```

```jsx
<Checkbox />
```

## Rule Options

The rule takes a configuration object of the following shape:

```js
{
    unsafeOverrides: ['overrides', 'cssFn', 'theme'], //An array specifying the names of props that are forbidden. The default value of this option is `['overrides', 'cssFn', 'theme']`.
}
```

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
