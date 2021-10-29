# @repo/eslint-plugin-internal

## 0.2.8

### Patch Changes

- [`f1d90b0850a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1d90b0850a) - Adds an additional rule to the @repo/internal-techstack to enforce the atlaskit:src correctly matches src/index.tsx

## 0.2.7

### Patch Changes

- [`1a3e03855a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a3e03855a2) - Adds no nested styles rule.

## 0.2.6

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.2.5

### Patch Changes

- [`c9d8cc07750`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9d8cc07750) - Converts internal code to TypeScript.
- [`d0ac5f7b7d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0ac5f7b7d6) - Adds new lint rule react/boolean-prop-naming-convention.
- [`e07c4475420`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e07c4475420) - Rewrites consistent-props-definitions to not need tsc.
- [`5f1b0f2a227`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f1b0f2a227) - Adds linting for CSS declaration suffix.
- Updated dependencies

## 0.2.4

### Patch Changes

- [`aa77865d4ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa77865d4ae) - New style rule for ensuring style order using css functions with objects. @repo/internal/styles/consistent-style-ordering
- [`dd1f496fd3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd1f496fd3b) - react/consistent-props-definitions rule now guards to prevent throwing when no comment exists.
- [`923b5835976`](https://bitbucket.org/atlassian/atlassian-frontend/commits/923b5835976) - Bugfix/refactor to style property ordering to allow some additional edge cases

## 0.2.3

### Patch Changes

- [`3df84d7ea29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3df84d7ea29) - Fixes css prop linting rule analysis.

## 0.2.2

### Patch Changes

- [`9296354532b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9296354532b) - New eslint rule `react/no-unsafe-overrides` is available under design-system v1.
- [`3f1fd11fbce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f1fd11fbce) - New eslint rule `react/no-clone-element` is available.
- [`d2ecd601489`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2ecd601489) - Changes no-unsafe-overrides rule to error on jsx attributes.
- [`72c63ad6f90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72c63ad6f90) - New eslint rule `react/consistent-props-definitions` available. Use it to ensure defined props are consistent on your React components.
- [`bf872fea18e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf872fea18e) - New eslint rule `react/disallow-unstable-values` is available. This disallows the use of functions such as uuid() that may lead to unstable values.
- [`64a91346350`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64a91346350) - New eslint rule `react/consistent-css-prop-usage` is available.
- [`8d33ee7ca6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d33ee7ca6d) - New eslint rule `react/no-children-properties-access` is available.
- [`1d6947ad481`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d6947ad481) - Adds support to supress errors on props for the `react/consistent-props-definitions` rule. Place the text `"eslint-disable-next-line consistent-props-definitions"` in its jsdoc to use.
- [`9de2b8996ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9de2b8996ee) - Adds new rule `react/require-jsdoc`.
- [`f2e830bb953`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2e830bb953) - New eslint rule `react/no-css-string-literals` is available in design-system v1.

## 0.2.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.2.0

### Minor Changes

- [minor][c8c0c05326](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8c0c05326):

  Add three new plugins:

  - `react/no-class-components`, that will catch React class components
  - `react/no-state-change-inside-use-effect`, that will catch uses of state setters inside of useEffect
  - `react/no-set-state-inside-render-function`, that catches uses of setState inside of the render function

## 0.1.0

### Minor Changes

- [minor][0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):

  Introduce repository-internal techstack and Eslint plugin; extract utils

### Patch Changes

- Updated dependencies [0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):
  - @atlassian/eslint-utils@0.1.0
