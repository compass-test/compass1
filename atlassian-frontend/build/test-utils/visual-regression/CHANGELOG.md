# @atlaskit/visual-regression

## 0.7.7

### Patch Changes

- [`a75bcf87a5f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a75bcf87a5f) - MONO-299 Replaced bespoke test analytics in favour of new common implementation using `processAnalyticsForTestResults` from `@atlaskit/build-reporting`.

  - Refactored folder structure and filenames
  - Decouples test runner from analytics
  - Adds new 'blocking' analytics event to track when a test fails twice in a row (resulting in a red blocked Pipeline)

- Updated dependencies

## 0.7.6

### Patch Changes

- Updated dependencies

## 0.7.5

### Patch Changes

- [`f055d388f73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f055d388f73) - Adapting to path adjustments from a dependency change from webdriver-runner.

## 0.7.4

### Patch Changes

- [`9a6156d2244`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a6156d2244) - Updates VR image to use puppeteer@v10.1.

## 0.7.3

### Patch Changes

- [`199422d2e2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/199422d2e2f) - Adds `mode` argument to `getExampleUrl` helper util to get a themed example URL.

## 0.7.2

### Patch Changes

- Updated dependencies

## 0.7.1

### Patch Changes

- [`805542eb2c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/805542eb2c1) - bump jest-image-snapshot

## 0.7.0

### Minor Changes

- [`2ec10a91776`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ec10a91776) - Fix CustomSnapshotIdentifier typing

## 0.6.0

### Minor Changes

- [`8be695ffcea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8be695ffcea) - MONO-58 Add `gracefulExit` flag to allow exiting with code 0 regardless of whether any tests failed.

## 0.5.1

### Patch Changes

- [`9cba07eca46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cba07eca46) - Add a parameter to overwrite the getExampleUrl method in `@atlaskit/webdriver-runner`.

  Replace `environment` by `baseUrl`.

## 0.5.0

### Minor Changes

- [`4ac455557b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ac455557b1) - convert to TS

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`cfd20c34074`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfd20c34074) - Add ability to run mobile VR tests

## 0.3.2

### Patch Changes

- [`a378bb0315e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a378bb0315e) - NO-ISSUE add bundle time analytics

## 0.3.1

### Patch Changes

- [`e797f23ec3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e797f23ec3) - ED-10441: ensure code-block is WYSIWYG

## 0.3.0

### Minor Changes

- [`050ad35d6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/050ad35d6a) - Add evaluateTeardownMockDate utility to be able to disable date mock taht is enabled by default.

## 0.2.18

### Patch Changes

- [`a6ebae35b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6ebae35b6) - [ED-11021] - Add response body for analytics and format the failure message.

## 0.2.17

### Patch Changes

- [`cc29d33424`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc29d33424) - Send context data useful for rerun detection to test analytics

## 0.2.16

### Patch Changes

- [`5b94747735`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b94747735) - Fix for VR re-running locally.

## 0.2.15

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.2.14

### Patch Changes

- [`de8c4046a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de8c4046a3) - Adding CUSTOM_BUILD env var to make sure the tests analytics are more accurate and help us differentiate between default and custom builds.

## 0.2.13

### Patch Changes

- [`a49b679724`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a49b679724) - Convert Chrome DevTools utilities from Javascript to Typescript.

  - Move its location to the helper entry point
  - Simplify API of `setNetworkConnection`. This is technically an API breaking change, but it has no consumers so it's safe.
  - `emulateDevice` now has improved error handling for device name mismatches, and it now provides a cleanup method for later disablement.

## 0.2.12

### Patch Changes

- [`3bd6365516`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bd6365516) - Adding more meta data to analytics tests sent to redash.

## 0.2.11

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.2.10

### Patch Changes

- [`7b9623cad7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b9623cad7) - EDM-1019: Default element count to 3s
- [`fcb4754627`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcb4754627) - Expose a couple more puppeteer types for re-export

## 0.2.9

### Patch Changes

- [`7d2ef77a48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d2ef77a48) - Adding a flag for `--json` & `--listTests` to be able to get a list of visual regressions tests.

## 0.2.8

### Patch Changes

- [`b738f8fee3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b738f8fee3) - ED-9719 Add tooling for global Date mock

## 0.2.7

### Patch Changes

- [`85f0bbda1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85f0bbda1a) - Update docker helper methods to facilitate easier vr docker image upgrades.

## 0.2.6

### Patch Changes

- [`857e7c25e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/857e7c25e3) - Add more helpfull message when page can't be loaded

## 0.2.5

### Patch Changes

- [`d6bd82a30b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6bd82a30b) - AFP-2072 Add Puppeteer TS types export

## 0.2.4

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.2.3

### Patch Changes

- [`5a014d0a84`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a014d0a84) - ED-9720 Refactor VR helper methods to avoid anti-pattern usage.

## 0.2.2

### Patch Changes

- [`05f55e7073`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05f55e7073) - Remove analytics-reporting and move from gasV2 to gasV3

## 0.2.1

### Patch Changes

- [`6d8fa4bd8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d8fa4bd8e) - AFP-2069 Add new waitForElementCount VR helper method.

## 0.2.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.1.17

### Patch Changes

- [`d0283845a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0283845a5) - Fix script that deletes the previous VR sox images.

## 0.1.16

### Patch Changes

- [`431faced6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/431faced6a) - AFP-1621 Upgrade Puppeteer from 1.17.0 to 3.0.4 (Chrome 81)

## 0.1.15

### Patch Changes

- Updated dependencies

## 0.1.14

### Patch Changes

- [`5dfef289b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dfef289b5) - Upgrade Jest 25 and its related packages from 25.1 to 25.5 range

## 0.1.13

### Patch Changes

- [`0422cf59e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0422cf59e4) - Forcing using --maxWorker=50% in CI.

## 0.1.12

### Patch Changes

- [patch][adf1b1b17e](https://bitbucket.org/atlassian/atlassian-frontend/commits/adf1b1b17e):

  Remove usage of bolt-query.

## 0.1.11

### Patch Changes

- [patch][fa4b43e378](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa4b43e378):

  AFP-1466 Updated the VR docker image to be SOX compliant. We are now publishing the VR docker container under the sox namespace.

## 0.1.10

### Patch Changes

- Updated dependencies [43ae6a9359](https://bitbucket.org/atlassian/atlassian-frontend/commits/43ae6a9359):
  - @atlaskit/pipelines-docker-image@3.0.0

## 0.1.9

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 0.1.8

### Patch Changes

- [patch][185ea3e8ac](https://bitbucket.org/atlassian/atlassian-frontend/commits/185ea3e8ac):

  Upgrade JSDom from 15.1.1 to 16.2.0. This contains memory leak fixes and newer modern APIs.

## 0.1.7

### Patch Changes

- [patch][9996f1293a](https://bitbucket.org/atlassian/atlassian-frontend/commits/9996f1293a):

  BUILDTOOLS-369 Upgrade from Jest 24 to 25

## 0.1.6

### Patch Changes

- [patch][57ecf803d2](https://bitbucket.org/atlassian/atlassian-frontend/commits/57ecf803d2):

  BUILDTOOLS-369 Upgrade JSDom from 14 to 15.1.1 as a precursor to upgrading from Jest 24 to 25.

## 0.1.5

### Patch Changes

- [patch][203278616a](https://bitbucket.org/atlassian/atlassian-frontend/commits/203278616a):

  Fix the dependencies to "@atlaskit/pipelines-docker-image" after moving out from build.

## 0.1.4

### Patch Changes

- [patch][08f612548d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/08f612548d):

  Export new internal api loadPage

## 0.1.3

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.1.2

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 0.1.1

### Patch Changes

- [patch][2c3153bb56](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c3153bb56):

  BUILDTOOLS-108 Fail Webdriver & Puppeteer test runs on CI either when tests fail or a snapshot is added

  This will prevent people forgetting to add snapshots

  This will also no longer fail the build on obsolete snapshots for the Webdriver tests. This was a problem because the Landkid build only runs tests on Chrome and we should allow tests that skip Chrome (eg. a Mac-specific test will only run on Safari)

## 0.1.0

- [minor][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use this package, please ensure you use at least this version of react and react-dom.

## 0.0.1

initial commit enabling visual-regression
