# @af/skip-inconsistent-tests

## 0.7.0

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

### Patch Changes

- Updated dependencies

## 0.6.1

### Patch Changes

- [`95b92b60385`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95b92b60385) - Fix automatic PR approval flow. Improve logging for pull request auto-approval attempts in CI

## 0.6.0

### Minor Changes

- [`62f788163c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62f788163c6) - MONO-316 Enhance DX by adding BrowserStack session details into generated Jira tickets

  To aid developers validating and troubleshooting their skipped integration tests, we now include a link to their failed test session on BrowserStack within the generated Jira tickets.

  As an added bonus, we also now include the session recording as an attachment in the Jira tickets.
  This complements the image diff snapshots that visual regression tests already receive.

  Additionally, fixed a bug where custom pipeline runs would trim user provided package paths to only the first package. It now retains all space separate packages the developer provides when running a custom skip-inconsistent-tests pipeline.

## 0.5.6

### Patch Changes

- [`f71f9a48a44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f71f9a48a44) - MONO-317 Enable automatic merging of skipped tests pull requests

  This will streamline the developer experience. It removes the ambiguity of who was responsible for reviewing, approving, and merging a team's skipped test(s) PR.

  > There will still be edge cases where opened PRs fail to auto-merge due to red builds (e.g. if additional flaky tests fail)

  _The entire team will still be assigned to the pull request for notification purposes._

- Updated dependencies

## 0.5.5

### Patch Changes

- [`e08a1bd2ede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e08a1bd2ede) - MONO-318 Add exemption for external network request error

## 0.5.4

### Patch Changes

- [`5dafcff7837`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dafcff7837) - MONO-329 Prevent throwing error when webdriver codemod encounters an external options object

## 0.5.3

### Patch Changes

- [`ba4e0143354`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba4e0143354) - MONO-320 Close empty pull requests.

  If a codemod fails to skip a test, then we have a `Test` instance however there's no diff to commit.
  If all of the `Test` instances failed to skip, then we're left with an empty pull request (which is opened tentatively/early) without any files to populate it with. In this situation, we close it since there's nothing tangible to merge.

- Updated dependencies

## 0.5.2

### Patch Changes

- [`7202ebcc47a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7202ebcc47a) - MONO-321 Add ancestor labels into test case table cell in generated Jira tickets

  This prevents ambiguity for tests which use a common test case label and rely on ancestor describes to differentiate themselves.

  _For example:_

  ```xml
  <testcase classname="sticky toolbar › disabled" name="with scroll" />
  <testcase classname="sticky toolbar › enabled" name="with scroll">
  	<failure />
  </testcase>
  ```

  - _Previously the generated Jira ticket would have used `with scroll` making it ambiguous which one actually failed until you review the skipped code._
  - _Now, it will use `sticky toolbar › enabled › with scroll` to improve the accuracy for the ticket assignee to aid their troubleshooting._

## 0.5.1

### Patch Changes

- [`c4053bc87f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c4053bc87f6) - Avoid empty commits in git history.

  We open a pull request early in order to have the PR url available to pass into the codemods (which gets used in a line comment above a skipped test case). In order to open a pull request we need at least one commit, and since we haven't run the codemods yet we don't have any diff, so we push up an empty commit to appease Bitbucket's pull request requirements.

  These empty commits aren't desirable long term, so we now ammend the empty commit with the skipped tests, instead of making a new commit on top of the empty one. This cleans the git history, but has no tangible change to the project.

## 0.5.0

### Minor Changes

- [`b82deb021e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b82deb021e6) - MONO-310 Add failed VR test image diff png as attachment to generated Jira tickets

### Patch Changes

- Updated dependencies

## 0.4.2

### Patch Changes

- [`22287147845`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22287147845) - MONO-142 Add PR link into generated Jira tickets.

  This required a significant refactoring of the process to open an empty pull request up front,
  ahead of running codemods and pushing skipped tests into the PR branch.

## 0.4.1

### Patch Changes

- [`9aa42f72c74`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9aa42f72c74) - MONO-212 Prevent Prettier config violations by retaining trailing commas on Webdriver codemod skipped tests

  Update `skip-webdriver-test-transfomer.ts` and `skip-mobiledriver-test-transformer.ts` to retain trailing commas.

  _Before:_

  ```
  // Input:
  {
    skip: ['chrome'],
  }
  // Output:
  {
    // skip: ['chrome'],
    skip: ['*']
  }
  ```

  _Now:_

  ```
  // Input:
  {
    skip: ['chrome'],
  }
  // Output:
  {
    // skip: ['chrome'],
    skip: ['*'],
  }
  ```

  Enhance `skip-webdriver-test-transfomer.ts` to support additional properties within `BrowserTestCaseOptions`.

  > `BrowserTestCaseOptions` currently contains a single property `skip`, but if it's ever extended with additional properties in the future, this codemod would have previously started to fail. That's no longer an issue.

  _Before:_

  ```
  // Input:
  {
    foo: true
    skip: ['chrome'],
    bar: 'hello world',
  }
  // Output:
  {
    // skip: ['chrome'],
    skip: ['*'] // No trailing comma
  }
  ```

  _Now:_

  ```
  // Input:
  {
    foo: true
    skip: ['chrome'],
    bar: 'hello world',
  }
  // Output:
  {
    foo: true
    // skip: ['chrome'],
    skip: ['*'], // Retains trailing comma
    bar: 'hello world',
  }
  ```

## 0.4.0

### Minor Changes

- [`024b07c3763`](https://bitbucket.org/atlassian/atlassian-frontend/commits/024b07c3763) - - MONO-249 Add error stack trace into Jira ticket description.
  - Add README.md details.
  - Add new temporary CI env variables: `SKIP_TESTS_SET_DUE_DATE` and `SKIP_TESTS_SET_ASSIGNEE` which when enabled set those attributes on the generated Jira tickets.

## 0.3.1

### Patch Changes

- [`bea15d10a51`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bea15d10a51) - MONO-144 Support running a subset of packages through the skip-inconsistent-tests pipeline

## 0.3.0

### Minor Changes

- [`287b283347e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/287b283347e) - MONO-127 Expose skip test codemod for external use such as product test skipping

## 0.2.8

### Patch Changes

- [`4a67fb592c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a67fb592c8) - Bump jscodeshift to 0.13.0.
  [Commit Changelog](https://github.com/facebook/jscodeshift/commit/2fd5e11f469427d474983b2d1c47be9408677591).

  ### Added

  - Added a `--fail-on-error` flag to return a `1` error code when errors were found (#416, @marcodejongh)
  - Created `template.asyncExpression` (#405, @jedwards1211)

  ### Changed

  - Removed lodash dependency from tsx parser (#432, @JHilker and @robyoder)

## 0.2.7

### Patch Changes

- [`92c73cbbe7b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92c73cbbe7b) - MONO-139 Expose pipeline results URL inside PR description and Jira ticket description to aid developers troubleshooting a skipped test.

## 0.2.6

### Patch Changes

- [`c9222ac96e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9222ac96e1) - Restrict Jira ticket creation to only the [product-fabric](http://product-fabric.atlassian.net/jira) instance as we lack auth tokens for other instances at this point in time.

  > An [Auth Service](https://hello.atlassian.net/wiki/spaces/AFP/pages/900561409/RFC+Coordination+of+work+across+package+owners#Proposal%3A-Move-follow-up-actions-to-Jira) is proposed as a possible solution to counteract this limitation in the future.

## 0.2.5

### Patch Changes

- [`cc13116a767`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc13116a767) - MONO-68 Add FAQ link into PR description and Jira ticket description. Also adds a placeholder Pipelines link into them too. This is indicative only until MONO-139 is actioned.

## 0.2.4

### Patch Changes

- [`f477c8f3586`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f477c8f3586) - MONO-72 Assign an entire team as reviewers on generated skipped tests PRs

## 0.2.3

### Patch Changes

- [`9b4cb60558f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b4cb60558f) - - MONO-135 Add "af-skipped-inconsistent-test" label to created Jira tickets.
  - MONO-134 Temporarily remove default assignee from Jira ticket ahead of soft launch to avoid spamming team leads during pipeline test runs.

## 0.2.2

### Patch Changes

- [`14e3ce7d3e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14e3ce7d3e7) - MONO-77 Support ancestorLabels in codemods. Refine test case matching to differentiate common nested test case labels relative to differing ancestor describes.

## 0.2.1

### Patch Changes

- [`2ec9e608acc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ec9e608acc) - MONO-112 Standardise comment on skipped tests
- Updated dependencies

## 0.2.0

### Minor Changes

- [`b5dd2a8ae99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5dd2a8ae99) - MONO-70 Adds ability to create a Jira ticket

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`8be695ffcea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8be695ffcea) - MONO-58 Adds the ability to run tests and skip failiures.

  - Add build pipeline for skipping inconsistent tests.
    - Rerunning is disabled so failed tests don't get a second chance.
  - The results are parsed and failed tests are passed into codemods to be skipped from future runs.
  - A pull request is created housing the skipped tests.

## 0.0.2

### Patch Changes

- [`8f1da873a1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f1da873a1a) - MONO-69 Add ability to map a test file path to the Jira project url for the team who owns it

## 0.0.1

### Patch Changes

- [`284a374eed8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/284a374eed8) - Initial release. Contains codemods to skip VR and Integration tests from a Junit report file.
- Updated dependencies
