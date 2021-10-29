# @atlassian/commerce-telemetry

## 4.0.0

### Major Changes

- [`896d9fcb836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/896d9fcb836) - SentryBrowserIntegration should now be compatible with substantially more versions of Sentry. Although this likely won't actually cause any major breaking changes for @atlassian/commerce-ui and other consumer packages, it does change the type contracts for SentryBrowserIntegration which might cause a breaking change if you're relying on the current API contract.

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`83542bf31a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83542bf31a0) - refactored Service -> CommerceService in telemetry package, pass in CommerceService type into cpp utils

### Minor Changes

- [`fc7da6a7e1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc7da6a7e1a) - 1 - extracted and added helpers util for checking result status codes (5xx, 404), 2 - exposed commerce-telemetry in commerce-ui
- [`b327baef44d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b327baef44d) - separated ccp specific helpers into its own package
- [`29fac2fb10d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29fac2fb10d) - made responsibleService type Service to generic string so product can define own responsible services in payload

## 2.0.0

### Major Changes

- [`48bde0d73e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/48bde0d73e8) - @atlassian/commerce-telemetry now has the Breadcrumb API and RepackageAtlaskitEvent built into it

## 1.4.5

### Patch Changes

- [`111caedb5c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/111caedb5c6) - TypeError Failed to fetch now set to probabilityOfBug maybe
- [`5b9639f6934`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b9639f6934) - TyperError Failed to fetch errors are now set to probabilityOfBug maybe

## 1.4.4

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 1.4.3

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.4.2

### Patch Changes

- [`c1a9cae5b2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1a9cae5b2f) - fixed breaking changed to updateBillingDetails API

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [`02a569a8e44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02a569a8e44) - create browser analytics on first use rather than on import

### Patch Changes

- Updated dependencies

## 1.3.0

### Minor Changes

- [`853f21b9cdc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/853f21b9cdc) - Added HAMS as a "Service" value in Commerce's telemetry package

### Patch Changes

- [`374ef46d177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/374ef46d177) - Fixed startTask being recreated everytime if you are passing in an object literal

## 1.2.0

### Minor Changes

- [`f27b1b0d587`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f27b1b0d587) - added useTaskTracker to commerce-telemetry and now in use to updateBillingDetails
- [`21b67d724e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21b67d724e8) - added useTaskTracker, implemented in billing details

## 1.1.4

### Patch Changes

- Updated dependencies

## 1.1.3

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")
- Updated dependencies

## 1.1.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 1.1.0

### Minor Changes

- [`e5912da5cc9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5912da5cc9) - More specific CC submission task IDs and now logging considerably more Sentry information

## 1.0.3

### Patch Changes

- [`0dd6b097ced`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd6b097ced) - Fixed unreleased dependency being dependended upon

## 1.0.2

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [`5daffd29ac2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5daffd29ac2) - First release!
- Updated dependencies
