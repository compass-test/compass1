# Enforce a specific file structure for your project (project-structure)

Enforce a fine-grained file structure for your project by specifying what it should look like.

---

## Rule Details

This rule gives you fine-grained control over how your project structure should look like by
allowing you to whitelist allowed directories and files up to an arbitrary level of nesting.

This rule requires configuration of your project structure and does not enforce anything without
configuration.

## Options

The rule takes a configuration object of the following shape:

```js
{
  definitions: { [name: string]: DirStructureObject | DefName },
  errorTemplate: string,
  rootPath: string,
}
```

### `definitions`

This is where you define your project structure.

The `definitions` config is an object containing directory structure definitions.

A more detailed typing is as follows:

```ts
type ROOT = '.';
type WILDCARD = '*';
type DefName = string;
type FileDef = {
  type: 'file' | 'dir' | DefName;
  optional?: boolean;
};
type DirStructure = {
  [filename: string | WILDCARD]: FileDef | DirStructure | DefName;
};
type Definitions = {
  [ROOT]: DirStructure | DefName;
  [DefName]: DirStructure | DefName;
};
```

The root directory definition is the only mandatory definition and corresponds to the `rootPath`
option passed to stricter.

Within the root definition you can define your directory structure, optionally providing additional
definitions to help flatten the configuration.

All files should have a type of `'file'` whereas directories can either have their content structure
explicitly enforced or not. To explicitly enforce, either provide an inline `DirStructure` object or
reference a `DefName` in the top-level `definitions` configuration. If you do not want to enforce
its structure, pass a `FileDef` object instead with type of `'dir'`.

An example configuration is as follows:

```js
definitions: {
  '.': {
    'README.md': { type: 'file' },
    'package.json': { type: 'file' },
    'index.js': { type: 'file', optional: true },
    src: {
      ui: { type: { ... }, optional: true },
      services: { type: { ... }, optional: true },
      controllers: { type: { ... }, optional: true },
      common: { type: { ... }, optional: true },
      'main.js': { type: 'file', optional: true },
      'index.js': { type: 'file' },
    },
    tests: { type: 'dir', optional: true },
    docs: { type: 'dir', optional: true },
  },
}
```

This configuration only contains the mandatory root directory definition, all other directory
structure is inlined.

Alternatively, this could have been flattened by writing definitions for sub directories.

```js
definitions: {
  '.': 'package',
  package: {
    'README.md': { type: 'file' },
    'package.json': { type: 'file' },
    'index.js': { type: 'file', optional: true },
    src: { type: 'src' },
    tests: { type: 'dir', optional: true },
    docs: { type: 'dir', optional: true },
  },
  src: {
      ui: { type: 'ui', optional: true },
      services: { type: 'services', optional: true },
      controllers: { type: 'controllers', optional: true },
      common: { type: 'common', optional: true },
      'main.js': { type: 'file', optional: true },
      'index.js': { type: 'file' },
  },
  common: { ... },
  controllers: { ... },
  services: { ... },
  ui: { ... },
}
```

Either approach is valid.

### `errorTemplate`

Provide a custom error message template. The original message will be inserted into the
`'#messages#'` placeholder in your text.

E.g.

```js
{
  errorTemplate: '#messages#\nSee here for more details: ...',
}
```

### `rootPath`

Sets the root path of your project instead of the default `rootPath` of your stricter configuration.
Can be absolute or relative to stricter's `rootPath`.

This is useful when executing this across multiple packages in a multi-package repo.

E.g. when using stricter v0.3.3 or above,

```js
const stricterConfig = {
  rules: {
    'tangerine/project-structure': ({ packages }) => packages.map(pkg => ({
      level: "error",
      config: {
        rootPath: pkg,
        definitions: {
          ...
        },
      },
    }))
  }
}
```

## Examples

Given the following project structure configuration:

```js
const stricterConfig = {
  rules: {
    'tangerine/project-structure': {
      level: "error",
      config: {
        definitions: {
          '.': {
            'README.md': { type: 'file' },
            'package.json': { type: 'file' },
            'index.js': { type: 'file', optional: true },
            src: {
              ui: { type: { ... }, optional: true },
              services: { type: { ... }, optional: true },
              controllers: { type: { ... }, optional: true },
              common: { type: { ... }, optional: true },
              'main.js': { type: 'file', optional: true },
              'index.js': { type: 'file' },
            },
            tests: { type: 'dir', optional: true },
            docs: { type: 'dir', optional: true },
          },
        }
      }
    }
  }
};
```

👎 Example of **incorrect** structure that will violate this config:

```
📦project
 ┣ 📂docs // ✅ - Contents of docs can be anything
 ┃ ┣ 📜foo.js
 ┃ ┗ 📂bar
 ┣ 📂examples  // ❌ Not specified in root definition
 ┃ ┗ 📜examples.js
 ┣ 📂src
 ┃ ┣ 📂foo  // ❌ Not specified in src definition
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜messages.js
 ┃ ┃ ┗ 📜types.js
 ┃ ┗ 📜index.js
 ┣ 📜index.js
 ┗ 📜package.json
 // ❌ README.md is missing in root and is non-optional
```

👍 Example of **correct** structure with this config:

```
📦project
 ┣ 📂docs // ✅ - Contents of docs can be anything
 ┃ ┣ 📜foo.js
 ┃ ┗ 📂bar
 ┣ 📂src
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜messages.js
 ┃ ┃ ┗ 📜types.js
 ┃ ┗ 📜index.js
 ┣ 📜index.js
 ┣ 📜package.json
 ┗ 📜README.md
```

## Configuration for the guidelines

This configuration assumes you set up your stricter at the root of the packages setup

```
const basicPackage = {
    'README.md': { type: 'file', optional: true },
    'package.json': { type: 'file' },
    src: { type: 'src' },
    examples: { type: 'dir', optional: true },
    'integration-tests': { type: 'dir', optional: true },
    docs: { type: 'dir', optional: true },
};

const sharedFiles = {
    'mocks.js': { type: 'file', optional: true },
    'test.js': { type: 'file', optional: true },
    'types.js': { type: 'file', optional: true },
    'README.md': { type: 'file', optional: true },
    'messages.js': { type: 'file', optional: true },
    'utils.js': { type: 'file', optional: true },
    'utils.test.js': { type: 'file', optional: true },
    'constants.js': { type: 'file', optional: true },
    'gql.js': { type: 'file', optional: true },
    utils: { type: 'dir', optional: true },
    assets: { type: 'dir', optional: true },
    __snapshots__: { type: 'snapshots', optional: true },
};

const sharedUIFiles = {
    'examples.js': { type: 'file', optional: true },
    'styled.js': { type: 'file', optional: true },
    'styled.test.js': { type: 'file', optional: true },
    'messages.js': { type: 'file', optional: true },
};

const uiComponent = {
    ...sharedFiles,
    ...sharedUIFiles,
    'index.js': { type: 'file' },
    'main.js': { type: 'file', optional: true },
    'async.js': { type: 'file', optional: true },
};

const sweetStateAdditionalFiles = {
    'actions.js': { type: 'file', optional: true },
    'selectors.js': { type: 'file', optional: true },
    actions: { type: 'dir', optional: true },
    selectors: { type: 'dir', optional: true },
};

const commonUIComponent = {
    ...sharedFiles,
    ...sharedUIFiles,
    'index.js': { type: 'file', optional: true },
    'main.js': { type: 'file', optional: true },
};

const serviceComponent = {
    ...sharedFiles,
    ...sweetStateAdditionalFiles,
    'index.js': { type: 'file', optional: true },
    'main.js': { type: 'file', optional: true },
    'context.js': { type: 'file', optional: true },
    'pact.test-spec.js': { type: 'file', optional: true },
};

const stricterConfig = {
  rules: {
    'tangerine/project-structure': {
        level: 'error',
        config: {
            errorTemplate: `#messages#\nIf you see this error that means that some of your files of folders either named incorrectly or in the wrong place.
                For more details take a look at the guides. Ask for advise in #tangerine channel if the docs don't help`,
            definitions: {
                '.': 'package',
                package: {
                    ...basicPackage,
                },
                src: {
                    ui: { type: 'ui', optional: true },
                    services: { type: 'services', optional: true },
                    controllers: { type: 'controllers', optional: true },
                    common: { type: 'common', optional: true },
                    ...sharedFiles,
                    ...sharedUIFiles,
                    ...sweetStateAdditionalFiles,
                    'main.js': { type: 'file', optional: true },
                    'async.js': { type: 'file', optional: true },
                    'index.js': { type: 'file', optional: true },
                    'context.js': { type: 'file', optional: true },
                    'feature-flags.js': { type: 'file', optional: true },
                },
                ui: {
                    ...uiComponent,
                    '*': 'uiComponent',
                },
                services: {
                    ...serviceComponent,
                    '*': 'serviceComponent',
                },
                controllers: {
                    ...serviceComponent,
                    '*': 'serviceComponent',
                },
                common: {
                    'constants.js': { type: 'file', optional: true },
                    constants: { type: 'dir', optional: true },
                    'messages.js': { type: 'file', optional: true },
                    'types.js': { type: 'file', optional: true },
                    types: { type: 'dir', optional: true },
                    'utils.js': { type: 'file', optional: true },
                    'utils.test.js': { type: 'file', optional: true },
                    utils: { type: 'dir', optional: true },
                    'mocks.js': { type: 'file', optional: true },
                    mocks: { type: 'dir', optional: true },
                    'mock-data': { type: 'dir', optional: true },
                    assets: { type: 'dir', optional: true },
                    graphql: { type: 'dir', optional: true },
                    ui: { type: 'commonComponent', optional: true },
                },
                uiComponent: {
                    ...uiComponent,
                    '*': 'uiComponent',
                },
                serviceComponent: {
                    ...serviceComponent,
                    '*': 'serviceComponent',
                },
                commonComponent: {
                    ...commonUIComponent,
                    '*': 'commonComponent',
                },
                snapshots: {
                    '*': { type: 'file' },
                },
            },
        },
    },
  }
};

```

## When Not To Use It

When you do not want to enforce a particular project structure.

## Resources

- [Rule source](https://github.com/atlassian/frontend/blob/master/packages/stricter-plugin-tangerine/src/rules/project-structure/index.js)
- [Rule test](https://github.com/atlassian/frontend/blob/master/packages/stricter-plugin-tangerine/src/rules/project-structure/test.js)
