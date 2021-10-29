# Change Log

## 7.6.3

### Patch Changes

- [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal upgrade of memoize-one to 6.0.0

## 7.6.2

### Patch Changes

- [`055ee9736a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/055ee9736a1) - [ux] Minor design tweaks for the search dialog

## 7.6.1

### Patch Changes

- [`c3f88e3fd53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3f88e3fd53) - Integrate sticky search with the interactive placeholder skeleton input SSR

## 7.6.0

### Minor Changes

- [`7f512afcc5e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f512afcc5e) - add new file for typing and easy editing outside of string of js madness

## 7.5.3

### Patch Changes

- [`4b08f595985`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b08f595985) - [ux] Add a couple more features for sticky search

## 7.5.2

### Patch Changes

- [`5f7be8052c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f7be8052c8) - [ux] Implement a new context provider to store query and filters for sticky search and the SSR interactive placeholder skeleton

## 7.5.1

### Patch Changes

- Updated dependencies

## 7.5.0

### Minor Changes

- [`0a65c229fda`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a65c229fda) - [ux] A search input skeleton that is interactive has been added. This allows user to type into the search input prior to the search dialog being fully loaded. Currently, this is an opt-in feature via a prop on ProductSearchInputSkeleton.

## 7.4.9

### Patch Changes

- Updated dependencies

## 7.4.8

### Patch Changes

- [`b2c1f6440f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2c1f6440f0) - [ux] The result counts for the bitbucket tab now show at the correct times. Specifically, it no longer appears in pre-query and faster search. Also, it only shows in the first section of post-query.

## 7.4.7

### Patch Changes

- [`414b6216adf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/414b6216adf) - Upgrade date-fns to ^2.17

## 7.4.6

### Patch Changes

- Updated dependencies

## 7.4.5

### Patch Changes

- Updated dependencies

## 7.4.4

### Patch Changes

- Updated dependencies

## 7.4.3

### Patch Changes

- [`13157ec1638`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13157ec1638) - Small changeset to trigger a build
- Updated dependencies

## 7.4.2

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 7.4.1

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 7.4.0

### Minor Changes

- [`7e615c92aa2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e615c92aa2) - [ux] Added a status category filter to the jira quick search filters

## 7.3.0

### Minor Changes

- [`4c7bc9847a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c7bc9847a4) - Added the Smart User Picker to Confluence quicksearch

## 7.2.0

### Minor Changes

- [`24e2c5726e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e2c5726e) - [ux] Remove icons from site filter

## 7.1.0

### Minor Changes

- [`02db192b45`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02db192b45) - [ux] Added support for having more than one site filter at a time

## 7.0.0

### Major Changes

- [`e027f4eaee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e027f4eaee) - Removed dialogTakeoverWidth from being exported from search-dialog. Added ResultContainer, ResultContainer, SidebarContainer components.

## 6.2.4

### Patch Changes

- Updated dependencies

## 6.2.3

### Patch Changes

- [`15124081e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15124081e5) - [ux] Create a new cross site advanced search link component, which allows product-search-dialog to display a list of sites and allows the user to select a site to navigate to advanced search in.

## 6.2.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 6.2.1

### Patch Changes

- [`31813033fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/31813033fa) - Create a new component, SearchFooterLinks, for rendering a list of links inside of the a search footer

## 6.2.0

### Minor Changes

- [`4aa0cc3dc1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4aa0cc3dc1) - Make available to other package the filter dropdown item

## 6.1.0

### Minor Changes

- [`3190c0db3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3190c0db3f) - Added support for a dropdown style filter item to be used with the search dialog

## 6.0.10

### Patch Changes

- [`6e3d27e701`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e3d27e701) - Update link in atlaskit docs for @atlassian/search-dialog

## 6.0.9

### Patch Changes

- [`f90cbc3f13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f90cbc3f13) - Fixed filter items so it no longer updates DOM nodes when the props are the same

## 6.0.8

### Patch Changes

- [`2c5fd769c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c5fd769c0) - Adds light atlaskit documentation for @atlassian/product-search-dialog
- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 6.0.7

### Patch Changes

- [`035b931d49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/035b931d49) - Fixes styling issue with tab changing in Cross Product @atlassian/product-search-dialog

## 6.0.6

### Patch Changes

- [`1d35389747`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d35389747) - Fix atlaskit:src in search-dialog and product-search-dialog

## 6.0.5

### Patch Changes

- [`067ad83a51`](https://bitbucket.org/atlassian/atlassian-frontend/commits/067ad83a51) - Fix statlas subpage link for @atlassian/search-dialog

## 6.0.4

### Patch Changes

- [`d5990ef9c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5990ef9c6) - adds Atlaskit docs for how to compose Search Dialog

## 6.0.3

### Patch Changes

- [`4c34a7c53c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c34a7c53c) - Reimplemented createLinkComponentFactory as a simple React Component

## 6.0.2

### Patch Changes

- [`20f2d11c4d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20f2d11c4d) - Adds atlaskit docs for @atlassian/search-dialog

## 6.0.1

### Patch Changes

- Updated dependencies

## 6.0.0

### Major Changes

- [`a557a6d59f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a557a6d59f) - Publishing @atlassian/search-dialog from within atlassian-frontend

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.65](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.64...v5.1.65) (2020-09-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.63](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.62...v5.1.63) (2020-09-25)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.62](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.61...v5.1.62) (2020-09-25)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.56](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.55...v5.1.56) (2020-09-15)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.55](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.54...v5.1.55) (2020-09-14)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.50](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.49...v5.1.50) (2020-09-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.48](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.47...v5.1.48) (2020-09-03)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.47](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.46...v5.1.47) (2020-09-03)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.46](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.45...v5.1.46) (2020-09-02)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.43](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.42...v5.1.43) (2020-08-31)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.42](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.41...v5.1.42) (2020-08-31)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.39](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.38...v5.1.39) (2020-08-26)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.32](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.31...v5.1.32) (2020-08-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.30](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.29...v5.1.30) (2020-08-17)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.27](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.26...v5.1.27) (2020-08-06)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.24](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.27-test-2.3...v5.1.24) (2020-08-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.27-test-2.3](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.27-test-2.2...v5.1.27-test-2.3) (2020-08-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.27-test-2.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.27-test-2.0...v5.1.27-test-2.1) (2020-08-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.27-test-2.0](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.22...v5.1.27-test-2.0) (2020-08-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.22](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.21...v5.1.22) (2020-07-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.20](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.19...v5.1.20) (2020-07-28)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.19](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.18...v5.1.19) (2020-07-28)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.18](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.17...v5.1.18) (2020-07-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.13](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.12...v5.1.13) (2020-07-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.10](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.9...v5.1.10) (2020-07-17)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.9](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.8...v5.1.9) (2020-07-16)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.6](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.5...v5.1.6) (2020-07-16)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.5](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.4...v5.1.5) (2020-07-15)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.1.4](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.1.3...v5.1.4) (2020-07-14)

**Note:** Version bump only for package @atlassian/search-dialog

# [5.1.0](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.0.28...v5.1.0) (2020-07-09)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.0.20](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.0.19...v5.0.20) (2020-06-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.0.5](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.0.4...v5.0.5) (2020-06-22)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.0.4](https://bitbucket.org/atlassian/product-search-dialog/compare/v5.0.3...v5.0.4) (2020-06-22)

**Note:** Version bump only for package @atlassian/search-dialog

## [5.0.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v4.2.4...v5.0.1) (2020-06-18)

**Note:** Version bump only for package @atlassian/search-dialog

## [4.2.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v4.2.1...v4.2.2) (2020-06-16)

**Note:** Version bump only for package @atlassian/search-dialog

## [4.0.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v4.0.1...v4.0.2) (2020-05-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.9.3](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.9.2...v3.9.3) (2020-05-13)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.9.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.9.1...v3.9.2) (2020-05-08)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.9.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.8.6...v3.9.1) (2020-05-07)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.8.6](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.8.5...v3.8.6) (2020-04-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.8.5](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.8.4...v3.8.5) (2020-04-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.7.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.7.0...v3.7.1) (2020-04-19)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.5.4](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.5.3...v3.5.4) (2020-04-09)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.5.3](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.5.2...v3.5.3) (2020-04-07)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.4.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.4.1...v3.4.2) (2020-03-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.3.17](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.3.16...v3.3.17) (2020-03-23)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.3.12](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.3.11...v3.3.12) (2020-03-19)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.3.7](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.3.6...v3.3.7) (2020-03-16)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.3.4](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.3.3...v3.3.4) (2020-03-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.3.3](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.3.2...v3.3.3) (2020-03-11)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.40](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.39...v3.2.40) (2020-03-10)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.38](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.37...v3.2.38) (2020-03-09)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.32](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.31...v3.2.32) (2020-03-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.24](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.23...v3.2.24) (2020-02-26)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.22](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.21...v3.2.22) (2020-02-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.18](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.17...v3.2.18) (2020-02-19)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.17](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.16...v3.2.17) (2020-02-19)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.9](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.2.8...v3.2.9) (2020-02-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.2.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.58...v3.2.1) (2020-02-10)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.57](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.56...v3.1.57) (2020-02-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.54](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.53...v3.1.54) (2020-01-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.52](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.51...v3.1.52) (2020-01-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.50](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.49...v3.1.50) (2020-01-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.49](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.48...v3.1.49) (2020-01-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.47](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.46...v3.1.47) (2020-01-28)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.44](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.43...v3.1.44) (2020-01-21)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.43](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.42...v3.1.43) (2020-01-21)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.42](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.41...v3.1.42) (2020-01-16)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.36](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.35...v3.1.36) (2020-01-09)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.32](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.31...v3.1.32) (2020-01-02)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.29](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.28...v3.1.29) (2019-12-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.28](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.27...v3.1.28) (2019-12-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.27](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.26...v3.1.27) (2019-12-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.25](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.24...v3.1.25) (2019-12-10)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.24](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.23...v3.1.24) (2019-12-10)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.23](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.22...v3.1.23) (2019-12-10)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.20](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.19...v3.1.20) (2019-12-08)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.19](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.18...v3.1.19) (2019-12-06)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.14](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.13...v3.1.14) (2019-12-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.11](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.10...v3.1.11) (2019-12-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.8](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.7...v3.1.8) (2019-12-02)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.7](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.6...v3.1.7) (2019-11-28)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.4](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.3...v3.1.4) (2019-11-27)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.3](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.2...v3.1.3) (2019-11-27)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.1.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.1.1...v3.1.2) (2019-11-26)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.0.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v3.0.1...v3.0.2) (2019-11-26)

**Note:** Version bump only for package @atlassian/search-dialog

## [3.0.1](https://bitbucket.org/atlassian/product-search-dialog/compare/v2.0.16...v3.0.1) (2019-11-25)

**Note:** Version bump only for package @atlassian/search-dialog

## [2.0.15](https://bitbucket.org/atlassian/product-search-dialog/compare/v2.0.14...v2.0.15) (2019-11-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [2.0.14](https://bitbucket.org/atlassian/product-search-dialog/compare/v2.0.13...v2.0.14) (2019-11-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [2.0.7](https://bitbucket.org/atlassian/product-search-dialog/compare/v2.0.6...v2.0.7) (2019-11-19)

**Note:** Version bump only for package @atlassian/search-dialog

## [2.0.2](https://bitbucket.org/atlassian/product-search-dialog/compare/v2.0.1...v2.0.2) (2019-11-18)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.63](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.62...v1.0.63) (2019-11-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.62](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.61...v1.0.62) (2019-11-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.61](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.60...v1.0.61) (2019-11-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.59](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.58...v1.0.59) (2019-11-12)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.58](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.57...v1.0.58) (2019-11-07)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.57](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.56...v1.0.57) (2019-11-06)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.56](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.55...v1.0.56) (2019-11-06)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.55](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.54...v1.0.55) (2019-11-06)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.53](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.52...v1.0.53) (2019-11-05)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.52](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.51...v1.0.52) (2019-11-05)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.51](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.50...v1.0.51) (2019-11-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.50](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.49...v1.0.50) (2019-11-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.49](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.48...v1.0.49) (2019-11-01)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.47](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.46...v1.0.47) (2019-10-31)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.46](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.45...v1.0.46) (2019-10-31)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.45](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.44...v1.0.45) (2019-10-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.42](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.41...v1.0.42) (2019-10-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.41](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.40...v1.0.41) (2019-10-29)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.38](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.37...v1.0.38) (2019-10-25)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.35](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.34...v1.0.35) (2019-10-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.33](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.32...v1.0.33) (2019-10-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.32](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.31...v1.0.32) (2019-10-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.31](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.30...v1.0.31) (2019-10-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.30](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.29...v1.0.30) (2019-10-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.24](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.23...v1.0.24) (2019-10-04)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.21](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.20...v1.0.21) (2019-10-02)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.20](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.19...v1.0.20) (2019-10-02)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.19](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.18...v1.0.19) (2019-10-01)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.18](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.17...v1.0.18) (2019-10-01)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.17](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.16...v1.0.17) (2019-10-01)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.16](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.15...v1.0.16) (2019-10-01)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.15](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.14...v1.0.15) (2019-09-30)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.14](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.13...v1.0.14) (2019-09-27)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.13](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.12...v1.0.13) (2019-09-26)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.12](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.11...v1.0.12) (2019-09-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.11](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.10...v1.0.11) (2019-09-24)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.10](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.5...v1.0.10) (2019-09-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.9](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.7...v1.0.9) (2019-09-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.8](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.7...v1.0.8) (2019-09-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.7](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.6...v1.0.7) (2019-09-20)

**Note:** Version bump only for package @atlassian/search-dialog

## [1.0.6](https://bitbucket.org/atlassian/product-search-dialog/compare/v1.0.5...v1.0.6) (2019-09-20)

**Note:** Version bump only for package @atlassian/search-dialog

## 1.0.5 (2019-09-19)

**Note:** Version bump only for package @atlassian/search-dialog
