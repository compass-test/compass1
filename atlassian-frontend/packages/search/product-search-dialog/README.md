# Product Search Dialog

A dialog based search component, usable with atlassian-navigation

## Installation

```sh
yarn add @atlassian/product-search-dialog
```

## Usage

Detailed docs and example usage can be found [on DAC](https://atlaskit.atlassian.com/packages/search/product-search-dialog).

## Testing

A single test (or tree of tests) may be run using `yarn test packages/search/product-search-dialog/src/<path to test(s)>`

Tests may be run in watch mode using `yarn test --watch`

### Use of testing libraries

We prefer [@testing-library/react](https://github.com/testing-library/react-testing-library) over enzyme. Tests should verify the behaviour of components, inspecting the internal state of a component using enzyme is discoraged.


## Storybooks

Storybooks can be run locally using `bolt storybook packages/search/product-search-dialog`
You may also specify the `NODE_ENV` environment variable to ensure the packages are built in development mode, using:
`NODE_ENV=development bolt storybook packages/search/product-search-dialog`

## Package Strucutre

As much as possible, move components as low down as possible, i.e. a parent component should own all of their child components.
For example, consider the simple component structure:

```tsx
<Parent>
    </Child>
</Parent>
```

The folder strucutre should be:
```
project
├── parent
│   └── child
```

Importing from "sibling" component is discouraged:
```
project
├── parent
├── child
```

This is somewhat enforced by the `import/no-internal-modules` eslint rule, which prevents importing of code from outside of an module root.
The intent of this rule is to enforce modules to have clearly defined API and to prevent "reaching" into a package.