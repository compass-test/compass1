# @atlassian/commerce-events-telemetry-transformers-metal-react

## 6.0.3

### Patch Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 6.0.2

### Patch Changes

- [`c69987fbf68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c69987fbf68) - Fixed typo in Sentry and Metal integration spelling of "guaranteed" (was originally "guarenteed")

## 6.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 6.0.0

### Major Changes

- [`a43a2429fc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a43a2429fc4) - Breadcrumb name selection array is no longer required by transformer utilities (Breadcrumbs must be filtered before transformations)
- [`e9fa6790b84`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9fa6790b84) - Sentry integration no longer adds a "source" tag

## 5.0.1

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`b1f2946e327`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1f2946e327) - Transformer helpers now only accept a Listener rather than entire channels

## 4.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`001bcc8380`](https://bitbucket.org/atlassian/atlassian-frontend/commits/001bcc8380) - Partial removal of createTransformer

### Patch Changes

- Updated dependencies

## 2.4.0

### Minor Changes

- [`00fb58e753`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00fb58e753) - Added duration metal metrics for CC and payment flow submissions

## 2.3.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 2.2.0

### Minor Changes

- [`9958d04e38`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9958d04e38) - Fixed unreleased methods in @atlassian/commerce-events-telemetry-transformers-metal-react

## 2.1.0

### Minor Changes

- [`68919efeb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68919efeb9) - Fixed @atlassian/commerce-credit-card-base not sending all metal & gasv3 track events

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
