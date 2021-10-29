# export/no-export-all

> Disallow `export *` for improved tree shaking.

This rule disallows `export *` statements, which can very easily break [tree shaking](https://webpack.js.org/guides/tree-shaking/). Developers should instead explicitly re-export dependencies.

## Rationale

`export *` statements can easily break tree shaking. Instead of thinking through in great detail under which circumstances tree shaking does or doesn't work, we can just as well categorically disallow `export *`.

Instead of

```js
export * from './foo';
```

developers should instead

```js
export { Bar, Baz } from './foo';
```

## Examples

👎 Examples of **incorrect** code for this rule:

```js
/*eslint @atlassian/tangerine/export/no-export-all: "error" */

export * from './foo';
```

```js
/*eslint @atlassian/tangerine/export/no-export-all: "error" */

export * as foo from './foo';
```

👍 Example of **correct** code for this rule:

```js
/*eslint @atlassian/tangerine/export/no-export-all: "error" */

export { Bar, Baz } from './foo';
```

```js
/*eslint @atlassian/tangerine/export/no-export-all: "error" */

export { Bar as Foo, Baz } from './foo';
```

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
