# @atlassian/invite-people-drawer

## 2.4.1

### Patch Changes

- [`739bdd3ca58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/739bdd3ca58) - Excluding googlemail.com from third party invites as its used instead of gmail.com in some countries

## 2.4.0

### Minor Changes

- [`0ca544f14e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ca544f14e4) - Added props for User Recommendations experiment

### Patch Changes

- Updated dependencies

## 2.3.1

### Patch Changes

- [`61903f3eb50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61903f3eb50) - Refactoring retry login in integrations package

## 2.3.0

### Minor Changes

- [`5f963362472`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f963362472) - New optional props for enabling v2 apis for invite people slack and exus

## 2.2.1

### Patch Changes

- [`2ef75c86816`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef75c86816) - Adding enableThirdParty prop to invite-people - it will replace the cohort prop

## 2.2.0

### Minor Changes

- [`cf853e39278`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf853e39278) - Adds a testId to the Drawer component.

### Patch Changes

- Updated dependencies

## 2.1.1

### Patch Changes

- [`6105f4955fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6105f4955fc) - Refactor and clean up test suite, fix minor bugs found in product select and loader

## 2.1.0

### Minor Changes

- [`04984822009`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04984822009) - Bump invite-people to include a couple patches and viral settings default to checked experiment

## 2.0.1

### Patch Changes

- [`5c8015bf4cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c8015bf4cd) - Fix creatable-select accepting invalid emails in invite-people

## 2.0.0

### Major Changes

- [`958c17af1cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/958c17af1cb) - Migrated third party invites state to shared context and refactoring components, cleanup of invite from github experiment

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- [`4977c87ab5d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4977c87ab5d) - Bump invite-people

## 1.2.0

### Minor Changes

- [`ff3650e2564`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff3650e2564) - Added the viralOptionsDefaultToCheckedFeatureFlag prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [`c30a73c4451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c30a73c4451) - Prop added to enable the customised product selector in people menu and invite drawer.

  Mocked invite capabilities in People Menu example

  Tooltip field for Jira Work Management option in product selector now extends to entire area - not just info icon

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [`2f3d62f299c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f3d62f299c) - Update user-picker to fix translations, close modal if user clicks disconnect integration and is taken to account manage page

## 1.0.0

### Major Changes

- [`dc89b7e9d3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc89b7e9d3b) - Product selector is always enabled. the enableProductSelect prop is no longer present in the code base.

### Patch Changes

- Updated dependencies

## 0.8.5

### Patch Changes

- [`0c0e3a5652b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c0e3a5652b) - downgraded modal-dialog to ^11.3.0 in invite-people-drawer

## 0.8.4

### Patch Changes

- [`c66e2f5425e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c66e2f5425e) - downgraded modal-dialog to ^11.3.0 in invite-people

## 0.8.3

### Patch Changes

- [`29bc2abc00f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29bc2abc00f) - bumped invite-people to ^5.0.6 in invite-people-drawer

## 0.8.2

### Patch Changes

- [`e7d28cab8b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7d28cab8b9) - updated invite-people to 5.0.2

## 0.8.1

### Patch Changes

- [`7b8537086cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b8537086cc) - Skip firing exposed event if initial feature cohort was not passed into the component via a prop

## 0.8.0

### Minor Changes

- [`923231ce94b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/923231ce94b) - Removed gsync props & code due to experiment being removed

### Patch Changes

- Updated dependencies

## 0.7.0

### Minor Changes

- [`7dbbceda4e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7dbbceda4e5) - removed feature exposed event for invite people drawer migration, and replaced with cohort data

## 0.6.7

### Patch Changes

- [`e41c1ada693`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e41c1ada693) - Removing english only restriction for INFI as we have translations, enabling INFI google button for admins since gsync will no longer be a part of the modal"
- Updated dependencies

## 0.6.6

### Patch Changes

- [`590360b1634`](https://bitbucket.org/atlassian/atlassian-frontend/commits/590360b1634) - Fired feature exposed event for invite people drawer migration in people menu
  Bumped up invite-people version to ^4.4.16

## 0.6.5

### Patch Changes

- [`2e2e4a6b11f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e2e4a6b11f) - [ux] Updated invite-people to '^4.4.12'.

## 0.6.4

### Patch Changes

- [`d2661bdf9f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2661bdf9f1) - Bump invite-people to "^4.4.6"

## 0.6.3

### Patch Changes

- [`7ba209170a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba209170a5) - Added analytic events for the viral settings experiment in invite-people. Updated invite-people package to include analytics changes and viral settings experiment changes. Updated viewed analytics event to include viral settings cohort value.

## 0.6.2

### Patch Changes

- [`8ddfaf62efa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ddfaf62efa) - [ux] Bump invite-people to 4.2.6

## 0.6.1

### Patch Changes

- [`2493f8be1aa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2493f8be1aa) - Bump invite-people to 4.2.3

## 0.6.0

### Minor Changes

- [`07717632c16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07717632c16) - Added viralSettingsCohort prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

### Patch Changes

- Updated dependencies

## 0.5.0

### Minor Changes

- [`c496694090f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c496694090f) - [ux] Reversed previous change that removed the gsync/inviteelist flags. Minor bump because this adds optional props on the component.

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- Updated dependencies

## 0.4.3

### Patch Changes

- [`7263804b4ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7263804b4ad) - [ux] Fix UI overflow when four or more third party integrations are connected

## 0.4.2

### Patch Changes

- [`d3ed63080ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3ed63080ba) - Fix incorrect value passed for gitHubInviteCohort prop

## 0.4.1

### Patch Changes

- [`4e9bb59bab8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e9bb59bab8) - Bump invite-people to 3.9.8

## 0.4.0

### Minor Changes

- [`f561bb7f803`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f561bb7f803) - [ux] - Add more attributes to 'invite-people-drawer' to expose more control over 'invite-people' child component

  - Use new 'invite-people-drawer' attributes and replace 'invite-people' and ModalDialog with 'invite-people-drawer' in 'people-menu'.
    UX-Change: 'people-menu' now using drawer ('invite-people-drawer') and not dialog for Invite-People

## 0.3.7

### Patch Changes

- [`0b2ee14ed14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b2ee14ed14) - Bump invite-people package version

## 0.3.6

### Patch Changes

- [`6809c4cef0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6809c4cef0f) - bumping invite people component in consumers, new version includes improved validation for submitting empty forms

## 0.3.5

### Patch Changes

- [`88fcc61c8c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88fcc61c8c0) - [ux] enabled the cancel button for core-invite inside invite people drawer

## 0.3.4

### Patch Changes

- [`ab10f5f3f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab10f5f3f1) - pumped up invite-people to ^3.8.7

## 0.3.3

### Patch Changes

- [`7937b15e61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7937b15e61) - bumped up invite-people version in people-menu and invite-people-drawer and updated the team property in package.json for invite-people and invite-people-drawer

## 0.3.2

### Patch Changes

- [`03d6c2b172`](https://bitbucket.org/atlassian/atlassian-frontend/commits/03d6c2b172) - added a z index setter in invite people drawer

## 0.3.1

### Patch Changes

- [`a315361223`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a315361223) - Fix alignments

## 0.3.0

### Minor Changes

- [`c616f47a60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c616f47a60) - Added new props, and updated analytics event and flag copies for invite in jira project

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`6e67925c81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e67925c81) - [ux] Hide cancel button on invite-people form

## 0.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.1.1

### Patch Changes

- [`d92b78bf81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d92b78bf81) - [ux] introducing invite-people-drawer, a new component that wrap the invite-people component in a full width drawer; Updated mocks on invite-people.
