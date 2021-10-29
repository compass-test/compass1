# @atlassian/dragonfruit-component-create-modal

## 1.12.2

### Patch Changes

- Updated dependencies

## 1.12.1

### Patch Changes

- Updated dependencies

## 1.12.0

### Minor Changes

- [`5cfc445ea54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5cfc445ea54) - [ux] Creating v2 of the onboarding - transitioning to the create component/team create modals after the three-step onboarding modal is complete

## 1.11.3

### Patch Changes

- Updated dependencies

## 1.11.2

### Patch Changes

- [`473869f1dba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/473869f1dba) - stop prematurely closing team create modal without inviting teammates

## 1.11.1

### Patch Changes

- [`07df4f1e555`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07df4f1e555) - [ux] Added start a team modal to team list page and refactored flags for modal to a common utility

## 1.11.0

### Minor Changes

- [`99c411913cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/99c411913cf) - [ux] Moved components-table to its own package and implemented inline component creation in the new package.
- [`1e1f149e00e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1e1f149e00e) - Export type

### Patch Changes

- Updated dependencies

## 1.10.0

### Minor Changes

- [`8c23141bec8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c23141bec8) - Add test IDs for CSV Importer

## 1.9.1

### Patch Changes

- [`5da90ec82ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5da90ec82ad) - Skip flaky test

## 1.9.0

### Minor Changes

- [`3fa398b7d05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fa398b7d05) - [ux] Add CSV Importer UI under feature flag.

### Patch Changes

- Updated dependencies

## 1.8.4

### Patch Changes

- [`100a2b6d3c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/100a2b6d3c2) - Added support for teams V3 API behind feature flag

## 1.8.3

### Patch Changes

- Updated dependencies

## 1.8.2

### Patch Changes

- Updated dependencies

## 1.8.1

### Patch Changes

- [`d1edc2768e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1edc2768e4) - Centralized teams api calls into dragonfruit-rest package

## 1.8.0

### Minor Changes

- [`e231d8ead31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e231d8ead31) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer to be on the right instead of the left.

### Patch Changes

- Updated dependencies

## 1.7.4

### Patch Changes

- [`a574ba7e91d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a574ba7e91d) - Create a common ComponentTypeSelect component with icons and use it on the CreateModal

## 1.7.3

### Patch Changes

- [`50058d6c85a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50058d6c85a) - [ux] Removing the .nonfinal instances from messages.ts files from packages that Team Vega contributed to

## 1.7.2

### Patch Changes

- [`22d9cb4d257`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22d9cb4d257) - Refactoring/removing duplication for component name validation

## 1.7.1

### Patch Changes

- [`70eed5cc752`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70eed5cc752) - refactored team create component to handle case when visiting another team's dashboard and no remount

## 1.7.0

### Minor Changes

- [`748ad371c3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/748ad371c3a) - feature flag removal

## 1.6.2

### Patch Changes

- [`b74557e59ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b74557e59ec) - Added highlight with timeout for newly created components on team dashboard

## 1.6.1

### Patch Changes

- [`d2a5f301561`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2a5f301561) - Fixing issue with mashing keyboard for text field

## 1.6.0

### Minor Changes

- [`42125c42447`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42125c42447) - add feature flag recent components controller

### Patch Changes

- Updated dependencies

## 1.5.1

### Patch Changes

- [`6d5f4d8d803`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d5f4d8d803) - [ux] Adjusting the 'Start a team' button stylings on the create team from create component flow

## 1.5.0

### Minor Changes

- [`5538c06bdb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5538c06bdb8) - adding flag functionality

## 1.4.0

### Minor Changes

- [`de7d16efb99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de7d16efb99) - add recent components controller

## 1.3.8

### Patch Changes

- [`80a389959de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80a389959de) - Fix the build tsconfig.json to properly exclude tests and examples to be built when running yarn build --types.

## 1.3.7

### Patch Changes

- [`7b0fc249f2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b0fc249f2e) - Added controller to link create team modal and create component modal

## 1.3.6

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 1.3.5

### Patch Changes

- [`693ce39d01c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/693ce39d01c) - [ux] Introducing FF for the create team from create component flow. When the FF is toggled on, the create a team button should be visible in the create component modal and toggle the team create dialog when selected.

## 1.3.4

### Patch Changes

- [`6ceefedfbbb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ceefedfbbb) - [ux] Renamed and refactored OLD CreateComponentModal to now be CreateComponentFormModal and the new CreateComponentModal is currently a wrapper for the CreateComponentFormModal. All the package structuring and component references have been updated to reflect the changes that have been made.

## 1.3.3

### Patch Changes

- Updated dependencies

## 1.3.2

### Patch Changes

- [`16e8c12f811`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16e8c12f811) - Added fireErrorAnalytics for compass mutation errors

## 1.3.1

### Patch Changes

- [`e6a2bf7114e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6a2bf7114e) - changed messages to use removed not delete

## 1.3.0

### Minor Changes

- [`549ee373a3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/549ee373a3f) - changed error handling strategy for component mutations, added error analytics

### Patch Changes

- Updated dependencies

## 1.2.13

### Patch Changes

- [`4f3e9e52cb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f3e9e52cb3) - Owner to owner team

## 1.2.12

### Patch Changes

- [`824a375994b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/824a375994b) - Added a pollinator id to owner field in create modal

## 1.2.11

### Patch Changes

- [`56ab708d6c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56ab708d6c9) - Avoid closing modal and disable fields when submitting

## 1.2.10

### Patch Changes

- Updated dependencies

## 1.2.9

### Patch Changes

- [`da53c679464`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da53c679464) - Add unit tests to create component modal

## 1.2.8

### Patch Changes

- [`8794304f326`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8794304f326) - Update name placeholder

## 1.2.7

### Patch Changes

- Updated dependencies

## 1.2.6

### Patch Changes

- [`f171623c090`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f171623c090) - Create component modal copy amends

## 1.2.5

### Patch Changes

- [`73c37c9bc03`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73c37c9bc03) - Create component modal design tweaks
- Updated dependencies

## 1.2.4

### Patch Changes

- Updated dependencies

## 1.2.3

### Patch Changes

- [`5f03d7d2537`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f03d7d2537) - Add helper message to owner field of component creation modal

## 1.2.2

### Patch Changes

- [`7a51e539cb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a51e539cb9) - Apply QA feedback to create component modal

## 1.2.1

### Patch Changes

- [`49d40f272d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49d40f272d8) - Make tsconfig files consistent

## 1.2.0

### Minor Changes

- [`e75940a768d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e75940a768d) - Add the TeamSelect picker to the create component modal

## 1.1.1

### Patch Changes

- [`4e2684a9ff8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e2684a9ff8) - Add Modify type helper

## 1.1.0

### Minor Changes

- [`29e861bbc32`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29e861bbc32) - Use new create component modal in navigation

## 1.0.1

### Patch Changes

- [`d71431fbc5d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d71431fbc5d) - Add create component modal
