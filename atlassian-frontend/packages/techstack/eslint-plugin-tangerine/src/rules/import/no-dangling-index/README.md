# import/no-dangling-index

> Node resolves directory paths to '/index' by default so there is no need to include it explicitly.

When importing from current or parent folder, the dangling index is necessary (e. g.
`import foo from './index'`). This rule does account for that.

## Rationale

This rule enforces consistency in imports. An additional benefit is that not specifying '/index'
allows you to easily refactor a file into a directory without modifying imports.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
/*eslint tangerine/import/dangling-index: "error"*/

import something from '/some/absolute/path/with/index';
```

```js
/*eslint tangerine/import/dangling-index: "error"*/

import something from '.';
```

👍 Examples of **correct** code for this rule:

```js
/*eslint tangerine/import/dangling-index: "error"*/

import something from 'some/path/with/no/index/at/the/end';
```

```js
/*eslint tangerine/import/dangling-index: "error"*/

import something from './index';
```
