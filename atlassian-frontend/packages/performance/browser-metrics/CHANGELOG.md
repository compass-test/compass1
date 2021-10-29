# @atlassian/browser-metrics

## 3.5.7

### Patch Changes

- [`f4f4343bad4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4f4343bad4) - Added API to make page visible value derived from state

## 3.5.6

### Patch Changes

- [`308dc5665d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/308dc5665d4) - Make resource timings (fetchStart and workerStart) relative to event start

## 3.5.5

### Patch Changes

- [`6bc5f81e642`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bc5f81e642) - Improve `CustomValues` type to support objects with simple values

## 3.5.4

### Patch Changes

- [`2fbd1d38b96`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fbd1d38b96) - Changed the way how page load metric is exported.

## 3.5.3

### Patch Changes

- [`ba2a2b00309`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba2a2b00309) - Bumped web-vitals package to 2.1.0

## 3.5.2

### Patch Changes

- [`3cc36f30d3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3cc36f30d3d) - - Any stop time or marks on a page-segment-load metric will be cleared when startFromPageLoad is called

## 3.5.1

### Patch Changes

- [`b2b5b2d04d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2b5b2d04d4) - Add missing type exports to the "@atlassian/browser-metrics/types" entry point

## 3.5.0

### Minor Changes

- [`6f202abea0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f202abea0e) - Added support for an array of multiple metrics with the page load until configuration

## 3.4.5

### Patch Changes

- [`414b6216adf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/414b6216adf) - Upgrade date-fns to ^2.17

## 3.4.4

### Patch Changes

- [`61d1b95fa1d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61d1b95fa1d) - Add workerStart and fetchStart to resource timing, and add workerStart to navigation timing

## 3.4.3

### Patch Changes

- [`868a5ee1140`](https://bitbucket.org/atlassian/atlassian-frontend/commits/868a5ee1140) - Removed unused peer dep

## 3.4.2

### Patch Changes

- [`368f5fc37ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/368f5fc37ed) - Add support for XHR requests

## 3.4.1

### Patch Changes

- [`4dfef33eb9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4dfef33eb9c) - Added experimental API to enable automatic check for timing headers

## 3.4.0

### Minor Changes

- [`b71844228f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b71844228f6) - Fix web vitals race condition

## 3.3.0

### Minor Changes

- [`ccffdd11a29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ccffdd11a29) - Give option to use visibleState to define isActiveTab

## 3.2.3

### Patch Changes

- [`a516c567328`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a516c567328) - Bugfix for negative FMP in spa transitions when SSR output occured

## 3.2.2

### Patch Changes

- [`1839571aa99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1839571aa99) - Hide internal method to change page visible state to mixed

## 3.2.1

### Patch Changes

- [`506d7fea0df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/506d7fea0df) - Fix for page segment page load metric to be properly calculated relative to start

## 3.2.0

### Minor Changes

- [`1651eff033a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1651eff033a) - Round web vitals values

## 3.1.7

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 3.1.6

### Patch Changes

- [`2bcdbad853c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2bcdbad853c) - Added new event type - page segment load

## 3.1.5

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 3.1.4

### Patch Changes

- [`e7ac8a579bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7ac8a579bd) - enable SSR feature flags for non-FMP experiences

## 3.1.3

### Patch Changes

- [`532940b43a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/532940b43a6) - improve pageVisible:state and pageVisible:value accuracy in webVital event

## 3.1.2

### Patch Changes

- [`1c5856158b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c5856158b9) - Move web-vitals metric to BM init

## 3.1.1

### Patch Changes

- [`9f59ee71572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f59ee71572) - Added support for new web-vitals metric

## 3.1.0

### Minor Changes

- [`f641eba2f39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f641eba2f39) - Add pageVisible:state attribute in BM event payload

## 3.0.31

### Patch Changes

- [`1a18b68f8b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a18b68f8b) - Added support for dedicated field for feature flags in SSR

## 3.0.30

### Patch Changes

- [`304be9ed2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/304be9ed2c) - Added size to all assets loaded from the network

## 3.0.29

### Patch Changes

- [`8f8d065383`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f8d065383) - Updated types for factory methods

## 3.0.28

### Patch Changes

- [`02de76393d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02de76393d) - Added support for SFX events for custom events

## 3.0.27

### Patch Changes

- [`cbeb9ae470`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cbeb9ae470) - Added support for local histogram definitions

## 3.0.26

### Patch Changes

- [`c5737a486a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5737a486a) - Added support for local feature flags definition

## 3.0.25

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 3.0.24

### Patch Changes

- [`1df9a93f50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1df9a93f50) - Added region to the payload

## 3.0.23

### Patch Changes

- [`fee301414d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fee301414d) - Updated Gasv3 operational event payload

## 3.0.22

### Patch Changes

- [`4253db5302`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4253db5302) - Added non-optional field region and removed field team

## 3.0.21

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 3.0.20

### Patch Changes

- [`e5d2191650`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5d2191650) - Changed raf to settimeout, rounded timing values for experimental API

## 3.0.19

### Patch Changes

- [`cb4e2bea64`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb4e2bea64) - Added page attribute to METAL client for interactions

## 3.0.18

### Patch Changes

- [`371aba277d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/371aba277d) - Added experimental API to add external timings

## 3.0.17

### Patch Changes

- [`e67a20b136`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e67a20b136) - Changed METAL metric to name to use id rather than full key, also corrected metal client variable name so it is able to submit events ccorrectly

## 3.0.16

### Patch Changes

- [`f3d6883734`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3d6883734) - Migrate to support histograms only via METAL

## 3.0.15

### Patch Changes

- [`04396333c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04396333c0) - Merged custom and ssr timings into timings:app
- [`3736f91e38`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3736f91e38) - Resource timings plugin: added support for undefined transferSize (Safari)

## 3.0.14

### Patch Changes

- [`012342713e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/012342713e) - Added start, stop and key as arguments to custom plugins

## 3.0.13

### Patch Changes

- [`ef83e26475`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef83e26475) - Omit 'type' from config used in factory metrics

## 3.0.12

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 3.0.11

### Patch Changes

- [`f2c2bd20da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2c2bd20da) - Added possibility to override start time of page load meta metric

## 3.0.10

### Patch Changes

- [`40ebd41f30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/40ebd41f30) - Corrected reported values for pageVisible

## 3.0.9

### Patch Changes

- [`ee36b3a7f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee36b3a7f8) - Added functionality to dynamically add "included" submetrics to meta page load metric
- [`074a93a8bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/074a93a8bb) - Added extra prop to custom metric payload

## 3.0.8

### Patch Changes

- [`b186b13ae1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b186b13ae1) - Trigger bundle eval collector in next event loop to include current bundle task
- [`00eb6a3075`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00eb6a3075) - timings:resources changes: transferType available only for static resources; added ttfb for all non-cached resources

## 3.0.7

### Patch Changes

- [`f304397351`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f304397351) - Added local hour and day of week to the payload

## 3.0.6

### Patch Changes

- [`8381e6b8c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8381e6b8c8) - Corrected offset for nested timings
- [`933f0a3ee7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/933f0a3ee7) - Added support for nullish response from ssr getTimings method

## 3.0.5

### Patch Changes

- [`5a1ce024b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a1ce024b2) - Extended custom timings to support include metric and theirs timings; small changes to config (resource and eval timings added to all kind of events, added encodedBodySize to navigation metrics)

## 3.0.4

### Patch Changes

- [`20657f2f86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20657f2f86) - Updated behaviour of page load with configured until

## 3.0.3

### Patch Changes

- [`d37721b2e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d37721b2e1) - Fixed call to metal client

## 3.0.2

### Patch Changes

- [`0873cd55a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0873cd55a2) - Updated event key generation and type

## 3.0.1

### Patch Changes

- [`3414d2a56a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3414d2a56a) - Fixed problems with GasV3 client API, added unit tests

## 3.0.0

### Patch Changes

- [`e6910bfc2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6910bfc2b) - Initial commit
