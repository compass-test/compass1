# import/entry-points

> Import from packages via their intended entry points only.

This rule ensures that imports from packages respect the imported package's _package boundaries_,
i.e., only import from package's intended entry points. The rule does not affect relative imports.

## Rationale

JavaScript's package system doesn't currently provide a way for package authors to enforce that
consumers can only import from a defined set of **entry points** - e.g., `mylib` and `mylib/types`.
This drastically limits the level of encapsulation that can be provided by a package. (Entry points
are sometimes "mimicked" by shipping files only for these entry points; this, however, only makes
sense for very simple packages, or relies on package-level bundling. Package-level bundling is
impractical in many monorepo setups, e.g., based on `yarn workspaces` or `bolt`.)

The present rule aims to fill this gap through linting, by testing a consumer's imports against the
package's intended entry points. These entry points are ideally _declared_ by the consumed package,
but can otherwise be configured on consumer side.

## How the rule works

For each package that is consumed (i.e., imported from) in a codebase, the rule maintains a
definition of intended entry points. This definition can either be declared by the consumed package,
or specified through the rule's options (i.e., on consumer side). Each import statement in the
consuming code is then tested aganst this entry point definition. If an import does not comply with
this definition, the rule fails.

### Declaring entry points

The best place to define a package's entry points is the package itself; it is then a fully
self-contained unit that can be consumed in any codebase, without consumer-side configuration.

The present rule reads a package's package.json and attempts to reads the following fields, in order
of priority:

- `exports` or [`af:exports`](https://developer.atlassian.com/cloud/framework/atlassian-frontend/development/build/03-entry-points/): Following the [package exports](https://github.com/jkrems/proposal-pkg-exports)
  proposal, the rule assumes an object where each key is a relative path to an intended entry point.
- `allowedImportDepth`: The rule assumes an integer number that specifies the "depth" into which a
  consumer can reach when importing from the package. E.g., a value of `0` means that the consumer
  can only import from `mylib`. A value of `1` means that the consumer can import from e.g.
  `mylib/x` or `mylib/y` (as well as from `mylib`). A value of `2` means that the consumer can
  import `mylib/x/a`, `mylib/x/b`, etc. ℹ️ Any value smaller than `0` means that consumers can
  import from **any** path within the package.

### Defining entry points via the rule's options

In many cases, packages (especially external dependencies) will not declare their entry points.
Here, the entry points of the given package need to be specified via the rule's options.

The rule takes a configuration object of the following shape:

```js
{
    'default'?: number,
    custom?: {
        [string]: number | string | string[]
    },
    excluded?: string[],
}
```

#### `default`

A number that specifies the default "depth" into which imports can reach into a package, unless the
package's entry points are specified otherwise. This defaults to `0`.

If present, a package's entry point declaration (see above) takes precedence over this
configuration.

#### `custom`

A mapping of package names (e.g., `lodash`) to entry point configurations, where an entry point
configuration can be a number, a [glob string](https://github.com/isaacs/minimatch), or an array of
glob strings. If it's a number, it specifies the "depth" into which imports can reach into the given
package. If it's a glob string, imports into the given package are tested against the glob; e.g. for
a glob `x/*`, an import `lodash/x/y` would be considered as valid. If it's an array of glob string,
imports into the given package are tested against all globs; if (at least) one glob matches, the
import is valid.

If present, a package's entry point declaration (see above) takes precedence over this
configuration.

#### `excluded`

An array of _package names_ (e.g., `lodash`) that are excluded from any form of entry point
validation. Any import from such a package is considered as valid.

`excluded` takes precedence over any other configuration or declaration.

### Defining entry points via settings

In some monorepo setups, it may be easier to configure entry points through
[settings](https://eslint.org/docs/user-guide/configuring#adding-shared-settings).

If present, the rule therefore reads a `entry points` setting, expecting an object of the same shape
as the rule's options (see above). If both settings and options are present,

- the options' `default`, if present, takes precedence over the settings' `default`.
- `custom` are merged. If a key is found in both objects, the options' value takes precedence over
  the settings' value.
- `excluded` are merged.

## Examples

### `default`

👎 Example of **incorrect** code for this rule when the `default` depth is `1`.

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 0 }] */

import x from 'foo/src/utils';
```

👍 Example of **correct** code for this rule when the `default` depth is `1`:

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 1 }] */

import x from 'foo/types';
```

### `custom`

👎 Example of **incorrect** code for this rule when the `custom` depth is `1`.

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 0, custom: { foo: 1 }}] */

import x from 'foo/src/utils';
```

👍 Example of **correct** code for this rule when the `custom` depth is `1`.

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 0, custom: { foo: 1 }}] */

import x from 'foo/types';
```

👎 Example of **incorrect** code for this rule when the `custom` glob is `types`.

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 0, custom: { foo: 'types' }}] */

import x from 'foo/src/utils';
```

👍 Example of **correct** code for this rule when the `custom` glob is `types`.

```js
/*eslint @atlassian/tangerine/import/entry-points: ["error", { default: 0, custom: { foo: `types` }}] */

import x from 'foo/types';
```

### Package declaration

👎 Example of **incorrect** code for this rule when `foo`'s `package.json` specifes an
`allowedImportDepth` of `1`.

```js
/*eslint @atlassian/tangerine/import/entry-points: "error" */

import x from 'foo/src/utils';
```

👍 Example of **correct** code for this rule when `foo`'s `package.json` specifes an
`allowedImportDepth` of `1`.

```js
/*eslint @atlassian/tangerine/import/entry-points: "error" */

import x from 'foo/types';
```

👎 Example of **incorrect** code for this rule when `foo`'s `package.json` specifes `exports` (or equivalently, `af:exports`) of
`{ './types': ... }`.

```js
/*eslint @atlassian/tangerine/import/entry-points: "error" */

import x from 'foo/src/utils';
```

👍 Example of **correct** code for this rule when `foo`'s `package.json` specifes `exports` (or equivalently, `af:exports`) of
`{ './types': ... }`.

```js
/*eslint @atlassian/tangerine/import/entry-points: "error" */

import x from 'foo/types';
```

## Resources

- [Rule source](./index.js)
- [Rule test](./test.js)
