# @af/test-pipeline

## 2.0.1

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`dec354b4880`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dec354b4880) - Refactor the return type of `runJestCli` to support an array of jest results rather than a single result. This is useful for test runners which support reruns (either repetitions or retries).

  **Before:**

  ```
  export type TestStatus = {
  	code?: number;               // Optional exit code
  	results?: AggregatedResult   // Optional single test run result
  };
  ```

  **Now:**

  ```
  type TestSuiteResult = {
    aggregatedResult: AggregatedResult;
  };

  export type TestStatus = {
    exitCode: number;              // Required exit code
    results: TestSuiteResult[];    // Required results array (can be empty)
  };
  ```

### Patch Changes

- Updated dependencies

## 1.0.10

### Patch Changes

- [`50ddba473db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50ddba473db) - Fix -u updateSnapshot short flag not working as intended

## 1.0.9

### Patch Changes

- [`2c8d07cd3ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c8d07cd3ba) - ## Bugfix

  The command `yarn test:vr:debug` regressed.

  - When running VR tests with the `--debug` flag, chrome starts up `testing.local.com` rather than `localhost`.
  - When running the command, it runs all tests.

  The first issue was caused by a stale reference to the `DEBUG` variable in jest config after it was renamed to `VR_DEBUG`.

  The second issue was caused by the ordering of the arguments in the command.

## 1.0.8

### Patch Changes

- [`85722e6beff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85722e6beff) - Prevent exception when no integration tests are run (e.g. when provided package paths don't contain any)

## 1.0.7

### Patch Changes

- [`f055d388f73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f055d388f73) - Adapting to path adjustments from a dependency change from webdriver-runner.
- Updated dependencies

## 1.0.6

### Patch Changes

- [`8f3096544bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f3096544bf) - Adds tests for parallel.config.ts to ensure bucket sizes are valid

## 1.0.5

### Patch Changes

- [`705b8cadcf1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/705b8cadcf1) - Fixing test-pipeline config to prevent a bucket being undefined for certain ranges of test cases

## 1.0.4

### Patch Changes

- [`524e49a00e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524e49a00e9) - Fixes bug in run-unit causing tests to be run when trying to store cache

## 1.0.3

### Patch Changes

- [`bf56be350a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf56be350a1) - AFP-1822 add missing path depths

## 1.0.2

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- Updated dependencies
