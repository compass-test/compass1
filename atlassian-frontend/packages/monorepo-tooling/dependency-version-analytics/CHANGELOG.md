# @atlaskit/dependency-version-analytics

## 0.3.2

### Patch Changes

- [`84270dcf31a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84270dcf31a) - Bump dependency "meow" to version ^6.0.0

## 0.3.1

### Patch Changes

- [`9f6045d38ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f6045d38ce) - Upgrade analytics-node-client dependency

## 0.3.0

### Minor Changes

- [`98deccc667`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98deccc667) - Add support for repositories using yarn workspaces

  Upgrade events are sent for dependencies listed in any declared workspace, not only the root package.json. An upgrade event is only sent when all workspaces move to a new version. The lowest semver version across the repo is used as the aggregated version of a dependency.

## 0.2.0

### Minor Changes

- [`b3d3b36c06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3d3b36c06) - Add statlas flag that uploads last run state to statlas rather than a git tag

## 0.1.21

### Patch Changes

- [`3f51c7d0b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f51c7d0b8) - Fix versionString not including version range or prerelease info

## 0.1.20

### Patch Changes

- [`365c4257e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/365c4257e0) - Fix types not being resolvable

## 0.1.19

### Patch Changes

- [`c8a5330883`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8a5330883) - Fix custom jira suffixed dependencies used for independent upgrades.

  '--current' suffixed deps are now treated as normal deps and converted to a non-suffixed name and proper version. '--next' deps are ignored.
  upgradeType is now also fixed to reflect the 'upgrade' upgradeType rather than 'add' and 'remove'.

- [`26c63f4bc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26c63f4bc3) - Fix dependency type changes not being sent as separate remove/add events

  When a dependency changes type, e.g. dependencies to devDependencies, we need to record it as separate remove & add events so that our queries can easily tell that the package is no longer a normal dependency.
  This is even a bigger problem when a dependency changed dependency type without any version change as no event would be sent at all in that case.

## 0.1.18

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.17

### Patch Changes

- [`7ef9198547`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ef9198547) - Update dependency name & version to take into account `--next` and `--current`.

## 0.1.16

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 0.1.15

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.1.14

### Patch Changes

- [patch][03add6d4b5](https://bitbucket.org/atlassian/atlassian-frontend/commits/03add6d4b5):

  # What have been fixed?

  - `inquirer` version `3.3.0` . It has been fixed by bumping it to `6.4.0`. [Changelog](https://github.com/SBoudrias/Inquirer.js/compare/v3.3.0...v6.0.0) Mostly improvement and Node support.
  - `svgexport` version `0.3.2`. I has been fixed by bumping to `0.4.0`. There is no changelog but this is the change before the bump to [0.4.0](https://github.com/shakiba/svgexport/commit/3acbf51f0687f54d1972265cd3aef4c6a7e925fc), it should not affect anything.

## 0.1.13

### Patch Changes

- [patch][da71912521](https://bitbucket.org/atlassian/atlassian-frontend/commits/da71912521):

  ED-8822 fix: readd @atlassiansox/analytics-node-client as peer dependency

## 0.1.12

### Patch Changes

- [patch][5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  ED-8822: promote internal packages from peer to automatically installed dependencies

## 0.1.11

### Patch Changes

- [patch][a1bc1e6637](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1bc1e6637):

  AFP-1437: Fix vulnerability issue for url-parse and bump to ^1.4.5.Packages.

## 0.1.10

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes

## 0.1.9

### Patch Changes

- [patch][23fbdc1de3](https://bitbucket.org/atlassian/atlassian-frontend/commits/23fbdc1de3):

  Update simple-git dependency

## 0.1.8

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 0.1.7

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 0.1.6

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 0.1.5

### Patch Changes

- [patch][b9b8222978](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9b8222978):

  @types/node-fetch was declared in devDependencies and dependencies. Move @types/node-fetch, @types/node, @types/url-parse from dependencies to devDependencies.

## 0.1.4

### Patch Changes

- [patch][620613c342](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/620613c342):

  Fix regression in populate-package where new packages would throw an error

## 0.1.3

### Patch Changes

- [patch][10b3af15f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10b3af15f6):

  Fix version.json (cli version in analytics) being one version behind

## 0.1.2

### Patch Changes

- [patch][50ddd93885](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50ddd93885):

  - [populate-package] Fix upgradeType erroneously set to 'add' instead of 'upgrade' for the first event sent using --since
  - Add new upgradeType 'downgrade' to analytics payloads when a package is downgraded, typically after a rollback.

## 0.1.1

### Patch Changes

- [patch][b0c82fff8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0c82fff8f):

  Add '--no-interactive' flag to disable interactive prompts

## 0.1.0

### Minor Changes

- [minor][94835b2d03](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/94835b2d03):

  Initial version
