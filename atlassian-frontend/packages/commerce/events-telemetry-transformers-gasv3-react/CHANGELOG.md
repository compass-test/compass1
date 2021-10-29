# @atlassian/commerce-events-telemetry-transformers-gasv3-react

## 7.0.0

### Major Changes

- [`3b2ebab5bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b2ebab5bba) - Changed types to accomodate Breadcrumb now allowing arbitrary prop values. This likely won't actually cause any breaking changes in your codebase.

### Patch Changes

- [`660572d5291`](https://bitbucket.org/atlassian/atlassian-frontend/commits/660572d5291) - All values in a Breadcrumb are now added to Sentry log context
- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- Updated dependencies

## 6.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 6.0.0

### Major Changes

- [`a43a2429fc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a43a2429fc4) - Breadcrumb name selection array is no longer required by transformer utilities (Breadcrumbs must be filtered before transformations)

## 5.0.1

### Patch Changes

- Updated dependencies

## 5.0.0

### Major Changes

- [`b1f2946e327`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1f2946e327) - Transformer helpers now only accept a Listener rather than entire channels
- [`f83126d3b2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f83126d3b2b) - Removed old GasV3 screen API

### Patch Changes

- Updated dependencies

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

## 2.1.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 1.1.1

### Patch Changes

- [`43ae90d6d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43ae90d6d0) - Atlaskit event repackager now accepts an event API

## 1.1.0

### Minor Changes

- [`333577781e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/333577781e) - The breadcrumb mounted event API now uses the breadcrumed payload shape

### Patch Changes

- Updated dependencies

## 1.0.5

### Patch Changes

- [`23b022e118`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23b022e118) - Decoupled event API connectors from bridges

## 1.0.4

### Patch Changes

- [`fcdec16fb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcdec16fb3) - Separated @atlassiansox/analytics-web-client types into its own package

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
