# @atlassian/people-teams

## 2.6.2

### Patch Changes

- [`08d9ee658a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08d9ee658a7) - [ux] Change the team name field to use a placeholder. Placeholder is appropriate to use here as the text is just a prompt and conveys no additional information about the value expected.

## 2.6.1

### Patch Changes

- Updated dependencies

## 2.6.0

### Minor Changes

- [`95b788ad70f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95b788ad70f) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer of the modal to be on the right instead of the left.

### Patch Changes

- Updated dependencies

## 2.5.1

### Patch Changes

- Updated dependencies

## 2.5.0

### Minor Changes

- [`4148aa7c624`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4148aa7c624) - Support orgId prop to call Legion V3 endpoint for creating team and invite members

## 2.4.7

### Patch Changes

- [`784cac0a404`](https://bitbucket.org/atlassian/atlassian-frontend/commits/784cac0a404) - Add support for standalone directory as a product

## 2.4.6

### Patch Changes

- [`274bbfdb45e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/274bbfdb45e) - Slight modification to error handling process

## 2.4.5

### Patch Changes

- [`c66e2f5425e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c66e2f5425e) - downgraded modal-dialog to ^11.3.0 in invite-people

## 2.4.4

### Patch Changes

- [`aebc34ec894`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aebc34ec894) - Exclude 403s from team creation SLO failures

## 2.4.3

### Patch Changes

- [`f8cf7c90c94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f8cf7c90c94) - Added error attributes to analytics after failures so we can track issue causes

## 2.4.2

### Patch Changes

- [`7b14fe289a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b14fe289a4) - Add a new prop "peopleText" for people-menu package and allow to load language file by only locale without country code.

## 2.4.1

### Patch Changes

- [`a140da901f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a140da901f1) - Fix a wrong chunk name of loading i18n/vi.ts file

## 2.4.0

### Minor Changes

- [`b706c514179`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b706c514179) - Lazy-loading i18n messages

## 2.3.8

### Patch Changes

- [`d52601c3b9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d52601c3b9d) - - Corrected team name input label for screen readers

## 2.3.7

### Patch Changes

- [`d8808716112`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8808716112) - Pass user ids appropriately when inviting users and avoid setting state whilst unmounted

## 2.3.6

### Patch Changes

- [`0f94a791c67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f94a791c67) - Shorten i18n message ids to optimise bundle size

## 2.3.5

### Patch Changes

- [`deb8e7071b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/deb8e7071b6) - [ux] What’s the issue? Placeholder text is used to provide additional information.
  Why it matters? Placeholder text disappears when a user starts to type into the field.Users with cognitive impairments (such as dyslexia or attention disorders) and the elderly may have trouble remembering the purpose of the field if the label is not visible.
  More details you can find - https://a11y-internal.atlassian.net/browse/CLACCESS-201

## 2.3.4

### Patch Changes

- [`184770eae9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/184770eae9a) - Use "af:exports" to export components and functions. Consumer will stop import things directly via "@atlassian/people-teams"

## 2.3.3

### Patch Changes

- Updated dependencies

## 2.3.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.3.1

### Patch Changes

- Updated dependencies

## 2.3.0

### Minor Changes

- [`87e2d8ab0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87e2d8ab0f) - Add "disableSuccessFlag" and "extraAnalyticsAttrs"

## 2.2.5

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.2.4

### Patch Changes

- Updated dependencies

## 2.2.3

### Patch Changes

- Updated dependencies

## 2.2.2

### Patch Changes

- [`3c50349ede`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c50349ede) - Upgrade analytics-next to prevent event loss (https://hello.atlassian.net/wiki/spaces/AFP/blog/2020/08/26/828144759/ACTION+REQUIRED+-+upgrade+analytics-next+to+prevent+event+loss)

## 2.2.1

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.2.0

### Minor Changes

- [`b75914db43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b75914db43) - Do not show suggested team members if there is no query

## 2.1.7

### Patch Changes

- [`d03bff2147`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d03bff2147) - updated translations

## 2.1.6

### Patch Changes

- [`6faad6281d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6faad6281d) - Upgrade deps and add max-height for people menu wrapper

## 2.1.5

### Patch Changes

- [`e493451ed2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e493451ed2) - Updated dependencies

## 2.1.4

### Patch Changes

- [`42c58d5a2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42c58d5a2a) - fix a bug - "useTeamsOfService" and "useCollaboratorsService" do not receive "requestCacheTimeout" correctly

## 2.1.3

### Patch Changes

- [`63579d6903`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63579d6903) - Should send track analytics event for creating team and inviting members

## 2.1.2

### Patch Changes

- [`81a424fd81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/81a424fd81) - Correct the order of action buttons

## 2.1.1

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`13dfc889bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13dfc889bc) - Make useTeamsOfService and useCollaboratorsService to able to cache data for a specific timeout

## 2.0.1

### Patch Changes

- [`4e51a05fb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e51a05fb2) - Fix analytics screen events

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 1.0.5

### Patch Changes

- [`304feee1bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/304feee1bb) - Move @atlaskit/atlassian-navigation from dependencies list to peerDependencies and allow to close TeamCreateDialog when clicking overlay

## 1.0.4

### Patch Changes

- [`cdd8043737`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cdd8043737) - Fix a bug: title of success flag should show team name

## 1.0.3

### Patch Changes

- [`d38eb57d6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d38eb57d6f) - Update i18n message

## 1.0.2

### Patch Changes

- [`309858beca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/309858beca) - Fix operational analytics events and update icon of Start a team menu item

## 1.0.1

### Patch Changes

- [`7372bc3d40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7372bc3d40) - Fix addFlag called twice

## 1.0.0

### Major Changes

- [`76bc2fe390`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76bc2fe390) - Update some UX issues and re-use flag type from `@atlaskit/flag` for `addFlag` prop

### Patch Changes

- [`39faba6e98`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39faba6e98) - Update all the theme imports to something tree-shakable

## 0.2.3

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- [`a228348d6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a228348d6c) - Update some UX issues of Team Create Dialog and move test data into a new package @atlassian/ptc-test-utils

## 0.2.1

### Patch Changes

- [`b2016ceb6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2016ceb6e) - Add src and ref params in team url after creating a team successfully

## 0.2.0

### Minor Changes

- [`a448f31cfe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a448f31cfe) - Implement TeamCreateDialog

## 0.1.4

### Patch Changes

- [`653ef2ed6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/653ef2ed6a) - Add MemberPicker component but it's not used yet

## 0.1.3

### Patch Changes

- [`d467474880`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d467474880) - Prepare i18n wrapper for people-teams package

## 0.1.2

### Patch Changes

- [`fba9ff5d48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fba9ff5d48) - Add more examples and sort dependencies in package.json file

## 0.1.1

### Patch Changes

- [`131cee6d7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/131cee6d7a) - Add missing tslib dependency

## 0.1.0

### Minor Changes

- [`e31acde975`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e31acde975) - useTeamsOfService hooks needs to pass product and cloudId information and init new package @atlassian/people-menu

## 0.0.2

### Patch Changes

- [patch][82a3737aed](https://bitbucket.org/atlassian/atlassian-frontend/commits/82a3737aed):

  init new package @atlassian/people-teams
