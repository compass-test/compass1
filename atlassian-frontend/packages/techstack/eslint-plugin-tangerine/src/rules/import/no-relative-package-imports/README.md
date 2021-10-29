# import/no-relative-package-imports

> Access other packages only through package imports.

## Rationale

In monorepo setups, where packages exist side-by-side in the file system (e.g., based on
`yarn workspaces` or `bolt`), packages can reach into other packages via relative imports. E.g., a
file `packages/package-a/index.js` of `package-a` could access another package `package-b` via
`../package-b/types`. This is often considered problematic, as it breaks the packages' _package
boundaries_. In the above example, neither `package-a` nor `package-b` could, e.g., be moved to
another repository (or even within the repository) without breaking these imports.

The present rule therefore enforces that all imports from other packages happen through package
imports. In the above example, the correct import would therefore be from `package-b/types`.

## How the rule works

The rule tests all relative imports against the folder of the closest `package.json`. If a relative
import reaches beyond this folder - i.e., the _package boundary_ - it is considered an error.

The rule does not have options.

## Examples

The following examples assume a file `package-a/src/foo/bar/index.js`, where `package-a` is the
package root, i.e., contains the package's `package.json`.

👎 Example of **incorrect** code for this rule:

```js
/*eslint @atlassian/tangerine/import/no-relative-package-imports: "error" */

import x from '../../../../package-b';
```

👍 Example of **correct** code for this rule:

```js
/*eslint @atlassian/tangerine/import/no-relative-package-imports: "error" */

import x from '../../baz';
```

```js
/*eslint @atlassian/tangerine/import/no-relative-package-imports: "error" */

import x from 'package-b';
```
