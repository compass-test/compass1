# @atlassiansox/feature-flag-web-client

## 7.2.0

### Minor Changes

- [`098181d0743`](https://bitbucket.org/atlassian/atlassian-frontend/commits/098181d0743) - Use new v2 endpoint (/api/v2/frontend/featureFlagValues) with tracking info
- [`6e318f888ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e318f888ee) - Add setAutomaticExposuresEnabled to the client API, which allows exposure information to be collected automatically based on some configurable criteria

## 7.1.0

### Minor Changes

- [`9cafb08491c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9cafb08491c) - Allow feature flags to load from cache if the primary identifier does not change, but other attributes do.

## 7.0.5

### Patch Changes

- [`849f71d49fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/849f71d49fd) - Internal: Replaced devDependency jest-mock-date in favour of mockdate

## 7.0.4

### Patch Changes

- [`ab3cac3b40e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab3cac3b40e) - Fixed bug where using jest to mock the package would cause undefined exceptions.

## 7.0.3

### Patch Changes

- [`b7dc952479d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7dc952479d) - Fixed bug where the version reported was `{version}`.

## 7.0.2

### Patch Changes

- [`8255f051cb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8255f051cb2) - Removed peerDependencies from package to prevent automatic major version bumps. Analytics-web-client is still required, but this is clear by the constructor methods and documentation.

## 7.0.1

### Patch Changes

- [`29e5453244c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29e5453244c) - Fixed bug where flags are left in cache if flag is removed during userUpdateAPI call

## 7.0.0

### Patch Changes

- Updated dependencies

## 6.0.0

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`0c9bb60f810`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c9bb60f810) - Added client options to change how logging is done and ability to disable logs entirely

## 5.0.1

### Patch Changes

- [`4926fa2c790`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4926fa2c790) - Delayed purging of localstorage keys to prevent page render delays
- Updated dependencies

## 5.0.0

### Patch Changes

- [`cffd3f38928`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cffd3f38928) - Added API key to localstorage cache to invalidate when API keys change
- Updated dependencies

## 4.0.0

### Patch Changes

- Updated dependencies

## 3.0.2

### Patch Changes

- [`c8c85e4bf76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8c85e4bf76) - Replaced finally on promise with finally in async function try catch block

## 3.0.1

### Patch Changes

- [`7395c69f78c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7395c69f78c) - Updates dev dependency.

## 3.0.0

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [`2e3ef7bbcc0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e3ef7bbcc0) - Upgrade @atlassiansox/analytics-web-client peer dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

### Patch Changes

- Updated dependencies

## 1.24.5

### Patch Changes

- [`877e9e0b9f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/877e9e0b9f6) - Icon package dependency now uses carat range.

## 1.24.4

### Patch Changes

- [`b7d3db312a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7d3db312a3) - feature-flag-web-client - Replace console.warn with log to reduce noise on polling interval check

## 1.24.3

### Patch Changes

- [`98b1799faaf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98b1799faaf) - Bumps devDependency to resolve security vulnerability

## 1.24.2

### Patch Changes

- [`f6412b6a9a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6412b6a9a2) - upgrade dependencies to fix vulnerability in `yargs-parser`: `@changesets/cli` to ^2.13.1 and `concurrently` to ^6.0.0

## 1.24.1

### Patch Changes

- [`cda47f8efcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cda47f8efcf) - Dependency changes, minor test re-write and move to Atlassian Frontend

## 1.24.0

### Minor Changes

- 8b2efbb: Add `readyTimeoutInMilliseconds` in `ClientOptions` which is used to configure the client. This would allow clients to vary the ready timeout instead of defaulting to 3seconds.

## 1.23.0

### Minor Changes

- a054793: Increase polling interval for hidden tab

## 1.22.0

### Minor Changes

- 3fc766d: Add 2000ms timeout on fetch request

## 1.21.0

### Minor Changes

- 04dbc53: Allow at most a single retry on 400 because version data could be corrupted

## 1.20.0

### Minor Changes

- 2dbfb53: Adding a value to the returned promise from Ready.

## 1.19.1

### Patch Changes

- a8fbdaa: Fix min refresh interval error in prod env, protect user data being modified by reference

## 1.19.0

### Minor Changes

- 661a9d9: Added a mechanism to ensure that the promise returned by `ready()` resolves within an acceptable timeframe of 3 seconds

## 1.18.3

### Patch Changes

- 28fd796: Ready promise never rejects. Now resolves after two failed attempts to contact server

## 1.18.2

### Patch Changes

- ed27da2: Prevent same exposure event from spamming gasv3 pipeline

## 1.18.1

### Patch Changes

- 5163c60: `isAnonymous` will be set to `true` by default for the `ffClientAnonymousId` identifier

## 1.18.0

### Minor Changes

- acda340: Added new API `client.onAnyFlagUpdated(callback: () => void): () => void;` to listen to any flag changes

## 1.17.3

### Patch Changes

- 9deed3f: Fix race condition found with broadcast messages between tabs

## 1.17.2

### Patch Changes

- f555e54: Updated README

## 1.17.1

### Patch Changes

- a245148: Allowed anonymous user to be updated via update user api
  Renamed `FeatureFlagUser` to `FeatureFlagUserWithIdentifier`
  Added `FeatureFlagUser` as union of `FeatureFlagUserWithIdentifier` and `AnonymousFlagUser`

## 1.17.0

### Minor Changes

- a16db84: Added `getFlagDetails` method to return the evaluation details for an evaluated flag

## 1.16.0

### Minor Changes

- 7461476: Added getFlags API

## 1.15.9

### Patch Changes

- 1025c84: Added pre-commit hook to run lint command

## 1.15.8

### Patch Changes

- d52d6be: Added `measurement` tags to feature exposed events

## 1.15.7

### Patch Changes

- a4905aa: Added no cache polling strategy

## 1.15.6

### Patch Changes

- 982fafb: Replaced finally on promise by calling the function in then and catch

## 1.15.5

### Patch Changes

- e59b193: Added validation for defaultValue in Client.getFlagValue and Client.on

## 1.15.4

### Patch Changes

- 56d1cbb: Changed release processes

## [1.15.3](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.15.2...v1.15.3) (2020-01-30)

### Bug Fixes

- MEP-1491 - Added constructor args validation (pull request [#57](https://bitbucket.org/atlassian/feature-flag-web-client/issues/57)) ([56761d5](https://bitbucket.org/atlassian/feature-flag-web-client/commits/56761d5f2888a78d26a91e2c192dfa0666c6b04b))

## [1.15.2](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.15.1...v1.15.2) (2020-01-30)

### Bug Fixes

- MEP-1478 - Reject ready when service responds with 400 or 401 (pull request [#56](https://bitbucket.org/atlassian/feature-flag-web-client/issues/56)) ([36dbb8f](https://bitbucket.org/atlassian/feature-flag-web-client/commits/36dbb8f442a2b22c18b590e7248656a54362b4b4))

## [1.15.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.15.0...v1.15.1) (2020-01-28)

### Bug Fixes

- MEP-1338 - Ignore fetch requests that happen for the previous user (pull request [#55](https://bitbucket.org/atlassian/feature-flag-web-client/issues/55)) ([013f0e0](https://bitbucket.org/atlassian/feature-flag-web-client/commits/013f0e0db69fd2cd90768506c404b82ad1c28da1))

# [1.15.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.14.2...v1.15.0) (2020-01-23)

### Features

- MEP-1418 - Trigger subscriptions on user change (pull request [#53](https://bitbucket.org/atlassian/feature-flag-web-client/issues/53)) ([a76fdf0](https://bitbucket.org/atlassian/feature-flag-web-client/commits/a76fdf0aee0a066faedc143e38313c8ec75ae598))

## [1.14.2](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.14.1...v1.14.2) (2020-01-22)

### Bug Fixes

- MEP-1418 - Refactor Client and Refresh to use FeatureFlagUpdate rather than FeatureFlagResponse (pull request [#52](https://bitbucket.org/atlassian/feature-flag-web-client/issues/52)) ([ac60976](https://bitbucket.org/atlassian/feature-flag-web-client/commits/ac60976d37aabfc07eeb86c315e33c08a39b40d8))

## [1.14.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.14.0...v1.14.1) (2020-01-20)

### Bug Fixes

- MEP-1296 integration tests for milestone 2 ([ff126a6](https://bitbucket.org/atlassian/feature-flag-web-client/commits/ff126a6b02fac1f23550edd0aa842d14af276e5a))

# [1.14.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.13.1...v1.14.0) (2020-01-20)

### Features

- MEP-1417 - Send client metadata via HTTP headers (pull request [#51](https://bitbucket.org/atlassian/feature-flag-web-client/issues/51)) ([8f159b5](https://bitbucket.org/atlassian/feature-flag-web-client/commits/8f159b5b8617a7e8078609396488739b680e2bac))

## [1.13.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.13.0...v1.13.1) (2020-01-20)

### Bug Fixes

- MEP-1476 - Add apiKey to broadcast (pull request [#50](https://bitbucket.org/atlassian/feature-flag-web-client/issues/50)) ([92053f1](https://bitbucket.org/atlassian/feature-flag-web-client/commits/92053f19a391370ac726bc12768c8e9fa7c19830))

# [1.13.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.12.0...v1.13.0) (2020-01-19)

### Features

- Package moved to atlassiansox ([81914c1](https://bitbucket.org/atlassian/feature-flag-web-client/commits/81914c118fb50e1d9ae111939ddd58660002633e)), closes [#49](https://bitbucket.org/atlassian/feature-flag-web-client/issue/49)

# [1.12.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.11.2...v1.12.0) (2020-01-16)

### Features

- MEP-1421 Complete client metadata generation ([7cf32ff](https://bitbucket.org/atlassian/feature-flag-web-client/commits/7cf32ffad866baf8c359bcd2766c0b34a034f977))

## [1.11.2](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.11.1...v1.11.2) (2020-01-14)

### Bug Fixes

- Bind client functions earlier to ensure `this` is kept ([f3b84ef](https://bitbucket.org/atlassian/feature-flag-web-client/commits/f3b84ef3af678645d7c16377c3908148812c8731)), closes [#45](https://bitbucket.org/atlassian/feature-flag-web-client/issue/45)

## [1.11.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.11.0...v1.11.1) (2020-01-14)

### Bug Fixes

- Restricted types of the sendOperationalEvent callback ([2000d4b](https://bitbucket.org/atlassian/feature-flag-web-client/commits/2000d4b2f22ce2e712e0ce554fbcd76028bc18e9)), closes [#44](https://bitbucket.org/atlassian/feature-flag-web-client/issue/44)

# [1.11.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.10.0...v1.11.0) (2020-01-13)

### Features

- MEP-1290 - Purge stale localStorage flag state (pull request [#42](https://bitbucket.org/atlassian/feature-flag-web-client/issues/42)) ([4d86ac7](https://bitbucket.org/atlassian/feature-flag-web-client/commits/4d86ac72e8589fc89042603b2306da0690aad0b3))

# [1.10.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.9.1...v1.10.0) (2020-01-13)

### Features

- MEP-1295 Add broadcast sender and listener ([ca31c65](https://bitbucket.org/atlassian/feature-flag-web-client/commits/ca31c650418c1950c8d049786d16428de7ac2372))

## [1.9.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.9.0...v1.9.1) (2020-01-09)

### Bug Fixes

- Updated internal testing util chance ([441eaff](https://bitbucket.org/atlassian/feature-flag-web-client/commits/441eaff3a8ce1911b83b5bcdf5fd77760b56b560)), closes [#40](https://bitbucket.org/atlassian/feature-flag-web-client/issue/40)

# [1.9.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.5...v1.9.0) (2020-01-09)

### Features

- implemted ready function with storybook and tests ([1ce0651](https://bitbucket.org/atlassian/feature-flag-web-client/commits/1ce06510ec03c3af83d21e09fb834ca64a760283)), closes [#39](https://bitbucket.org/atlassian/feature-flag-web-client/issue/39)

## [1.8.5](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.4...v1.8.5) (2020-01-08)

### Bug Fixes

- NONE - Improve Storybook (pull request [#38](https://bitbucket.org/atlassian/feature-flag-web-client/issues/38)) ([6c981bb](https://bitbucket.org/atlassian/feature-flag-web-client/commits/6c981bb30a8df87a3efa7ce064332ee062380081))

## [1.8.4](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.3...v1.8.4) (2020-01-08)

### Bug Fixes

- Removed lib from local repo ([d2a5a60](https://bitbucket.org/atlassian/feature-flag-web-client/commits/d2a5a6098a62c4e82c98cc83b1432eea8658bc63)), closes [#37](https://bitbucket.org/atlassian/feature-flag-web-client/issue/37)

## [1.8.3](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.2...v1.8.3) (2020-01-08)

### Bug Fixes

- MEP-1335 - Generate Metadata [#1](https://bitbucket.org/atlassian/feature-flag-web-client/issues/1) - fix version attempt 4 (pull request [#36](https://bitbucket.org/atlassian/feature-flag-web-client/issues/36)) ([75ce91a](https://bitbucket.org/atlassian/feature-flag-web-client/commits/75ce91aca90e5fb4d1c5264f64e793d186fbc997))

## [1.8.2](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.1...v1.8.2) (2020-01-08)

### Bug Fixes

- MEP-1335 - Generate Metadata [#1](https://bitbucket.org/atlassian/feature-flag-web-client/issues/1) - fix version attempt 3 (pull request [#35](https://bitbucket.org/atlassian/feature-flag-web-client/issues/35)) ([1c45997](https://bitbucket.org/atlassian/feature-flag-web-client/commits/1c4599794df7c83e739fed0e6199df24926e0462))

## [1.8.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.8.0...v1.8.1) (2020-01-07)

### Bug Fixes

- MEP-1335 - Generate Metadata [#1](https://bitbucket.org/atlassian/feature-flag-web-client/issues/1) - fix version attempt 2 (pull request [#34](https://bitbucket.org/atlassian/feature-flag-web-client/issues/34)) ([f7efc39](https://bitbucket.org/atlassian/feature-flag-web-client/commits/f7efc399c3b73bdc22df7457586a60ec58ab14c4))

# [1.8.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.7.1...v1.8.0) (2020-01-07)

### Features

- MEP-1335 - Generate Metadata [#1](https://bitbucket.org/atlassian/feature-flag-web-client/issues/1) - fix version (pull request [#33](https://bitbucket.org/atlassian/feature-flag-web-client/issues/33)) ([25089fd](https://bitbucket.org/atlassian/feature-flag-web-client/commits/25089fd1eaad1009ebc4a6abdbb53162a479f2aa))

## [1.7.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.7.0...v1.7.1) (2020-01-07)

### Bug Fixes

- Merged in mep-1293-add-storybook-demo (pull request [#32](https://bitbucket.org/atlassian/feature-flag-web-client/issues/32)) ([087326c](https://bitbucket.org/atlassian/feature-flag-web-client/commits/087326c6e4a613e4341f4b7a3c75abb754a2f441))

# [1.7.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.6.0...v1.7.0) (2020-01-07)

### Features

- MEP-1335 - Generate Metadata [#1](https://bitbucket.org/atlassian/feature-flag-web-client/issues/1) - client.version, config.pollingSeconds, state.visibility (pull request [#31](https://bitbucket.org/atlassian/feature-flag-web-client/issues/31)) ([7727688](https://bitbucket.org/atlassian/feature-flag-web-client/commits/77276889717c7b8c4ddae35b616bc344a65f52ed))

# [1.6.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.5.0...v1.6.0) (2020-01-02)

### Features

- MEP-1289 - Add support for anonymous users ([8e01743](https://bitbucket.org/atlassian/feature-flag-web-client/commits/8e01743a40973d4680d64a44df2c45d647560ef0)), closes [#30](https://bitbucket.org/atlassian/feature-flag-web-client/issue/30)

# [1.5.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.4.4...v1.5.0) (2020-01-01)

### Features

- Merged in mep-1293-allow-switch-ff-user (pull request [#29](https://bitbucket.org/atlassian/feature-flag-web-client/issues/29)) ([3d685bc](https://bitbucket.org/atlassian/feature-flag-web-client/commits/3d685bc16c20f817719085bebf53dea6383f97ca))

## [1.4.4](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.4.3...v1.4.4) (2019-12-30)

### Bug Fixes

- MEP-1415 - Fix eslint (pull request [#28](https://bitbucket.org/atlassian/feature-flag-web-client/issues/28)) ([880323c](https://bitbucket.org/atlassian/feature-flag-web-client/commits/880323c9aa6891fb5b9fcc0fbd4294c831643577))

## [1.4.3](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.4.2...v1.4.3) (2019-12-30)

### Bug Fixes

- MEP-1396 - Stop client should clear subscription (pull request [#27](https://bitbucket.org/atlassian/feature-flag-web-client/issues/27)) ([b987446](https://bitbucket.org/atlassian/feature-flag-web-client/commits/b9874464c43b6ce4aa8d794a4f6c70dfccfcc0bf))

## [1.4.2](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.4.1...v1.4.2) (2019-12-27)

### Bug Fixes

- MEP-1397 - Fix inconsistent FeatureFlagUser hashing in Storage (pull request [#26](https://bitbucket.org/atlassian/feature-flag-web-client/issues/26)) ([1b0db35](https://bitbucket.org/atlassian/feature-flag-web-client/commits/1b0db35aa9722e337a38e069375d98859fd6d0c1))

## [1.4.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.4.0...v1.4.1) (2019-12-27)

### Bug Fixes

- MEP-1288 - Added Subscription integration tests (pull request [#25](https://bitbucket.org/atlassian/feature-flag-web-client/issues/25)) ([3a3e2f8](https://bitbucket.org/atlassian/feature-flag-web-client/commits/3a3e2f8eed8e824db9665ba709d084908b5d93c3))

# [1.4.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.3.0...v1.4.0) (2019-12-23)

### Features

- Merged in mep-1369-notify-flag-change (pull request [#23](https://bitbucket.org/atlassian/feature-flag-web-client/issues/23)) ([2b02848](https://bitbucket.org/atlassian/feature-flag-web-client/commits/2b02848f4638d6247144bc66637f78298b0fa30c))

# [1.3.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.2.1...v1.3.0) (2019-12-20)

### Features

- Merged in mep-1368-create-subscription (pull request [#16](https://bitbucket.org/atlassian/feature-flag-web-client/issues/16)) ([3590599](https://bitbucket.org/atlassian/feature-flag-web-client/commits/35905996c849853b389ae4c539468388c66fb3c6))

## [1.2.1](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.2.0...v1.2.1) (2019-12-19)

### Bug Fixes

- Removed validPeriod which was breaking interval custom configuration. ([efa53eb](https://bitbucket.org/atlassian/feature-flag-web-client/commits/efa53eb50c9ca2f9a9f2faffdfdfab282ce45464))

# [1.2.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.1.0...v1.2.0) (2019-12-17)

### Features

- MEP-1284 - Added ExposureEvents and changed to Operational event ([143358d](https://bitbucket.org/atlassian/feature-flag-web-client/commits/143358dd4ae4f47d8bd4b36a2af51be886e233e4))

# [1.1.0](https://bitbucket.org/atlassian/feature-flag-web-client/compare/v1.0.0...v1.1.0) (2019-12-16)

### Features

- Completed Milestone 1 ([8b30da7](https://bitbucket.org/atlassian/feature-flag-web-client/commits/8b30da713210bc8a11626114bd15b0b9f5314252))

# 1.0.0 (2019-10-25)

### Bug Fixes

- **pipeline:** setup pipeline ([ae4dad6](https://bitbucket.org/atlassian/feature-flag-web-client/commits/ae4dad60fae020a45cd058415b5479ab12017b19))
