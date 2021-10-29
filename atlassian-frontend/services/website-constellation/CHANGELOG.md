# @atlaskit/website-constellation

## 0.11.3

### Patch Changes

- [`d26f3bd7b30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d26f3bd7b30) - Migrates form from atlaskit to atlassian.design.

## 0.11.2

### Patch Changes

- Updated dependencies

## 0.11.1

### Patch Changes

- [`5fe6e21a9a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5fe6e21a9a0) - [ux] Upgrade to the latest version of @atlaskit/modal-dialog. This change includes shifting the primary button in the footer of the modal to be on the right instead of the left.
- Updated dependencies

## 0.11.0

### Minor Changes

- [`caec2cee6e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/caec2cee6e0) - Removes `styled-components` dependency from the package. Also uses ThemeV2 API now. There should be no visual or UX change.

### Patch Changes

- Updated dependencies

## 0.10.31

### Patch Changes

- [`0c457b34276`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c457b34276) - Adds scaling metrics to pass the service linter errors

## 0.10.30

### Patch Changes

- [`524b20aff9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/524b20aff9a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`3c0349f272a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0349f272a) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs
- [`591d34f966f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/591d34f966f) - Update package.jsons to remove unused dependencies. Also excludes tests from some build tsconfigs

## 0.10.29

### Patch Changes

- Updated dependencies

## 0.10.28

### Patch Changes

- [`bb3f44de504`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb3f44de504) - Fix 403s arising from gasv3 endpoint due to changes in web-analytics-client

## 0.10.27

### Patch Changes

- Updated dependencies

## 0.10.26

### Patch Changes

- [`83a089fe0cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83a089fe0cc) - Halp has been added to logos. This includes the logo, wordmark and icon.
- Updated dependencies

## 0.10.25

### Patch Changes

- [`197ad8503bf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/197ad8503bf) - Improvements to range and tag group documentation on atlassian.design.

## 0.10.24

### Patch Changes

- Updated dependencies

## 0.10.23

### Patch Changes

- [`44e6c77d533`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44e6c77d533) - Renames exports in page header examples to be more descriptive. For example, Example is renamed to PageHeaderDefaultExample.

## 0.10.22

### Patch Changes

- [`ac373538cdd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac373538cdd) - Page header migrated from atlaskit to atlassian.design. Documentation and examples added along with updated snapshot test.

## 0.10.21

### Patch Changes

- [`4436a629208`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4436a629208) - Resolve dependencies through webpack resolve.

## 0.10.20

### Patch Changes

- [`382176131c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/382176131c9) - [ux] Update component thumbnail images to be SVGs instead of PNGs.

## 0.10.19

### Patch Changes

- Updated dependencies

## 0.10.18

### Patch Changes

- Updated dependencies

## 0.10.17

### Patch Changes

- [`1364434df28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1364434df28) - - Added Contribution guidelines to the Resources section
  - Updated home page Resources links, replacing ‘Templates’ with ‘Contribution’

## 0.10.16

### Patch Changes

- [`13d8a3b16d6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/13d8a3b16d6) - Upgrade @atlassian/micros-serverless-platform dependency to 0.0.9 to fix a security vulnerability in transitive aws-sdk dependency

## 0.10.15

### Patch Changes

- [`10da5b2c8c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10da5b2c8c3) - Remove axe from the default run in development.

## 0.10.14

### Patch Changes

- [`08af4eb0d17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08af4eb0d17) - Upgrade @atlassiansox/analytics-web-client dependency to ^2.1.6 and import via main entry point instead of with-deps where applicable.

## 0.10.13

### Patch Changes

- [`484e6aa7400`](https://bitbucket.org/atlassian/atlassian-frontend/commits/484e6aa7400) - Update description and title in the Algolia search result for all component pages

## 0.10.12

### Patch Changes

- [`c119fdd32e7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c119fdd32e7) - Internal change to update usage of the custom `glyph` prop in @atlaskit/icon.
- Updated dependencies

## 0.10.11

### Patch Changes

- [`9b3f711bb47`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b3f711bb47) - Update description and title in the Algolia search result for all component pages

## 0.10.10

### Patch Changes

- [`682050dfd30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/682050dfd30) - Bump dependency "gatsby-plugin-algolia"

## 0.10.9

### Patch Changes

- Updated dependencies

## 0.10.8

### Patch Changes

- [`89e7c6d597c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89e7c6d597c) - Remove "absolutePath" and "dir" in Algolia search results

## 0.10.7

### Patch Changes

- [`44a7c199493`](https://bitbucket.org/atlassian/atlassian-frontend/commits/44a7c199493) - [ux] Skip links now offers contextual side nav link. Site landmarks now have labels for screen-readers.

## 0.10.6

### Patch Changes

- [`73ff215b867`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73ff215b867) - Add light-weight feature flag configuration to website-constellation. Bring back Codesandbox example behind a feature flag.

## 0.10.5

### Patch Changes

- [`78d8a5199f1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/78d8a5199f1) - Fix bug in redirect handler. Now a redirect will work whether a path has a trailing slash or not.

## 0.10.4

### Patch Changes

- [`a7fbfd39b93`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7fbfd39b93) - Fix the incorrect links for nested content in Algolia indices
- [`e0add39bbbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0add39bbbd) - Separate development indices and production/staging indices in Algolia search

## 0.10.3

### Patch Changes

- Updated dependencies

## 0.10.2

### Patch Changes

- Updated dependencies

## 0.10.1

### Patch Changes

- [`bd87f509bf7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bd87f509bf7) - Changes the way that page titles are constructed - displays the hierarchy i.e. category, tab name and page type

## 0.10.0

### Minor Changes

- [`77e011d7275`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77e011d7275) - [ux] The following dependencies have been removed from the repo due to relying on libraries with incompatible licenses.

  - `gatsby-plugin-sharp`
  - `gatsby-transformer-sharp`
  - `gatsby-remark-images`
  - `gatsby-image`

### Patch Changes

- Updated dependencies

## 0.9.5

### Patch Changes

- [`4a88130299f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a88130299f) - [ux] Constellation card heading margin has now been made consistent across pages (16px)

## 0.9.4

### Patch Changes

- [`f2f66fb196`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2f66fb196) - Inject page url to attributes in the analytics events

## 0.9.3

### Patch Changes

- Updated dependencies

## 0.9.2

### Patch Changes

- [`4a69d128e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a69d128e4) - Update analytics-web-client dependency to version 1.14.0

## 0.9.1

### Patch Changes

- [`2c2739725e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c2739725e) - [ux] Change tabs, local nav links, example buttons and footer links colors to accessible variants

## 0.9.0

### Minor Changes

- [`7d6ded5d12`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d6ded5d12) - Upgrade gatsby to fix lots of VULN issues

### Patch Changes

- Updated dependencies

## 0.8.40

### Patch Changes

- Updated dependencies

## 0.8.39

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 0.8.38

### Patch Changes

- Updated dependencies

## 0.8.37

### Patch Changes

- [`3419bdf99e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3419bdf99e) - Increases API timeout to 20 seconds.

## 0.8.36

### Patch Changes

- [`e4c09100e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4c09100e1) - [ux] Update component card heading spacing to match designs

## 0.8.35

### Patch Changes

- [`ac388734f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac388734f4) - [ux] Subtle visual bug fix to effect alignment and sizing of HomePage cards and Component Page Card text overflow

## 0.8.34

### Patch Changes

- [`ed3c9fcf72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed3c9fcf72) - Add data classification label and compute classification for DSD proxy

## 0.8.33

### Patch Changes

- [`7189478a90`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7189478a90) - Add data classification label and compute classification for DSD proxy

## 0.8.32

### Patch Changes

- [`b42c789d5d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b42c789d5d) - Bump gatsby-plugin-sharp and gatsby-remark-images

## 0.8.31

### Patch Changes

- [`6958479927`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6958479927) - Increase concurrent lamda invocations for design-systems-docs

## 0.8.30

### Patch Changes

- [`aff4f3f317`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aff4f3f317) - Adds analytics to track when log in fails.
- [`0172818599`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0172818599) - Improves layout developer experience by removing the hasXyz props.

## 0.8.29

### Patch Changes

- Updated dependencies

## 0.8.28

### Patch Changes

- [`a557a6d59f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a557a6d59f) - Publishing @atlassian/search-dialog from within atlassian-frontend
- Updated dependencies

## 0.8.27

### Patch Changes

- [`47c29a0b85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47c29a0b85) - Updates cloudwatch alarms.

## 0.8.26

### Patch Changes

- [`db171fa49f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db171fa49f) - Displays error component when authenticated content failed to load.

## 0.8.25

### Patch Changes

- [`217d2b240a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/217d2b240a) - Adding @atlaskit/section-message as a dependency so it can be used in pages
- Updated dependencies

## 0.8.24

### Patch Changes

- [`646d7bb80e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/646d7bb80e) - Sketch docs have been replaced with figma.
- Updated dependencies

## 0.8.23

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

- Updated dependencies

## 0.8.22

### Patch Changes

- Updated dependencies

## 0.8.21

### Patch Changes

- [`25400a2d44`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25400a2d44) - disable transpileTemplateLiterals in gatsby-plugin-styled-components for website-constellation
- [`00f176a980`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00f176a980) - FIX: Broken layout in restricted pages on page refresh
- Updated dependencies

## 0.8.20

### Patch Changes

- [`7f9f3e09b8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f9f3e09b8) - Various accessibility fixes, including labelling nav elements, fixing up heading order, adding a lang attribute to the document, and more.

## 0.8.19

### Patch Changes

- [`a51633fa87`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a51633fa87) - FIX: Temp fix for section jump on page load

## 0.8.18

### Patch Changes

- [`436e30eaae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/436e30eaae) - Fix "Brand" card widths on the home page.

## 0.8.17

### Patch Changes

- [`7b4aa47d6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b4aa47d6d) - Change logo in nav to be an inline SVG instead of an img tag. This will prevent the layout jumping when the image loads in.

## 0.8.16

### Patch Changes

- [`a0fd29301b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0fd29301b) - api cleanup

## 0.8.15

### Patch Changes

- [`57283d35eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/57283d35eb) - Rename duplicated page slugs

## 0.8.14

### Patch Changes

- [`b0fb608d78`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0fb608d78) - Babel plugin for loadable components has been turned off for card icons to allow error handling to work as expected.

## 0.8.13

### Patch Changes

- [`337f6d5ab7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/337f6d5ab7) - Sketch docs have been replaced with figma.

## 0.8.12

### Patch Changes

- Updated dependencies

## 0.8.11

### Patch Changes

- [`22c0e7a862`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22c0e7a862) - Back port layout fixes lost during `develop` to `master` merge

## 0.8.10

### Patch Changes

- [`886294e116`](https://bitbucket.org/atlassian/atlassian-frontend/commits/886294e116) - Adding stg-apse resources

## 0.8.9

### Patch Changes

- [`da3164326a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da3164326a) - FIX: Disable template literal transpilation for styled-components

## 0.8.8

### Patch Changes

- [`0147f58b50`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0147f58b50) - Title flicker when transitioning between sub pages has been fixed.

## 0.8.7

### Patch Changes

- [`53f951cddc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/53f951cddc) - Fix layout bug

## 0.8.6

### Patch Changes

- [`677eda0363`](https://bitbucket.org/atlassian/atlassian-frontend/commits/677eda0363) - Consolidate heading svg in homepage and search results

## 0.8.5

### Patch Changes

- [`bb3c24f83a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb3c24f83a) - Google analytics has been enabled.

## 0.8.4

### Patch Changes

- Updated dependencies

## 0.8.3

### Patch Changes

- [`02a5284a2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02a5284a2e) - FIX: gatsby-plugin-manifest build issue

## 0.8.2

### Patch Changes

- [`039e26f71b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/039e26f71b) - Fix missing \_ in sox namespace declaration

## 0.8.1

### Patch Changes

- [`14069489eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14069489eb) - FIX: Homepage meta description

## 0.8.0

### Minor Changes

- [`1e108c6b4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1e108c6b4f) - Add redirect lambda@edge service to take care of redirects from old ADG / server routes

## 0.7.6

### Patch Changes

- [`63a401af91`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63a401af91) - Fix missing fragment invocation
- [`d890b8e5e4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d890b8e5e4) - Adds screen event analytics to error boundaries.
- [`05993223ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05993223ef) - Fix service descriptor to apply data classification labels correctly
- [`630234661d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/630234661d) - Sentry support has been added to the error boundary.
- [`310b619beb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/310b619beb) - - Add placeholder text for searchbox
  - Align search results with searchbox
- [`ebb5a98185`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ebb5a98185) - FIX: Sub page hyperlinks
- [`fd1fb0aa75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd1fb0aa75) - Add title to Components and resticted pages
- Updated dependencies

## 0.7.5

### Patch Changes

- [`783cb649bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/783cb649bc) - FIX: Homepage featured card caps character

## 0.7.4

### Patch Changes

- [`269ed21405`](https://bitbucket.org/atlassian/atlassian-frontend/commits/269ed21405) - Homepage revamped with new design

## 0.7.3

### Patch Changes

- [`9ccd52d14d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ccd52d14d) - Design fixes have been applied to the general layout and colors.

## 0.7.2

### Patch Changes

- [`a7c7b98675`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7c7b98675) - Add OG meta tags

## 0.7.1

### Patch Changes

- [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the 'lodash' package instead of single-function 'lodash.\*' packages

## 0.7.0

### Minor Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [`b25560917f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b25560917f) - Refactor website-constellation to work with micros deploys. Add micros deploy infra and runbooks

### Patch Changes

- [`72f337ac0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72f337ac0f) - Hide content sub-pages from overview page
- [`cf84e479c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf84e479c1) - Adds analytics that capture screen events for all pages.

## 0.5.3

### Patch Changes

- Updated dependencies

## 0.5.2

### Patch Changes

- [`4b9fdd7e7a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b9fdd7e7a) - Adds initial plumbing for analytics.
- [`88ba9dc154`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88ba9dc154) - Fix url bug in overview cards
- [`0c375e51cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c375e51cb) - Fix bug with card icons and secondaryColor
- Updated dependencies

## 0.5.1

### Patch Changes

- [`ce067c3c3a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce067c3c3a) - Add pipeline deploy script for design-syste-docs-lambda prod

## 0.5.0

### Minor Changes

- [`7aa39b9c40`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7aa39b9c40) - alias added to design-system-docs.sd.yml

## 0.4.2

### Patch Changes

- [`e7fee105c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7fee105c3) - added subpage functionality to side nav and implemented in contentful
- [`09f5bee6eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09f5bee6eb) - Refactored component page rendering and templating
- [`87cbde203a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87cbde203a) - moved do/dont component into theme and changed button mdx to use it
- [`1a92c0bf00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a92c0bf00) - Patch lambda endpoint for fetching contentful content to strip out the parent field. Amended builds cript for QoL
- [`f92f8d4e6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f92f8d4e6e) - Minor nits to search implementation and homepage
- [`f0bcf7f579`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f0bcf7f579) - fixed homepage layout bugs
- [`9a3cbcc053`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a3cbcc053) - search bug fixes
- Updated dependencies

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`3c0cfd4003`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c0cfd4003) - add logout flow

### Patch Changes

- [`01214127c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01214127c9) - Updated netlify-cli to latest version, updated website-constellation constants to reflect .env functionality in netlify dev- [`47a3d346c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47a3d346c6) - Facelift search results to match design spec- [`80e59d0b17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80e59d0b17) - Refactor tables to accomodate non 2 column table types + general QoL fixes- [`3f9ca53752`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f9ca53752) - Fix top-nav nav item rendering in overflow state- Updated dependencies

## 0.3.1

### Patch Changes

- [patch][cb951319b0](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb951319b0):

  Fix issue with circular references from contentful- [patch][64d033b6d5](https://bitbucket.org/atlassian/atlassian-frontend/commits/64d033b6d5):

  Add functionality to close dialog on esc and click away- [patch][4ab2f21b36](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ab2f21b36):

  fixes image cutoff issue and normalizes margins in main content, fix issue with prop duplicate prop-table headings- [patch][9d5b21f7ad](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d5b21f7ad):

  added color cards and dos and donts- Updated dependencies [6b8e60827e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8e60827e):

- Updated dependencies [449ef134b3](https://bitbucket.org/atlassian/atlassian-frontend/commits/449ef134b3):
- Updated dependencies [f4374a322a](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4374a322a):
- Updated dependencies [f6667f2909](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6667f2909):
- Updated dependencies [167a55fd7a](https://bitbucket.org/atlassian/atlassian-frontend/commits/167a55fd7a):
- Updated dependencies [57c0487a02](https://bitbucket.org/atlassian/atlassian-frontend/commits/57c0487a02):
- Updated dependencies [4ab2f21b36](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ab2f21b36):
- Updated dependencies [1e7e54c20e](https://bitbucket.org/atlassian/atlassian-frontend/commits/1e7e54c20e):
- Updated dependencies [9d5b21f7ad](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d5b21f7ad):
  - @atlaskit/button@13.3.11
  - @atlaskit/icon@20.1.1
  - @atlaskit/empty-state@6.0.9
  - @atlaskit/logo@12.3.4
  - @atlaskit/avatar@17.1.10
  - @atlaskit/gatsby-theme-brisk@0.3.1
  - @atlaskit/menu@0.4.1

## 0.3.0

### Minor Changes

- [minor][628f6a765a](https://bitbucket.org/atlassian/atlassian-frontend/commits/628f6a765a):

  Fixed Loadable implementation bug, refactored fluid image logic to not pull in private assets; fixed minor content-renderer bug- [minor][9c6642c288](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c6642c288):

  grid refactor, asset card cleanup, and overview pages added

### Patch Changes

- [patch][a95613ab04](https://bitbucket.org/atlassian/atlassian-frontend/commits/a95613ab04):

  Minor fixes to asset-card components styles- [patch][0300fe18e3](https://bitbucket.org/atlassian/atlassian-frontend/commits/0300fe18e3):

  Fix safari rendering bugs for search- [patch][fccd2b39d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/fccd2b39d9):

  Revert richText.resolveLocales addition, as the feature is not ready (gatsby-source-contentful bug), aded styling for loading state- [patch][335526455f](https://bitbucket.org/atlassian/atlassian-frontend/commits/335526455f):

  Namespace env vars, clean up references to process.env to be in as few places as possible- [patch][38875d800b](https://bitbucket.org/atlassian/atlassian-frontend/commits/38875d800b):

  Minor update to gatsby-source-contentful to latest dep, nit on homepage and pipeline adjustments- Updated dependencies [7e408e4037](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e408e4037):

- Updated dependencies [6453c8de48](https://bitbucket.org/atlassian/atlassian-frontend/commits/6453c8de48):
- Updated dependencies [e4dde0ad13](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4dde0ad13):
- Updated dependencies [41760ea4a6](https://bitbucket.org/atlassian/atlassian-frontend/commits/41760ea4a6):
- Updated dependencies [0c270847cb](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c270847cb):
- Updated dependencies [971e294b1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/971e294b1e):
- Updated dependencies [684ee794d6](https://bitbucket.org/atlassian/atlassian-frontend/commits/684ee794d6):
- Updated dependencies [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies [b9903e773a](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9903e773a):
- Updated dependencies [286770886d](https://bitbucket.org/atlassian/atlassian-frontend/commits/286770886d):
- Updated dependencies [2c1b78027c](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c1b78027c):
- Updated dependencies [aff1210e19](https://bitbucket.org/atlassian/atlassian-frontend/commits/aff1210e19):
- Updated dependencies [9c6642c288](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c6642c288):
- Updated dependencies [fb3ca3a3b2](https://bitbucket.org/atlassian/atlassian-frontend/commits/fb3ca3a3b2):
  - @atlaskit/menu@0.4.0
  - @atlaskit/theme@9.5.3
  - @atlaskit/button@13.3.10
  - @atlaskit/icon-file-type@5.0.4
  - @atlaskit/gatsby-theme-brisk@0.3.0

## 0.2.1

### Patch Changes

- [patch][f3461e03aa](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3461e03aa):

  Remove Flow libraries

## 0.2.0

### Minor Changes

- [minor][c4f18117f2](https://bitbucket.org/atlassian/atlassian-frontend/commits/c4f18117f2):

  Add resources template to website-constellation- [minor][1d31492be9](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d31492be9):

  Added auth integration to website-constellation and associated ui elements in gatsby theme brisk

### Patch Changes

- [patch][e79d2f21ca](https://bitbucket.org/atlassian/atlassian-frontend/commits/e79d2f21ca):

  Patch embed logic to handle REST API anomalies, fix lambda service to leverage contentful SDK, fix content-renderer not reconciling oEmbeds- [patch][8bf9cf7ad5](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bf9cf7ad5):

  Add local-side-nav to protected-content pages- [patch][422941fdb9](https://bitbucket.org/atlassian/atlassian-frontend/commits/422941fdb9):

  fix loading spinner styles for protected routes- Updated dependencies [ed8d8dea65](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed8d8dea65):

- Updated dependencies [8bf9cf7ad5](https://bitbucket.org/atlassian/atlassian-frontend/commits/8bf9cf7ad5):
- Updated dependencies [db2f869556](https://bitbucket.org/atlassian/atlassian-frontend/commits/db2f869556):
- Updated dependencies [81ea791176](https://bitbucket.org/atlassian/atlassian-frontend/commits/81ea791176):
- Updated dependencies [1d31492be9](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d31492be9):
- Updated dependencies [6e2dda87f4](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e2dda87f4):
- Updated dependencies [e57c4aa96d](https://bitbucket.org/atlassian/atlassian-frontend/commits/e57c4aa96d):
- Updated dependencies [c5182f1c53](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5182f1c53):
- Updated dependencies [89d35b919a](https://bitbucket.org/atlassian/atlassian-frontend/commits/89d35b919a):
- Updated dependencies [083cfbaeb4](https://bitbucket.org/atlassian/atlassian-frontend/commits/083cfbaeb4):
- Updated dependencies [46d95777ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/46d95777ef):
- Updated dependencies [9b264df34d](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b264df34d):
  - @atlaskit/menu@0.3.1
  - @atlaskit/gatsby-theme-brisk@0.2.0
  - @atlaskit/atlassian-navigation@0.10.0
  - @atlaskit/empty-state@6.0.8

## 0.1.0

### Minor Changes

- [minor][54b7bbf000](https://bitbucket.org/atlassian/atlassian-frontend/commits/54b7bbf000):

  Removed search from staging pipeline so we don't run algolia indexes- [minor][3d5a392aa7](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d5a392aa7):

  Add auth integration to website-constellation leveraging netlify fns, passport, google oauth2.0 and jwts- [minor][c881e4efb4](https://bitbucket.org/atlassian/atlassian-frontend/commits/c881e4efb4):

  Update search implementation to conform with new designs. Add logic for filtering out private results

### Patch Changes

- Updated dependencies [66dcced7a0](https://bitbucket.org/atlassian/atlassian-frontend/commits/66dcced7a0):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [7a6e5f6e3d](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a6e5f6e3d):
- Updated dependencies [fd5292fd5a](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd5292fd5a):
- Updated dependencies [a9700acd1b](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9700acd1b):
  - @atlaskit/gatsby-theme-brisk@0.1.0
  - @atlaskit/icon@20.1.0
  - @atlaskit/menu@0.3.0
  - @atlaskit/avatar@17.1.9
  - @atlaskit/button@13.3.9
  - @atlaskit/spinner@12.1.6

## 0.0.2

### Patch Changes

- [patch][3fb51d9129](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb51d9129):

  Update gatsby version to 2.19.22 to resolve critical vulnerabilities in atlassian-frontend repository.- Updated dependencies [3fb51d9129](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb51d9129):

  - @atlaskit/gatsby-theme-brisk@0.0.2

## 0.0.1

### Patch Changes

- Updated dependencies [4ed951b8d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ed951b8d8):
- Updated dependencies [602ad2855a](https://bitbucket.org/atlassian/atlassian-frontend/commits/602ad2855a):
- Updated dependencies [5c6a0d9512](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c6a0d9512):
- Updated dependencies [e0e91e02a6](https://bitbucket.org/atlassian/atlassian-frontend/commits/e0e91e02a6):
- Updated dependencies [ca86945834](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca86945834):
- Updated dependencies [b9dc265bc9](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9dc265bc9):
  - @atlaskit/menu@0.2.4
  - @atlaskit/atlassian-navigation@0.9.4
  - @atlaskit/avatar@17.1.6
  - @atlaskit/gatsby-theme-brisk@0.0.1

## 0.0.1

### Patch Changes

- Updated dependencies [24edf508bf](https://bitbucket.org/atlassian/atlassian-frontend/commits/24edf508bf):
  - @atlaskit/atlassian-navigation@0.9.0
