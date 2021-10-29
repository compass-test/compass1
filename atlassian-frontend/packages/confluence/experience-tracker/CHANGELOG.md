# @atlassian/experience-tracker

## 2.1.1

### Patch Changes

- [`7b05c793e9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b05c793e9d) - Update a team name and slack channel for the team

## 2.1.0

### Minor Changes

- [`a5225e92ed8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a5225e92ed8) - ExperienceFailure component now accepts an "attributes" prop which is passed to the experienceTracking fail call

## 2.0.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.3

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.1

### Patch Changes

- [`1df80538cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1df80538cf) - Fix abort order to abort all experiences with timeouts first.

  Prior to this fix, compound experiences were being aborted before their sub-experiences. As a result, compound experiences which should have failed due to one of their sub-experiences timing out were incorrectly aborted.

  With this fix, there will be an increase in failures for compound experiences that were being mis-reported as aborts instead of failures due to timeout. The new failure rate is more accurate, and it is a better indicator of the user experiences.

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 1.0.2

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 1.0.1

### Patch Changes

- [patch][ce3b5427e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce3b5427e5):

  Fix inability to restart a stopped experience with the same id

## 1.0.0

### Major Changes

- [major][5843189898](https://bitbucket.org/atlassian/atlassian-frontend/commits/5843189898):

  Initial release of @atlassian/experience-tracker package
