# import/no-dot-prefix-in-upward-relative-imports

> Remove leading `./` in relative imports from other folders

For example, code should be `import x from '../fileName'` instead of
`import x from './../fileName'`.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
/*eslint tangerine/import/no-dot-prefix-in-upward-relative-imports: "error"*/

import something from './../foo';
import something from './../../foo';
```

👍 Examples of **correct** code for this rule:

```js
/*eslint tangerine/import/no-dot-prefix-in-upward-relative-imports: "error"*/

import something from 'foo';
import something from './foo';
import something from '../foo';
import something from '../../foo';
```

## 🔧 Autofix

_This rule is [auto-fixable](https://eslint.org/docs/user-guide/command-line-interface#fix)._
