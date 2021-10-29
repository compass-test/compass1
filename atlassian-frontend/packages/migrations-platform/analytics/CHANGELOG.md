# @atlassian/mpt-analytics

## 2.0.1

### Patch Changes

- [`37fd554209e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37fd554209e) - Add instance checks for analytics events in analytics-next. Update check in mpt-analytics for events too.
- Updated dependencies

## 2.0.0

### Major Changes

- [`4218a1bf652`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4218a1bf652) - Fixing the event types for MPT events

## 1.0.2

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [`1540f05317b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1540f05317b) - Refactor analytics

## 0.5.0

### Minor Changes

- [`70c04c991de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70c04c991de) - Add BCMA specific screen event types

## 0.4.0

### Minor Changes

- [`a71e122eac2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a71e122eac2) - Added event screen for Choose What to Migrate Apps page

## 0.3.1

### Patch Changes

- [`f26eb1a0ed2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f26eb1a0ed2) - Add app consent screen name

## 0.3.0

### Minor Changes

- [`b97677f66c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b97677f66c) - Add Advanced Roadmaps task card to Jira migration tasklist

## 0.2.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.2.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.2.0

### Minor Changes

- [`4f228cd3fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f228cd3fa) - Adding WithAnalyticsProps type in export

## 0.1.0

### Minor Changes

- [`18d745c149`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18d745c149) - Migrated mpkit-analytics from migrations platform to atlassian frontend. No breaking changes. No major dependency updates ("memoize-one": "^5.1.1" in mpkit to "memoize-one": "^5.1.0",)
