# @atlassian/experimental-react-experiment-framework-2

## 0.0.32

### Patch Changes

- [`bf2711678d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf2711678d) - Add optional source attribute to Analytics Event type

## 0.0.31

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.0.30

### Patch Changes

- [`5d2f3b8717`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d2f3b8717) - Add excludeNotEnrolled option for usePluginAutoExposureEvent

## 0.0.29

### Patch Changes

- [`d56b0d385a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d56b0d385a) - Use camel case for ineligibility reasons

## 0.0.28

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.0.27

### Patch Changes

- [`69e84eae35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/69e84eae35) - async analytics delegate: refresh the implementation if the promise changes

## 0.0.26

### Patch Changes

- [`1995cdd982`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1995cdd982) - Fix types in usePluginEnglishOnly

## 0.0.25

### Patch Changes

- [`5014947295`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5014947295) - add analytics delegate accepting a promise to the Analytics Web Client

## 0.0.24

### Patch Changes

- [`4e9c40b304`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e9c40b304) - Async extend: handle edge cases, improve docs

## 0.0.23

### Patch Changes

- [`b6cbe7aebb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6cbe7aebb) - Fix missing entry points

## 0.0.22

### Patch Changes

- [`f3951a1400`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3951a1400) - Support up to 20 plugins in useExperiment pipeline

## 0.0.21

### Patch Changes

- [`8216e3c656`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8216e3c656) - Add documentation

## 0.0.20

### Patch Changes

- [`4bc5cb4d37`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4bc5cb4d37) - Update entry points

## 0.0.19

### Patch Changes

- [`cadc3bb579`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cadc3bb579) - Fix: export the analytics delegate

## 0.0.18

### Patch Changes

- [`28293c81cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28293c81cf) - Update exports to include missing types

## 0.0.17

### Patch Changes

- [`f0662fcfe3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0662fcfe3) - Add tests for portable plugins
- [`8a771b6b9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a771b6b9c) - provide analytics delegate, change API to be close to the analytics client

## 0.0.16

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.0.15

### Patch Changes

- [`7c7946378d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c7946378d) - fix: pipeline.error was sometimes missing

## 0.0.14

### Patch Changes

- [`c01e55cf3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c01e55cf3a) - Update exports to include missing plugins and helpers

## 0.0.13

### Patch Changes

- [`0501b62b0b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0501b62b0b) - example UI improvements and small fixes

## 0.0.12

### Patch Changes

- [`94cfd30087`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94cfd30087) - add error handling

## 0.0.11

### Patch Changes

- [`12355e0f2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12355e0f2a) - Improve resolver, add async extend plugins

## 0.0.10

### Patch Changes

- [`eda37237e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eda37237e9) - Add language plugin to experiment based on product language

## 0.0.9

### Patch Changes

- [`22d7d9ceec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22d7d9ceec) - Switch to thunk-style plugin definitions

## 0.0.8

### Patch Changes

- [`43aa13b1d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43aa13b1d7) - Update analytics plugins to support different event types

## 0.0.7

### Patch Changes

- [`58a12f4379`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58a12f4379) - Allow to read the final state of the pipeline via pipeline end listeners

## 0.0.6

### Patch Changes

- [`8b15fe4c2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b15fe4c2b) - Rename feature flag into multivariateFeatureFlag

## 0.0.5

### Patch Changes

- [`d1418759b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1418759b8) - Adding support for boolean feature flag as well as added option to set default value for users who are not enrolled
  Add helpers isEnrolled to detect whether pipeline is enrolled or not
  Add UnmetEnrollmentRequirements to mark pipeline if user don't meet the enrollment requirements (which means the experiment should be ignored all together)
  AutoFireExposure plugin listen to unmentEnrollmentRequirements, if the enrollment requirements are not met, it will not fire any event

## 0.0.4

### Patch Changes

- [`39baf5475e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39baf5475e) - Export more hooks from experiment framework

## 0.0.3

### Patch Changes

- [`71974be6d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/71974be6d0) - Added new plugin usePluginRenderer

## 0.0.2

### Patch Changes

- [`9ac9b4f9fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ac9b4f9fb) - Moved mock-product outside src folder

## 0.0.1

### Patch Changes

- [`9a611d6b0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a611d6b0e) - Initial implementation of react experiment framework 2 - work in progress, not ready to be consumed
