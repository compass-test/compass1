# @af/af-release-dashboard

## 1.12.17

### Patch Changes

- Updated dependencies

## 1.12.16

### Patch Changes

- Updated dependencies

## 1.12.15

### Patch Changes

- [`ba49463179e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba49463179e) - Fix typescript errors after the previous date type changes

## 1.12.14

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.12.13

### Patch Changes

- Updated dependencies

## 1.12.12

### Patch Changes

- [`8c1bba00bdd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c1bba00bdd) - Fix bug where metrics were not been calculated

## 1.12.11

### Patch Changes

- [`d4c254c4851`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4c254c4851) - - Add `/constants` as an entrypoint in `@atlaskit/branch-deploy-product-integrator`.
  - Use the `/constants` entrypoint in `af-release-dashboard`.

## 1.12.10

### Patch Changes

- [`1029b0127f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1029b0127f6) - Increase product fabric branch deploy staleness threshold from 2 hours to 4 hours to combat false negatives eventuating from async Bamboo builds failing to start (which skips a would-be deployment)

## 1.12.9

### Patch Changes

- [`414b6216adf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/414b6216adf) - Upgrade date-fns to ^2.17

## 1.12.8

### Patch Changes

- Updated dependencies

## 1.12.7

### Patch Changes

- [`01a2bf79b64`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01a2bf79b64) - ED-13300 Utilise whitelist proxy for Bitbucket API requests. Restores product fabric branch deploy status checking.

## 1.12.6

### Patch Changes

- [`a45076be1df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a45076be1df) - ED-13291 Change maintainer to [#team-twp-editor](https://atlassian.slack.com/archives/CFKURAWVC) on footer.

## 1.12.5

### Patch Changes

- [`0042b76f2bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0042b76f2bb) - Enhance error messaging when communicating with Bitbucket REST APIs and the development endpoint of this service

## 1.12.4

### Patch Changes

- Updated dependencies

## 1.12.3

### Patch Changes

- [`05e648d10ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05e648d10ab) - ED-13153 Apply Bitbucket Pull Requests sorting using `closed_on` timestamp instead of `updated_on`

## 1.12.2

### Patch Changes

- [`1f4cdb786d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f4cdb786d6) - ED-13136 Fix slack notifications by updating getEnvironment logic to work in CI when run within a Pipeline

## 1.12.1

### Patch Changes

- [`d3a6bbcea35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3a6bbcea35) - MONO-120 Update Stash credentials env variables to use a new bot's credentials

## 1.12.0

### Minor Changes

- [`354fdd3c865`](https://bitbucket.org/atlassian/atlassian-frontend/commits/354fdd3c865) - **Major refactoring of the database and business logic related to Product Fabric Dogfooding.**

  Originally, we looked up the latest commit in realtime during a `/deployments` GET request. This ensured we were seeing the legitimate real-time accurate “latest” commit, which we use for calculating whether product-fabric is stale or not.

  > The downside to this approach was we weren't storing the stale state, so when comparing one check against another, we didn’t know if the state had changed.

  To solve this, we've moved the commit check and staleness calculation across into the `/deployments` POST endpoint. This gets updated every 20 minutes as a scheduled pipeline. The downside will be that it won’t be _real-time accurate_ for the “latest” commit, but it’ll be a close enough approximation to suit our needs. The upside is we now perform the staleness calculation and store the result in the database, which allows us to compare the new state against the previous one.

  Now that we have state changes tracked, we can dispatch analytics and slack notifications when appropriate:

  - ED-12453 - Add analytics to track when the product integrator is broken
  - ED-12571 - Fix slack notifications to occur when the build is broken

## 1.11.1

### Patch Changes

- Updated dependencies

## 1.11.0

### Minor Changes

- [`e23e09a91b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e23e09a91b3) - - Enables "Product Integration Pipeline" information within the Product Fabric Dogfooding section.
  - Fixes Release metrics to now consider the latest releases (adds missing date sort).

## 1.10.3

### Patch Changes

- Updated dependencies

## 1.10.2

### Patch Changes

- [`575de74c110`](https://bitbucket.org/atlassian/atlassian-frontend/commits/575de74c110) - ED-12678 Change grace period from 1 hour to 2 hours. In some cases it took a little over 1 hour, so this buffer reduces the change of a false positive flagging.

## 1.10.1

### Patch Changes

- [`8b712b8ab12`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b712b8ab12) - ED-12678 Harden the product fabric staleness calculation to be stricter.

## 1.10.0

### Minor Changes

- [`317f9380609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/317f9380609) - ED-12571 Add slack notifications for dashboard service deployment, and also when product-fabric changes between 'up to date' and 'stale'.

## 1.9.4

### Patch Changes

- [`11d4ccafa44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11d4ccafa44) - Restore the Product Fabric Dogfooding feature now that the accuracy issues have been resolved

## 1.9.3

### Patch Changes

- [`f7a1a965558`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7a1a965558) - Support paginated results (up to 3 pages) when fetching Bamboo build results

## 1.9.2

### Patch Changes

- [`80771cc3340`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80771cc3340) - ED-12555 Improve accuracy of product-fabric branch deploy indicator by using last successful deploy result's version file rather than latest copy of the version file on the branch

## 1.9.1

### Patch Changes

- [`fc83c30bbab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc83c30bbab) - Temporarily disable the Product Fabric Dogfooding feature due to accuracy issues identifying the latest deployment.

## 1.9.0

### Minor Changes

- [`a35e6eda503`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a35e6eda503) - Enable Metrics & Product Fabric Dogfooding features on production environment. Surface environment label within header.

## 1.8.3

### Patch Changes

- [`69b7bd7aa18`](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b7bd7aa18) - ED-12502 Support feature flag overriding via URL query string parameters

## 1.8.2

### Patch Changes

- [`ba35434666d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba35434666d) - ED-12454 - Revise dogfooding labels. Exposed latest commit hash. Fix issue where it wasn’t matching SHA lengths.

## 1.8.1

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 1.8.0

### Minor Changes

- [`b9d38593cec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9d38593cec) - ED-11973 Added Release Metrics to homepage to show averages per release phase.

## 1.7.3

### Patch Changes

- [`fa658fdf33f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa658fdf33f) - - Add tooltips to the release status/phase lozenges to describe what each one means.
  - Add deployed release name to the product-fabric status indicator.

## 1.7.2

### Patch Changes

- [`0fc7df1bc3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0fc7df1bc3e) - Enhancements to the visuals on the release page

## 1.7.1

### Patch Changes

- [`f0cd810ab0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0cd810ab0c) - Refactor of frontend components / design

## 1.7.0

### Minor Changes

- [`b15d557ccde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b15d557ccde) - Add a script to fetch the confluence branch deploy metadata and post to release dashboard

## 1.6.7

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 1.6.6

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 1.6.5

### Patch Changes

- [`dd29470bad7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd29470bad7) - Upgrade class-validator dependency

## 1.6.4

### Patch Changes

- [`7e341f43e83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e341f43e83) - ED-12337 Staleness calculation to improve performance

## 1.6.3

### Patch Changes

- [`1a8a9d2a7d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a8a9d2a7d9) - ED-12173 Surface branch deploy urls for PRs on Release Dashboard.

## 1.6.2

### Patch Changes

- [`5d64095cb53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d64095cb53) - Run migrations on application startup

## 1.6.1

### Patch Changes

- [`f0492d1acce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0492d1acce) - Start development on display how stale PF branch deploy is

## 1.6.0

### Minor Changes

- [`d64bb531b99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d64bb531b99) - ED-12080 Add get deployment info endpoint

## 1.5.0

### Minor Changes

- [`1fa2daa6c30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1fa2daa6c30) - ED-12077 Add post endpoint deployment for deployment history

## 1.4.2

### Patch Changes

- Updated dependencies

## 1.4.1

### Patch Changes

- [`f76e661c258`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f76e661c258) - Use correct variable for bitbucket product status

## 1.4.0

### Minor Changes

- [`3c22bab9607`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c22bab9607) - ED-11679 Captialised release names on select component

## 1.3.0

### Minor Changes

- [`3146fd4dc6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3146fd4dc6e) - ED-11679 Status lozenges added to the top of release columns

## 1.2.0

### Minor Changes

- [`6603277dee3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6603277dee3) - ED-11976 Expose jira webhook to the public url

## 1.1.0

### Minor Changes

- [`28de8715be6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28de8715be6) - ED-11679 Implement UI for Release Page Metadata

## 1.0.0

### Major Changes

- [`ea7c2d70b2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea7c2d70b2d) - ED-11384 adds a release page for each release accessible through the select component

## 0.6.0

### Minor Changes

- [`4fb3a0e0299`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4fb3a0e0299) - ED-11677 Implement Jira Webhook + retrieve Release information from Jira tickets

## 0.5.1

### Patch Changes

- [`6233a8c32ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6233a8c32ff) - Fix error where GET `release/{name}` returns PR on insertion order

## 0.5.0

### Minor Changes

- [`2a7d4e6bf4d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a7d4e6bf4d) - ED-11832 Improve GET 'releases' endpoint

  - Size - now is optional and if not passed it will returns all the releases without pull requests
  - Expand - new query parameter that allow to expand the pull requests in a Release.

## 0.4.0

### Minor Changes

- [`a4dbfd858b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4dbfd858b) - ED-11831 Add GET `release/:name` endpoint

## 0.3.0

### Minor Changes

- [`ad20bf1d6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad20bf1d6e) - ED-11036 Implement update-release script

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`aa12a79ba3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa12a79ba3) - ED-11036 Add scripts to create and send seed to the server

## 0.1.4

### Patch Changes

- [`9ec46812bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ec46812bd) - ED-11702: Create or update releases when creating new pull request entities

## 0.1.3

### Patch Changes

- [`19ebb27d85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19ebb27d85) - ED-11040 retrieved data from endpoint api/v1/releases to display pull request cards in corresponding release swimlanes

## 0.1.2

### Patch Changes

- [`865d70add5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/865d70add5) - ED-11041: add pagination qs params to releases endpoint

## 0.1.1

### Patch Changes

- [`37a913b4c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37a913b4c2) - ED-11041: Ensure releases get endpoint is returning correct, sorted releases limited to 3 most recent

## 0.1.0

### Minor Changes

- [`0095d528e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0095d528e3) - ED-11328 Implement Release Dashboard UI skeleton

## 0.0.5

### Patch Changes

- [`ad04fc0743`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad04fc0743) - Removing branchName field from PullRequest entity

## 0.0.4

### Patch Changes

- [`26c4afe22c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26c4afe22c) - ED-11037: Setup register endpoint (and related work)

## 0.0.3

### Patch Changes

- [`233fbd57f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/233fbd57f3) - ED-10386: set package field private to true

## 0.0.2

### Patch Changes

- [`f0e3044af6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0e3044af6) - ED-10836: Setup initial AF release dashboard application components
