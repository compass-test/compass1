# @atlassian/product-search-dialog

## 7.57.1

### Patch Changes

- [`9ae6eb78783`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ae6eb78783) - Added graphQL client for search

## 7.57.0

### Minor Changes

- [`fb4f9ed0c05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb4f9ed0c05) - [ux] Result counts should now always be correct. Previously they were incorrect when there were pre-query items included in the post query search results (which were not returned as part of the post-query search result query).

## 7.56.1

### Patch Changes

- [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal upgrade of memoize-one to 6.0.0

## 7.56.0

### Minor Changes

- [`fe8fde917f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe8fde917f8) - [ux] Pressing enter in the search input whilst the opsgenie tab is selected now navigates to advanced search with the current query

## 7.55.1

### Patch Changes

- [`7f64b612219`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f64b612219) - Change stargate staging urls to the actual hostnames of the sites.

## 7.55.0

### Minor Changes

- [`25122a04f6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25122a04f6f) - Capitalise the opsgenie alert status.

## 7.54.1

### Patch Changes

- [`c3f88e3fd53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3f88e3fd53) - Integrate sticky search with the interactive placeholder skeleton input SSR

## 7.54.0

### Minor Changes

- [`8dc07a2a3f3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8dc07a2a3f3) - [ux] Opsgenie alerts in the opsgenie tab will now have the appropriate severity icons

## 7.53.4

### Patch Changes

- [`0357c7a4ef1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0357c7a4ef1) - Added instrumentation to sticky search feature

## 7.53.3

### Patch Changes

- [`8c06332f270`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c06332f270) - Bumping search-dialog package

## 7.53.2

### Patch Changes

- [`4cd1e1dabfd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cd1e1dabfd) - Started emiting the correct containerId to searchResult selected (client) GASv3 event

## 7.53.1

### Patch Changes

- [`4b08f595985`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b08f595985) - [ux] Add a couple more features for sticky search

## 7.53.0

### Minor Changes

- [`3d9cb003014`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d9cb003014) - Added documentation of generic search dialog and search product components. Removed infinite loop bug when failing to fetch an abTest in the extensible dialog. Removed redundant props from SearchDialogProduct. Removed inline conditional rendering of custome Footer component which failed to render.

## 7.52.0

### Minor Changes

- [`5f7be8052c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f7be8052c8) - [ux] Implement a new context provider to store query and filters for sticky search and the SSR interactive placeholder skeleton

## 7.51.2

### Patch Changes

- [`a001185440c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a001185440c) - Fixed a typo in the status filter JQL that gets used when navigating to advanced search whilst the 'Open' filter is selected

## 7.51.1

### Patch Changes

- Updated dependencies

## 7.51.0

### Minor Changes

- [`367b0cf84e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/367b0cf84e4) - Add explicit limits to Confluence's recentlyviewed api calls

## 7.50.0

### Minor Changes

- [`d681ee45c76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d681ee45c76) - Add data-test-ids for tabs

## 7.49.0

### Minor Changes

- [`0a65c229fda`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a65c229fda) - [ux] A search input skeleton that is interactive has been added. This allows user to type into the search input prior to the search dialog being fully loaded. Currently, this is an opt-in feature via a prop on ProductSearchInputSkeleton.

### Patch Changes

- Updated dependencies

## 7.48.0

### Minor Changes

- [`db29e3c4018`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db29e3c4018) - adding avocado tap to product search dialog

## 7.47.0

### Minor Changes

- [`6da74178628`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6da74178628) - Add opsgenie tab with its storybook.

## 7.46.1

### Patch Changes

- Updated dependencies

## 7.46.0

### Minor Changes

- [`8e50097f440`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e50097f440) - [ux] Clicking on the search dialog now closes popups which are open.

## 7.45.1

### Patch Changes

- [`898a827d833`](https://bitbucket.org/atlassian/atlassian-frontend/commits/898a827d833) - Add smart analytics to contributor checkboxes

## 7.45.0

### Minor Changes

- [`3cf4a069ecf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3cf4a069ecf) - [ux] Added some padding at the bottom of the faulty screens i.e. no result and error screens.

## 7.44.0

### Minor Changes

- [`af30e9d3a12`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af30e9d3a12) - [ux] Hide the enter icon if the advanced search header is not focused on. Show it only when it is highlighted.

## 7.43.0

### Minor Changes

- [`1d2e57a479f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d2e57a479f) - Split Bitbucket scopes calls to own request, remove GET scopes feature flagging

## 7.42.1

### Patch Changes

- [`5a242e0b093`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5a242e0b093) - Allow for passing a prop to use the experimental index for Confluence searches

## 7.42.0

### Minor Changes

- [`7a4e134230b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a4e134230b) - Add return icon to advanced search of bitbucket.

## 7.41.0

### Minor Changes

- [`ba0c580936c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba0c580936c) - Add customization of pre query input placeholder.

## 7.40.1

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 7.40.0

### Minor Changes

- [`434cb95e2cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/434cb95e2cf) - Use search dialog layout components for positioning PSD components.

## 7.39.0

### Minor Changes

- [`c77419c6f5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c77419c6f5b) - [ux] The 'View all Repositories' link in the bitbucket tab no longer appears in the pre query screen. Also it has been changed to 'View all results'.

## 7.38.1

### Patch Changes

- Updated dependencies

## 7.38.0

### Minor Changes

- [`269e2659711`](https://bitbucket.org/atlassian/atlassian-frontend/commits/269e2659711) - Doing this to have a released version with the translations.

## 7.37.0

### Minor Changes

- [`b2c1f6440f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2c1f6440f0) - [ux] The result counts for the bitbucket tab now show at the correct times. Specifically, it no longer appears in pre-query and faster search. Also, it only shows in the first section of post-query.

## 7.36.0

### Minor Changes

- [`12cf86b9835`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12cf86b9835) - [ux] Fixed janky transition between result and loading by fixing min height for loading to be the previous result screen.

## 7.35.0

### Minor Changes

- [`5f367963c1b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f367963c1b) - Fix loading spinner not appearing when typing a query

## 7.34.0

### Minor Changes

- [`92a84871e9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92a84871e9c) - Prevent the Confluence and Jira search dialogs from updating unnecessarily when re-rendering whilst collapsed

## 7.33.0

### Minor Changes

- [`e07138e0e11`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e07138e0e11) - Fix section titles in Bitbucket's prequery screen. Specifically, 'Repositories' has been changed to 'Recently Updated Repositories'.

## 7.32.0

### Minor Changes

- [`901a5df212c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/901a5df212c) - [ux] Removed behaviour of post query results remaining during postquery loading. Fixed redundant loading after tab transition into cache results

## 7.31.0

### Minor Changes

- [`7019f822007`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7019f822007) - fix jankiness because of debouncing logic and previous promise updating state before the latest promise resolved.

## 7.30.1

### Patch Changes

- [`334cef4b251`](https://bitbucket.org/atlassian/atlassian-frontend/commits/334cef4b251) - Fixed a bug where a search network call would be fired when the dialog was collapsed with a filter selected.

## 7.30.0

### Minor Changes

- [`d4f676a27fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d4f676a27fc) - Added pre and post query analytics. Refactored to not use the unsafe flag.

## 7.29.3

### Patch Changes

- [`a9b90732f6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9b90732f6f) - Use repository uuid as the id of the repository.

## 7.29.2

### Patch Changes

- [`108d7156b21`](https://bitbucket.org/atlassian/atlassian-frontend/commits/108d7156b21) - Implement navigating to advanced search when enter is pressed in Bitbucket, or any other "generic" component

## 7.29.1

### Patch Changes

- [`6fb248a3d2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fb248a3d2a) - Make URL generators for the Bitbucket tab optional. Bitbucket tab now ships with sensible default URLs, which _may_ be overridden by consumers.

## 7.29.0

### Minor Changes

- [`65a606b2043`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65a606b2043) - Create an option for Jira + Confluence scopes API requests to use a GET

  This is implemented in the search platform with HTTP side caching, greatly reducing the load on the backend

## 7.28.0

### Minor Changes

- [`6993a482e53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6993a482e53) - Pass jira and connie features properly to the feature provider.

## 7.27.0

### Minor Changes

- [`4fd2be15467`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4fd2be15467) - Prevent setting of state if inflight calls are in progress. Reset postQuery API state if user goes to preQuery.

## 7.26.0

### Minor Changes

- [`a6512e92bfe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6512e92bfe) - Move code and view all link generator to the storybook and pass query as a argument to the child template customizer.

## 7.25.0

### Minor Changes

- [`7bef7b97155`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7bef7b97155) - Fix Bitbucket tab advanced search link sizing in responsive nav

## 7.24.1

### Patch Changes

- [`bff780a58ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bff780a58ed) - Change jira prefetch item limit to 50 and remove experiment code

## 7.24.0

### Minor Changes

- [`8da224ba30c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8da224ba30c) - Calling onRetry now correctly causes a post query supplier call and state update

  Also allow the body section products to override the default result components

## 7.23.1

### Patch Changes

- [`428aa6bb4e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/428aa6bb4e8) - Fix isLoading attribute on advancedSearchLink selected event

## 7.23.0

### Minor Changes

- [`f7202fba088`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7202fba088) - Use workspace name for repository result meta text

## 7.22.0

### Minor Changes

- [`c16e641995e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c16e641995e) - Memoize post query supplier. Fix typo.

## 7.21.0

### Minor Changes

- [`a2c9c7229d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2c9c7229d9) - Changed mapping of the url and prioritise passed in suppliers over the default one.

## 7.20.0

### Minor Changes

- [`38bacd1cb4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38bacd1cb4f) - Revert optimization of keyboard wrapper as it broke the keyboard navigation for the search dialog.

## 7.19.0

### Minor Changes

- [`6d3f8e6cdee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d3f8e6cdee) - Make sure products returned from getProduct are referentially stable

## 7.18.0

### Minor Changes

- [`8203e242377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8203e242377) - Pass view all section link generator through the supplier.

## 7.17.27

### Patch Changes

- [`75afe9aabfd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/75afe9aabfd) - Add tests to ensure that network requests for recent items do not happen on re-renders and expanding/collapsing the search dialog

## 7.17.26

### Patch Changes

- [`b952e3dba4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b952e3dba4e) - Compute total size based on the length of the result set.

## 7.17.25

### Patch Changes

- [`0caa57d5daa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0caa57d5daa) - Changed the text of view all.

## 7.17.24

### Patch Changes

- [`99a6f15815d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/99a6f15815d) - Create a default result supplier hook to supply results to SearchDialogProduct

## 7.17.23

### Patch Changes

- [`84b388f04f5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84b388f04f5) - Show advanced search in postQueryLoading.

## 7.17.22

### Patch Changes

- [`7ed76208ddd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ed76208ddd) - Reset post query before triggering a fetch.

## 7.17.21

### Patch Changes

- [`28688bbb3d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/28688bbb3d0) - Added customization of the code search in bitbucket tab.

## 7.17.20

### Patch Changes

- [`4c6f2b1ac6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c6f2b1ac6e) - Add test to ensure products are registered with isDisplayed as false

## 7.17.19

### Patch Changes

- [`ae3a080bac8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae3a080bac8) - Added no result and error screen for generic dialog.
- [`3ca6932b57a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ca6932b57a) - Prevent excessive rendering of extensible search dialog, caused by keyboard handler refs.

## 7.17.18

### Patch Changes

- [`61deb2c9635`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61deb2c9635) - Added generic view all section link.

## 7.17.17

### Patch Changes

- [`a50b3ea1be6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a50b3ea1be6) - Added faster search logic.

## 7.17.16

### Patch Changes

- [`e13e264347c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e13e264347c) - Adds cacheing to generic prequery decorator

## 7.17.15

### Patch Changes

- [`59a6d2a592b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59a6d2a592b) - Product which registers first is no longer active by default

## 7.17.14

### Patch Changes

- [`a80dc1b0c66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a80dc1b0c66) - Added state machine logic and wired it up to storybook.

## 7.17.13

### Patch Changes

- [`1f493e1dc65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f493e1dc65) - Bump `react-select` to v4.
- Updated dependencies

## 7.17.12

### Patch Changes

- [`c53dbb03840`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c53dbb03840) - Add an order prop to allow tab order to be specified

## 7.17.11

### Patch Changes

- [`66f7fd2d75c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66f7fd2d75c) - Added advancedSearch generic component

## 7.17.10

### Patch Changes

- [`f545837abe3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f545837abe3) - Added tests for the getTotalNumberOfItemsInPreviousSections function

## 7.17.9

### Patch Changes

- [`9beecf1da6c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9beecf1da6c) - Added Generic Search Result component

## 7.17.8

### Patch Changes

- [`ec3e9f50a72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec3e9f50a72) - Update internal component usage
- Updated dependencies

## 7.17.7

### Patch Changes

- [`e8a4f1191ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8a4f1191ae) - Fix search results not being visible in mobile view

## 7.17.6

### Patch Changes

- [`ab7d1af8066`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab7d1af8066) - Create empty pre-query screens for Jira and Confluence

## 7.17.5

### Patch Changes

- Updated dependencies

## 7.17.4

### Patch Changes

- [`6987f6a389e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6987f6a389e) - Fix filters not resetting on collapse in storybook example

## 7.17.3

### Patch Changes

- [`abead5fd5ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/abead5fd5ad) - Wrap sideeffect inside the userEffect callback.

## 7.17.2

### Patch Changes

- [`cac7eecb767`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cac7eecb767) - Compose components into MultiProductDialog.

## 7.17.1

### Patch Changes

- [`e5e6be31217`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e5e6be31217) - Allow extensible search dialog products to pre-fetch items

## 7.17.0

### Minor Changes

- [`f0eeb81dded`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0eeb81dded) - Added new exports at the root level and abstracted the complexity of keyboard wrapper.

## 7.16.19

### Patch Changes

- [`16951affa84`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16951affa84) - Replicate componentDidMount with useEffect hook in product permissions check. This avoid invoking the API multiple times if a dep changes.

## 7.16.18

### Patch Changes

- [`96c901cde90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96c901cde90) - Combined search inputs and reused tab component.

## 7.16.17

### Patch Changes

- [`14a1c682c7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14a1c682c7d) - Added scopes check to the extensible architecture.

## 7.16.16

### Patch Changes

- [`6816ca71173`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6816ca71173) - Add user context to extensible architecture and add a component which updates the user context with Jira user.
- Updated dependencies

## 7.16.15

### Patch Changes

- [`0c99b1dd7b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c99b1dd7b9) - Create Jira + Confluence tab components for rendering Jira and Confluence tabs

## 7.16.14

### Patch Changes

- [`df7d681d7ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df7d681d7ac) - Added user context to extensible architecture

## 7.16.13

### Patch Changes

- [`c17fe6144f8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c17fe6144f8) - Upgrade to the latest version of `@atlaskit/tabs`
- Updated dependencies

## 7.16.12

### Patch Changes

- [`a43cdf8c1de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a43cdf8c1de) - Add query attributes inside dialog dismiss handler event.

## 7.16.11

### Patch Changes

- [`22177a0d293`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22177a0d293) - Added tab switch analytics event.

## 7.16.10

### Patch Changes

- [`5f56d2973a2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f56d2973a2) - Add experiment exposed and dialog dismiss handler.

## 7.16.9

### Patch Changes

- [`adc76a19afd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adc76a19afd) - Modified query context to also take care of attaching the query related analytics.

## 7.16.8

### Patch Changes

- [`d77c87a05c8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d77c87a05c8) - Added filters and features contexts to extensible dialog example

## 7.16.7

### Patch Changes

- [`ace4636234e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ace4636234e) - [ux] Show input skeleton while component is laoding data

## 7.16.6

### Patch Changes

- [`cda2cd7dfee`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cda2cd7dfee) - Add aggregator client for extensible architecture

## 7.16.5

### Patch Changes

- [`84d8f043be9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84d8f043be9) - Add features and filter context to Jira Search Dialog in extensible example

## 7.16.4

### Patch Changes

- [`cb9bcd46141`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb9bcd46141) - Add component to convert context for new components

## 7.16.3

### Patch Changes

- [`10d83a7a2b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10d83a7a2b5) - [ux] Extensible dialog no longer shows tabs when there is only one product

## 7.16.2

### Patch Changes

- [`2d7197f08a3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d7197f08a3) - Add sections to product router.

## 7.16.1

### Patch Changes

- [`90698e118e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90698e118e6) - Adds confluence and jira dialog with query context, to be consumed by the new components

## 7.16.0

### Minor Changes

- [`db163600182`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db163600182) - Adds metadata for tracking of confluence results

## 7.15.5

### Patch Changes

- [`675be14d787`](https://bitbucket.org/atlassian/atlassian-frontend/commits/675be14d787) - Unused props on icons have been removed.
- Updated dependencies

## 7.15.4

### Patch Changes

- [`e45fd0379d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e45fd0379d0) - Remove feature-flag for binary status category filter

## 7.15.3

### Patch Changes

- [`771fd54d6fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/771fd54d6fa) - Changed the context of SUP to quickSearch

## 7.15.2

### Patch Changes

- [`3b0d04ca4d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3b0d04ca4d4) - Added a wrapper context for all the contexts in the extensible dialog.

## 7.15.1

### Patch Changes

- [`3f551db7bed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f551db7bed) - filterOptions will include the query as an optional import
- Updated dependencies

## 7.15.0

### Minor Changes

- [`d30610a3833`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d30610a3833) - Extracted keyboard provider and focus handling

## 7.14.6

### Patch Changes

- [`4f0386e53b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f0386e53b3) - This change adds the beginnings of a new ABTestContextProvider. This component has been refactored from the existing ABTestProvider, where some side effects have been taken out. Also, it should be noted that this component is not complete as other contexts required by this component need to be made first.

## 7.14.5

### Patch Changes

- [`8d6a82191ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d6a82191ab) - Removes unused props from icon usage.
- Updated dependencies

## 7.14.4

### Patch Changes

- [`c876f7342d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c876f7342d7) - adds new context for isExpanded

## 7.14.3

### Patch Changes

- [`a4f08587254`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4f08587254) - Added active product search input component. Which returns the search input for the given active product.

## 7.14.2

### Patch Changes

- [`b0d2f8ef9de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0d2f8ef9de) - Moved the repeated logic of conf and jira inputs inside the product search input.

## 7.14.1

### Patch Changes

- [`4892ca14efc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4892ca14efc) - Create new route components for the extensible search dialog

## 7.14.0

### Minor Changes

- [`fc9f1e68d0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc9f1e68d0e) - added new product router component

## 7.13.1

### Patch Changes

- [`16364953955`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16364953955) - SUP can now clickout to the search dialog when a user hasn't been chosen

## 7.13.0

### Minor Changes

- [`7e615c92aa2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e615c92aa2) - [ux] Added a status category filter to the jira quick search filters

### Patch Changes

- Updated dependencies

## 7.12.1

### Patch Changes

- [`93adccb79a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/93adccb79a4) - The Smart User Picker now has the ability to use menuPosition which can allow it to be displayed on top of a dialog box.
- Updated dependencies

## 7.12.0

### Minor Changes

- [`4c7bc9847a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c7bc9847a4) - Added the Smart User Picker to Confluence quicksearch

### Patch Changes

- Updated dependencies

## 7.11.0

### Minor Changes

- [`6381a08d031`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6381a08d031) - [ux] This change increases the number of items that are prefetched by the Jira client for the search dialog. This is an increase from 30 to 50 items.

## 7.10.2

### Patch Changes

- [`fb51e3ecfbf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb51e3ecfbf) - Added analytics tests.

## 7.10.1

### Patch Changes

- [`a2af43cb251`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2af43cb251) - Revert a change which broke the filter analytics context

## 7.10.0

### Minor Changes

- [`5ed2e5f45fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ed2e5f45fd) - Revert to using QuickSearch.jspa for Jira advanced search links

## 7.9.4

### Patch Changes

- [`f2cd35d117`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2cd35d117) - Prevent recomputation of jira client provider on every render.

## 7.9.3

### Patch Changes

- [`a2962aa684`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2962aa684) - Refactor Jira advanced search link generation to route to /browse more often

## 7.9.2

### Patch Changes

- [`5106182720`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5106182720) - Load options in show more of site filters should return options for the entered query.

## 7.9.1

### Patch Changes

- [`43df209f59`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43df209f59) - Fix issue where Confluence advanced search links can include filters not present in the site

## 7.9.0

### Minor Changes

- [`7d4afbc17f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d4afbc17f) - Automatically populate space filters with the current space

## 7.8.1

### Patch Changes

- [`ed63c285ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed63c285ec) - Fix issue where advanced search links have JQL containing filter ids for projects which don't exist on that instance

## 7.8.0

### Minor Changes

- [`277303f8a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/277303f8a5) - Abstracted prepending the current user to assignee and people filters to avoid duplicated users

## 7.7.6

### Patch Changes

- [`24e2c5726e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e2c5726e) - [ux] Remove icons from site filter
- Updated dependencies

## 7.7.5

### Patch Changes

- [`7fa6be9d80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7fa6be9d80) - Filter selections are maintained between search dialog component states

## 7.7.4

### Patch Changes

- [`e53152a797`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e53152a797) - Refresh assignee filter on site filter change

## 7.7.3

### Patch Changes

- [`399f5cc88e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/399f5cc88e) - Confluence space filters refresh on site filter selection

## 7.7.2

### Patch Changes

- [`2bab437eec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2bab437eec) - For filter options fetch if none of the site is selected then pick the first 3.

## 7.7.1

### Patch Changes

- [`b143aa7458`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b143aa7458) - If no sites are selected than consider the first 3.

## 7.7.0

### Minor Changes

- [`02db192b45`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02db192b45) - [ux] Added support for having more than one site filter at a time
- [`381a15a7fe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/381a15a7fe) - Added multi site support to the search dialog clients so that multi site selection will make it to the backend

### Patch Changes

- [`9b2b1da271`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b2b1da271) - deduplicate urs and cpus results
- [`9c6cdc2e9b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c6cdc2e9b) - Implemented multi-tenant calls to collaboration graph for multi-site mode
- Updated dependencies

## 7.6.2

### Patch Changes

- [`8a3493b6bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8a3493b6bb) - Fixed bad storybook configuration

## 7.6.1

### Patch Changes

- [`dfbf0fb4fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfbf0fb4fd) - The current user is automatically populated in the contributor filter list for the confluence search dialog

## 7.6.0

### Minor Changes

- [`7a62d34d8f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a62d34d8f) - Internal changes. Now consuming styled components from search-dialog instead of custom internal components.

### Patch Changes

- Updated dependencies

## 7.5.9

### Patch Changes

- [`21e5f9543b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21e5f9543b) - Exposed more types at the root level and added additional documentation for existing types.

## 7.5.8

### Patch Changes

- [`353dceca1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/353dceca1a) - Remove experiments and refactor isPlansOn to hasAdvancedRoadmapsAccess

## 7.5.7

### Patch Changes

- [`73bc76d1f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73bc76d1f9) - Exposed constants and types at root level.

## 7.5.6

### Patch Changes

- [`ccd6b99c52`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ccd6b99c52) - [ux] Hide advanced search link on no results screen when multi-site is enabled

## 7.5.5

### Patch Changes

- [`f2edefc8fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2edefc8fd) - Query to match issue keys

## 7.5.4

### Patch Changes

- [`15124081e5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15124081e5) - [ux] Create a new cross site advanced search link component, which allows product-search-dialog to display a list of sites and allows the user to select a site to navigate to advanced search in.

## 7.5.3

### Patch Changes

- [`4cad9cee19`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4cad9cee19) - [ux] Hide advanced search links for multisite search

## 7.5.2

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 7.5.1

### Patch Changes

- [`5c33f84c05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c33f84c05) - Add more filter options will take into account the selected sites.

## 7.5.0

### Minor Changes

- [`206458270b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/206458270b) - For multi site users fetch filters when the site filters are changed.

## 7.4.0

### Minor Changes

- [`89620a4305`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89620a4305) - Added support for site filters when multi site is enabled

## 7.3.0

### Minor Changes

- [`8282bf1e57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8282bf1e57) - [ux] Added site filter to Jira and Confluence pane for the search dialog. Requires an explicit flag to enable.

## 7.2.0

### Minor Changes

- [`220d774308`](https://bitbucket.org/atlassian/atlassian-frontend/commits/220d774308) - Added multisite context to jira and confluence client providers.

## 7.1.0

### Minor Changes

- [`126a9ec0ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/126a9ec0ea) - Part of internal change to add support for switching sites in product-search-dialog. Added a site context that is available internally to product-search-dialog.

### Patch Changes

- Updated dependencies

## 7.0.5

### Patch Changes

- [`72fcc115db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72fcc115db) - Added storybook for multisite.

## 7.0.4

### Patch Changes

- [`e1f72813ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1f72813ed) - add prop `doProductPermissionsCheck` to disable permissions check for search
- Updated dependencies

## 7.0.3

### Patch Changes

- [`0e0f8291ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0e0f8291ab) - Fix product-search-dialog dependencies

## 7.0.2

### Patch Changes

- [`2c075fe5a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c075fe5a1) - Fixed typo in test.

## 7.0.1

### Patch Changes

- [`1c32975b4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c32975b4e) - Fix url of collab graph people results.

## 7.0.0

### Major Changes

- [`0c52da8fdd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c52da8fdd) - Renamed override prop to disableDefaultNavigationOnInput. It prevents default navigation behaviour for input component.

## 6.8.1

### Patch Changes

- [`839d993706`](https://bitbucket.org/atlassian/atlassian-frontend/commits/839d993706) - Added check for avatar urls being relative url in jira issues.

## 6.8.0

### Minor Changes

- [`397e1c07a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/397e1c07a8) - Added overrideDefaultNavigation to use the passedin onNavigate handler.

## 6.7.0

### Minor Changes

- [`7694e2ba5f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7694e2ba5f) - Added current user supplier in jira search provider.

## 6.6.3

### Patch Changes

- [`42bbc76f33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/42bbc76f33) - Added forward slash if siteUrl is defined.

## 6.6.2

### Patch Changes

- [`7fc7fec694`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7fc7fec694) - Added siteurl to confluence post query search people link.

## 6.6.1

### Patch Changes

- [`c49c8a7e33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c49c8a7e33) - Append site url to the search people link in confluence.

## 6.6.0

### Minor Changes

- [`6f1e0ae4b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f1e0ae4b1) - Request recent plans during cache warmup like boards, projects, and filters

## 6.5.0

### Minor Changes

- [`d15115fbd9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d15115fbd9) - Added primaryProduct optional prop to CrossProdDialog.

## 6.4.1

### Patch Changes

- [`38e53bf89d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/38e53bf89d) - For empty query append siteUrl if passed. Append siteurl to collab graph people result.

## 6.4.0

### Minor Changes

- [`713db21f39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/713db21f39) - Added optional siteUrl prop to both jira and conf client providers. Ensures this get appended to all relative urls.

## 6.3.0

### Minor Changes

- [`386d71b980`](https://bitbucket.org/atlassian/atlassian-frontend/commits/386d71b980) - Fixed a bug where recent plans would cycle 2 by 2 through the 8 most recent plans

## 6.2.1

### Patch Changes

- [`5e861268d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e861268d8) - Fixed package version in product-search-dialog analytics

## 6.2.0

### Minor Changes

- [`cf5274ead0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf5274ead0) - Added support for external suppliers for recent results in Jira and Conf clients.

## 6.1.0

### Minor Changes

- [`fa19b0dc60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa19b0dc60) - [ux] Extended recent search results for Jira to 8 when plans search is enabled

## 6.0.2

### Patch Changes

- [`2c5fd769c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c5fd769c0) - Adds light atlaskit documentation for @atlassian/product-search-dialog

## 6.0.1

### Patch Changes

- [`1d35389747`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d35389747) - Fix atlaskit:src in search-dialog and product-search-dialog

## 6.0.0

### Major Changes

- [`9720d49b46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9720d49b46) - Publishing from atlassian-frontend
