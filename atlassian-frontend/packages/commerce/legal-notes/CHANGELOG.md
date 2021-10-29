# @atlassian/commerce-legal-notes

## 1.2.2

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [`b39e2bc6b0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b39e2bc6b0c) - Now exposing LegalNote

## 1.1.4

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")
- Updated dependencies

## 1.1.3

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies

## 1.1.2

### Patch Changes

- [`e5f651fdf14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5f651fdf14) - Removing atlassian/docs from dependencies

## 1.1.1

### Patch Changes

- [`3fb35670239`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb35670239) - [ux] New logic to select payment method based legal notes + addition of deferred legal note

## 1.1.0

### Minor Changes

- [`591a84e0c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591a84e0c7) - [ux] ADD optional property to define colour of Visa legal note, regular provided by default

## 1.0.0

### Major Changes

- [`669a2ed004`](https://bitbucket.org/atlassian/atlassian-frontend/commits/669a2ed004) - Major version bumped all packages to prevent certain yarn.lock package version incompatability bugs

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- [`8caa23b869`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8caa23b869) - Fix package import

## 0.4.0

### Minor Changes

- [`260391ba24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/260391ba24) - Update legal notes

## 0.3.3

### Patch Changes

- Updated dependencies

## 0.3.2

### Patch Changes

- [`886f1bf79a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/886f1bf79a) - [ux] Updated data-testid attribute for commerce-legal-notes
- [`05ffe98386`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05ffe98386) - [ux] Added data-testid attribute for LegalNote

## 0.3.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.3.0

### Minor Changes

- [`5b063b836a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b063b836a) - [ux] Adds correct commerce legal note to offsession 3ds confirmation component and implements basic error messages on errors both stripe and CCP related

## 0.2.4

### Patch Changes

- [`859641f1ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/859641f1ee) - [ux] Add support for off session payment 3ds confirmation of specific invoices

## 0.2.3

### Patch Changes

- [`aed403913a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aed403913a) - [ux] Added generic notes component

## 0.2.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.2.1

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`8ab46a8e23`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ab46a8e23) - [ux] Add variant for annual subscription to legal notes

## 0.1.3

### Patch Changes

- [`5f49853d30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f49853d30) - [ux] Test id

## 0.1.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.1

### Patch Changes

- [`3b685d58a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b685d58a1) - Replace styled-compoments by emotion

## 0.1.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.0.3

### Patch Changes

- [`192edc2f22`](https://bitbucket.org/atlassian/atlassian-frontend/commits/192edc2f22) - Introducing commerce payment flow

## 0.0.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.0.1

### Patch Changes

- [`812e7df962`](https://bitbucket.org/atlassian/atlassian-frontend/commits/812e7df962) - Initial Setup
