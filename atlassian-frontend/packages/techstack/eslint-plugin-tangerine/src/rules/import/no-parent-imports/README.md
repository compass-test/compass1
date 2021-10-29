# import/no-parent-imports

> Restrict importing from parent paths in specific directories to enforce a top-down import flow.

This rule allows you to restrict imports of parent paths within specific directories, enforcing
imports to be from siblings and children only.

Parent imports are allowed if they are completely outside the specific directories configured.

This rule completely relies on configuration, it does not have any default configuration and won't
do anything out of the box.

## Options

The rule takes a configuration object of the following shape:

```js
{
    dirs: string[],
    basePath?: string,
    srcRoot?: string,
    message?: string,
}
```

### `dirs`

An array of directories to apply the rule to. Directories are relative to `basePath`.

The rule will apply to all descendant files and directories, however, the immediate children of said
directories will be allowed to import outside.

### `basePath`

Set the base path that `dirs` will be relative to.

If not specified, defaults to the closest package.json directory to the current file being linted,
or the current working directory `process.cwd()` if no package.json is found.

### `srcRoot`

Set the path that any project src relative import paths should be resolved against.

Useful when your project allows importing files relative to the project src root rather than just
the current file.

Defaults to `basePath`, explicitly set this if your project root is different to `basePath`.

### `message`

Custom error message. You can use this to print additional information to the standard error
message.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
// filename: /Users/dev/src/my-pkg/ui/dialog/header/index.js
/* eslint tangerine/import/no-parent-imports: [
 *   error",
 *   {
 *     basePath: '/Users/dev/my-pkg/src',
 *     dirs: ['ui']
 *   }
 * ]
 */

import { Content } from '../content';
```

```js
// filename: /Users/dev/my-pkg/src/ui/dialog/header/index.js
/* eslint tangerine/import/no-parent-imports: [
 *   error",
 *   {
 *     dirs: ['src/ui']
 *   }
 * ]
 */

import { Content } from '../content';
```

👍 Examples of **correct** code for this rule:

```js
// filename: /Users/dev/my-pkg/src/ui/dialog/index.js
/* eslint tangerine/import/no-parent-imports: [
 *   error",
 *   {
 *     dirs: ['src/ui']
 *   }
 * ]
 */

import { Header } from './header';
import { Content } from './content';
```

```js
// filename: /Users/dev/my-pkg/src/ui/index.js
/* eslint tangerine/import/no-parent-imports: [
 *   error",
 *   {
 *     basePath: '/Users/dev/my-pkg/src',
 *     dirs: ['ui']
 *   }
 * ]
 */

// Importing outside of directory defined in config is okay
import { MY_CONSTANT } from '../common/constant';
```
