# @atlaskit/webpack-config

## 2.2.1

### Patch Changes

- [`09f87f245db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09f87f245db) - AFP-2012 Enable Webpack 4's [config.output.futureEmitAssets](https://webpack.js.org/configuration/output/#outputfutureemitassets) option which frees memory used by assets after they're emitted. This is the default behavior of Webpack 5 so will aid the eventual upgrade, and should also improve bundling performance.

## 2.2.0

### Minor Changes

- [`0fe65d593f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0fe65d593f4) - Added support for an ENABLE_TOKENS environment variable on website builds

## 2.1.12

### Patch Changes

- Updated dependencies

## 2.1.11

### Patch Changes

- [`b33e998e45e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b33e998e45e) - Allow webpack to resolve files with a .mjs extension

## 2.1.10

### Patch Changes

- Updated dependencies

## 2.1.9

### Patch Changes

- [`a378bb0315e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a378bb0315e) - NO-ISSUE add bundle time analytics

## 2.1.8

### Patch Changes

- [`b8cf033738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8cf033738) - Bumped react-dev-server to fix DoS issue

## 2.1.7

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.1.6

### Patch Changes

- [`e8ada85f62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8ada85f62) - Remove extra code added to check private packages for bolt-fs-loader but check for private packages only when we build the website.
- Updated dependencies

## 2.1.5

### Patch Changes

- Updated dependencies

## 2.1.4

### Patch Changes

- Updated dependencies

## 2.1.3

### Patch Changes

- Updated dependencies

## 2.1.2

### Patch Changes

- [patch][0ef8a7a973](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ef8a7a973):

  Update sites & webpack config to support new atlassian website metadata fields as per https://hello.atlassian.net/wiki/spaces/~hobweger/pages/668331437/RFC+atlassian-frontend+package+categories+and+.jsons

## 2.1.1

### Patch Changes

- [patch][5ccd5d5712](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ccd5d5712):

  ED-8822: promote internal packages from peer to automatically installed dependencies

## 2.1.0

### Minor Changes

- [minor][e3f01787dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3f01787dd):

  NO-ISSUE feat: allow users to specify a HOST

## 2.0.16

- Updated dependencies [462dd21997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/462dd21997):
  - bolt-fs-loader@0.0.4

## 2.0.15

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 2.0.14

- Updated dependencies [164a927070](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/164a927070):
  - bolt-fs-loader@0.0.3

## 2.0.13

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving non-relative imports as relative imports

## 2.0.12

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 2.0.11

- Updated dependencies [688f2957ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/688f2957ca):
  - @atlaskit/multi-entry-tools@0.0.2

## 2.0.10

- Updated dependencies [7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):
  - @atlaskit/visual-regression@0.1.0

## 2.0.9

- [patch][3b48f804d7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b48f804d7):

  - Prefer atlaskit:src over module when building

## 2.0.8

- [patch][0744bd168d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0744bd168d):

  - Prefer atlaskit:src over module when building

## 2.0.7

- [patch][1b9e213](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b9e213):

  - Make local builds 20s faster

## 2.0.6

- [patch][eb19d6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb19d6a):

  - Disable some stats to make webpack faster

## 2.0.5

- [patch][92d8324](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92d8324):

  - Fix build not exiting with non-zero exit code on failure

## 2.0.4

- [patch] suppress "export not found" warnings for ts transpiling in webpack [9baa015](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9baa015)

## 2.0.3

- [patch] Upgrade to webpack 4 [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
- [patch] Updated dependencies [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
  - bolt-fs-loader@0.0.1

## 2.0.2

- [patch] Migrate Profilecard to AKM2 DIR-553 [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)

## 2.0.1

- [patch] adds environment variable for whether the atlaskit website is running locally, in staging or in production [a04c1c5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a04c1c5)

## 2.0.0

- [major] Updated website to use iframe to load examples. Example loader now in a separate react app. Webpack config refactored to compile separate example loader, chunking refactored to be more performant with the new website changes. Updated modal-dialog to use new component structure to optionally specify a Body wrapping component. [e1fdfd8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1fdfd8)
