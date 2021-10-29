# import/no-nested-imports

> Disallow imports from descendants more than one level deep. All descdendant imports should only be
> from child directories.

This rule restricts imports of descendant directories that are more than one level deep.

You can specify the directories that this rule applies to, relative to the package root. The package
root is automatically detected as the closest directory with a package.json relative to the file
being linted.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
import componentChild from './component1/child1';
import componentChildLogo from './component1/child1/logo.png';
```

👍 Examples of **correct** code for this rule:

```js
import component from './component1';
import componentLogo from './component1/logo.png';
```

## Options

The rule takes a configuration object of the following shape:

```js
{
  basePath?: string,
  dirs?: string[],
  message?: string,
}
```

### `basePath`

Set the base path that `dirs` will be relative to.

If not specified, defaults to the closest package.json directory to the current file being linted,
or the current working directory if no package.json is found.

### `dirs`

Array of directory paths to apply the rule to, relative to `basePath`. If no directories are
specified, will apply to all directories under `basePath`.

### `message`

Custom error message. You can use this to print additional information to the standard error
message.
