# other/filename-case

> This rule enforces file names and folder names to have consistent casing.

By default this rule enforces kebab case styles for file and folder names.

## Examples

👎 Examples of **incorrect** file names for this rule:

```js
/*eslint tangerine/other/filename-case: "error"*/

camelCase.js;
```

👍 Examples of **correct** file names for this rule:

```js
/*eslint tangerine/other/filename-case: "error"*/

kebab-case.js
```

## Options

The rule takes a configuration object of the following shape:

```js
{
    case: "kebab" | "camel", // defaults to "kebab"
    suffixes: string[]
}
```

### `case`

Configure the case style

👎 Examples of **incorrect** file names for this rule:

```js
/*eslint tangerine/other/filename-case: ["error", { case: "kebab" }]*/

camelCase / camelCase.js;
```

```js
/*eslint tangerine/other/filename-case: ["error", { case: "camel" }]*/

kebab-case/kebab-case.js
```

👍 Examples of **correct** file names for this rule:

```js
/*eslint tangerine/other/filename-case: ["error", { case: "kebab" }]*/

kebab-case/kebab-case.js
```

```js
/*eslint tangerine/other/filename-case: ["error", { case: "camel" }]*/

camelCase / camelCase.js;
```

### `suffixes`

Allow for optional suffixes to file names.

👎 Examples of **incorrect** file names for this rule:

```js
/*eslint tangerine/other/filename-case: ["error", { case: "kebab", suffixes: [".test"] }]*/

kebab-case/kebab-case.invalid.js

kebab-case/kebab-case+test.js

kebab-case/kebab-case..test.js

kebab-case.test/kebab-case.test.js
```

👍 Examples of **correct** file names for this rule:

```js
/*eslint tangerine/other/filename-case: ["error", { case: "kebab", suffixes: [".test"] }]*/

kebab-case/kebab-case.test.js

kebab-case/kebab-case.js
```
