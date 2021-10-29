# Disallow unnecessary trailing '/' in imports (import/no-dangling-slash)

Trailing slash in import paths is not necessary and prevents some IDEs (e.g. IntelliJ) from working
properly.

---

## Rule Details

This rule enforces consistency in imports. In addition, it ensures that IntelliJ "Go to the
implementation" functinality works for the code imported from other packages.

👎 Examples of **incorrect** code for this rule:

```js
/*eslint jira/import/no-dangling-slash: "error"*/

import something from '/some/absolute/path/';
```

```js
/*eslint jira/import/no-dangling-slash: "error"*/

import something from '../../some/relative/path/';
```

👍 Examples of **correct** code for this rule:

```js
/*eslint jira/import/no-dangling-slash: "error"*/

import something from '/some/absolute/path';
```

```js
/*eslint jira/import/no-dangling-slash: "error"*/

import something from '../../some/relative/path';
```

## When Not To Use It

Do not use this rule when you do not use imports.

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
