# @atlassian/mpt-timeago

## 2.0.0

### Major Changes

- [`4d14c680e38`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d14c680e38) - Replaced react-timeago with react-intl for i18n support. There will be no week increment. Example increments, 'just now' -> '30 minutes ago' -> '5 hours ago' -> '1 day ago' -> '1 month ago' -> '1 year ago'. Check this page for more info - https://hello.atlassian.net/wiki/spaces/ACM/pages/520599170/Date+time+and+data+formats+for+CCMA+and+JCMA

## 1.1.0

### Minor Changes

- [`dbf78902e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dbf78902e6) - Refactor timeago to follow tangerine styleguide

## 1.0.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.0.0

### Major Changes

- [`1412a51a53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1412a51a53) - Migration of timeago component from mpkit to atlassian-frontend repo
