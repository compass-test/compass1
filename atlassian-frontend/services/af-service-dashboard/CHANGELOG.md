# @af/af-service-dashboard

## 0.15.0

### Minor Changes

- [`98041389182`](https://bitbucket.org/atlassian/atlassian-frontend/commits/98041389182) - Change to fetching deployments per env with pagination.

## 0.14.4

### Patch Changes

- [`5fe6e21a9a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5fe6e21a9a0) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer of the modal to be on the right instead of the left.

## 0.14.3

### Patch Changes

- [`a0a1faaaaea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0a1faaaaea) - Update resource owner

## 0.14.2

### Patch Changes

- [`f434fa37eff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f434fa37eff) - Fixes some typechecking errors

## 0.14.1

### Patch Changes

- [`eb1bcc44cb7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb1bcc44cb7) - Fix type errors and deprecated usage of date format. Refactor Header so selection persists but component isn't re-rendered.

## 0.14.0

### Minor Changes

- [`67614540b80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67614540b80) - Migrate `service-dashboard` from the `sidecar` to `Slauth/poco`.

  - Update service descriptor using the migration [guide](https://developer.atlassian.com/platform/slauth/serviceproxy/migrate/)
  - Remove unrequired routes
  - Add `data.json` and `test.json` for poco policies
  - Upload poco policies during `pre-deploy` step

## 0.13.9

### Patch Changes

- [`414b6216adf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/414b6216adf) - Upgrade date-fns to ^2.17

## 0.13.8

### Patch Changes

- [`aa4ceeb79b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa4ceeb79b9) - Update base node docker image from 12.3.1 to 12.21.0

## 0.13.7

### Patch Changes

- [`82f5dd62177`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82f5dd62177) - Update axios from `^0.19.2` to `^0.21.1`

## 0.13.6

### Patch Changes

- [`471e2431a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/471e2431a7c) - Downgrade back to date-fns 1.30.1
  We discovered big bundle size increases associated with the date-fns upgrade.
  We're reverting the upgarde to investigate

## 0.13.5

### Patch Changes

- [`70f0701c2e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70f0701c2e6) - Upgrade date-fns to 2.17

## 0.13.4

### Patch Changes

- [`9ec92064e0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ec92064e0d) - [ux] Add consistent sizing for deployment card chevron

## 0.13.3

### Patch Changes

- [`d8cdb3e370d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8cdb3e370d) - Fix inability to unlock deployments.

## 0.13.2

### Patch Changes

- [`e057db936bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e057db936bc) - Fix environment type ordering on deployment columns.

## 0.13.1

### Patch Changes

- [`67bca0d4c70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bca0d4c70) - Sort deployment columns by environment type (production, staging, development).

## 0.13.0

### Minor Changes

- [`b14eeb6cd4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b14eeb6cd4f) - Added a meta API route to display metadata

## 0.12.5

### Patch Changes

- [`68e8478794b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68e8478794b) - Added a dashboard link to the Slack deployment notifications

## 0.12.4

### Patch Changes

- [`4f669eab0bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f669eab0bc) - Added an extra layer of confirmation to rollbacks as well as additional states for the modal.

## 0.12.3

### Patch Changes

- [`1c4f85ca0c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c4f85ca0c9) - Fix: indicate when auth has expired.

## 0.12.2

### Patch Changes

- [`7200edd58d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7200edd58d4) - StatsD sidecar and custom metrics.

## 0.12.1

### Patch Changes

- [`3fb280de83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb280de83) - Added Data Classification

## 0.12.0

### Minor Changes

- [`d5dadaebd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5dadaebd9) - Permissions for service actions determined by teams.json membership.

## 0.11.2

### Patch Changes

- [`d077a82551`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d077a82551) - Small card styling and READ ME changes

## 0.11.1

### Patch Changes

- [`34f131de1e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/34f131de1e) - Support in-progress deployments on dashboards.

## 0.11.0

### Minor Changes

- [`0b02673dd8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b02673dd8) - Added editable tags to deployment cards.

## 0.10.1

### Patch Changes

- [`436089a8f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/436089a8f6) - Fix: rollbacks are supported like normal deployments.

## 0.10.0

### Minor Changes

- [`b964c6d839`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b964c6d839) - Added a home page

## 0.9.0

### Minor Changes

- [`9437da9ef7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9437da9ef7) - Added action to lock service deployments

## 0.8.1

### Patch Changes

- [`80e543321d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80e543321d) - Use JS library uuid to generate primary column IDs instead of the Postgres function.

## 0.8.0

### Minor Changes

- [`80d122edde`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80d122edde) - Feature: Trigger rollback for any viable version.

## 0.7.0

### Minor Changes

- [`6eb62617c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb62617c1) - Added slack integration for deployment notifications

## 0.6.1

### Patch Changes

- [`c33b204c7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c33b204c7c) - Reorganised and added extra styling to deployment UI components

## 0.6.0

### Minor Changes

- [`d20fec91c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d20fec91c2) - Render deployment columns and cards

## 0.5.0

### Minor Changes

- [`6acec24da3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6acec24da3) - Created deployments route

## 0.4.2

### Patch Changes

- [`54a71a6552`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54a71a6552) - UI refactor.

## 0.4.1

### Patch Changes

- [`75554d2b1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/75554d2b1a) - Fix for service dashboards git lfs images not displaying

## 0.4.0

### Minor Changes

- [`1b103416a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b103416a3) - Authorisation to restrict endpoints to specific authentication mechanisms.

## 0.3.2

### Patch Changes

- [`b9bce7ea90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9bce7ea90) - Standardise on database querying practices.

## 0.3.1

### Patch Changes

- [`b8cf033738`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8cf033738) - Bumped react-dev-server to fix DoS issue

## 0.3.0

### Minor Changes

- [`918a300359`](https://bitbucket.org/atlassian/atlassian-frontend/commits/918a300359) - Added a new webhook to create deployments.

## 0.2.1

### Patch Changes

- [`bea50ecc2f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bea50ecc2f) - Spinner on select and empty state when the service can not be found.

## 0.2.0

### Minor Changes

- [`1b9fd511f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b9fd511f0) - Add the service information endpoint and render data.

## 0.1.1

### Patch Changes

- [`fd4f908993`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd4f908993) - Add Postgres DB support

## 0.1.0

### Minor Changes

- [`d59ff0f283`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d59ff0f283) - Bumped up react-helmet to fix 'Maximum call stack size exceeded’ issue

## 0.0.1

### Patch Changes

- [`7d25f4376e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d25f4376e) - Initial setup.
