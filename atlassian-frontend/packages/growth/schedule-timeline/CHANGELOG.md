# Change Log

## 2.1.1

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`f406f0f4a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f406f0f4a4) - Adds locale prop, to allow for translated dates on timeline.

## 2.0.6

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.0.4

### Patch Changes

- Updated dependencies

## 2.0.3

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.1

### Patch Changes

- [`0e7a29dd37`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e7a29dd37) - Ensure dates don't wrap in day columns within On-call schedule component

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 1.0.4

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 1.0.3

### Patch Changes

- [`f45220a627`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f45220a627) - render 'No-one' in tooltip when showing On-call periods for '--'

## 1.0.2

### Patch Changes

- [`a0dcd2ef33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0dcd2ef33) - Cleanup tsconfig build & team ownership

## 1.0.1

### Patch Changes

- [`f16adf4c2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f16adf4c2c) - Style fix for on-call schedule component

## 1.0.0

### Major Changes

- [`63f454494d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63f454494d) - Migrate schedule-timeline package to Atlassian Frontend monorepo

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.1.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.1.0...@atlassiansox/schedule-timeline@0.1.1) (2020-02-13)

### Bug Fixes

- remove unnecessary nested eslintrc config files ([bd84cce](https://bitbucket.org/atlassian/growth-kit/commits/bd84cce))

# [0.1.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.7...@atlassiansox/schedule-timeline@0.1.0) (2020-01-07)

### Bug Fixes

- use pre-existing version of @atlaskit/tooltip for schedule-timeline" ([384aa95](https://bitbucket.org/atlassian/growth-kit/commits/384aa95))

### Features

- add tooltip with name to periods ([2332f80](https://bitbucket.org/atlassian/growth-kit/commits/2332f80))

## [0.0.7](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.6...@atlassiansox/schedule-timeline@0.0.7) (2019-12-18)

**Note:** Version bump only for package @atlassiansox/schedule-timeline

## [0.0.6](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.5...@atlassiansox/schedule-timeline@0.0.6) (2019-12-12)

### Bug Fixes

- **schedule-timeline:** add main and type fields to package.json ([7f6fffb](https://bitbucket.org/atlassian/growth-kit/commits/7f6fffb))
- **schedule-timeline:** define module and types path for package ([2ce543c](https://bitbucket.org/atlassian/growth-kit/commits/2ce543c))

## [0.0.5](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.4...@atlassiansox/schedule-timeline@0.0.5) (2019-12-04)

**Note:** Version bump only for package @atlassiansox/schedule-timeline

## [0.0.4](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.3...@atlassiansox/schedule-timeline@0.0.4) (2019-12-02)

**Note:** Version bump only for package @atlassiansox/schedule-timeline

## [0.0.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/schedule-timeline@0.0.2...@atlassiansox/schedule-timeline@0.0.3) (2019-11-29)

**Note:** Version bump only for package @atlassiansox/schedule-timeline

## 0.0.2 (2019-11-28)

**Note:** Version bump only for package @atlassiansox/schedule-timeline

## [1.0.2](https://bitbucket.org/atlassian/growth-kit/compare/@growth-kit/schedule-timeline@1.0.1...@growth-kit/schedule-timeline@1.0.2) (2019-11-28)

**Note:** Version bump only for package @growth-kit/schedule-timeline

## 1.0.1 (2019-11-19)

**Note:** Version bump only for package @growth-kit/schedule-timeline
