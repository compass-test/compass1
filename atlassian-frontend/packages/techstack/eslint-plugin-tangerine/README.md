# eslint-plugin-tangerine

A set of [Eslint](https://github.com/eslint/eslint) rules developed by
[Atlassian](https://www.atlassian.com/) as part of
[Tangerine 🍊](https://github.com/atlassian/tangerine).

![Tangerine](./resources/tangerine-transparent.png)

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) locally or globally:

```sh
$ yarn add --dev eslint
```

If you've installed `ESLint` globally, you'll have to install the Tangerine plugin globally too.
Otherwise, install it locally:

```sh
$ yarn add --dev eslint-plugin-tangerine
```

## Configuration

Specify `tangerine` as a plugin in `.eslintrc.js` file:

```json
{
  "plugins": ["tangerine"]
}
```

We export a number of shareable configs that provide a set of pre-configured rules to help enforce
our guidelines.

Each of them are concerned with a specific theme and/or guideline.

The list of configs are:

- packages - Contains all package-related rules, configured to adhere to the
  [package structure guidelines](../../guides/architecture/general/apps/README.md)
- recommended - The recommended config, includes all other configs

To use a shareable config, simply add it to the `extends` field.

E.g.

```json
{
  "extends": ["plugin:tangerine/recommended"]
}
```

See the [ESLint docs](https://eslint.org/docs/user-guide/configuring#extending-configuration-files)
on extending shareable configs for more information.

Alternatively, to configure or override certain rules yourself, you can now enable them as follows:

```json
{
  "rules": {
    "tangerine/import/restricted-paths": "error"
  }
}
```

### Shared settings

Certain rules are able to be customised using
[ESLint's shared settings](https://eslint.org/docs/user-guide/configuring#adding-shared-settings)
feature.

The settings are keyed under `tangerine` and are as follows:

```json
{
  "settings": {
    "tangerine": {
      "message": "Custom error message suffix."
    }
  }
}
```

#### message

This will append an extra custom error message to each rule that supports a `message` option, which
will be most rules in the shareable configs.

## Rules

Rules with the wrench icon 🔧 can automatically be fixed by passing the `--fix` option to the
[command line](https://eslint.org/docs/user-guide/command-line-interface#fix)

### i18n

- Ensures that i18n messages are spelled correctly.
  ([i18n/messages-are-spelled-correctly](./src/rules/i18n/messages-are-spelled-correctly/README.md))

### import

- Enforce consistent default import names for specified sources
  ([import/default-import-names](./src/rules/import/default-import-names/README.md) 🔧)

- Disallow unnecessary trailing '/index' in imports
  ([import/no-dangling-index](./src/rules/import/no-dangling-index/README.md) 🔧)

- Remove leading `./` in relative imports from other folders
  ([import/no-dot-prefix-in-upward-relative-imports](./src/rules/import/no-dot-prefix-in-upward-relative-imports/README.md)
  🔧)

- Enforce use of explicit over implicit imports
  ([import/no-implicit-imports](./src/rules/import/no-implicit-imports/README.md) 🔧)

- Disallow imports from descendant directories more than one level deep
  ([import/no-nested-imports](./src/rules/import/no-nested-imports/README.md))

- Restrict imports from parent paths in specific directories
  ([import/no-parent-imports](./src/rules/import/no-parent-imports/README.md))

- Restrict imports between different parts of your app based on path matching.
  ([import/no-restricted-paths](./src/rules/import/no-restricted-paths/README.md))

### other

- Enforce consistent casing for file and directory names
  ([other/filename-case](./src/rules/other/filename-case/README.md))

### react

- Enforce consistent naming of react lifecycle method arguments
  ([react/lifecycle-method-arg-naming](./src/rules/react/lifecycle-method-arg-naming/README.md) 🔧)

## Contributing

All rules are located in separate directories, in the corresponding `rules/<ruleCategory>`
directory. The rule's name must be identical to its directory name.

Every rule must contain:

- `index.js` - The rule's implementation, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/eslint-plugin-tangerine/templates/rules/index.js).
- `README.md` - The rule's documentation, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/eslint-plugin-tangerine/templates/rules/README.md).
- `test.js` - The rule's tests, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/eslint-plugin-tangerine/templates/rules/test.js).

After adding a new rule, run `yarn docs:generate-pkg` from the root directory to add a link to the
frontpage `README.md` file.

All rules are exposed automatically.

To change this file, edit
[template](https://github.com/atlassian/frontend/tree/master/packages/eslint-plugin-tangerine/templates/README.md)
instead, then run `yarn docs:generate-pkg` from the root directory

### Testing

To help test your rules, we've created an extension to `expect` called `toMatchEslintResults()`.
It's intended to streamline the running of a particular code block against all of the rules in this
plugin, and match a subset of the results against what you'd expect them to be.

```js
expect(code).toMatchEslintResults(results);
```

For example:

```js
test('import/no-dangling-slash', () => {
  expect("import { Foo } from './foo/';").toMatchEslintResults({
    messages: [{ message: "Invalid import; no dangling '/' allowed" }],
  });
});
```

The `results` object can be a subset of the results returned by ESLint. However, if you're asserting
`messages`, then message in the array that you're trying to match must match the index in which it
appears in the actual results.

### Bump plugin version

After you've merged the changes, you need to

- update the package version in `package.json`
- update the `Changelog.md`
- create a new PR with the bump. Wait for it to be merged.
  [Example of such PR](https://github.com/atlassian/frontend-guides/pull/159/commits).
- Manual publish the new version of the package: `npm publish`.
