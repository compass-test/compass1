# @atlassian/commerce-events-telemetry-transformers-sentry-browser-react

## 6.0.0

### Major Changes

- [`896d9fcb836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/896d9fcb836) - SentryBrowserIntegration should now be compatible with substantially more versions of Sentry. Although this likely won't actually cause any major breaking changes for @atlassian/commerce-ui and other consumer packages, it does change the type contracts for SentryBrowserIntegration which might cause a breaking change if you're relying on the current API contract.

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`660572d5291`](https://bitbucket.org/atlassian/atlassian-frontend/commits/660572d5291) - All values in a Breadcrumb are now added to Sentry log context

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 5.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 5.0.0

### Major Changes

- [`a43a2429fc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a43a2429fc4) - Breadcrumb name selection array is no longer required by transformer utilities (Breadcrumbs must be filtered before transformations)

## 4.0.1

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [`b1f2946e327`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1f2946e327) - Transformer helpers now only accept a Listener rather than entire channels

## 3.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

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

- [`68919efeb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68919efeb9) - Fixed @atlassian/commerce-credit-card-base not sending all metal & gasv3 track events

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 1.0.5

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.0.4

### Patch Changes

- [`23b022e118`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23b022e118) - Decoupled event API connectors from bridges

## 1.0.3

### Patch Changes

- [`2769fd2e79`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2769fd2e79) - Renamed connector->to and eventAPI->from in the bridge APIs

## 1.0.2

### Patch Changes

- [`0cb0d50267`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cb0d50267) - Renamed createTransparentListener->withRedispatch and createFilteredListener->withFilter

## 1.0.1

### Patch Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events
- Updated dependencies
