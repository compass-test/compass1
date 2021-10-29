# stricter-plugin-tangerine

A set of [Stricter](https://github.com/stricter/stricter) rules developed by
[Atlassian](https://www.atlassian.com/) as part of
[Atlassian Frontend](https://github.com/atlassian/frontend).

## Installation

Install [Stricter](https://www.github.com/stricter/stricter) locally or globally:

```sh
$ yarn add --dev stricter
```

If you've installed `Stricter` globally, you'll have to install the `tangerine` plugin globally too.
Otherwise, install it locally:

```sh
$ yarn add --dev stricter-plugin-tangerine
```

## Configuration

**Note: This will most likely change in the future to a proper plugin system**

Specify the rules dir of this plugin in the `rulesDir` configuration of your `stricter.config.js`
file:

```json
{
  "rulesDir": [
    "my-custom-rules",
    "node_modules/stricter-plugin-tangerine/rules"
  ]
}
```

You can now enable the rules you want to use:

```json
{
  "rules": {
    "tangerine/project-structure": "error"
  }
}
```

## Rules

### project-structure

- Enforce a specific file structure for your project
  ([project-structure](./docs/rules/project-structure/README.md))

## Contributing

All rules are located in separate directories, in the corresponding `rules/<ruleCategory>`
directory. The rule's name must be identical to its directory name.

Every rule must contain:

- `index.js` - The rule's implementation, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/stricter-plugin-tangerine/templates/rules/index.js).
- `README.md` - The rule's documentation, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/stricter-plugin-tangerine/templates/rules/README.md).
- `test.js` - The rule's tests, following
  [this template](https://github.com/atlassian/frontend/tree/master/packages/stricter-plugin-tangerine/templates/rules/test.js).

After adding a new rule, run `yarn docs:generate-pkg` from the root directory to add a link to the
frontpage `README.md` file.

All rules are exposed automatically.

To change this file, edit
[template](https://github.com/atlassian/frontend/tree/master/packages/stricter-plugin-tangerine/templates/README.md)
instead, then run `yarn docs:generate-pkg` from the root directory
