# @atlaskit/scheduled-releases

## 0.5.3

### Patch Changes

- [`bb55c09be54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb55c09be54) - ED-12173 Surface branch deploy urls for PRs on Release Dashboard
- [`bb55c09be54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb55c09be54) - Include branch name in payload for `build/scheduled-releases/scripts/getPrsInRelease.ts`

## 0.5.2

### Patch Changes

- [`8d658e9efff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d658e9efff) - Updated usage of deprecated Slack API (channels.create -> conversations.create).

## 0.5.1

### Patch Changes

- [`8cc4a4518e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc4a4518e) - Don't publish empty user cards on Slack

## 0.5.0

### Minor Changes

- [`e6fc8950d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6fc8950d4) - ED-11036 Add support to retrieve PRs since a given time

## 0.4.6

### Patch Changes

- [`7317715553`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7317715553) - ED-11036 Fix bug where `getPRsFromRelease` was not working properly

## 0.4.5

### Patch Changes

- [`f0e3044af6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0e3044af6) - ED-10836: Setup initial AF release dashboard application components

## 0.4.4

### Patch Changes

- [`c709b5e800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c709b5e800) - Fixing Denial Of Service (DoS) vulnerability found in node-fetch - bump node fetch 2.6.1.

  - Bump `node-fetch` to 2.6.1 - we were already resolving to 2.6.0
  - Run `yarn-deduplicate --packages node-fetch` in all 4 yarn.lock
  - Bump `cross-fetch` to 3.0.6 that has the latest version of `node-fetch`
  - Run `yarn-deduplicate --packages cross-fetch`
  - Bump `jest-fetch-mock` to 3.0.3 that has the latest version of node-fetch

  Unfortunately due to styled-components bring `fbjs` and an old version of `node-fetch` we had to force the resolutions in lot of places.

## 0.4.3

### Patch Changes

- [`bee2ab82d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bee2ab82d3) - only throw error in labelJiraIssueWithRelease when error happens

## 0.4.2

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.4.1

### Patch Changes

- [`2bad9a6df6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2bad9a6df6) - chore: add invite users to bump Slack channel functionality, add error handling

## 0.4.0

### Minor Changes

- [`58b88d763f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58b88d763f) - eng-health: added cut-release script

## 0.3.2

### Patch Changes

- [`849cdc015e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/849cdc015e) - Update the schedule release link to point to the roadmap link for FABDOGEM project.

## 0.3.1

### Patch Changes

- [`fa291adeda`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa291adeda) - Added a new ../scripts/labelJiraIssuesWithRelease.ts script that will enable Release Managers to label Jira issues with the release they are included in

## 0.3.0

### Minor Changes

- [`7b94fdd800`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b94fdd800) - Add script to generate release notes for a release

## 0.2.1

### Patch Changes

- [patch][52abe56399](https://bitbucket.org/atlassian/atlassian-frontend/commits/52abe56399):

  Update get-prs script to print jira URLs based on information in teams.json.
  Also change usage to `yarn get-prs <release-name> [--force] [--develop]`.
  `--develop` can be used when a rc branch doesn't exist yet and fetches all merged PRs up until latest develop rather than the release-candidate branch.

## 0.2.0

### Minor Changes

- [minor][b81c93b6f6](https://bitbucket.org/atlassian/atlassian-frontend/commits/b81c93b6f6):

  Add get-prs script to retrieve a list of all PRs merged into a release

## 0.1.0

### Minor Changes

- [minor][02899a2f94](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02899a2f94):

  Add scheduled-releases package
