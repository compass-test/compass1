# @atlassian/commerce-layout

## 2.0.8

### Patch Changes

- [`845b57b4fb7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/845b57b4fb7) - Use gap as default for inlineLayout

## 2.0.7

### Patch Changes

- Updated dependencies

## 2.0.6

### Patch Changes

- Updated dependencies

## 2.0.5

### Patch Changes

- Updated dependencies

## 2.0.4

### Patch Changes

- Updated dependencies

## 2.0.3

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`e19f1ef2b2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e19f1ef2b2e) - The "source"s in GasV3, "page"s in Metal and "telemetry-breadcrumbs" context in Sentry integrations are now shared across all Commerce packages. This means that, if an event used to have an undefined/unknown/none-value source/page/telemetry-breadcrumb it may now be populated with one if the component is being wrapped in a component from another Commerce package.

### Patch Changes

- Updated dependencies

## 1.7.4

### Patch Changes

- Updated dependencies

## 1.7.3

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 1.7.2

### Patch Changes

- Updated dependencies

## 1.7.1

### Patch Changes

- Updated dependencies

## 1.7.0

### Minor Changes

- [`85bf9350e65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85bf9350e65) - Addition of ResponsiveResize component and changes to bill history

## 1.6.2

### Patch Changes

- Updated dependencies

## 1.6.1

### Patch Changes

- Updated dependencies

## 1.6.0

### Minor Changes

- [`8fe14f73220`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8fe14f73220) - Improve types for PaymentMethodPanel onEdit prop

## 1.5.1

### Patch Changes

- [`4e8abf7b08f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e8abf7b08f) - [ux] Adjust font weigh in address panel, use spacing mixins to layout component and correct corner radius of panels according to latest comps

## 1.5.0

### Minor Changes

- [`9b2eb934c7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b2eb934c7a) - [ux] Update payment methode spacing using space mixins in payment method panels and wallet layout of payment flow

## 1.4.1

### Patch Changes

- [`bca3aa91540`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bca3aa91540) - Update internal component usage
- Updated dependencies

## 1.4.0

### Minor Changes

- [`785633351e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/785633351e4) - [ux] Add spacing utilities: Stacks, insets, inline and docs outlining usage

## 1.3.1

### Patch Changes

- Updated dependencies

## 1.3.0

### Minor Changes

- [`a5d6b69e726`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a5d6b69e726) - [ux] Define Spacing scale and and associated types, replacing grid spacing values with spacing scale values within the package

## 1.2.2

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- [`b871ef8ca5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b871ef8ca5b) - [ux] Minor styling changes to address panel to match component spec

## 1.2.0

### Minor Changes

- [`8e4e880e81a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e4e880e81a) - Next/cancel/back buttons now send analytics data based on https://docs.google.com/spreadsheets/d/1b8bYMOwuCHIWsXbbL1JAg4jiDzE5jrws/edit?ts=607390c5#gid=774800868

## 1.1.6

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")
- Updated dependencies

## 1.1.5

### Patch Changes

- Updated dependencies

## 1.1.4

### Patch Changes

- Updated dependencies

## 1.1.3

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 1.1.1

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 1.1.0

### Minor Changes

- [`6f717662168`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f717662168) - [ux] updated edit button appearance

## 1.0.4

### Patch Changes

- Updated dependencies

## 1.0.3

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [`538b6d60f6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/538b6d60f6d) - Add reveal container to layout package

## 1.0.1

### Patch Changes

- [`e5f6d458737`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5f6d458737) - Introduce commerece layout package
