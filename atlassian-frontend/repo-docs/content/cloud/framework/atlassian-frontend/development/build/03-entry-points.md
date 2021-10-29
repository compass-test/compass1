---
date: '2021-09-27'
---

# Entry points

Atlassian-frontend provides a way of exposing custom entry points into a package to aid in treeshaking and reduce bundle size.

For example,

Importing from a package normally: `import { colors } from '@atlaskit/theme';`

Importing via an entry point: `import colors from @atlaskit/theme/colors;`

Entry points of a package are declared within an `af:exports` field of its package.json

E.g.

```
{
  "name": "@atlaskit/theme",
  "version": "1.0.0",
  "main": "./dist/cjs/index.js",
  "af:exports": {
    "./colors": "./src/colors.ts",
    "./constants": "./src/constants.ts",
  }
}
```

would expose the following custom entry points:

- `@atlaskit/theme/colors`
- `@atlaskit/theme/constants`

Each key/value should be prefixed with `./`. The key denotes the
point name that follows the package name that consumers would import from. The value denotes the location of the source file that the entry point maps to.

The `af:exports` field is similar to the proposal documented [here](https://github.com/jkrems/proposal-pkg-exports/blob/e52858494b5256ba681312dae81b3c416a916d78/README.md) and [here](https://nodejs.org/docs/latest-v12.x/api/esm.html) with the following differences:

- We use a non-standard field `af:exports` rather than `exports` to avoid changing node's module resolution in later versions of node that support it
- The values of the exports object point to the _source_ location and must live under `./src`
- Default `.` exports should be declared for packages that allow importing from the root of a package. Certain packages that want to restrict importing from the root can omit this export (e.g., `@atlaskit/theme`):

```
{
  "af:exports": {
    ".": "./src/index.ts"
  }
}
```

- The following features are unsupported currently:
  - Directory level entry points - each entry must refer to a file
  - Deeply nested entry points - entries can only be one level deep

Once you declare an entry point in `af:exports`, it becomes **public API** and should be treated as such. Therefore treat them with the same caution and care as you would with any other part of your package's API.

For example, removing an entry point would classify as a **breaking change**.

## Adding an entry point to a package

Follow these steps to add a new entry point to a package:

1. Add an entry to the `af:exports` field of your package following the conventions detailed above (this also includes adding a default `.` export).
2. Re-run `bolt` to re-generate the entry-points tsconfig.

## Automatic entry point generation [DEPRECATED]

Prior to the existence of `af:exports`, entry points were automatically generated for every package based on file structure rather than explicitly declared. All files directly underneath `<package>/src` were generated as entry points. Any package that has the `atlassian.deprecatedAutoEntryPoints` field set to `true` in package.json will still use this automatic generation during this deprecation grace period before we remove this completely.

Since the file based entry points weren't common knowledge, well documented or very configurable we are not treating these entries as public API unless:

1. They are explicitly documented in the package documentation, or
2. Were specifically intended to be used as entry points and used in atlassian-frontend or products under that assumption

Packages that still use this deprecated strategy of exposing entry points should migrate to the supported way of declaring them by following the [migration guide](https://hello.atlassian.net/wiki/spaces/AF/pages/797858003/Declarative+entry+point+migration).

## Entry point internals

Entry points are generated at build time and are exposed as directories at the root of the package containing a single generated `package.json`. The `package.json` contains both a `main` and `module` entry to support both `cjs` and `esm` dist types.

In the future we will look into utilising the [exports](https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_package_entry_points) field once it becomes stable API and becomes widely adopted by common frontend build tooling.

A typescript paths configuration is also required for packages that reference an entry point of another package to compile correctly. To do this we maintain an automatically generated `tsconfig.entry-points.json` that lists each entry point as a separate `paths` configuration. This file is regenerated as part of postinstall, i.e. running `bolt`, and also as part of a precommit hook if a package.json file has updated. The `build:tsconfig` npm script can also be ran manually.

## Migrating to declarative entry points (`af:exports`)

1. Look at what custom entry points are currently exposed, look at your package on npm/unpkg for top-level folders containing a package.json. Alternatively, search for your package at `tsconfig.entry-points.json`.
2. Determine which of these custom entry points qualify as public API as per the following rules:

   a) They are explicitly documented in the package documentation, or

   b) Were specifically intended to be used as entry points and used in atlassian-frontend or products under that assumption

3. For any entry points that don't qualify as public API, first check they aren't being used by any atlassian consumers via http://go/sourcegraph. If they are, consider making them public API or having a conversation with the teams using them.
4. Add the entry points that are public API to your package.json under `af:exports` by following "Adding an entry point to a package" above.
5. Remove the `atlassian.deprecatedAutoEntryPoints` field from your package.json
6. Remove your package from the exclusion list at `build/linting/stricter-rules/src/exclusion-lists.ts`
7. Patch release your changes (or minor release if you've added any new entry points that didn't previously exist). A major release is not required since we aren't treating all existing entry points as public API. See https://hello.atlassian.net/wiki/spaces/AFP/pages/908933719/RFC+What+entrypoints+exports+should+we+declare for more information.
