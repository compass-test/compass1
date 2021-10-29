# @atlassian/jsm-getting-started-panel

## 9.1.1

### Patch Changes

- Updated dependencies

## 9.1.0

### Minor Changes

- [`78f1ee83cc9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78f1ee83cc9) - [ux] Adding below entries for incident consolidation in Quick tours:

  - Basics category -> Go beyond the basics: Download JSM mobile app
  - Incidents category -> Level up your IM response: Navigate to incident management settings

## 9.0.2

### Patch Changes

- Updated dependencies

## 9.0.1

### Patch Changes

- Updated dependencies

## 9.0.0

### Major Changes

- [`b730706890c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b730706890c) - [ux] added support for opening documentation links in In-Product Help

## 8.3.4

### Patch Changes

- Updated dependencies

## 8.3.3

### Patch Changes

- Updated dependencies

## 8.3.2

### Patch Changes

- Updated dependencies

## 8.3.1

### Patch Changes

- [`05c623f78bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05c623f78bb) - Fix checklist task styling after @atlassiansox/checklist bump with style changes that removed rounded corners

## 8.3.0

### Minor Changes

- [`58c90a98979`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58c90a98979) - Removed jsm.gsp.sample.project.button feature flag, new behaviour is now the default (users with a JSM/J project will see a button on the home panel to visit/create an ITSM sample space)

### Patch Changes

- [`d4ff3aead4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4ff3aead4f) - Migrated to declarative entry points from deprecated automatic generation of entry points

## 8.2.0

### Minor Changes

- [`6558eba144e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6558eba144e) - Removed jsm.gsp.handle.deleted.projects feature flag, new behaviour is now the default (projects with the container property `projectDeleted` set to true are treated as if the user property `projectId` was set to undefined. This hides JSM/J functionality that would otherwise be broken in JSM/O when a project is deleted)

## 8.1.0

### Minor Changes

- [`541942ffaca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/541942ffaca) - Removed jsm.gsp.spa.links.enabled feature flag, new behaviour of using SPA links where possible instead of regular hrefs is now the default behaviour

## 8.0.3

### Patch Changes

- Updated dependencies

## 8.0.2

### Patch Changes

- Updated dependencies

## 8.0.1

### Patch Changes

- Updated dependencies

## 8.0.0

### Major Changes

- [`fcc466807f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcc466807f6) - Removed Your Coach feature flag

## 7.5.6

### Patch Changes

- [`185a9bbd749`](https://bitbucket.org/atlassian/atlassian-frontend/commits/185a9bbd749) - Moved feature flag initialise mock inline to test files to avoid duplicate mock file name error

## 7.5.5

### Patch Changes

- [`f5ca316e3df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5ca316e3df) - Updated hover state background for home panel navigation cards

## 7.5.4

### Patch Changes

- [`9d837c707f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d837c707f7) - Add extra test ids for integration testing in JFE

## 7.5.3

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.
- Updated dependencies

## 7.5.2

### Patch Changes

- [`16124ab35c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16124ab35c8) - fixed missing import in mocks file

## 7.5.1

### Patch Changes

- [`61dae22fa28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61dae22fa28) - Moved `defaultGspState` out of mock file

## 7.5.0

### Minor Changes

- [`6511442d34f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6511442d34f) - Fixed react hook rules violation runtime errors

## 7.4.0

### Minor Changes

- [`7cb37dc7ab3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7cb37dc7ab3) - [ux] Add a button to redirect to the ITSM Sample Space

## 7.3.8

### Patch Changes

- [`16a22a66cea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16a22a66cea) - Minor style fixes post-bug-bash

## 7.3.7

### Patch Changes

- [`52f98b9fa11`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52f98b9fa11) - Pass in feature flag as visibility container prop to avoid using hook incorrectly

## 7.3.6

### Patch Changes

- [`d12d9a98b5a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d12d9a98b5a) - [ux] Hide walkthroughs section and change documentation link for users with OG access only

## 7.3.5

### Patch Changes

- [`1adb4813f7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1adb4813f7c) - [ux] Fix documentation link flicker and improve storybooks

## 7.3.4

### Patch Changes

- [`0d3e2ad7ecd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d3e2ad7ecd) - [ux] Handle deleted JSM projects by removing any JSM related content from the GSP

## 7.3.3

### Patch Changes

- [`badc9223ed0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/badc9223ed0) - [ux] Add a sliding animation for moving between panels

## 7.3.2

### Patch Changes

- [`390394de149`](https://bitbucket.org/atlassian/atlassian-frontend/commits/390394de149) - Allow feature flags to be mocked easily in storybook examples and tests

## 7.3.1

### Patch Changes

- [`27c23765881`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27c23765881) - [ux] Fix styling bugs with OG frontend integration

## 7.3.0

### Minor Changes

- [`d7dfc6d0420`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7dfc6d0420) - Use tab visibility within lozenge component (requires passing in JSM/OG baseUrl props)

## 7.2.0

### Minor Changes

- [`171e955d472`](https://bitbucket.org/atlassian/atlassian-frontend/commits/171e955d472) - Changed feature flags to subscribe to updates

## 7.1.1

### Patch Changes

- [`3601880a631`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3601880a631) - [ux] Update copies for Your Coach

## 7.1.0

### Minor Changes

- [`28b28d2111d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28b28d2111d) - [ux] Make Home the default panel in Your Coach instead of Quickstart

## 7.0.1

### Patch Changes

- [`8f393cc2dba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8f393cc2dba) - Added missing screen and UI analytics events

## 7.0.0

### Major Changes

- [`a58e6dcfae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a58e6dcfae) - Added Fx3 feature flag client, and wired up existing flags to the client.

## 6.6.0

### Minor Changes

- [`408cfa06e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/408cfa06e6) - Fixed bug when panel and lozenge were in incorrect state when feature flag was off

## 6.5.0

### Minor Changes

- [`2cc729dd99`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cc729dd99) - [ux] Resetting tour now also minimizes the panel.

## 6.4.1

### Patch Changes

- [`6145e4288d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6145e4288d) - Added documentation link card to home section and fixed home section rocket styling

## 6.4.0

### Minor Changes

- [`6e8adbeafd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e8adbeafd) - Before to restart the tour we needed to perform DELETE request and then redirection. We've changed it to only rely on the redirection bit due to CORS issues with Opsgenie.

## 6.3.0

### Minor Changes

- [`f3c3087d05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3c3087d05) - [ux] This change adds navigation items to the home section with their proper styling

## 6.2.2

### Patch Changes

- [`d00f3b8b67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d00f3b8b67) - Added home section header card with minimize button and home section lozenge designs

## 6.2.1

### Patch Changes

- [`608819eabb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/608819eabb) - internal fix to move analytics provider above all components that can fire analytics

## 6.2.0

### Minor Changes

- [`2bb4d730b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2bb4d730b8) - [ux] The "Close quickstart" button is being changed to "Exit Your Coach". The behaviour of the button doesn't change.

## 6.1.1

### Patch Changes

- [`a4a954645b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4a954645b) - reverting passing in analytics-client as prop

## 6.1.0

### Minor Changes

- [`ce94ae308a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce94ae308a) - [ux] Getting Started Panel - added content to Walkthrough section and modified visibility of the tours

## 6.0.0

### Major Changes

- [`53f2c1bc76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53f2c1bc76) - Requires analytics-web-client to be passed in to the panel and lozenge components from each product

### Patch Changes

- Updated dependencies

## 5.4.0

### Minor Changes

- [`4c7b6b5285`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c7b6b5285) - [ux] Add walkthroughs panel tour restarts

## 5.3.1

### Patch Changes

- [`6bde0bea78`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bde0bea78) - Changed doc links to fire analytics on all click types

## 5.3.0

### Minor Changes

- [`1f1cf7d6e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f1cf7d6e5) - [ux] Add the Walkthroughs panel header

## 5.2.3

### Patch Changes

- [`4a69d128e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a69d128e4) - Update analytics-web-client dependency to version 1.14.0

## 5.2.2

### Patch Changes

- [`a81fbe2826`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a81fbe2826) - Fix type for tasks

## 5.2.1

### Patch Changes

- [`20e2d79370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20e2d79370) - Added user and tenant attributes to analytics events

## 5.2.0

### Minor Changes

- [`e38792a75b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e38792a75b) - [ux] Attempt to revert revert and clean up suspicious import

## 5.1.0

### Minor Changes

- [`974d72006c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/974d72006c) - Revert recent changes to try to fix bundle size

## 5.0.1

### Patch Changes

- [`108fc7ad07`](https://bitbucket.org/atlassian/atlassian-frontend/commits/108fc7ad07) - removed current reference as analytics-client is no longer a ref

## 5.0.0

### Major Changes

- [`7ccf8e9bd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ccf8e9bd5) - Remove documentation related types and mock data

## 4.1.1

### Patch Changes

- [`6a8d801421`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a8d801421) - preventing new AnalyticsWebClient every render

## 4.1.0

### Minor Changes

- [`0803d8d705`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0803d8d705) - [ux] Add version tracking and upgrading to section state module

## 4.0.1

### Patch Changes

- [`c6c7f5e5b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6c7f5e5b5) - testing feature flags via prop

## 4.0.0

### Major Changes

- [`1baba352ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1baba352ac) - Update section state types to support tours

## 3.1.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 3.1.1

### Patch Changes

- [`27ba0ad9c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27ba0ad9c4) - Rearrange and refactor code to increase reusability

## 3.1.0

### Minor Changes

- [`91000373a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91000373a4) - [ux] Allowing to go back to home section from walkthroughs

## 3.0.3

### Patch Changes

- [`55c2e6cfc3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/55c2e6cfc3) - Extract test id builder as a function

## 3.0.2

### Patch Changes

- [`cd5f17378e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd5f17378e) - [ux] Add a skeleton walkthroughs panel for future merge conflict reduction

## 3.0.1

### Patch Changes

- [`365d2a500a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/365d2a500a) - Add test ids for integration testing

## 3.0.0

### Major Changes

- [`45db4d097c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/45db4d097c) - [ux] Add back button to checklist header to allow access to the Home panel.

## 2.0.23

### Patch Changes

- [`444a561353`](https://bitbucket.org/atlassian/atlassian-frontend/commits/444a561353) - Add skeleton home panel

## 2.0.22

### Patch Changes

- [`b4b193bb2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4b193bb2e) - Added fake feature flag for Your Coach

## 2.0.21

### Patch Changes

- [`1a930629b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a930629b2) - Added option to use SPA router for GSP links

## 2.0.20

### Patch Changes

- [`05b12b91b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05b12b91b1) - Added intl provider

## 2.0.19

### Patch Changes

- [`5f5e049cb9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f5e049cb9) - updated SVG id to avoid clash in OG

## 2.0.18

### Patch Changes

- [`07a7f4bb85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07a7f4bb85) - [ux] Update copies in Incidents tasks to match post-GA text

## 2.0.17

### Patch Changes

- [`a9da60aca8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9da60aca8) - Update copies quick start -> quickstart
- [`c5f184fdc0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5f184fdc0) - [ux] Fix lozenge styles + add tooltips

## 2.0.16

### Patch Changes

- [`eaf1107818`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eaf1107818) - made baseUrls optional in flow types

## 2.0.15

### Patch Changes

- [`67e8869572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67e8869572) - [ux] minor styling tweaks to the lozenge

## 2.0.14

### Patch Changes

- [`cb726e9ae5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb726e9ae5) - converted lozenge HTML tag from button to div

## 2.0.13

### Patch Changes

- [`5a6177f2d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a6177f2d3) - Added explicit flow types for task visibility user property

## 2.0.12

### Patch Changes

- [`4c4376e554`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c4376e554) - [ux] Added a close button the the lozenge state of the panel

## 2.0.11

### Patch Changes

- [`885bdee582`](https://bitbucket.org/atlassian/atlassian-frontend/commits/885bdee582) - made projectId optional and checking for undefined instead of empty string
- [`eedc317498`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eedc317498) - Updated with final copy

## 2.0.10

### Patch Changes

- [`b75f7d95c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b75f7d95c6) - Fix svg clip path id clash (#clip0)

## 2.0.9

### Patch Changes

- [`26ef1b620d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/26ef1b620d) - Add baseUrls to VisibilityContainer for storybook examples
- [`4f6e32c1a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f6e32c1a1) - re-exporting Environment and HasSeenReopenSpotlight

## 2.0.8

### Patch Changes

- [`e9a39a970f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9a39a970f) - Fire error analytics for section state

## 2.0.7

### Patch Changes

- [`b2e51e55c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2e51e55c2) - Export Environment enum from top level of package

## 2.0.6

### Patch Changes

- [`6e8af8a0da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e8af8a0da) - Swapped hasSeenReopenSpotlight type from boolean to enum

## 2.0.5

### Patch Changes

- [`42952b6d72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42952b6d72) - [ux] Fix a minor visual bug with focus state on header tab button

## 2.0.4

### Patch Changes

- [`dc5651ed5a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc5651ed5a) - Top level error reporting plus fixes for misc analytics bugs and improved analytics test coverage

## 2.0.3

### Patch Changes

- [`38ec967dc1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38ec967dc1) - [ux] Explicitly set box-sizing: content-box for OpsGenie compatibility

## 2.0.2

### Patch Changes

- [`268d1a90b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/268d1a90b2) - filtering out product specific tabs if baseUrl for that product is missing

## 2.0.1

### Patch Changes

- [`dce5645dba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dce5645dba) - [ux] Include inheritied-from-jira styles explicitly in GSP to resolve minor visual differences

## 2.0.0

### Major Changes

- [`debb4e896d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/debb4e896d) - Handle analytics events internally, prop change needed to correctly set up analytics client

### Patch Changes

- [`3e569f2fc1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e569f2fc1) - Fire UI analytics events for missing user interactions

## 1.1.4

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.1.3

### Patch Changes

- [`7aa192dbf4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7aa192dbf4) - fix to ensure links to other product open in new tab

## 1.1.2

### Patch Changes

- [`a00cdda186`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a00cdda186) - filtering out basics and changes tabs when `projectId` is an empty string

## 1.1.1

### Patch Changes

- [`72e5642ca2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72e5642ca2) - Unit test changes
- [`32958296b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32958296b0) - Use section state hook in lozenge

## 1.1.0

### Minor Changes

- [`b139e8eca8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b139e8eca8) - Refactor of the visibility logic. Things should work the same.

## 1.0.0

### Major Changes

- [`b10560bc2b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b10560bc2b) - Visibility logic changed to make undefined entries visible by default. Also added some minor copy changes and disabled one task: "Turn on automation rules".

## 0.5.3

### Patch Changes

- [`2f11066142`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f11066142) - Add error handling/internal section state

## 0.5.2

### Patch Changes

- [`36a78e812f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/36a78e812f) - exporting default state for flow types

## 0.5.1

### Patch Changes

- [`609d4cce97`](https://bitbucket.org/atlassian/atlassian-frontend/commits/609d4cce97) - Add validation logic for sectionState

## 0.5.0

### Minor Changes

- [`ee1e0e7cef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee1e0e7cef) - [ux] Added visibility configuration to allow hiding sections or tasks which users should not be able to see

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`676a00638f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/676a00638f) - Refactor GSP to use silverthrone response state

## 0.3.5

### Patch Changes

- [`92b7cc641f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92b7cc641f) - [ux] Stop clicks in checklist tasks from closing the task

## 0.3.4

### Patch Changes

- Updated dependencies

## 0.3.3

### Patch Changes

- [`586ea6e56c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/586ea6e56c) - Update bold text font weight and use default blue links

## 0.3.2

### Patch Changes

- [`24fb98ee4c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24fb98ee4c) - [ux] Add larger max heights for the expanded checklist items

## 0.3.1

### Patch Changes

- [`79e7855b04`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79e7855b04) - [ux] Fix styled papercuts in checklist tasks

## 0.3.0

### Minor Changes

- [`6d2a65eeb6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d2a65eeb6) - added separate props for individual product base urls

## 0.2.7

### Patch Changes

- [`2b7024eafb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b7024eafb) - [ux] add on click handlers for final task links to complete those tasks

## 0.2.6

### Patch Changes

- [`edc9cf0da3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/edc9cf0da3) - swapped learn more link buttons for links and added analytics

## 0.2.5

### Patch Changes

- [`3386b0033c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3386b0033c) - [ux] Fix url for service hub

## 0.2.4

### Patch Changes

- [`d71c339269`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d71c339269) - [ux] Minor content changes

## 0.2.3

### Patch Changes

- [`43da0d2dbe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43da0d2dbe) - [ux] Add links for Incidents checklist

## 0.2.2

### Patch Changes

- [`d1d9a552ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1d9a552ed) - Standardise i18n key

## 0.2.1

### Patch Changes

- [`24fa917a66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24fa917a66) - [ux] Add links for Changes checklist tasks

## 0.2.0

### Minor Changes

- [`76a99061cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76a99061cf) - refactored completed tasks to be a separate prop, to match the backend response

## 0.1.5

### Patch Changes

- [`e31beb0cba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e31beb0cba) - Add links and analytics for all Basics checklist tasks

## 0.1.4

### Patch Changes

- [`c33fb702ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c33fb702ff) - Update TaskId constants to match backend values

## 0.1.3

### Patch Changes

- [`3583bd962b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3583bd962b) - Fix minor style problems in checklist cards

## 0.1.2

### Patch Changes

- [`683dd71a7b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/683dd71a7b) - Enable tree shaking for GSP

## 0.1.1

### Patch Changes

- [`2a27f2aeea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a27f2aeea) - Rewrite ItemCardContent to take elements not message descriptors

## 0.1.0

### Minor Changes

- [`9bce1e407e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9bce1e407e) - Move to common active and visual states to sync experience across products

## 0.0.38

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 0.0.37

### Patch Changes

- [`1319e4b113`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1319e4b113) - added 'exit quick start' button

## 0.0.36

### Patch Changes

- [`119f7d3d02`](https://bitbucket.org/atlassian/atlassian-frontend/commits/119f7d3d02) - Add url data context

## 0.0.35

### Patch Changes

- [`e1200167a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1200167a4) - Export flow type for TaskIdType

## 0.0.34

### Patch Changes

- [`c638a01059`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c638a01059) - added prop to gsp state to track reopen spotlight

## 0.0.33

### Patch Changes

- [`cadda642c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cadda642c5) - exporting comming mocks
- [`a6153ec076`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6153ec076) - Add tests for analytics payloads

## 0.0.32

### Patch Changes

- [`4ca98ca7e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ca98ca7e1) - Export tab specific TaskIds

## 0.0.31

### Patch Changes

- [`7be88695bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7be88695bd) - Export Lozenge, improve types, add unit tests

## 0.0.30

### Patch Changes

- [`4a3ad8061d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a3ad8061d) - Added unit tests for ChecklistSection and GettingStartedPanel

## 0.0.29

### Patch Changes

- [`50efdcf5c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50efdcf5c5) - Refactor header card

## 0.0.28

### Patch Changes

- [`8ba1a8ec7b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ba1a8ec7b) - Fix how svgs are handled within GSP

## 0.0.27

### Patch Changes

- [`11267204c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11267204c6) - Update unit tests

## 0.0.26

### Patch Changes

- [`c6a5d913fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6a5d913fd) - Added ChecklistSection and GettingStartedPanel components

## 0.0.25

### Patch Changes

- Updated dependencies

## 0.0.24

### Patch Changes

- [`1d88df656c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d88df656c) - Adds lozenge (open button) for GSP

## 0.0.23

### Patch Changes

- [`96cdc89277`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96cdc89277) - Tests added for tab container components

## 0.0.22

### Patch Changes

- [`d0843b3f5c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0843b3f5c) - Add analytics to the header card

## 0.0.21

### Patch Changes

- [`aebefdb8a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aebefdb8a3) - Add AnalyticsListener in storybook

## 0.0.20

### Patch Changes

- [`1880fba30c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1880fba30c) - Add unit tests
- [`8fcea80c10`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8fcea80c10) - Update unit tests for conciseness

## 0.0.19

### Patch Changes

- [`9b239f6398`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b239f6398) - Changed major to patch

## 0.0.18

### Patch Changes

- [`3f03fe136e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f03fe136e) - Delete unused old styles

## 0.0.17

### Patch Changes

- [`f1bde72e6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1bde72e6a) - Added GSP checklist tab containers for Basics, Changes and Incidents tabs

## 0.0.16

### Patch Changes

- [`c33ae5163f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c33ae5163f) - Use real svgs

## 0.0.15

### Patch Changes

- [`9386bf030f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9386bf030f) - Make the HeaderCard prop api conform to common types

## 0.0.14

### Patch Changes

- [`002c37b073`](https://bitbucket.org/atlassian/atlassian-frontend/commits/002c37b073) - Export flow types

## 0.0.13

### Patch Changes

- [`f6d1c333b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6d1c333b0) - Update styles and use correct components for the header card

## 0.0.12

### Patch Changes

- [`c3b91f48ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3b91f48ef) - Updated checklist item card content

## 0.0.11

### Patch Changes

- [`dc628b6f3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc628b6f3f) - Added checklist card item content

## 0.0.9

### Patch Changes

- [`19de7ed239`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19de7ed239) - Add basic prototype for header card

## 0.0.8

### Patch Changes

- [`7b7369ddfe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b7369ddfe) - Add basic prop types for header card

## 0.0.7

### Patch Changes

- [`965f14653f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/965f14653f) - skeleton for GSP

## 0.0.6

### Patch Changes

- [`1575d2348f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1575d2348f) - GSP state types and common mocks

## 0.0.5

### Patch Changes

- [`b707d8d600`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b707d8d600) - refactored location of prototype

## 0.0.4

### Patch Changes

- Updated dependencies

## 0.0.3

### Patch Changes

- [`6248a834c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6248a834c6) - still alpha version

## 0.0.2

### Patch Changes

- [`25315ecd30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25315ecd30) - Initial commit for this package
