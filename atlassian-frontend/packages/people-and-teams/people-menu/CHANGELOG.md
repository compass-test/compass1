# @atlassian/people-menu

## 17.4.0

### Minor Changes

- [`4a591112a2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a591112a2a) - [ux] Instrumented people-menu with the new theming package, `@atlaskit/tokens`.

  New tokens will be visible only in applications configured to use the new Tokens API (currently in alpha)
  These changes are intended to be interoperable with the legacy theme implementation. Legacy dark mode users should expect no visual or breaking changes.

## 17.3.3

### Patch Changes

- [`e560ac54006`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e560ac54006) - Passed userRecommendatiosnCohort prop to Invite People in PeopleMenuContext

## 17.3.2

### Patch Changes

- [`739bdd3ca58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/739bdd3ca58) - Excluding googlemail.com from third party invites as its used instead of gmail.com in some countries

## 17.3.1

### Patch Changes

- [`e72cc7dcf72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e72cc7dcf72) - Added exposure events for User Recommendations experiment

## 17.3.0

### Minor Changes

- [`0ca544f14e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ca544f14e4) - Added props for User Recommendations experiment

### Patch Changes

- Updated dependencies

## 17.2.2

### Patch Changes

- [`61903f3eb50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61903f3eb50) - Refactoring retry login in integrations package

## 17.2.1

### Patch Changes

- [`80c28952183`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80c28952183) - Fixes bug which did not pass some props to the people menu context

## 17.2.0

### Minor Changes

- [`5f963362472`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f963362472) - New optional props for enabling v2 apis for invite people slack and exus

### Patch Changes

- Updated dependencies

## 17.1.3

### Patch Changes

- [`2ef75c86816`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef75c86816) - Adding enableThirdParty prop to invite-people - it will replace the cohort prop

## 17.1.2

### Patch Changes

- Updated dependencies

## 17.1.1

### Patch Changes

- [`6105f4955fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6105f4955fc) - Refactor and clean up test suite, fix minor bugs found in product select and loader

## 17.1.0

### Minor Changes

- [`04984822009`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04984822009) - Bump invite-people to include a couple patches and viral settings default to checked experiment

### Patch Changes

- Updated dependencies

## 17.0.1

### Patch Changes

- [`5c8015bf4cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c8015bf4cd) - Fix creatable-select accepting invalid emails in invite-people

## 17.0.0

### Major Changes

- [`958c17af1cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/958c17af1cb) - Migrated third party invites state to shared context and refactoring components, cleanup of invite from github experiment

### Patch Changes

- Updated dependencies

## 16.0.0

### Patch Changes

- [`cfc8342cab1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfc8342cab1) - Upgrade to the latest version of @atlaskit/modal-dialog.
- Updated dependencies

## 15.1.2

### Patch Changes

- [`4977c87ab5d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4977c87ab5d) - Bump invite-people

## 15.1.1

### Patch Changes

- [`c866329b4b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c866329b4b6) - Add types entrypoint

## 15.1.0

### Minor Changes

- [`ff3650e2564`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff3650e2564) - Added the viralOptionsDefaultToCheckedFeatureFlag prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

### Patch Changes

- Updated dependencies

## 15.0.0

### Patch Changes

- Updated dependencies

## 14.2.0

### Minor Changes

- [`4148aa7c624`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4148aa7c624) - Support orgId prop to call Legion V3 endpoint for creating team and invite members

### Patch Changes

- Updated dependencies

## 14.1.5

### Patch Changes

- [`68c2bb993fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68c2bb993fd) - Declarative entry points, removes types entry point

## 14.1.4

### Patch Changes

- [`7ef461e413d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ef461e413d) - stopped firing addPeopleModal screen event when invite people drawer migration is on

## 14.1.3

### Patch Changes

- [`2d423c753b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d423c753b3) - Adding error message in attributes of failed operational events, that helps to debug SLO breach easily. Improving performance of triggering analytics events

## 14.1.2

### Patch Changes

- [`784cac0a404`](https://bitbucket.org/atlassian/atlassian-frontend/commits/784cac0a404) - Add support for standalone directory as a product

## 14.1.1

### Patch Changes

- [`56230af3f3c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56230af3f3c) - reset the style for the invite people wrapper in people menu

## 14.1.0

### Minor Changes

- [`c30a73c4451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c30a73c4451) - Prop added to enable the customised product selector in people menu and invite drawer.

  Mocked invite capabilities in People Menu example

  Tooltip field for Jira Work Management option in product selector now extends to entire area - not just info icon

### Patch Changes

- Updated dependencies

## 14.0.1

### Patch Changes

- [`2f3d62f299c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f3d62f299c) - Update user-picker to fix translations, close modal if user clicks disconnect integration and is taken to account manage page

## 14.0.0

### Major Changes

- [`dc89b7e9d3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc89b7e9d3b) - Product selector is always enabled. the enableProductSelect prop is no longer present in the code base.

### Patch Changes

- Updated dependencies

## 13.0.3

### Patch Changes

- [`6279b01391a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6279b01391a) - bumped invite-people to ^5.0.7 and invite-people-drawer to ^0.8.5 in people-menu

## 13.0.2

### Patch Changes

- [`b7a1d0e27a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7a1d0e27a4) - bumped invite-people to ^5.0.3 and invite-people-drawer to ^0.8.3 in people-menu

## 13.0.1

### Patch Changes

- [`7b8537086cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b8537086cc) - Skip firing exposed event if initial feature cohort was not passed into the component via a prop

## 13.0.0

### Major Changes

- [`923231ce94b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/923231ce94b) - Removed gsync props & code due to experiment being removed

### Patch Changes

- Updated dependencies

## 12.0.0

### Major Changes

- [`9b6898f6288`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b6898f6288) - passed in invitePeopleDrawerMigrationCohort data from people menu to invite people drawer and inite people, and removed optional useInviteDrawer prop

## 11.0.3

### Patch Changes

- Updated dependencies

## 11.0.2

### Patch Changes

- [`e41c1ada693`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e41c1ada693) - Removing english only restriction for INFI as we have translations, enabling INFI google button for admins since gsync will no longer be a part of the modal"
- Updated dependencies

## 11.0.1

### Patch Changes

- [`876595234d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/876595234d4) - updated people menu for invite people drawer feature exposed event

## 11.0.0

### Patch Changes

- Updated dependencies

## 10.0.5

### Patch Changes

- [`2e2e4a6b11f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e2e4a6b11f) - [ux] Updated invite-people to '^4.4.12'.

## 10.0.4

### Patch Changes

- [`d2661bdf9f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2661bdf9f1) - Bump invite-people to "^4.4.6"

## 10.0.3

### Patch Changes

- [`7ba209170a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba209170a5) - Added analytic events for the viral settings experiment in invite-people. Updated invite-people package to include analytics changes and viral settings experiment changes. Updated viewed analytics event to include viral settings cohort value.

## 10.0.2

### Patch Changes

- [`132d88e348f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/132d88e348f) - Update invite-people packages to include bug fixes

## 10.0.1

### Patch Changes

- [`da03d275dc6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da03d275dc6) - Prevent invite people drawer from closing when the user picker is opened

## 10.0.0

### Major Changes

- [`4cfa5d95293`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cfa5d95293) - [ux] Cleanup of Feature Flags for Improve Invite Discoverability Experiment

## 9.2.1

### Patch Changes

- [`f7fe3a822e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7fe3a822e8) - Removed default value for viralSettingsCohort prop. Added viralSettingsCohort prop to InvitePeople from people-menu.

## 9.2.0

### Minor Changes

- [`07717632c16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07717632c16) - Added viralSettingsCohort prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

### Patch Changes

- Updated dependencies

## 9.1.0

### Minor Changes

- [`c496694090f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c496694090f) - [ux] Reversed previous change that removed the gsync/inviteelist flags. Minor bump because this adds optional props on the component.

### Patch Changes

- Updated dependencies

## 9.0.1

### Patch Changes

- [`ef52a3a857b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef52a3a857b) - Fix issue when people menu is used in SSR

## 9.0.0

### Major Changes

- [`c1f0f0c0314`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1f0f0c0314) - [ux] Removed invitee-list and gsync props in prior PR (https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9426), which is a breaking change, therefore requires a major version bump.

## 8.2.2

### Patch Changes

- Updated dependencies

## 8.2.1

### Patch Changes

- [`182afd90b75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/182afd90b75) - [ux] Fix UI overflow when four or more third party integrations are connected

## 8.2.0

### Minor Changes

- [`7d959086a1e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d959086a1e) - [ux] Cleaned up feature flag from a different experiment in preparation for producitonization

## 8.1.2

### Patch Changes

- [`4c5fcc0f2b7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c5fcc0f2b7) - Bump invite-people-drawer to to 0.4.2

## 8.1.1

### Patch Changes

- [`ae47492ff58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae47492ff58) - Bump invite-people-drawer to 0.4.1 to include invite from GitHub support

## 8.1.0

### Minor Changes

- [`f36894115ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f36894115ec) - Add new property `invitePeopleInitState` for initial state of Invite People Drawer, default is false -> closed.

## 8.0.0

### Major Changes

- [`f561bb7f803`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f561bb7f803) - [ux] - Add more attributes to 'invite-people-drawer' to expose more control over 'invite-people' child component

  - Use new 'invite-people-drawer' attributes and replace 'invite-people' and ModalDialog with 'invite-people-drawer' in 'people-menu'.
    UX-Change: 'people-menu' now using drawer ('invite-people-drawer') and not dialog for Invite-People

### Patch Changes

- Updated dependencies

## 7.5.0

### Minor Changes

- [`7b14fe289a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b14fe289a4) - Add a new prop "peopleText" for people-menu package and allow to load language file by only locale without country code.

### Patch Changes

- Updated dependencies

## 7.4.6

### Patch Changes

- [`0b2ee14ed14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b2ee14ed14) - Bump invite-people package version

## 7.4.5

### Patch Changes

- [`4dfa0d1dcc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4dfa0d1dcc3) - Fix wrong chunk name of i18n resources

## 7.4.4

### Patch Changes

- [`5497721c7d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5497721c7d7) - added addPeopleNavigationItem rendered event to people-menu

## 7.4.3

### Patch Changes

- [`595d460363a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/595d460363a) - Upgrade dependencies

## 7.4.2

### Patch Changes

- [`a140da901f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a140da901f1) - Fix a wrong chunk name of loading i18n/vi.ts file

## 7.4.1

### Patch Changes

- [`3ff7aa4b86d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ff7aa4b86d) - Upgrade dependencies

## 7.4.0

### Minor Changes

- [`46a1af8ec0c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46a1af8ec0c) - Lazy-loading i18n messages and menu content

## 7.3.5

### Patch Changes

- [`b0f8484d634`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0f8484d634) - Remove unused prop "shouldPreFetch"

## 7.3.4

### Patch Changes

- [`0f94a791c67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f94a791c67) - Shorten i18n message ids to optimise bundle size

## 7.3.3

### Patch Changes

- [`6809c4cef0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6809c4cef0f) - bumping invite people component in consumers, new version includes improved validation for submitting empty forms

## 7.3.2

### Patch Changes

- [`e48f8a46d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e48f8a46d33) - Bump version of a dependency: @atlassian/people-teams

## 7.3.1

### Patch Changes

- [`53e87609445`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53e87609445) - Update people-menu code to not import directly from @atlassian/people-teams

## 7.3.0

### Minor Changes

- [`aa7a77fc5c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa7a77fc5c3) - Effectively does nothing, only surrounds invite buttons with a spotlight target

## 7.2.5

### Patch Changes

- [`6c38155771`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c38155771) - pumped up invite-people to ^3.8.8

## 7.2.4

### Patch Changes

- [`4cf0794729`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cf0794729) - Fix 2 bugs: SkeletonItem is not rendered + Invite people button should be shown when browse users/groups permision is disabled

## 7.2.3

### Patch Changes

- [`e5185b0386`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5185b0386) - Fix a bug - should not render Start a team button and Invite people when users do not have browse users/groups permission
- Updated dependencies

## 7.2.2

### Patch Changes

- [`7937b15e61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7937b15e61) - bumped up invite-people version in people-menu and invite-people-drawer and updated the team property in package.json for invite-people and invite-people-drawer

## 7.2.1

### Patch Changes

- [`d8d1a37ab6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8d1a37ab6) - Bump Invite People to 3.8.1

## 7.2.0

### Minor Changes

- [`5304c4a15f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5304c4a15f) - bump invite-people in people menu with required changes for google verification and minor improvements, also invite for jira project changes in invite-people are included(off and controlled by a prop)

## 7.1.4

### Patch Changes

- [`8654af1ca8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8654af1ca8) - Bumping invite-people to patch version that fixes use of old translation value for updated key

## 7.1.3

### Patch Changes

- [`f25e80ef04`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f25e80ef04) - Patch bump for invite-people package, includes fix for duplicate i18n keys

## 7.1.2

### Patch Changes

- [`b293aceda6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b293aceda6) - Bumping invite-people package to resolve minor analytics bugs found in QA session

## 7.1.1

### Patch Changes

- [`b3ee762d6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3ee762d6f) - Bumping invite-people in the package, this version bump adds missing analytics events

## 7.1.0

### Minor Changes

- [`b801cf3609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b801cf3609) - Bumping the invite-people package to have new copy and third party invites capability, prop added to people-menu to pass third party invites cohort to invite-people component

## 7.0.0

### Patch Changes

- [`21c7d9ef67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21c7d9ef67) - Fix for the consumption of the @atlaskit/menu breaking change in the monorepo
- Updated dependencies

## 6.2.3

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc
- Updated dependencies

## 6.2.2

### Patch Changes

- [`11f2436490`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11f2436490) - [ux] People menu inside More menu has an extra top and bottom margin. That margin is used to have enough space to show Nudge tooltip in Jira. Now Nudge tooltip in Jira is going to not show for People Menu anymore and that extra margin does not impact UX of Nudge tooltip in Jira anymore. It is fine to remove that extra margin.

  Upgrade dependency version `@atlassian/people-teams` and add `ref=peopleMenu` analytics attribute for `TeamCreateDialog` of `@atlassian/people-teams`.

## 6.2.1

### Patch Changes

- [`b2b03f3c3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2b03f3c3a) - Bump invite-people to 3.4.5

## 6.2.0

### Minor Changes

- [`8afea37c59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8afea37c59) - [ux] New prop: isSSR. Enabling it causes the component to render a visually identical but dumb component

## 6.1.2

### Patch Changes

- [`7cc0ae0605`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7cc0ae0605) - Bumped invite-people to 3.4.3

## 6.1.1

### Patch Changes

- [`c1c0b71a87`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1c0b71a87) - Update invite-people for english locale fix

## 6.1.0

### Minor Changes

- [`d1298ff911`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1298ff911) - [ux] Version bump picks up Invite People v 3.4.1, which adds the 'Sync with Google'
  button and a multiple email address invite field ("invitee list"). See
  go/growth-gsync for more info.

## 6.0.2

### Patch Changes

- [`f519a3831d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f519a3831d) - Make invite-people semver

## 6.0.1

### Patch Changes

- Updated dependencies

## 6.0.0

### Major Changes

- [`474cbf72d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/474cbf72d8) - Remove "enableLoadingSkeleton" prop because skeleton loading style is default now

## 5.2.3

### Patch Changes

- Updated dependencies

## 5.2.2

### Patch Changes

- Updated dependencies

## 5.2.1

### Patch Changes

- [`9174baa615`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9174baa615) - Update FF for jira

## 5.2.0

### Minor Changes

- [`5db6d07cd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5db6d07cd4) - [ux] New Improved Invite a teammate menu item added under YOUR COLLABORATORS

## 5.1.8

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.
- Updated dependencies

## 5.1.7

### Patch Changes

- [`baf7ac55d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/baf7ac55d1) - bump invite-component version which includes fixes to the success flag copy and anatytics track events

## 5.1.6

### Patch Changes

- [`f57e1389ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f57e1389ee) - [ux] Update invite-component version which includes copy fixes

## 5.1.5

### Patch Changes

- [`e7a756c7b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7a756c7b2) - Update types

## 5.1.4

### Patch Changes

- [`5dbba89c3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5dbba89c3b) - Invite people fixes 3.2.12

## 5.1.3

### Patch Changes

- [`56409fa8dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56409fa8dd) - Bump invite-people to bring in fixes

## 5.1.2

### Patch Changes

- [`6c915323c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c915323c1) - Updates invite people component to bring in fixes and upgrades for the product select experiment

## 5.1.1

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`b11cdeb91a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b11cdeb91a) - [ux] Changes Viewl all people and temas text to Search all people and teams

## 5.0.1

### Patch Changes

- [`fafd919295`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fafd919295) - Update invite-people

## 5.0.0

### Patch Changes

- Updated dependencies

## 4.3.2

### Patch Changes

- [`d904038e72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d904038e72) - [ux] Updating invite-people UI when the `enableProductSelect` option is enabled. Removing unnecessary exposure event from people-menu
- Updated dependencies

## 4.3.1

### Patch Changes

- [`d11546c977`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d11546c977) - Fix SLO by ignore 401 and 403 error

## 4.3.0

### Minor Changes

- [`7df56a25f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df56a25f4) - Introducing new props to support the future release of the product select on invite component

### Patch Changes

- Updated dependencies

## 4.2.13

### Patch Changes

- [`2ec998f020`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ec998f020) - Make offset of popup menu as a string so that it can works in @atlaskit/popup <= 0.6.x

## 4.2.12

### Patch Changes

- [`2f25d8bdfd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f25d8bdfd) - Make people-menu depends on any (\*) versions of @atlaskit/menu and @atlaskit/atlassian-navigation from consumers/products

## 4.2.11

### Patch Changes

- [`f32921c48e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f32921c48e) - yBump invite people and people teams components

## 4.2.10

### Patch Changes

- [`3c50349ede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c50349ede) - Upgrade analytics-next to prevent event loss (https://hello.atlassian.net/wiki/spaces/AFP/blog/2020/08/26/828144759/ACTION+REQUIRED+-+upgrade+analytics-next+to+prevent+event+loss)

## 4.2.9

### Patch Changes

- [`8d61a3058b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d61a3058b) - Move "@atlaskit/popper" from "dependencies" to "peerDependencies"

## 4.2.8

### Patch Changes

- [`f589a13c2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f589a13c2a) - Upgrade invite-people

## 4.2.7

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 4.2.6

### Patch Changes

- [`bdec42a75c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdec42a75c) - Bump invite-component version

## 4.2.5

### Patch Changes

- [`dc14e812a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc14e812a6) - Invite component now supports invite to multiple products (when used in Jira)

## 4.2.4

### Patch Changes

- Updated dependencies

## 4.2.3

### Patch Changes

- [`5a984a8be9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a984a8be9) - Fix bugs:

  - skeleton should not be rendered when cached data exists.
  - should not render collaborators section when stop loading and data is empty

## 4.2.2

### Patch Changes

- [`8ccc4fc741`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ccc4fc741) - Add some analytics events to measure performance of skeleton and add new prop `enablePreFetchingByHovering` to toggle pre-fetching by hovering feature.

## 4.2.1

### Patch Changes

- Updated dependencies

## 4.2.0

### Minor Changes

- [`af5096a24d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af5096a24d) - Add "enableLoadingSkeleton" to allow rendering skeleton loading style

## 4.1.7

### Patch Changes

- [`d03bff2147`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d03bff2147) - updated translations

## 4.1.6

### Patch Changes

- [`ee96552185`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee96552185) - Allow pre-fetch data when hovering on People trigger button

## 4.1.5

### Patch Changes

- [`6faad6281d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6faad6281d) - Upgrade deps and add max-height for people menu wrapper

## 4.1.4

### Patch Changes

- [`2e8f4ca03e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e8f4ca03e) - change feature exposed event fired when the user is exposed to the invite-people component

## 4.1.3

### Patch Changes

- [`ad0d231505`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad0d231505) - Fix a bug - should not pre-fetch data so many times and upgrade version of "@atlassian/people-teams"

## 4.1.2

### Patch Changes

- [`5e73775960`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e73775960) - Update invite people

## 4.1.1

### Patch Changes

- [`e2398a1323`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e2398a1323) - Bump @atlassian/people-teams to @atlassian/people-menu

## 4.1.0

### Minor Changes

- [`cd9f4093ee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd9f4093ee) - Allow to pre-fetch data for People Menu. Addd a new prop "shouldPreFetch"

## 4.0.10

### Patch Changes

- [`4e51a05fb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e51a05fb2) - Fix analytics screen events

## 4.0.9

### Patch Changes

- [`76e86bfdf0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76e86bfdf0) - Update CTA copy to show product name

## 4.0.8

### Patch Changes

- [`b68c59f30d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b68c59f30d) - Add new attributes to the invite-component exposure event

## 4.0.7

### Patch Changes

- [`70aef9a3f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/70aef9a3f9) - Fire exposure event of the invite-people feature even when the feature is disabled
- [`ac22267ddc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac22267ddc) - updated showFlags to showFlag and its implementation in invite-people
- Updated dependencies

## 4.0.6

### Patch Changes

- [`bee803057a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bee803057a) - Remove isVisible prop since it should be used by any products

## 4.0.5

### Patch Changes

- [`4ccb5e67db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ccb5e67db) - popluated invite-component with props.addFlag

## 4.0.4

### Patch Changes

- [`9fad40b390`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fad40b390) - Bump invite-people

## 4.0.3

### Patch Changes

- [`62d0839919`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62d0839919) - TED-382: fix analytics events related to the invite component

## 4.0.2

### Patch Changes

- [`024fa0afe1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/024fa0afe1) - Fix the issue of invite-people modal getting closed when you clicked inside the modal

## 4.0.1

### Patch Changes

- [`8d7653b3e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d7653b3e5) - Fix styles on invite people component and update invite button content on people menu

## 4.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 3.1.5

### Patch Changes

- [`d76d259896`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d76d259896) - Fix styles of people-menu when it is rendered with NudgeTooltip in Jira

## 3.1.4

### Patch Changes

- [`8e819648bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e819648bd) - Fix SSR issue when people-menu is in Jira

## 3.1.3

### Patch Changes

- [`c2dfd4f9eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2dfd4f9eb) - Expose userRole as an optional prop in people-menu. This prop is used by invite-component to set the userRole.
- Updated dependencies

## 3.1.2

### Patch Changes

- [`304feee1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/304feee1bb) - Move @atlaskit/atlassian-navigation from dependencies list to peerDependencies and allow to close TeamCreateDialog when clicking overlay

## 3.1.1

### Patch Changes

- Updated dependencies

## 3.1.0

### Minor Changes

- [`38dad8764c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38dad8764c) - Added props to control dropdown visibility and override default chevron

## 3.0.1

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [`cfc600e1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfc600e1bb) - - Fix `onClick` prop to work as its expectation
  - Add 3 required props: `isOpen`, `onClose` and `onOpen`. So consumers are responsible to control open/close status of people-menu.

## 2.2.1

### Patch Changes

- [`56e4f3c6be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56e4f3c6be) - Fix a UI bug of people-menu when it is rendered in a small viewport

## 2.2.0

### Minor Changes

- [`68b3bfb668`](https://bitbucket.org/atlassian/atlassian-frontend/commits/68b3bfb668) - Add prop to indicate browse user permissions and render simplified view if the user does not have People access

## 2.1.2

### Patch Changes

- Updated dependencies

## 2.1.1

### Patch Changes

- [`309858beca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/309858beca) - Fix operational analytics events and update icon of Start a team menu item

## 2.1.0

### Minor Changes

- [`674dc24dfd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/674dc24dfd) - Adds the invite-people component to people-menu

## 2.0.0

### Major Changes

- [`76bc2fe390`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76bc2fe390) - Update some UX issues and re-use flag type from `@atlaskit/flag` for `addFlag` prop

### Patch Changes

- [`39faba6e98`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39faba6e98) - Update all the theme imports to something tree-shakable
- Updated dependencies

## 1.0.1

### Patch Changes

- [`a228348d6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a228348d6c) - Update some UX issues of Team Create Dialog and move test data into a new package @atlassian/ptc-test-utils

## 1.0.0

### Major Changes

- [`2a70d5d258`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a70d5d258) - Add Start a team menu item and remove "disableCreateTeam" prop

## 0.1.1

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`bf82e5bea0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf82e5bea0) - Add Invite a teammate functionality and a new prop enableInviteButton to control it

## 0.0.10

### Patch Changes

- Updated dependencies

## 0.0.9

### Patch Changes

- [`294d570bf2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/294d570bf2) - Create a new analytics channel for P&T package. Channel name is "peopleTeams"

## 0.0.8

### Patch Changes

- [`fba9ff5d48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fba9ff5d48) - Add more examples and sort dependencies in package.json file

## 0.0.7

### Patch Changes

- [`a394947d4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a394947d4f) - Update translation

## 0.0.6

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.0.5

### Patch Changes

- Updated dependencies

## 0.0.4

### Patch Changes

- [`95ca5c978b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95ca5c978b) - Adds missing check for undefined values

## 0.0.3

### Patch Changes

- [`520cedc905`](https://bitbucket.org/atlassian/atlassian-frontend/commits/520cedc905) - Add "disableCreateTeam" prop to not render Start a team menu item. Fix image file is not bundled in dist folder

## 0.0.2

### Patch Changes

- [`e31acde975`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e31acde975) - useTeamsOfService hooks needs to pass product and cloudId information and init new package @atlassian/people-menu- Updated dependencies
