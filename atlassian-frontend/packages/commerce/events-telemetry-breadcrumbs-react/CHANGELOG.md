# @atlassian/commerce-events-telemetry-breadcrumbs-react

## 4.0.0

### Major Changes

- [`62fc5ac028c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62fc5ac028c) - Removed useBreadcrumbs in favour of useGetBreadcrumbs. Fixes stability issues with breadcrumb references
- [`73a1f120c1c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73a1f120c1c) - Breadcrumbs can now accept an arbitrary prop fields and they will always appear in the breadcrumb payloads. This change will only cause breaking changes if you rely on certain types in the breadcrumb API

### Minor Changes

- [`2ba809098b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ba809098b2) - Deprecated useBreadcrumbs in favour of useGetBreadcrumbs. This will not cause any breaking changes, however, it's recommended you move to useGetBreadcrumbs as it lazily computes the breadcrumb array payload and makes it less likely that developers (incorrectly) rely on the breadcrumb array as a dependency for useEffect (the reference was never guarenteed to be stable).

### Patch Changes

- [`660572d5291`](https://bitbucket.org/atlassian/atlassian-frontend/commits/660572d5291) - All values in a Breadcrumb are now added to Sentry log context

## 3.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies

## 3.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [`a15b55e7f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a15b55e7f7) - Breadcrumbs now emit events whenever their name changes

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

## 1.0.3

### Patch Changes

- [`e3ca144c7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3ca144c7a) - Payment details flow now sends track event as a real track event (not a UI event)

## 1.0.2

### Patch Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events

## 1.0.1

### Patch Changes

- [`c14a334872`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c14a334872) - Initial breadcrumb implementation
