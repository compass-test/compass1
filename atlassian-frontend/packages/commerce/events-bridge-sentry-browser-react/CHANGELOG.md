# @atlassian/commerce-events-bridge-sentry-browser-react

## 6.0.0

### Major Changes

- [`d9a5a5973bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d9a5a5973bb) - Removed re-exportation of @atlassian/commerce-events-bridge-utils-react and @sentry/browser objects. These are should no longer be required in order to use the Sentry bridge package.
- [`4de27e7911c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4de27e7911c) - Removed deprecated bridge creation utilities in Sentry. Please use SentryBrowserIntegration instead.
- [`896d9fcb836`](https://bitbucket.org/atlassian/atlassian-frontend/commits/896d9fcb836) - SentryBrowserIntegration should now be compatible with substantially more versions of Sentry. Although this likely won't actually cause any major breaking changes for @atlassian/commerce-ui and other consumer packages, it does change the type contracts for SentryBrowserIntegration which might cause a breaking change if you're relying on the current API contract.

## 5.0.1

### Patch Changes

- [`c9f42abf6bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9f42abf6bd) - Pin commerce dependencies
- Updated dependencies

## 5.0.0

### Major Changes

- [`0dd6b097ced`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dd6b097ced) - Fixed unreleased dependency being dependended upon

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [`26d125f3b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26d125f3b8) - Event APIs are now referred to as event channels

### Patch Changes

- Updated dependencies

## 3.2.0

### Minor Changes

- [`e3301b6020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3301b6020) - Event API Listeners now redispatch by default

### Patch Changes

- Updated dependencies

## 3.1.0

### Minor Changes

- [`68919efeb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68919efeb9) - Fixed @atlassian/commerce-credit-card-base not sending all metal & gasv3 track events

## 3.0.0

### Major Changes

- [`093d3edf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/093d3edf00) - Fixed up naming conventions for event APIs

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.1

### Patch Changes

- [`0cb0d50267`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cb0d50267) - Renamed createTransparentListener->withRedispatch and createFilteredListener->withFilter

## 2.0.0

### Major Changes

- [`e89199beb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e89199beb6) - Added support for Sentry and GasV3 track+screen events

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [`aadd08d9bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aadd08d9bb) - Initial event API connector implementations
