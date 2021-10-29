# @atlassian/confluence-monitoring-client

## 3.0.4

### Patch Changes

- [`7b05c793e9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b05c793e9d) - Update a team name and slack channel for the team

## 3.0.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 3.0.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 3.0.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 3.0.0

### Major Changes

- [`dae6428dc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae6428dc4) - ### BREAKING CHANGES

  - Changed the name of performance metrics that get submitted. It will now be in the form of `"<ORIGINAL_NAME>.performance"` instead of `"metric.performance:<ORIGINAL_NAME>"`. Please ensure that you make the change in all places depending on this metric name accordingly
  - Make all performance metrics be submitted as "timing". This was previously controllable by a `.useTimingAsPerfMetricType()` method. If you had this method invocation in your code - it is now safe to remove it. If you did not have this, and relied on performance metrics to be submitted as `"gauge"` - this is no longer supported.

  ### Other changes

  Subscribe unload listener to `"pagehide"` event instead of `"unload"`. This will result in better interoperability and will potentially limit page performance degradation.

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 1.0.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 1.0.1

### Patch Changes

- [patch][0162412f46](https://bitbucket.org/atlassian/atlassian-frontend/commits/0162412f46):

  - Add the ability to send perf metrics using "timing" event type.

    This functionality is currently opt-in. Activate it by invoking `.useTimingAsPerfMetricType()` method on `ConfluenceMonitoringClient` instance.

  - Performance values are now explicitly converted to integers

## 1.0.0

### Major Changes

- [major][f57c4bf2f7](https://bitbucket.org/atlassian/atlassian-frontend/commits/f57c4bf2f7):

  Initial release of @atlassian/confluence-monitoring-client
