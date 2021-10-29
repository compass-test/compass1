# @atlaskit/webdriver-runner

## 0.19.0

### Minor Changes

- [`c2e74fadcb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2e74fadcb2) - MONO-338 Add logic to determine when a webdriver test has failed to load its intended page.

  Given WebDriver tests rely on a page to have loaded before making assertions on the DOM, we consider a failed page load to be an environmental error.

  **Before**:

  Previously, failed page loading was ambigious and _typically_ presented as a standard selector timeout.

  ```shell
  index.ts › OS X Big Sur Safari 14.0 › Should do a thing

      element ("[data-testid='foo']") still not existing after 5000ms

        at node_modules/webdriverio/build/commands/browser/waitUntil.js:34:15
        at Element.wrapCommandFn (node_modules/@wdio/utils/build/shim.js:74:23)
        at Element.elementErrorHandlerCallbackFn (node_modules/webdriverio/build/middlewares.js:21:24)
        at Element.wrapCommandFn (node_modules/@wdio/utils/build/shim.js:74:23)
        at Element.wrapCommandFn (node_modules/@wdio/utils/build/shim.js:74:23)
        at Element.elementErrorHandlerCallbackFn (node_modules/webdriverio/build/middlewares.js:21:24)
        at Element.wrapCommandFn (node_modules/@wdio/utils/build/shim.js:74:23)
  ```

  **After**:

  Now, we have a bespoke error to differentiate between a page load failure, and a legitimate selector timeout which might occur after loading a page.

  ```shell
  index.ts › OS X Big Sur Safari 14.0 › Should do a thing

      Test's page failed to load

        at Page._callee4$ (build/webdriver-runner/lib/wrapper/wd-wrapper.ts:231:13)
        at tryCatch (node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:63:40)
        at Generator.invoke [as _invoke] (node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:293:22)
        at Generator.throw (node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js:118:21)
        at asyncGeneratorStep (node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)
        at _throw (node_modules/@babel/runtime/helpers/asyncToGenerator.js:29:9)
  ```

## 0.18.6

### Patch Changes

- [`dec354b4880`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dec354b4880) - MONO-299 Replaced bespoke test analytics in favour of new common implementation using `processAnalyticsForTestResults` from `@atlaskit/build-reporting`.

  - Extends work done for MONO-62 from `0.18.0`.
  - Adds new `--help` flag to print available flags & command examples
  - Fix BrowserStack reporter to only show url for failed tests if exitCode is 1.

- Updated dependencies

## 0.18.5

### Patch Changes

- [`abf028da8e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abf028da8e4) - Update Chrome and Edge to 94.0.

## 0.18.4

### Patch Changes

- [`62f788163c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62f788163c6) - Convert Pipeline artifact containing BrowserStack session information from Text to JSON file.

  **Before:**

  `N_integration_tests_results.txt`

  ```text
  Browserstack Build Session URL:
  https://automate.browserstack.com/dashboard/v2/builds/abc123
  ```

  **Now:**

  `N_integration_tests_results.json`

  ```json
  {
    "buildId": "abc123",
    "dashboardUrl": {
      "all": "https://automate.browserstack.com/dashboard/v2/builds/abc123",
      "passed": "https://automate.browserstack.com/dashboard/v2/builds/abc123?overallStatus=completed",
      "failed": "https://automate.browserstack.com/dashboard/v2/builds/abc123?overallStatus=error",
      "timedout": "https://automate.browserstack.com/dashboard/v2/builds/abc123?overallStatus=timedout"
    }
  }
  ```

  > The artifact can be accessed within your custom pipelines from the root directory via:

  ```bash
  integration_tests_artifacts/"${BITBUCKET_PARALLEL_STEP:0}"_integration_tests_results.json
  ```

## 0.18.3

### Patch Changes

- [`6e7d7b78f76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e7d7b78f76) - Fix `fileName` to use the proper method and return the actual filename. `fileName` is used in BrowserStack and in our `BrowserTestCase` as the label for the `describe` block.

  Add `BITBUCKET_PIPELINE_UUID` to the branch identifier in BrowserStack in order to differiate each build session making it unique and easier to log and find in the dashboard.

  _Bonus_: Added better logging for BrowserStack build session URL, write the sessions into a file that is available as artifacts in pipelines.

## 0.18.2

### Patch Changes

- [`db069ecac11`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db069ecac11) - Bump Firefox to 92.0 and Edge to 93.0.

## 0.18.1

### Patch Changes

- [`6671e862aa9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6671e862aa9) - Bump browsers configuration:

  - Chrome to 93.0
  - Edge to 92.0
  - Firefox to 91.0

## 0.18.0

### Minor Changes

- [`f055d388f73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f055d388f73) - MONO-62 Improve Analytics

  - Refactored folder structure and filenames
  - Adds new 'blocking' analytics event to track when a test fails twice in a row (resulting in a red blocked Pipeline)
  - Improves type safety for reporting/analytics code
  - Expands test coverage of reporting/analytics
  - Decouples test runner from analytics

## 0.17.5

### Patch Changes

- [`cf0711e2f2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf0711e2f2f) - Add function to webdriver-runner to perform clicks with modifiers.

## 0.17.4

### Patch Changes

- [`b67d3eb36d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b67d3eb36d0) - As part of AFP-3062, we needed to upgrade browserStack local to fix few issues.

## 0.17.3

### Patch Changes

- [`61904433178`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61904433178) - Upgrade Edge from 90 to 81

## 0.17.2

### Patch Changes

- [`90d9f8e40a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90d9f8e40a0) - Upgrade Firefox from 88 to 89

## 0.17.1

### Patch Changes

- [`694cbaa1fbe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/694cbaa1fbe) - Adds the `>` character within the Android keymap for mobile integration tests.

## 0.17.0

### Minor Changes

- [`8be695ffcea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8be695ffcea) - MONO-58 Add new flags.

  - Add `gracefulExit` flag to allow exiting with code 0 regardless of whether any tests failed.
  - Add `retry` flag which defaults to 1.
    - We rerun failed tests by default still, but you can now opt out by setting it to `--retry=0`.

## 0.16.1

### Patch Changes

- [`5357495e6e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5357495e6e6) - AFP-2979 Upgrade Automation Browsers

  - Upgrade `chromedriver` from `89` to `90`.
  - Upgrade BrowserStack clients:
    - Upgrade Chrome and Edge from `89` to `90`
    - Upgrade Firefox from `86` to `88`

## 0.16.0

### Minor Changes

- [`ca71cb21462`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca71cb21462) - MONO-82 Add wildcard `*` support for skipping a test.

  **Example Usage:**

  ```
  // Won't run on any browsers
  BrowserTestCase('label', { skip: ['*']}, () => {})

  // Won't run on any devices
  MobileTestCase('label', { skipPlatform: ['*']}, () => {})
  ```

## 0.15.5

### Patch Changes

- [`9cba07eca46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cba07eca46) - Add a parameter to overwrite the getExampleUrl method in `@atlaskit/webdriver-runner`.

  Replace `environment` by `baseUrl`.

## 0.15.4

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 0.15.3

### Patch Changes

- [`b6e9babd192`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6e9babd192) - Fix `getLocalIdentifier` to correctly treat `BITBUCKET_COMMIT` and `USER` as mutually exclusive values.

## 0.15.2

### Patch Changes

- [`b1141810dff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1141810dff) - Convert WD runner into TS

## 0.15.1

### Patch Changes

- [`39f90fa22b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39f90fa22b2) - NO-ISSUE Unify BrowserStack session identifier logic. Other minor refactoring.

## 0.15.0

### Minor Changes

- [`e421bdc9c6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e421bdc9c6d) - AFP-2714 Add ability to mark BrowserStack test session results as pass/fail

## 0.14.3

### Patch Changes

- [`4e1ae976272`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e1ae976272) - Convert WD runner to TS

## 0.14.2

### Patch Changes

- [`fe4c05f6300`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe4c05f6300) - Bump browsers configuration

  - Chrome and Edge to 89
  - Firefox to 86

## 0.14.1

### Patch Changes

- [`058e1ec668d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/058e1ec668d) - Add media layout mobile VR tests

## 0.14.0

### Minor Changes

- [`cfd20c34074`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfd20c34074) - Add ability to run mobile VR tests

## 0.13.0

### Minor Changes

- [`692bc52a85f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/692bc52a85f) - ED-11835 - Fixes executeAsync() and removes setTimeout() from emoji testcases

## 0.12.1

### Patch Changes

- [`07e02b6c6d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07e02b6c6d8) - Bump Chrome & Edge to 88.
  Bump Firefox to 85.

## 0.12.0

### Minor Changes

- [`fdd3107d5d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fdd3107d5d9) - [ED-11469] Added Mobile Automation tests for Emojis

## 0.11.4

### Patch Changes

- [`196be4eef6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/196be4eef6d) - Bump to 'Big Sur' Safari version 14.0

## 0.11.3

### Patch Changes

- [`701cb509663`](https://bitbucket.org/atlassian/atlassian-frontend/commits/701cb509663) - Bump FF to 84.0

## 0.11.2

### Patch Changes

- [`46cd9b2d3ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46cd9b2d3ec) - AFP-2188 Prevent inaccurate Jest results by removing [test.concurrent](https://jestjs.io/docs/en/api#testconcurrentname-fn-timeout) which is marked as an experimental feature.

## 0.11.1

### Patch Changes

- [`a378bb0315e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a378bb0315e) - NO-ISSUE add bundle time analytics

## 0.11.0

### Minor Changes

- [`2181a4c181`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2181a4c181) - ED-11468 - 1. Introduced new folder structure with POM and fragments. 2. Added tests for validating quick insert related features.

## 0.10.16

### Patch Changes

- [`a6ebae35b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6ebae35b6) - [ED-11021] - Add response body for analytics and format the failure message.

## 0.10.15

### Patch Changes

- [`9de5945f89`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9de5945f89) - Increase the jasmine timeout to 16misn due to media-resize test.

## 0.10.14

### Patch Changes

- [`b8cf033738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8cf033738) - Bumped react-dev-server to fix DoS issue

## 0.10.13

### Patch Changes

- [`ea3dac5130`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea3dac5130) - Bump browsers version to latest + add http://bs-local.com to stable run on Safari"

## 0.10.12

### Patch Changes

- [`c0630ec3f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0630ec3f1) - use different webpack config for mobile integration tests

## 0.10.11

### Patch Changes

- [`cee3e6c2d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cee3e6c2d8) - Turn "browserstack.networkLogs":"true" for Safari.

## 0.10.10

### Patch Changes

- [`a346414f65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a346414f65) - Reduce the timeout from 20 mins to 12 mins.
  Additional fix and logging for events & browserstack reporting.

## 0.10.9

### Patch Changes

- [`8cfd8ee92a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cfd8ee92a) - Move resource script under webdriver package

## 0.10.8

### Patch Changes

- [`8f4d1e5be9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f4d1e5be9) - Update chrome & edge to 86 and firefox to 82

## 0.10.7

### Patch Changes

- [`cc29d33424`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc29d33424) - Send context data useful for rerun detection to test analytics

## 0.10.6

### Patch Changes

- [`162cdabc77`](https://bitbucket.org/atlassian/atlassian-frontend/commits/162cdabc77) - ED-10798 Remove requirement for dev's to upload native app binaries into their own account for mobile integration testing.

## 0.10.5

### Patch Changes

- [`c709b5e800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c709b5e800) - Fixing Denial Of Service (DoS) vulnerability found in node-fetch - bump node fetch 2.6.1.

  - Bump `node-fetch` to 2.6.1 - we were already resolving to 2.6.0
  - Run `yarn-deduplicate --packages node-fetch` in all 4 yarn.lock
  - Bump `cross-fetch` to 3.0.6 that has the latest version of `node-fetch`
  - Run `yarn-deduplicate --packages cross-fetch`
  - Bump `jest-fetch-mock` to 3.0.3 that has the latest version of node-fetch

  Unfortunately due to styled-components bring `fbjs` and an old version of `node-fetch` we had to force the resolutions in lot of places.

## 0.10.4

### Patch Changes

- [`c1d8a86bb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1d8a86bb8) - Rename the project to 'Atlassian Frontend Webdriver Tests'.

## 0.10.3

### Patch Changes

- [`de8c4046a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de8c4046a3) - Adding CUSTOM_BUILD env var to make sure the tests analytics are more accurate and help us differentiate between default and custom builds.

## 0.10.2

### Patch Changes

- [`25e5104129`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25e5104129) - Remove usage of page.keys within page.type, use page.types instead

## 0.10.1

### Patch Changes

- [`523e3ae090`](https://bitbucket.org/atlassian/atlassian-frontend/commits/523e3ae090) - Bump chrome, firefox and edge to latest available in Browserstack.

## 0.10.0

### Minor Changes

- [`397b8f6d4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/397b8f6d4f) - Add nativeClick function to Page to help in situation when page.click() glitches

### Patch Changes

- [`993d81c6c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/993d81c6c2) - Added a method to get tag name for a given selector

## 0.9.11

### Patch Changes

- [`21097c6e3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21097c6e3b) - ED-10488 Expose a way to view Safari Console logs to improve the developer experience when debugging a mobile integration (webview) test.

## 0.9.10

### Patch Changes

- [`4e1676ad83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e1676ad83) - ED-10487 Add support for running mobile integration tests on iOS 14 and Android 11 devices

## 0.9.9

### Patch Changes

- [`aab46458e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aab46458e5) - Improvements to Mobile Integration Testing.

  - ED-10166 Support automatic context switching.
  - ED-10130 Support Multiple MobileTestCases within a single file.

## 0.9.8

### Patch Changes

- [`3bd6365516`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bd6365516) - Adding more meta data to analytics tests sent to redash.

## 0.9.7

### Patch Changes

- [`af8230e32d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af8230e32d) - Trying to avoid [browserstack connected to true] and check the local identifier

## 0.9.6

### Patch Changes

- [`4e0a09b7c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e0a09b7c9) - Fix for local run when localIdentifier is 'undefined'.

## 0.9.5

### Patch Changes

- [`fa04ce3c86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa04ce3c86) - ED-10165 Enhance skip logic for mobile webview testing

  - Refactored TS Types for better consumption both internally (_within this package_) and externally (_imported by another package_).
  - `MobileTestCase` now supports complex device skipping based on platform, version, form factor, and software keyboard type.
  - Adds unit tests for desktop and mobile skip logic.

## 0.9.4

### Patch Changes

- [`d932e0c619`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d932e0c619) - Bump Edge to 83.0 & use Selenium version 4.0.0-alpha-1.

## 0.9.3

### Patch Changes

- [`80bb3c75b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80bb3c75b5) - Bump Chrome to 84.

## 0.9.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.9.1

### Patch Changes

- [`3d9ab2733c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d9ab2733c) - Use the `$BITBUCKET_PARALLEL_STEP` and add `--json` & `--listTests` to enable splitting the custom build-webdriver.

## 0.9.0

### Minor Changes

- [`caabffc54c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/caabffc54c) - Add nativeClick function to Page to help in situation when page.click() glitches

## 0.8.5

### Patch Changes

- [`5339166a68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5339166a68) - ED-10167 Automate software keyboard layout switching for webview integration testing.

## 0.8.4

### Patch Changes

- [`f72420e3c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f72420e3c5) - Revert to ff 74 to avoid invalid session id.

## 0.8.3

### Patch Changes

- [`b190d37a70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b190d37a70) - Revert not using the queue + not sending perfromance metrics when running locally

## 0.8.2

### Patch Changes

- [`3f51a56826`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f51a56826) - Bump Safari on 13.0 to be used on Catalina

## 0.8.1

### Patch Changes

- [`b738f8fee3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b738f8fee3) - ED-9719 Add tooling for global Date mock
- [`efe8d57e28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/efe8d57e28) - Bump FF to 78.

## 0.8.0

### Minor Changes

- [`b67360f16e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b67360f16e) - AFP-2142 - Remove legacy Promise Queue. Rely on alternate queueing logic within Jest and BrowserStack

## 0.7.2

### Patch Changes

- [`2afb9457c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2afb9457c3) - Re-enable edge in the repository.

## 0.7.1

### Patch Changes

- [`8583667917`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8583667917) - fix: disable beta browsers if running locally and undefined

## 0.7.0

### Minor Changes

- [`b5a926bdd6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5a926bdd6) - EDM-529: add BrowserStack Chrome Beta Browser capability

## 0.6.4

### Patch Changes

- [`0b6248f72e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b6248f72e) - Remove IE11 as AF packages do not support it anymore.

## 0.6.3

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.6.2

### Patch Changes

- [`05f55e7073`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05f55e7073) - Remove analytics-reporting and move from gasV2 to gasV3

## 0.6.1

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [`ab56d26400`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab56d26400) - [FM-2506] added query param for cusor position plugin

## 0.5.0

### Minor Changes

- [`4beee6ef0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4beee6ef0e) - ED-8396 Support running hybrid web integration tests on handheld devices within BrowserStack's App Automate (device farm).

  > Initial support exists for the `@atlaskit/editor-mobile-bridge` package only.

## 0.4.3

### Patch Changes

- [`b5472bcb8d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5472bcb8d) - Add emptyTextFieldByBackspacing method to wd-wrapper

## 0.4.2

### Patch Changes

- [`226041ba44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/226041ba44) - Bump ChromeDriver to v83

## 0.4.1

### Patch Changes

- [`c9a0c02e7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9a0c02e7c) - Bump ChromeDriver to v81. Decouple HEADLESS and WATCH mode for integration tests. Restore HEADLESS as the default.

## 0.4.0

### Minor Changes

- [`4e3ed0ddb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e3ed0ddb2) - Upgrade from WebDriverIO v5 to v6.

## 0.3.9

### Patch Changes

- [`4ee32a1758`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ee32a1758) - Browserstack local library and bindings improved recently by using v8 engine.

## 0.3.8

### Patch Changes

- [`df7aaeb8b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df7aaeb8b0) - There is an open issue on the official Mozilla GitHub repo for the gecko driver: https://github.com/mozilla/geckodriver/issues/1559. It was causing a number of automation tests to fail with the error 'invalid session id: Tried to run command without establishing a connection'. Reverting to FF 73 appears to fix it temporarily, until the original issue is resolved.

## 0.3.7

### Patch Changes

- [`8b532400a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b532400a3) - As the browser integration step is taking more time in CI, let's try to bump the workers.

## 0.3.6

### Patch Changes

- [`5dfef289b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dfef289b5) - Upgrade Jest 25 and its related packages from 25.1 to 25.5 range

## 0.3.5

### Patch Changes

- [`0422cf59e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0422cf59e4) - Forcing using --maxWorker=50% in CI.

## 0.3.4

### Patch Changes

- [patch][fd41d77c29](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd41d77c29):

  Bump Firefox to 74.

## 0.3.3

### Patch Changes

- [patch][66d3dc966b](https://bitbucket.org/atlassian/atlassian-frontend/commits/66d3dc966b):

  There is an open issue on the official Mozilla GitHub repo for the gecko driver: https://github.com/mozilla/geckodriver/issues/1559. It was causing a number of automation tests to fail with the error 'invalid session id: Tried to run command without establishing a connection'. Reverting to FF 73 appears to fix it temporarily, until the original issue is resolved.

## 0.3.2

### Patch Changes

- [patch][adf1b1b17e](https://bitbucket.org/atlassian/atlassian-frontend/commits/adf1b1b17e):

  Remove usage of bolt-query.

## 0.3.1

### Patch Changes

- [patch][c2a8e62450](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2a8e62450):

  Update typings to support void done function as part of executeAsync

## 0.3.0

### Minor Changes

- [minor][c57bb32f6d](https://bitbucket.org/atlassian/atlassian-frontend/commits/c57bb32f6d):

  Page object now have waitForInvisible method

### Patch Changes

- [patch][64fb94fb1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/64fb94fb1e):

  Bumping Chrome and Chromedriver to 80.- [patch][109c1a2c0a](https://bitbucket.org/atlassian/atlassian-frontend/commits/109c1a2c0a):

  Bump FF to 73.0- Updated dependencies [5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  - @atlaskit/webpack-config@2.1.1

## 0.2.0

### Minor Changes

- [minor][e3f01787dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3f01787dd):

  NO-ISSUE feat: allow users to specify a HOST

### Patch Changes

- Updated dependencies [e3f01787dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3f01787dd):
  - @atlaskit/webpack-config@2.1.0

## 0.1.8

### Patch Changes

- [patch][82fd6c3a01](https://bitbucket.org/atlassian/atlassian-frontend/commits/82fd6c3a01):

  Adding forcelocal: true to help with Browserstack server connection to localhost.

## 0.1.7

### Patch Changes

- [patch][43e4439bbb](https://bitbucket.org/atlassian/atlassian-frontend/commits/43e4439bbb):

  Convert getExampleUrl in TS

## 0.1.6

### Patch Changes

- [patch][9996f1293a](https://bitbucket.org/atlassian/atlassian-frontend/commits/9996f1293a):

  BUILDTOOLS-369 Upgrade from Jest 24 to 25

## 0.1.5

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 0.1.4

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.1.3

### Patch Changes

- [patch][2c3153bb56](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c3153bb56):

  BUILDTOOLS-108 Fail Webdriver & Puppeteer test runs on CI either when tests fail or a snapshot is added

  This will prevent people forgetting to add snapshots

  This will also no longer fail the build on obsolete snapshots for the Webdriver tests. This was a problem because the Landkid build only runs tests on Chrome and we should allow tests that skip Chrome (eg. a Mac-specific test will only run on Safari)

## 0.1.2

### Patch Changes

- [patch][0202c1d464](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0202c1d464):

  [ED-7076] Improve table performance reducing the number of React elements on ColumnControl, moving out InsertButton component.

## 0.1.1

- [patch][2d6d5b6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d6d5b6):

  - ED-5379: rework selecting media under the hood; maintain size and layout when copy-pasting

## 0.1.0

- [minor] Add debug command [9c66d4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c66d4d)

## 0.0.3

- [patch] Remove linkCreateContext from default options and add userAuthProvider [fc2ca7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc2ca7a)

## 0.0.2
