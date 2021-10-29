# @atlassian/invite-people

## 7.5.3

### Patch Changes

- [`d671a35ebc8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d671a35ebc8) - Add new strings for translation

## 7.5.2

### Patch Changes

- [`e560ac54006`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e560ac54006) - Passed userRecommendatiosnCohort prop to Invite People in PeopleMenuContext

## 7.5.1

### Patch Changes

- [`739bdd3ca58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/739bdd3ca58) - Excluding googlemail.com from third party invites as its used instead of gmail.com in some countries

## 7.5.0

### Minor Changes

- [`94f69141121`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94f69141121) - [ux] Fixed productOptions prop to set available products and avoid hitting the capabilities API

## 7.4.2

### Patch Changes

- [`e72cc7dcf72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e72cc7dcf72) - Added exposure events for User Recommendations experiment

## 7.4.1

### Patch Changes

- [`497f60670db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/497f60670db) - Bugfix: When product is JWM, do not select all Jira products in customised product selector.

## 7.4.0

### Minor Changes

- [`0ca544f14e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ca544f14e4) - Added props for User Recommendations experiment

## 7.3.1

### Patch Changes

- [`61903f3eb50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61903f3eb50) - Refactoring retry login in integrations package
- Updated dependencies

## 7.3.0

### Minor Changes

- [`2ffcd0dd5f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ffcd0dd5f5) - Prop for enabling a newer share to slack API

### Patch Changes

- Updated dependencies

## 7.2.7

### Patch Changes

- [`4951753a498`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4951753a498) - Added flag to use Third Party API v2

## 7.2.6

### Patch Changes

- [`2ef75c86816`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef75c86816) - Adding enableThirdParty prop to invite-people - it will replace the cohort prop

## 7.2.5

### Patch Changes

- Updated dependencies

## 7.2.4

### Patch Changes

- [`e8732257342`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8732257342) - Instrumented analytics events for third party initialization capability

## 7.2.3

### Patch Changes

- [`6105f4955fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6105f4955fc) - Refactor and clean up test suite, fix minor bugs found in product select and loader

## 7.2.2

### Patch Changes

- [`b51821f5f12`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b51821f5f12) - Fixed bug with enableOpenInvite state
- [`fa2760e115e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa2760e115e) - Update cache logic for viral settings

## 7.2.1

### Patch Changes

- [`5c8015bf4cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c8015bf4cd) - Fix creatable-select accepting invalid emails in invite-people

## 7.2.0

### Minor Changes

- [`dc046631dc6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc046631dc6) - Refactored OpenInviteClient, HaveISeenItClient and InviteApiClient to include caching.

## 7.1.4

### Patch Changes

- [`73f1d9e2dd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73f1d9e2dd7) - Analytics additions for monitoring SLO

## 7.1.3

### Patch Changes

- [`ae40ae2d6d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae40ae2d6d3) - Fix and align email validatino across invite-people component

## 7.1.2

### Patch Changes

- [`ba46793d491`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba46793d491) - [ux] Hiding Google third party button for accounts with gmail.com email domain, the integration requires the account to be a GSuite account

## 7.1.1

### Patch Changes

- [`ac094e7463b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac094e7463b) - Remove unused types

## 7.1.0

### Minor Changes

- [`58f802d42fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58f802d42fa) - [ux] Viral checkboxes in invite people default to checked experiment

## 7.0.2

### Patch Changes

- [`bff8fd54c6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bff8fd54c6e) - Added source attribute to viral settings default to checked exposure event

## 7.0.1

### Patch Changes

- [`ff7c68c16e2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff7c68c16e2) - Update Invite People docs

## 7.0.0

### Major Changes

- [`958c17af1cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/958c17af1cb) - Migrated third party invites state to shared context and refactoring components, cleanup of invite from github experiment

## 6.3.2

### Patch Changes

- [`cfc8342cab1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cfc8342cab1) - Upgrade to the latest version of @atlaskit/modal-dialog.
- Updated dependencies

## 6.3.1

### Patch Changes

- [`0cf7bf2039b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cf7bf2039b) - [ux] Fix third party inttegration modal dialogs title size

## 6.3.0

### Minor Changes

- [`ff3650e2564`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff3650e2564) - Added the viralOptionsDefaultToCheckedFeatureFlag prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

## 6.2.8

### Patch Changes

- [`c6a03654f58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6a03654f58) - Duplicate id people-and-teams.invite-people.github.organizations.dialog.more.info removed in i18n messages

## 6.2.7

### Patch Changes

- [`0b92ca617f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b92ca617f2) - use AnalyticsErrorBoundary from analytics next

## 6.2.6

### Patch Changes

- [`7df57153dcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df57153dcf) - Placeholder text colour changed in product selector for accessibility

## 6.2.5

### Patch Changes

- Updated dependencies

## 6.2.4

### Patch Changes

- [`bf2ff92d909`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf2ff92d909) - Bug fixed by ensuring selectedProducts does not contain Jira Core when it is implied

## 6.2.3

### Patch Changes

- [`8f21bf5a826`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f21bf5a826) - Defined `shouldRenderProductSelect` earlier because variable may have been used before definition.

## 6.2.2

### Patch Changes

- Updated dependencies

## 6.2.1

### Patch Changes

- [`5465268b897`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5465268b897) - ICU-Message format was not compatible with 3rd Party Smartling. Strings with multiple plurals were split.

## 6.2.0

### Minor Changes

- [`c30a73c4451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c30a73c4451) - Prop added to enable the customised product selector in people menu and invite drawer.

  Mocked invite capabilities in People Menu example

  Tooltip field for Jira Work Management option in product selector now extends to entire area - not just info icon

## 6.1.0

### Minor Changes

- [`5554710cef7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5554710cef7) - Change invite logic for new product selector so that no invite is sent for JWM if it is included with another Jira product

## 6.0.1

### Patch Changes

- [`2f3d62f299c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f3d62f299c) - Update user-picker to fix translations, close modal if user clicks disconnect integration and is taken to account manage page

## 6.0.0

### Major Changes

- [`dc89b7e9d3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc89b7e9d3b) - Product selector is always enabled. the enableProductSelect prop is no longer present in the code base.

## 5.0.7

### Patch Changes

- [`c66e2f5425e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c66e2f5425e) - downgraded modal-dialog to ^11.3.0 in invite-people

## 5.0.6

### Patch Changes

- [`8b921180598`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b921180598) - [ux] fixed the overlap issue during sliding in for viral settings container in Core Invites

## 5.0.5

### Patch Changes

- [`99de8fc1a13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/99de8fc1a13) - Add error details to error boundary event. Add operational events for TOME usage.

## 5.0.4

### Patch Changes

- [`1f493e1dc65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f493e1dc65) - Bump `react-select` to v4.
- Updated dependencies

## 5.0.3

### Patch Changes

- [`159ce238ff0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/159ce238ff0) - Fire new screen event on invite people component render

## 5.0.2

### Patch Changes

- [`35085faf9e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35085faf9e3) - [ux] Visual fine tunning for viral settings in core invites

  - updated meatballs button and info icon button to subtle appearance
  - added ease-in-out for slide in animation
  - fixed slide in overlapping issue
  - added cache for open invite settings

## 5.0.1

### Patch Changes

- [`7b8537086cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b8537086cc) - Skip firing exposed event if initial feature cohort was not passed into the component via a prop

## 5.0.0

### Major Changes

- [`923231ce94b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/923231ce94b) - Removed gsync props & code due to experiment being removed

## 4.6.1

### Patch Changes

- [`cb1430b517f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb1430b517f) - [ux] Fix appearance of Team Central in Invite People dialog product dropdown

## 4.6.0

### Minor Changes

- [`ddbc91b4817`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ddbc91b4817) - Added optional invitePeopleDrawerMigrationCohort prop and fire feature exposed event for invite people drawer migration in people menu

## 4.5.0

### Minor Changes

- [`e41c1ada693`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e41c1ada693) - Removing english only restriction for INFI as we have translations, enabling INFI google button for admins since gsync will no longer be a part of the modal"

## 4.4.17

### Patch Changes

- [`425cb180308`](https://bitbucket.org/atlassian/atlassian-frontend/commits/425cb180308) - [ux] Reset viral settings checkboxes on product change

## 4.4.16

### Patch Changes

- [`06a42b0dce3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/06a42b0dce3) - improved analytics events for viral settings in core invites

## 4.4.15

### Patch Changes

- [`0f55ad1864e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f55ad1864e) - Removing hack to invite new Compass users to Jira

## 4.4.14

### Patch Changes

- [`9c797dccbee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c797dccbee) - [ux] fixed the order of the checkboxes in modal view

## 4.4.13

### Patch Changes

- Updated dependencies

## 4.4.12

### Patch Changes

- [`041d8b1e65b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/041d8b1e65b) - [ux] added animation to viral settings components

## 4.4.11

### Patch Changes

- [`b3a9977fffd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b3a9977fffd) - [ux] Added a z index setter to the viral settings info modal.

## 4.4.10

### Patch Changes

- [`820bca6061e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/820bca6061e) - [ux] Remove viral settings info modal banner

## 4.4.9

### Patch Changes

- [`8088589a24a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8088589a24a) - [ux] Updated display logic for Viral Settings experiment. Fixed logic for displaying open invite checkbox in viral settings modal.

## 4.4.8

### Patch Changes

- [`df920f02eac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df920f02eac) - Downgrade version of "@atlaskit/modal-dialog" in invite-people from "^11.3.0" to "^11.2.0"

## 4.4.7

### Patch Changes

- [`73de1f9a2d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73de1f9a2d8) - Use the correct new icon.

## 4.4.6

### Patch Changes

- [`295c40daf47`](https://bitbucket.org/atlassian/atlassian-frontend/commits/295c40daf47) - Fix reference error to product options

## 4.4.5

### Patch Changes

- [`7ba209170a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba209170a5) - Added analytic events for the viral settings experiment in invite-people. Updated invite-people package to include analytics changes and viral settings experiment changes. Updated viewed analytics event to include viral settings cohort value.

## 4.4.4

### Patch Changes

- [`dc11e149166`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc11e149166) - [ux] Add success and failure flags for updating viral settings on invite people component

## 4.4.3

### Patch Changes

- [`62d4d208b21`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62d4d208b21) - [ux] Optimise direct access eligibility checks by adding an in memory cache

## 4.4.2

### Patch Changes

- [`88850ad99e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88850ad99e0) - When viralSettingsCohort is variation the InvitePeople onSubmit will not update the OpenInvite and direact access for domain settings.

## 4.4.1

### Patch Changes

- [`076304e65db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/076304e65db) - Added test IDs to connect buttons to allow Pollinator checks to target them.

## 4.4.0

### Minor Changes

- [`877ecbe8876`](https://bitbucket.org/atlassian/atlassian-frontend/commits/877ecbe8876) - [ux] Add info modal to viral settings section in invite people component

## 4.3.1

### Patch Changes

- [`78c54a8761f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78c54a8761f) - Rewording some comments/types/descriptions to remove unnecessarily gendered phrasing
- Updated dependencies

## 4.3.0

### Minor Changes

- [`0a2602e2e0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a2602e2e0d) - [ux] Added UI behind `confluence.frontend.viral.settings.in.core.invites` feature flag. Added checkboxes for openInvite and enabling domains.

## 4.2.7

### Patch Changes

- [`21a58c23605`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21a58c23605) - [ux] enabled invitee list for non english locale users

## 4.2.6

### Patch Changes

- [`bc7d5206280`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc7d5206280) - Open GitHub orgs dialog on successfull OAuth connection

## 4.2.5

### Patch Changes

- [`969acffc0ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/969acffc0ed) - [ux] issue/INVITE-40 Users were able to submit by adding and then removing an email. This has been fixed by making sure the state updates when removing the last user in the inviteeList.

## 4.2.4

### Patch Changes

- [`5c8a30b785e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c8a30b785e) - [ux] added manage access settings link to core invites for admins

## 4.2.3

### Patch Changes

- [`d01a2545505`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d01a2545505) - [ux] Add option in github orgs dropdown to know more about missing orgs

## 4.2.2

### Patch Changes

- [`f7fe3a822e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7fe3a822e8) - Removed default value for viralSettingsCohort prop. Added viralSettingsCohort prop to InvitePeople from people-menu.

## 4.2.1

### Patch Changes

- [`61ad9e5b815`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61ad9e5b815) - Fixed/Updated condition for firing viral settings exposure event

## 4.2.0

### Minor Changes

- [`07717632c16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07717632c16) - Added viralSettingsCohort prop to invite-people, invite-people-drawer and people-menu. Operational feature exposed event will fire from invite-people.

## 4.1.3

### Patch Changes

- [`b67c9b37fb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b67c9b37fb9) - Fix incorrect github search results

## 4.1.2

### Patch Changes

- [`8dd55ea4255`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8dd55ea4255) - Add outbound auth error type to third party integration failed analytics event

## 4.1.1

### Patch Changes

- [`5ffd4febab4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ffd4febab4) - [ux] Fix incorrect text on successful github integration flag

## 4.1.0

### Minor Changes

- [`c496694090f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c496694090f) - [ux] Reversed previous change that removed the gsync/inviteelist flags. Minor bump because this adds optional props on the component.

## 4.0.0

### Major Changes

- [`21fb75f561a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21fb75f561a) - [ux] - Removed GSync experiment code

  - Removed invitee list CreatableSelect code in favour of UserPicker
  - Removed props for GSync and Invitee List; the user-picker version is always enabled.

## 3.9.12

### Patch Changes

- Updated dependencies

## 3.9.11

### Patch Changes

- Updated dependencies

## 3.9.10

### Patch Changes

- [`fbc240413f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fbc240413f4) - [ux] Fix UI overflow when four or more third party integrations are connected

## 3.9.9

### Patch Changes

- [`90fa104fa29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90fa104fa29) - [ux] Adds error boundary to the Invite people component

## 3.9.8

### Patch Changes

- [`3d1017240e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d1017240e1) - [ux] Fix Issue where modal dialogs are not visible when triggered from a drawer

## 3.9.7

### Patch Changes

- [`c50a63f9f72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c50a63f9f72) - Upgrade `@types/react-select` to `v3.1.2` and fix type breaks
- Updated dependencies

## 3.9.6

### Patch Changes

- [`e17c822422b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e17c822422b) - [ux] Add Button to invite from GitHub

## 3.9.5

### Patch Changes

- [`30917fcf3fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/30917fcf3fc) - [ux] Invite people modal will now close if a user chooses to connect a slack integration and is taken to the marketplace

## 3.9.4

### Patch Changes

- [`7b14fe289a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b14fe289a4) - Add a new prop "peopleText" for people-menu package and allow to load language file by only locale without country code.

## 3.9.3

### Patch Changes

- [`452df72a5e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/452df72a5e7) - bugfix core invites free type email input onFocus handler

## 3.9.2

### Patch Changes

- [`a140da901f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a140da901f1) - Fix a wrong chunk name of loading i18n/vi.ts file

## 3.9.1

### Patch Changes

- [`5f999c3bc31`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f999c3bc31) - Fix a bug - FormattedMessage inside AK Button does not re-render when locale is changed

## 3.9.0

### Minor Changes

- [`323987af567`](https://bitbucket.org/atlassian/atlassian-frontend/commits/323987af567) - Lazy-load i18n messages

## 3.8.10

### Patch Changes

- [`0f94a791c67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f94a791c67) - Shorten i18n message ids to optimise bundle size

## 3.8.9

### Patch Changes

- [`2fa697ba26e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fa697ba26e) - Added error text in case invite form with user-picker is submitted without any selected users or emails

## 3.8.8

### Patch Changes

- [`ea099a7314`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea099a7314) - Better handling of text input in invitee list

## 3.8.7

### Patch Changes

- [`7317208fc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7317208fc4) - added productSelect rendered event to core-invite

## 3.8.6

### Patch Changes

- [`931205bc00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/931205bc00) - added 'integration' attributes to the measurement events in core invite

## 3.8.5

### Patch Changes

- Updated dependencies

## 3.8.4

### Patch Changes

- [`7937b15e61`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7937b15e61) - bumped up invite-people version in people-menu and invite-people-drawer and updated the team property in package.json for invite-people and invite-people-drawer

## 3.8.3

### Patch Changes

- [`0b9be029df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b9be029df) - upgraded @atlaskit/logo version for JiraServiceManagementIcon

## 3.8.2

### Patch Changes

- [`88eb054bb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88eb054bb9) - fixed a typo for the flag message in invite-people

## 3.8.1

### Patch Changes

- [`1cf96ef0e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1cf96ef0e7) - Remove SAML check entirely for the gsync experiment

## 3.8.0

### Minor Changes

- [`c616f47a60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c616f47a60) - Added new props, and updated analytics event and flag copies for invite in jira project

## 3.7.7

### Patch Changes

- [`b102d314b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b102d314b5) - Showing Google instead of Workspace on third party google button, and a tooltip that explains the usage, minor refactor to logic and code in third party components

## 3.7.6

### Patch Changes

- [`7ce2ee24c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ce2ee24c7) - Modify invite-people form description i18n key name so that old values are not used

## 3.7.5

### Patch Changes

- [`3d46d9a8f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d46d9a8f8) - Fixing typo in microsoft third party related i18n key id's and description values
  Adding i18n for product select label

## 3.7.4

### Patch Changes

- [`af9e55903c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af9e55903c) - Fixing duplicate i18n keys in invite-people

## 3.7.3

### Patch Changes

- [`59b6178aaf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59b6178aaf) - Fixing value of experimentName in analytics event for third party invites feature
  Making sure to cohort only jira and confluence products for third party invites feature

## 3.7.2

### Patch Changes

- [`60852e5b0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60852e5b0d) - Add missing analytics events and props for third party invites feature

## 3.7.1

### Patch Changes

- [`17bf3a6f82`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17bf3a6f82) - Added some more tests and inlined a method.

## 3.7.0

### Minor Changes

- [`823b9bc67f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/823b9bc67f) - [ux] Integrate third party invite components into invite-people and add cohorting code

## 3.6.0

### Minor Changes

- [`e6d7d4fda5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6d7d4fda5) - Copy updates according to latest designs and vision

## 3.5.0

### Minor Changes

- [`ffbde3c839`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ffbde3c839) - Introducing a new optional prop that when available will return the invitation result.

## 3.4.7

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc
- Updated dependencies

## 3.4.6

### Patch Changes

- [`d92b78bf81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d92b78bf81) - [ux] introducing invite-people-drawer, a new component that wrap the invite-people component in a full width drawer; Updated mocks on invite-people.

## 3.4.5

### Patch Changes

- [`cec0cf651c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cec0cf651c) - Restrict invitee list to en locale till translations are done

## 3.4.4

### Patch Changes

- [`6ff41d5189`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ff41d5189) - Fixed a product select visibility/defaults issue which prevented the right
  selection happening when called from PTC embedded (jira) or PTC standalone (any
  product subscriptions)

## 3.4.3

### Patch Changes

- [`b1d4ef0904`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1d4ef0904) - Make GSync button visible on AdminHub API failure

## 3.4.2

### Patch Changes

- [`86aa382dce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/86aa382dce) - Fixed check for English locale

## 3.4.1

### Patch Changes

- [`4452ac6438`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4452ac6438) - Fixed a visibility bug for the GSync button, it now correctly uses the user role if one isn't passed in.

## 3.4.0

### Minor Changes

- [`0cf2afb533`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0cf2afb533) - [ux] Added a 'Sync with Google' button (takes the user to the AdminHub Google Workspace page) and switched email address fields to take multiple email addresses ("Invitee List").

## 3.3.1

### Patch Changes

- [`4e56fa2116`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e56fa2116) - Fix intl messages to ensure ICU format

## 3.3.0

### Minor Changes

- [`88431bb6c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88431bb6c1) - Adding the possibility to invite people to Dragonfruit.

## 3.2.19

### Patch Changes

- [`44143085fe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44143085fe) - [ux] Fix Confluence landing URL, include secondary Origin attributes

## 3.2.18

### Patch Changes

- [`10539d3f43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10539d3f43) - Removed unnecessary padding in product icon, to fix a layout issue when called from PTC.

## 3.2.17

### Patch Changes

- [`83a5928d54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83a5928d54) - Fix operational event invited attribute and remove exposure event when product is Jira

## 3.2.16

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.
- Updated dependencies

## 3.2.15

### Patch Changes

- [`6331d4f5ca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6331d4f5ca) - Bugfix on invite-component: fix success flag copy and invite track analytics event

## 3.2.14

### Patch Changes

- [`ea0d431b9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea0d431b9a) - Update copy of the success flag when inviting to multiple products

## 3.2.13

### Patch Changes

- [`4314da0cac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4314da0cac) - Handle subproducts and normalise for jira

## 3.2.12

### Patch Changes

- [`42f2dc78c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42f2dc78c2) - Bug fixes

## 3.2.11

### Patch Changes

- [`c6845a0302`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6845a0302) - Select all products

## 3.2.10

### Patch Changes

- [`d5f0ec8728`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5f0ec8728) - Add analytics event to the product select dropdown

## 3.2.9

### Patch Changes

- [`7e7c3772e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e7c3772e1) - [ux] Remove redundant microcopy next to the Jira Core label in Product Select

## 3.2.8

### Patch Changes

- [`c73c43bab1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c73c43bab1) - Allow for both APIs to finish before showing form

## 3.2.7

### Patch Changes

- [`a3f8780f9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a3f8780f9c) - Hide jira core with conditions, updates to copy and six bug for single product instances

## 3.2.6

### Patch Changes

- [`32f72993be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32f72993be) - Fixes copy and small design changes

## 3.2.5

### Patch Changes

- Updated dependencies

## 3.2.4

### Patch Changes

- [`db811886e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db811886e3) - Custom option for the product multi select

## 3.2.3

### Patch Changes

- [`a023813142`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a023813142) - [ux] Addressing edge cases in the product selection

## 3.2.2

### Patch Changes

- [`2ac834240e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ac834240e) - Undo analytics-next file restructure to allow external ts definitions to continue working

## 3.2.1

### Patch Changes

- Updated dependencies

## 3.2.0

### Minor Changes

- [`d904038e72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d904038e72) - [ux] Updating invite-people UI when the `enableProductSelect` option is enabled. Removing unnecessary exposure event from people-menu

### Patch Changes

- [`3ba0f34603`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ba0f34603) - Add experiment exposure event for product select

## 3.1.0

### Minor Changes

- [`7df56a25f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7df56a25f4) - Introducing new props to support the future release of the product select on invite component

## 3.0.12

### Patch Changes

- [`4bd3ca6426`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4bd3ca6426) - Update analytics attributes

## 3.0.11

### Patch Changes

- [`3c50349ede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c50349ede) - Upgrade analytics-next to prevent event loss (https://hello.atlassian.net/wiki/spaces/AFP/blog/2020/08/26/828144759/ACTION+REQUIRED+-+upgrade+analytics-next+to+prevent+event+loss)

## 3.0.10

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

- Updated dependencies

## 3.0.9

### Patch Changes

- [`dc14e812a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc14e812a6) - Invite component now supports invite to multiple products (when used in Jira)

## 3.0.8

### Patch Changes

- [`c2284feb7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2284feb7d) - Added a new method to invite api client to get invite capabilities

## 3.0.7

### Patch Changes

- [`d03bff2147`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d03bff2147) - updated translations

## 3.0.6

### Patch Changes

- [`25611ef392`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25611ef392) - Batch invite API client operational events

## 3.0.5

### Patch Changes

- [`62339d83c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62339d83c8) - Use window.location.host to determine environment for a copy link

## 3.0.4

### Patch Changes

- Updated dependencies

## 3.0.3

### Patch Changes

- [`28c2645021`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28c2645021) - fixed autocomplete bug in invite-people

## 3.0.2

### Patch Changes

- [`dd2aabdae6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd2aabdae6) - Make originProduct analytics event attribute lowercase

## 3.0.1

### Patch Changes

- [`9a0ee62a4c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a0ee62a4c) - This fixes the H3 tag style issue in confluence integration

## 3.0.0

### Major Changes

- [`ac22267ddc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac22267ddc) - updated showFlags to showFlag and its implementation in invite-people

## 2.1.9

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 2.1.8

### Patch Changes

- [`e20904333b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e20904333b) - Improve types and fix a couple analytics events

## 2.1.7

### Patch Changes

- [`3bae87be5a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3bae87be5a) - fixed flag related copies and links

## 2.1.6

### Patch Changes

- [`1adf2e66ba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1adf2e66ba) - added unit tests for flags in invite-people

## 2.1.5

### Patch Changes

- [`d097a505bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d097a505bf) - Minor copy changes in component

## 2.1.4

### Patch Changes

- [`62d0839919`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62d0839919) - TED-382: fix analytics events related to the invite component

## 2.1.3

### Patch Changes

- [`117c0362e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/117c0362e6) - Make the spinner use container width

## 2.1.2

### Patch Changes

- [`63bb0b05db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63bb0b05db) - added fetch mock to example, and updatd flag copies in invite people
- [`706382ae2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/706382ae2c) - fixed invite people input validation

## 2.1.1

### Patch Changes

- [`8d7653b3e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d7653b3e5) - Fix styles on invite people component and update invite button content on people menu

## 2.1.0

### Minor Changes

- [`4807cdfcbb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4807cdfcbb) - Fix Perms API path to get user permissions for logged in user.

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [`c2dfd4f9eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2dfd4f9eb) - Expose userRole as an optional prop in people-menu. This prop is used by invite-component to set the userRole.

## 1.1.1

### Patch Changes

- [`c1661febb0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1661febb0) - added analytics for invite api

## 1.1.0

### Minor Changes

- [`077f1b68f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/077f1b68f7) - connected invite api and handle result with flag messages

## 1.0.0

### Major Changes

- [`5ff8184e7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ff8184e7a) - Replace prop 'isAdmin' by 'userRole' which accepts a string instead of a boolean and will enable us to provide better copy to the users. Update component design and copy.

## 0.3.0

### Minor Changes

- [`d1ce715484`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1ce715484) - TS exports are fixed allowing it to be imported into any other component

## 0.2.1

### Patch Changes

- [`39faba6e98`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39faba6e98) - Update all the theme imports to something tree-shakable

## 0.2.0

### Minor Changes

- [`5b7915c614`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b7915c614) - Invite people component - in development

## 0.1.1

### Patch Changes

- [`0e5e02e5c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e5e02e5c9) - Adds bulk invite api client
- [`65a9f7c183`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65a9f7c183) - Permissions API client

## 0.1.0

### Minor Changes

- [`5e93cf008b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e93cf008b) - Invite people component - Dev preview only
