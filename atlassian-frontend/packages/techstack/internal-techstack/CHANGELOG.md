# @repo/internal-techstack

## 0.9.0

### Minor Changes

- [`f6bb416317b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6bb416317b) - Updates ruleset to include react/button-has-type.

### Patch Changes

- Updated dependencies

## 0.8.5

### Patch Changes

- [`53954c7aef2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53954c7aef2) - Adds already deprecated Design System components to no-deprecated-imports list: droplist, item, global-navigation. Also updates some deprecation messages to make them more clear.

## 0.8.4

### Patch Changes

- [`f1d90b0850a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1d90b0850a) - Adds an additional rule to the @repo/internal-techstack to enforce the atlaskit:src correctly matches src/index.tsx

## 0.8.3

### Patch Changes

- [`ef09e594416`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef09e594416) - Configured `@atlaskit/eslint-plugin-design-system` to enforce token fallbacks.
- [`caf10f53482`](https://bitbucket.org/atlassian/atlassian-frontend/commits/caf10f53482) - Updates design system techstack to allow files to be prefixed with underscore.

## 0.8.2

### Patch Changes

- [`1a3e03855a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a3e03855a2) - Adds no nested styles rule.

## 0.8.1

### Patch Changes

- [`d0ac5f7b7d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0ac5f7b7d6) - Adds new lint rule react/boolean-prop-naming-convention.
- [`a931e692e45`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a931e692e45) - Turns on consistent-props-definitions again.

## 0.8.0

### Minor Changes

- [`1f69ec147ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f69ec147ea) - Disables '@typescript-eslint/naming-convention' and '@repo/internal/react/consistent-props-definitions' rules for design system tech stack

### Patch Changes

- [`27da390a9ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27da390a9ab) - Adds @repo/internal/styles/consistent-style-ordering to styling techstack solution.

## 0.7.2

### Patch Changes

- [`769ea83469c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/769ea83469c) - Moves tokens and eslint-plugin-design-system to the public namespace.

## 0.7.1

### Patch Changes

- [`a898471b04e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a898471b04e) - Adds tokens to theming techstack.

## 0.7.0

### Minor Changes

- [`aad52e77d20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aad52e77d20) - Disables '@typescript-eslint/naming-convention' and '@repo/internal/react/consistent-props-definitions' rules for design system tech stack

## 0.6.1

### Patch Changes

- [`34e365c8fd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/34e365c8fd7) - Updates prop rules for design system tech stack.

## 0.6.0

### Minor Changes

- [`a63e62f7895`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a63e62f7895) - New internal styling techstack is available with `react/consistent-css-prop-usage` eslint rule enabled.

### Patch Changes

- [`7a98eba7a4c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a98eba7a4c) - Adds disallowed props to design system tech stack.
- [`3bda5603a8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bda5603a8f) - Adds design system tech stack.
- [`9296354532b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9296354532b) - New eslint rule `react/no-unsafe-overrides` is available under design-system v1.
- [`81ab6508a10`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81ab6508a10) - Adds boolean naming convention for types to design system tech stack.
- [`fd080064fdd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd080064fdd) - Consume new `react/no-children-properties-access` eslint rule under 'Design system linting rules'
- [`d52cead1503`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d52cead1503) - internal techstack designSystemV1 now uses disallow-ustable-values rule from @eslint-plugin-internal. This disallows the use of functions such as uuid() that may cause unstable values.
- [`0688c52b960`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0688c52b960) - Updates checks to new paths.
- [`e9f6046b1c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9f6046b1c6) - Consume new `react/no-clone-element` eslint rule under 'Design system linting rules'
- [`ebd98351a30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ebd98351a30) - Adds jsdoc checks to design system tech stack.
- [`b2226efd372`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2226efd372) - Adds react/require-jsdoc to design system techstack.
- [`01470f7bcf8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01470f7bcf8) - Adds no-restricted-import rule to design system techstack. This disallows styled components and styled from @emotion/styled.
- [`f2e830bb953`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2e830bb953) - New eslint rule `react/no-css-string-literals` is available in design-system v1.

## 0.5.2

### Patch Changes

- Updated dependencies

## 0.5.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.5.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.4.1

### Patch Changes

- [`baaad91b65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/baaad91b65) - Updated to use the latest and more performant version of `@atlaskit/avatar`

## 0.4.0

### Minor Changes

- [minor][5eb0635734](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eb0635734):

  Add two new use cases; `theme` and `deprecation` that test for the old theming API, and for deprecated packages

## 0.3.0

### Minor Changes

- [minor][467a91b23c](https://bitbucket.org/atlassian/atlassian-frontend/commits/467a91b23c):

  Add two new use cases; `analytics` and `ui-components` to support lite-mode performance work.

### Patch Changes

- Updated dependencies [c8c0c05326](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8c0c05326):
  - @repo/eslint-plugin-internal@0.2.0

## 0.2.0

### Minor Changes

- [minor][132d01bf54](https://bitbucket.org/atlassian/atlassian-frontend/commits/132d01bf54):

  Introduce isolated-component-development use case and solution

## 0.1.0

### Minor Changes

- [minor][0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):

  Introduce repository-internal techstack and Eslint plugin; extract utils

### Patch Changes

- Updated dependencies [0d201f7b6e](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d201f7b6e):
  - @atlassian/eslint-plugin-tangerine@0.6.1
  - @repo/eslint-plugin-internal@0.1.0
