# @atlassian/react-render-analyzer

## 3.0.0

### Major Changes

- [`134103e30d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/134103e30d) - React Render Analyze v2.0

  - Uses React internals instead of HOCs.
  - Doesn't require build setup, even works in production built apps.
  - Storybook and Cypress integration.
  - Improved performance.
  - Better logging and inspecting.
  - New hooks API.

## 1.5.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.5.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.5.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.5.0

### Minor Changes

- [`0f14311957`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f14311957) - allowing rra to work without the babel plugin

## 1.4.0

### Minor Changes

- [`7b53c8ad2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b53c8ad2b) - Using requestIdleCallback only if the browser supports it

## 1.3.0

### Minor Changes

- [`b9c538341d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9c538341d) - Completed integration with accompanying RRA chrome extension.

## 1.2.2

### Patch Changes

- [`5576c5573f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5576c5573f) - Fixes class property methods for core React lifecycle methods.

## 1.2.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 1.2.0

### Minor Changes

- [`f10499369a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f10499369a) - Adds filter, capture, stats analysis funcs. Fixed component names. Fixed export default named exports.

## 1.1.3

### Patch Changes

- [`92859c072d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92859c072d) - Leveraging React Profiler duration data

## 1.1.2

### Patch Changes

- [`a49a86c519`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a49a86c519) - Handling render props when analysing prop changes

## 1.1.1

### Patch Changes

- [`d78f31fb99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d78f31fb99) - Adding support for function declarations as named exports

## 1.1.0

### Minor Changes

- [`6f8b62ba7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f8b62ba7c) - adds disableLogger and better displaynames for components

### Patch Changes

- [`f2e6fe69b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2e6fe69b5) - Handling circular references in props

## 1.0.0

### Major Changes

- [`be38392e7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be38392e7a) - Official public API.

## 0.0.3

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.0.2

### Patch Changes

- [patch][048f110bff](https://bitbucket.org/atlassian/atlassian-frontend/commits/048f110bff):

  Migrate react render analyzer library to atlassian frontend
