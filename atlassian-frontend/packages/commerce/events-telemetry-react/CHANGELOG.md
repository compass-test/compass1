# @atlassian/commerce-events-telemetry-react

## 6.0.0

### Major Changes

- [`896d9fcb836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/896d9fcb836) - SentryBrowserIntegration should now be compatible with substantially more versions of Sentry. Although this likely won't actually cause any major breaking changes for @atlassian/commerce-ui and other consumer packages, it does change the type contracts for SentryBrowserIntegration which might cause a breaking change if you're relying on the current API contract.

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references

### Minor Changes

- [`2ba809098b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ba809098b2) - Deprecated useBreadcrumbs in favour of useGetBreadcrumbs. This will not cause any breaking changes, however, it's recommended you move to useGetBreadcrumbs as it lazily computes the breadcrumb array payload and makes it less likely that developers (incorrectly) rely on the breadcrumb array as a dependency for useEffect (the reference was never guarenteed to be stable).
- [`73a1f120c1c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73a1f120c1c) - Breadcrumbs can now accept an arbitrary prop fields and they will always appear in the breadcrumb payloads. This change will only cause breaking changes if you rely on certain types in the breadcrumb API

### Patch Changes

- Updated dependencies

## 4.0.4

### Patch Changes

- Updated dependencies

## 4.0.3

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 4.0.2

### Patch Changes

- Updated dependencies

## 4.0.1

### Patch Changes

- [`0dd6b097ced`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd6b097ced) - Fixed unreleased dependency being dependended upon
- Updated dependencies

## 4.0.0

### Major Changes

- [`1cb9a8297f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1cb9a8297f4) - Upgraded exported dependencies

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`42893a386b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42893a386b) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 2.2.1

### Patch Changes

- Updated dependencies

## 2.2.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`0053d50a07`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0053d50a07) - Added TTI and TTC metrics to payment-flow and CC packages

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [`0c94e81c3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c94e81c3f) - Initial release of the aggregated telemetry event API
