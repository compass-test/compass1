# Change Log

## 0.7.3

### Patch Changes

- [`e5e50e2a1fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5e50e2a1fd) - [ux] Update copy of dragonfruit to Compass

## 0.7.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.7.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.7.0

### Minor Changes

- [`6e8c5eeb31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e8c5eeb31) - Add dragonfruit product icon

## 0.6.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.6.0

### Minor Changes

- [`52eb717ba7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52eb717ba7) - Generating flow types for this package, converting enums into javascript object

## 0.5.1

### Patch Changes

- [`21033c8620`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21033c8620) - Relevant Jira issue: CROSSFLOW-519 add both ATLASSIAN_CLOUD_ID and JIRA_SOFTWARE_PROJECT to the ContainerTypes enum

## 0.5.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

## 0.4.6

### Patch Changes

- [`a8bc0b85dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a8bc0b85dd) - Added npmignore to exclude src and dev only related directories

## 0.4.5

### Patch Changes

- [`8e715fffaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e715fffaa) - Adds available sites plugin type

## 0.4.4

### Patch Changes

- [`60851d0592`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60851d0592) - Bumping to avoid conflict with version from growth-kit

## 0.4.1

### Patch Changes

- [`710fe6aa59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/710fe6aa59) - Migrated to atlassian-frontend repo

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-plugins@0.3.3...@atlassiansox/cross-flow-plugins@0.4.0) (2020-06-12)

### Features

- **cross-flow-plugins:** add getSuggestedSiteNames plugin base object and definitions ([354c776](https://bitbucket.org/atlassian/growth-kit/commits/354c776))

## [0.3.3](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-plugins@0.3.2...@atlassiansox/cross-flow-plugins@0.3.3) (2020-06-02)

### Bug Fixes

- improve type interfaces for plugins in cross-flow-support and cross-flow-react ([e718fc5](https://bitbucket.org/atlassian/growth-kit/commits/e718fc5))

## [0.3.2](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-plugins@0.3.1...@atlassiansox/cross-flow-plugins@0.3.2) (2020-05-29)

### Bug Fixes

- add root level index.ts file for plugins for dev in monorepo ([4dd6384](https://bitbucket.org/atlassian/growth-kit/commits/4dd6384))
- refactor cross flow plugins package.json entry points ([03e9dd8](https://bitbucket.org/atlassian/growth-kit/commits/03e9dd8))

## [0.3.1](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-plugins@0.3.0...@atlassiansox/cross-flow-plugins@0.3.1) (2020-05-06)

**Note:** Version bump only for package @atlassiansox/cross-flow-plugins

# [0.3.0](https://bitbucket.org/atlassian/growth-kit/compare/@atlassiansox/cross-flow-plugins@0.2.0...@atlassiansox/cross-flow-plugins@0.3.0) (2020-04-29)

### Features

- add rpc client to SpaChildClient and relevant files in cross flow spa and cross flow frontend ([62b40d7](https://bitbucket.org/atlassian/growth-kit/commits/62b40d7))
- use context for passing rpcClient to cross flow spa and updated types and tests as needed ([12268a8](https://bitbucket.org/atlassian/growth-kit/commits/12268a8))

# 0.2.0 (2020-04-06)

### Bug Fixes

- add build commands to package.json and simplify User type ([b4c2c58](https://bitbucket.org/atlassian/growth-kit/commits/b4c2c58))
- change ContainerData type from ContainerTypes[] to ContainerTypes ([8a59169](https://bitbucket.org/atlassian/growth-kit/commits/8a59169))
- export UserIds for use in consumers as well ([0776a08](https://bitbucket.org/atlassian/growth-kit/commits/0776a08))

### Features

- initial commit of the cross-flow-plugins package ([d34aed2](https://bitbucket.org/atlassian/growth-kit/commits/d34aed2))
- refactor to atlassiansox prefix and make a public package with all required exports for consum ([d345d7a](https://bitbucket.org/atlassian/growth-kit/commits/d345d7a))
