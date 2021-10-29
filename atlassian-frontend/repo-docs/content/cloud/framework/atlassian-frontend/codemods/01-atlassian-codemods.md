---
date: '2021-09-27'
---

# Codemods

_The following page is guide to the codemod CLI tool, and best practices in the \`atlassian-frontend\` repo. For more information on what codemods are and how to write them, visit the [intro to codemods](/cloud/framework/atlassian-frontend/codemods/00-intro-to-codemods/) page._

To easily download and run codemods associated with atlassian-frontend components and services, we provide a CLI tool called `@atlaskit/codemod-cli`.

The idea is that upgrading major versions can be **assisted** by codemods, reducing upgrade-pain, improving adoption and giving component authors the flexibility to improve API and component design.

**Note:** Codemods will be designed to do the heavy lifting, but they'll often not be perfect so some manual work may still be required in order to successfully migrate.

## Usage

`$ npx @atlaskit/codemod-cli /project/src/file.js`

## Options

### --transform, -t

The transform to run, transforms can be either a single file or directory with an index.

**example:**

- `npx @atlaskit/codemod-cli --transform codemods/my-special-mod /project/src/file.js`
- `npx @atlaskit/codemod-cli --transform codemods/my-special-mod/index.ts /project/src/file.js`

### --since-ref <git-ref>

Determines changed packages since the specified git ref and runs all codemods for them. The automatic version of `--packages`. The ref can be any valid git ref, e.g. a commit hash, HEAD etc.

**example:**

- `npx @atlaskit/codemod-cli --since-ref HEAD /project/src`
- `npx @atlaskit/codemod-cli --since-ref abcdef123 /project/src`

### --packages

Runs transforms for the specified comma separated list of packages, optionally include a version for each package to run all transforms since that version

**example:**

- `npx @atlaskit/codemod-cli --packages @atlaskit/button /project/src`
- `npx @atlaskit/codemod-cli --packages @atlaskit/button@3.0.0,@atlaskit/range@4.0.0 /project/src`

### --parser, -p

Parser to use for parsing the source files you are code modding.

**options:**

- babel (default)
- babylon
- flow
- ts
- tsx

**example:**

- `npx @atlaskit/codemod-cli --parser tsx /project/src/file.js`
- `npx @atlaskit/codemod-cli -p babel /project/src/file.js`

### --extensions, -e

Transform files with these file extensions (comma separated list) (default: js)

**example:**

- `npx @atlaskit/codemod-cli --extensions ts,tsx /project/src/file.js`
- `npx @atlaskit/codemod-cli -e js /project/src/file.js`

### --ignore-pattern

Ignore files that match a provided glob expression

**example:**

- `@atlaskit/codemod-cli --ignore-pattern node_modules /project/src/file.js`

### --version, -v

Get current version number

**example:**

- `@atlaskit/codemod-cli --version`
- `@atlaskit/codemod-cli -v`

### --help

Print all help text to the command line

**example:**

- `@atlaskit/codemod-cli --help`

## Authoring codemods

This guide intended to help you author a codemod for a component and make it available to consumers via the codemod-cli.

### Step 1. Setup

Create a `/codemods` folder inside your component.

```
/packages
  /core
    /avatar
    /button
      /codemods
```

In the `codemods` folder, create a file or folder matching the following format:

```
(optimistic-)?(next|$version)(-$description)
```

Parts:

- **[optional]** `optimistic` prefix
- **[required]** `next` or raw semver version (eg `3.2.1`)
- **[required]** description

Examples:

- `next-my-description`
- `2.0.0-my-description`
- `optimistic-next-my-description`
- `optimistic-2.0.0-my-description`

If creating a folder then you need to create a `index.ts` file within the folder

```
/button
  /codemods
    /next-remove-appearance-prop
      /__tests__
      index.ts
```

#### `next` label

**Recommended**

Codemods prefixed with `next` will be automatically renamed at publish time to the correct version it is released with.

(`next-shift-usage` → `2.0.0-shift-usage`)

- These codemods must be safe upgrade paths
- Where no safe upgrade path exists, a comment must be added to the file explaining what manual intervention is required

#### Raw version label

(`2.0.0-shift-usage`)

You can manually create a codemod with a version it applies to. This can be helpful for creating codemods for upgrading older versions.

Technically you can use this to target an upcoming version by guessing what the release version will be. However, for that use case please use the `next` prefix.

#### `optimistic` prefix

(`optimistic-2.0.0-shift-usage` → `optimistic-2.0.0-shift-usage`)
(`optimistic-next-shift-usage` → `optimistic-2.0.0-shift-usage`)

Codemods prefixed with `optimistic-` are marked as **unsafe upgrades**. `optimistic` codemods provide an opportunity to create a more aggressive upgrade strategy that can be run be manually by consumers through `@atlaskit/codemod-cli`. `optimistic` codemods will not be run in CI upgrade tasks

### General authoring notes

To avoid confusion and breaking changes, codemods must be related to a specific timestamp or version of a component.
Codemods written for v3 might not be applicable against v5, so as good practice prefix codemods with the specific version number to give consumers a reference to the changes they are related to.

For example, if a consumer is on an older version of button and they want to move from that version to the latest version, three majors away, they would need to run all appropriate codemods in sequence. i.e. v3, v4 and v5.
If they are named arbitrarily, there will be no apparent sequence for the consumer to follow.

Changes to the component that occur thereafter should not affect or break older codemods. Allowing us to go back and patch older
codemods if necessary.

### Step 2. Writing your codemod

Codemod-cli depends on [jscodeshift](https://github.com/facebook/jscodeshift) to build and run codemods (if you get stuck, please refer to the documentation).

The basic anatomy of a codemod (aka transform), looks like this:

```js
/**
 * - This replaces every occurrence of variable "foo".
 */
module.exports = function (fileInfo, api) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators('foo')
    .renameTo('bar')
    .toSource();
};

// Note: not exporting a 'parser' because doing so
// will prevent consumers overriding it
```

It's very likely that consumers will run into all sorts of edge-cases when running your transform. That's why it's important to start by writing some tests to assert it's behavior. Luckily, [jscodeshift provides some testing utilities](https://github.com/facebook/jscodeshift#unit-testing).

Here's a simple example:

```js
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../myTransform');
const transformOptions = {};

defineInlineTest(
  transform,
  transformOptions,
  'input',
  'expected output',
  'test name (optional)',
);
```

### Step 3. Validation

We run codemods automatically on CI as part of our product branch deploy integration process. Check the integrator bot comment on your PR and view the link to the auto-generated branch in product (e.g. Confluence) containing
your codemod changes. You can then validate to see that the changes are correct and also view the `integrator.log` file at the root of the branch to see if any errors occurred while running the codemod.

You can also run it manually:

Codemods are bundled and stored with components, so when you run the CLI it will search in your node_modules for it.

First make sure your upgrade to the latest version of the component you wish to upgrade. Note that if you're testing against unreleased code you will need to install the branch deploy of your package.

`$ yarn upgrade @atlaskit/button@latest`

Then run the codemod-cli...

`$ npx @atlaskit/codemod-cli /project/src/file.js`

You will then be prompted with a fuzzy-findable list of codemods, pick the codemod you just published and run it!

Ta-da!
