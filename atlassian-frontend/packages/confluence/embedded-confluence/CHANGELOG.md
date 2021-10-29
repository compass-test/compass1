# @atlassian/embedded-confluence

## 5.5.4

### Patch Changes

- [`23c79d856b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23c79d856b4) - Fix issue when using useReactProps multiple places the props won't update

## 5.5.3

### Patch Changes

- [`54c6c164f0f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54c6c164f0f) - Grant more features to EP iframe (the same granted features as smart card)

## 5.5.2

### Patch Changes

- [`09633e098c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09633e098c7) - Fix smartlink embed cannot copy content headings.

## 5.5.1

### Patch Changes

- [`635f0ad8879`](https://bitbucket.org/atlassian/atlassian-frontend/commits/635f0ad8879) - A few UI polishes and fix on the Confluence footer

## 5.5.0

### Minor Changes

- [`57f52bc6654`](https://bitbucket.org/atlassian/atlassian-frontend/commits/57f52bc6654) - Send UI analytic event to track Embeddable Page footer click count

## 5.4.3

### Patch Changes

- [`c8671213f7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8671213f7c) - Set analytics up before starting experiences

## 5.4.2

### Patch Changes

- [`df7cf010f98`](https://bitbucket.org/atlassian/atlassian-frontend/commits/df7cf010f98) - Clean up imports that brought in more than needed

## 5.4.1

### Patch Changes

- Updated dependencies

## 5.4.0

### Minor Changes

- [`fff886195a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fff886195a9) - Setup experience tracking for EditPage component - sending analytics Operational events

## 5.3.0

### Minor Changes

- [`a0916d03c8e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0916d03c8e) - Add contentId, routeName, spaceKey to navigationPolicy modifiers.
  Update README.md and mark Embedded View "onEdit" props to be deprecated soon. Use "navigationPolicy" instead to handle navigation on "Edit" icon click.

## 5.2.0

### Minor Changes

- [`6bd3f179d73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bd3f179d73) - Fix createContent article so it has default parentPageId and show up in Confluence page tree

## 5.1.1

### Patch Changes

- Updated dependencies

## 5.1.0

### Minor Changes

- [`8421a28d2b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8421a28d2b1) - drop EmbeddedConfluence from naming - internal implementation minor change

## 5.0.0

### Major Changes

- [`9fa3cf6add5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fa3cf6add5) - Entry-point API changes:

  - `"@atlassian/embedded-confluence/EmbeddedConfluenceIframeElementType"` to `"@atlassian/embedded-confluence/getIframeObservable"`
  - `"@atlassian/embedded-confluence/getEmbeddedConfluenceIframeObservable"` to `"@atlassian/embedded-confluence/IframeElementType"`
  - `getEmbeddedConfluenceIframeObservable_DO_NOT_USE` to `getIframeObservable_DO_NOT_USE`
  - `EmbeddedConfluenceIframePassThroughProps` to `IframePassThroughProps`
  - `EmbeddedEditComponentIframePassThroughPr` to `EditPageIframePassThroughProps`
  - `EmbeddedViewComponentIframePassThroughProps` to `ViewPageIframePassThroughProps`
  - `useEmbeddedConfluenceReactProps` to `useReactProps_DO_NOT_USE`

## 4.0.0

### Major Changes

- [`436d9c9f924`](https://bitbucket.org/atlassian/atlassian-frontend/commits/436d9c9f924) - API change: ConfluenceEmbeddedEditComponent -> EditPage, ConfluenceEmbeddedViewComponent -> ViewPage, EmbeddedEditComponentIframePassThroughProps -> EditPageIframePassThroughProps, EmbeddedViewComponentIframePassThroughProps -> ViewPageIframePassThroughProps, createEmbeddedConfluenceContent -> createContent

## 3.16.1

### Patch Changes

- [`e87f666d726`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e87f666d726) - resolve react-router version to align with CCFE 5.1.2

## 3.16.0

### Minor Changes

- [`1607b3f030b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1607b3f030b) - Move the setup of analytics outside of experience tracker

## 3.15.0

### Minor Changes

- [`1c36965e945`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c36965e945) - Add PageComponent to be able to integrate with smartlink. Add implementation for extracting contentId, spaceKey, parentProduct and other properties from URL. Only view page/blog routes are supported.

## 3.14.1

### Patch Changes

- [`50dcf10c6c2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50dcf10c6c2) - Downgrade analytics-next to 8.0.0

## 3.14.0

### Minor Changes

- [`aec1bff6a9f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aec1bff6a9f) - [ux] Add showEdit and showDelete prop to show/hide edit and delete respectively in EP View Page

## 3.13.0

### Minor Changes

- [`5ae83726069`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ae83726069) - Add analytic web client and create instance for view and edit components

## 3.12.0

### Minor Changes

- [`60c65a3162f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60c65a3162f) - Reorganize directory structure and remove unused entry points
  These entry points are removed in this Minor version:

  - `createEmbeddedConfluenceContent`
  - `i18n`
  - `isEmbeddedConfluenceInIframe`
  - `PageComponentProps`
  - `useConfluenceEmbeddedUrl`
  - `useIframeCommunicateEPProps`

## 3.11.0

### Minor Changes

- [`e851363ec5d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e851363ec5d) - Set up analytic event to be fired for EP view page experience tracker event

## 3.10.0

### Minor Changes

- [`94465366175`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94465366175) - Add `createExperienceTrackerAnalyticsEventPayload` function to return Confluence experience analytic event payload

## 3.9.0

### Minor Changes

- [`fc803b801eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fc803b801eb) - Allow unlicensed user access for create embedded confluence content

## 3.8.1

### Patch Changes

- [`1f74c0c87d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1f74c0c87d4) - Fix the issue that EP react props gets returned by hook only after committing to DOM.

## 3.8.0

### Minor Changes

- [`32c30637043`](https://bitbucket.org/atlassian/atlassian-frontend/commits/32c30637043) - Implement experience (start, fail, succeed, abort) for EP view page

## 3.7.0

### Minor Changes

- [`aca24ee89aa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aca24ee89aa) - connect embedded confluence experience tracker to parent product experience tracker

## 3.6.0

### Minor Changes

- [`8ac99932a72`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ac99932a72) - refactoring: pass function forwardExperiences via useIframeCommunicateEPReactProps hook instead of entry-point export

## 3.5.0

### Minor Changes

- [`bbea02043a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bbea02043a4) - Add `isUnlicensedAccessEnabled` to be the check where unlicensed work can be wrapped under

## 3.4.1

### Patch Changes

- [`65d0d60f266`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65d0d60f266) - attach ExperienceTrackerType to View and Edit component type individually because both are individualy exported and usaged in CC

## 3.4.0

### Minor Changes

- [`cb931f0cd4c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb931f0cd4c) - Add entity ids from parent product (parentProductContentContainerId, parentProductContentId) and parentProduct to iframe url query params.

  Update `isEmbeddedConfluence` check to account for checking query param `parentProduct`

## 3.3.0

### Minor Changes

- [`7beaa28afa1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7beaa28afa1) - added experience tracker as prop in Iframe

## 3.2.0

### Minor Changes

- [`c44152ca151`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c44152ca151) - Add title attribute to embedded-confluence iframe

## 3.1.0

### Minor Changes

- [`fcd8191ea47`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fcd8191ea47) - Implement experiences forwarding and export it using entry point

## 3.0.0

### Major Changes

- [`a16bba95bb2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a16bba95bb2) - Non-backward compatible API changes:

  - Renamed `pageId` to `contentId`
  - Renamed `customClassName` to `className`

  Backward compatible API changes:

  - For view and edit components, accepting new props for permission checks:
    - `parentProductContentContainerId`
    - `parentProductContentId`
  - For edit component, accepting new prop:
    - `parentProduct`

## 2.15.1

### Patch Changes

- [`e3d4fd7e745`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3d4fd7e745) - Temporarily disable SSR for Embeddable view page

## 2.15.0

### Minor Changes

- [`048369de90c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/048369de90c) - Make Embedded View Footer Logo clickable

## 2.14.0

### Minor Changes

- [`51ec6b8e2fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/51ec6b8e2fc) - Remove the check for FF "confluence.frontend.enable.embedded.experience"

## 2.13.0

### Minor Changes

- [`c0df5073a8c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0df5073a8c) - Add onPublishSuccess props for EmbeddedEditor

## 2.12.0

### Minor Changes

- [`e782069d051`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e782069d051) - Update isEmbedded to embedded for createEmbeddedConfluenceContent

## 2.11.0

### Minor Changes

- [`82d9e5686d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82d9e5686d0) - Add onEdit prop for ConfluenceEmbeddedViewComponent

## 2.10.0

### Minor Changes

- [`33938eab8a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33938eab8a9) - Export ts type: navigation policy navigate modifiers

## 2.9.0

### Minor Changes

- [`5e7ed4cdc05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e7ed4cdc05) - Move 'isEmbeddedConfluence' utility function from confluence-frontend to atlassian-frontend

## 2.8.0

### Minor Changes

- [`46b605e29ac`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46b605e29ac) - Add createEmbeddedConfluenceContent function for page creation

## 2.7.0

### Minor Changes

- [`ef471b7062b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef471b7062b) - Add navigationPolicy prop for view and edit page.

## 2.6.0

### Minor Changes

- [`74898c96a91`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74898c96a91) - Added support for mandatory prop `parentProduct` which needs to be passed by the parent product

## 2.5.0

### Minor Changes

- [`739ea61bb83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/739ea61bb83) - Add support for `shimUrl`

## 2.4.0

### Minor Changes

- [`91dbb2841ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91dbb2841ce) - Allow Embedded Editor to accept onClose props

## 2.3.0

### Minor Changes

- [`60ba55a10ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60ba55a10ff) - Add support for `hasByLine`, `hasComments`, `hasContributor` and `hasLikes`

## 2.2.0

### Minor Changes

- [`024db4b511`](https://bitbucket.org/atlassian/atlassian-frontend/commits/024db4b511) - Update iframe url of editor component to load EmbeddedEditor

## 2.1.0

### Minor Changes

- [`52a8315fbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52a8315fbd) - Add the observer to set up the React props from parent product and accessible by CC-FE

## 2.0.1

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.0.0

### Major Changes

- [`0dfe2433b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0dfe2433b9) - Drop the support of accepting `title` prop from parent product. The need of `title` was due to a bug in cc-frontend. The bug has been addressed in cc-frontend, so there is no need for `@atlassian/embedded-confluence` to accept `title` prop anymore

## 1.4.2

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [`5b787b3c3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b787b3c3e) - Remove unnecesary export of ConfluenceEmbeddedIFrame

## 1.3.1

### Patch Changes

- [`8657a9a18c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8657a9a18c) - Fix issue the title included in confluence url is not encoded, causing page refreshing and losing query param

## 1.3.0

### Minor Changes

- [`6ef500709d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ef500709d) - resize confluence logo from 32 to 24 medium to small

## 1.2.1

### Patch Changes

- [`89ad140f21`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89ad140f21) - Add height 100% on container

## 1.2.0

### Minor Changes

- [`355139b7dd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/355139b7dd) - CBT-79 Add title to embedded url, and add confluence logo

## 1.1.0

### Minor Changes

- [`47e0c541a7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/47e0c541a7) - Export embedded iframe component

## 1.0.4

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 1.0.3

### Patch Changes

- [`832f55b78f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/832f55b78f) - Update embedded url

## 1.0.2

### Patch Changes

- [`158ed8aa3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/158ed8aa3e) - Remove dependecies to atlaskit/grid and use css grid to fix error on loading the example page

## 1.0.1

### Patch Changes

- [`e1f9a56fd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e1f9a56fd7) - CBT-26 Attempt to fix the broken examples

## 1.0.0

### Major Changes

- [`37c5a3fd2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c5a3fd2d) - CBT-26 Initial setups for package embedded-confluence
