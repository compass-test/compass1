# @atlaskit/renovate-config

## 0.2.14

### Patch Changes

- [`12d24c303d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12d24c303d4) - Update Renovate config with latest package changes

## 0.2.13

### Patch Changes

- [`7b4580d1583`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b4580d1583) - The deprecated package @atlaskit/field-radio-group has been removed from the monorepo

## 0.2.12

### Patch Changes

- [`c439dd3dee5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c439dd3dee5) - Remove @atlaskit/multi-select and @atlaskit/single-select as they have been deleted from the monorepo.
- [`8b79fb1c302`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b79fb1c302) - Remove @atlaskit/multi-select and @atlaskit/single-select as they have been deleted from the monorepo.

## 0.2.11

### Patch Changes

- [`ac2313107e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac2313107e1) - @atlaskit/global-navigation has been removed from the Atlassian Frontend monorepo.

## 0.2.10

### Patch Changes

- [`5538c20bba7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5538c20bba7) - Update maintainer list for jsm-ignition

## 0.2.9

### Patch Changes

- [`789bc630b95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/789bc630b95) - Moved switcher test utils to private scope.

## 0.2.8

### Patch Changes

- [`a0a1faaaaea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0a1faaaaea) - Update resource owner

## 0.2.7

### Patch Changes

- [`1a68f990792`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a68f990792) - ACT-2057 transition @atlaskit/atlassian-switcher-vanilla & @atlaskit/atlassian-switcher to private scope

## 0.2.6

### Patch Changes

- [`7b05c793e9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b05c793e9d) - Update a team name and slack channel for the team

## 0.2.5

### Patch Changes

- [`df9dc928897`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df9dc928897) - Update the team information in the packages maintained by the In Product Help team

## 0.2.4

### Patch Changes

- [`6885bb5f738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6885bb5f738) - Update renovate config with latest package owners.

## 0.2.3

### Patch Changes

- [`f9ae6df72f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9ae6df72f8) - Update renovate config to with latest packages.

## 0.2.2

### Patch Changes

- [`80abc1ec1e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80abc1ec1e7) - remove experimental-bulk-integration package

## 0.2.1

### Patch Changes

- [`5244523cd0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5244523cd0c) - - Only `branch-deploy` `editor-mobile-bridge` to s3 and other packages use by default the private registry.
  - Refactored `product integrator` to use private registry by default.
  - Remove `branch installer` package that is now obsolete and update DAC docs.

## 0.2.0

### Minor Changes

- [`8a6f8ce0c95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a6f8ce0c95) - CEMS-1775: unify charts manifest and make charts private

  This is a breaking change. We previously exported `manifest` (both named and as the default export), but we now only export `buildManifest`, which optionally takes an `EditorActions` and returns the manifest of the extension.

  This is needed so that the extension can provide default values based on the parameters.

  This changset also renames the @atlaskit/charts package to the private @atlassian/charts package.

## 0.1.3

### Patch Changes

- [`0171993f15b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0171993f15b) - Delete @atlassian/forge-ui-core package.

## 0.1.2

### Patch Changes

- [`e3212744907`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3212744907) - Updating CASSI contributors to the new team

## 0.1.1

### Patch Changes

- [`07ec93c75c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07ec93c75c7) - Regenerate config

## 0.1.0

### Minor Changes

- [`63c53e9418e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63c53e9418e) - Update renovate reviewers

## 0.0.15

### Patch Changes

- [`1d68d383460`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d68d383460) - A member swapped teams within package.json

## 0.0.14

### Patch Changes

- [`a67bad7b105`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a67bad7b105) - Bump version of bolt

## 0.0.13

### Patch Changes

- [`28608116732`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28608116732) - Move renovate to a seperate package upgrade group

## 0.0.12

### Patch Changes

- [`1778bb37f25`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1778bb37f25) - Updated renovate config

## 0.0.11

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.0.10

### Patch Changes

- [`1bcc2ca8fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1bcc2ca8fd) - Remove deactived user from PR reviewers
- [`ea59e580a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea59e580a7) - Cleanup more deactivated users

## 0.0.9

### Patch Changes

- [`3156029e80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3156029e80) - Fix wrong config value in renovate config

## 0.0.8

### Patch Changes

- [`c54351c5de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c54351c5de) - Group continuous released packages upgrade PR's by team and add their team members as reviewers

## 0.0.7

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.0.6

### Patch Changes

- [`e0183d474b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0183d474b) - Update renovate config to not use a pattern

## 0.0.5

### Patch Changes

- [`af61377f0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af61377f0d) - rename @atlassian-performance-portal-home to @atlassian-performance-portal-metric

## 0.0.4

### Patch Changes

- [`d0a354bf69`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0a354bf69) - Update for renovate-config + readme

## 0.0.3

### Patch Changes

- [`45a7971aaf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/45a7971aaf) - @atlaskit/renovate-config is now public!

## 0.0.2

### Patch Changes

- [`137fb41b6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/137fb41b6c) - First release of '@atlaskit/renovate-config' where the config is generated by a script.
