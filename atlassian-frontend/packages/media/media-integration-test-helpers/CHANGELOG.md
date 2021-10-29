# @atlaskit/media-integration-test-helpers

## 2.5.4

### Patch Changes

- Updated dependencies

## 2.5.3

### Patch Changes

- [`b90c0237824`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b90c0237824) - Update package.jsons to remove unused dependencies.
- Updated dependencies

## 2.5.2

### Patch Changes

- Updated dependencies

## 2.5.1

### Patch Changes

- [`e27ae32b498`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e27ae32b498) - Fix way we convert query parameters from host page to another example url inside iframe
- Updated dependencies

## 2.5.0

### Minor Changes

- [`f7ff2c84451`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7ff2c84451) - bump json-ld-types from 2.2.2 to ^2.3.0"

### Patch Changes

- Updated dependencies

## 2.4.4

### Patch Changes

- Updated dependencies

## 2.4.3

### Patch Changes

- Updated dependencies

## 2.4.2

### Patch Changes

- [`65540cec576`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65540cec576) - Change logic a bit in waitForIFrameToSendResizeMessageTimes as well as use uuid/v4 in MediaEmbedHtmlSource
- [`1984f0ab318`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1984f0ab318) - Specify version 0.3.2 for @atlaskit/visual-regression in package.json
- Updated dependencies

## 2.4.1

### Patch Changes

- Updated dependencies

## 2.4.0

### Minor Changes

- [`4f6cabbd1a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f6cabbd1a0) - [ux] Add support in smart links client to return custom name as part of payload

### Patch Changes

- [`695ce4fe717`](https://bitbucket.org/atlassian/atlassian-frontend/commits/695ce4fe717) - Adds additional request access metadata to forbidden urls if avalible
- Updated dependencies

## 2.3.5

### Patch Changes

- [`75705c3ec80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/75705c3ec80) - Wait until we navigate off of about:blank before checking url

## 2.3.4

### Patch Changes

- Updated dependencies

## 2.3.3

### Patch Changes

- Updated dependencies

## 2.3.2

### Patch Changes

- Updated dependencies

## 2.3.1

### Patch Changes

- Updated dependencies

## 2.3.0

### Minor Changes

- [`4b2bd7b0fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b2bd7b0fa) - Introduce new members: `waitForSuccessfullyResolvedEmbedCard`, `embedCombinationsWithTitle`, `generateEmbedCombinationAdf`, `EmbedHelper`, `MediaEmbedHtmlSource`

### Patch Changes

- Updated dependencies

## 2.2.4

### Patch Changes

- [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 2.2.3

### Patch Changes

- Updated dependencies

## 2.2.2

### Patch Changes

- [`52b1353be9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52b1353be9) - BMT-611 Added integration test for Giphy cloud files
- Updated dependencies

## 2.2.1

### Patch Changes

- [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 2.2.0

### Minor Changes

- [`c2e573479c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c2e573479c) - EDM-937: added prefetching to Smart Links rendering path.

  As of this version of `@atlaskit/smart-card`, when a Smart Link is initially rendered, one of two things will take place:

  - The link will be considered as within the viewport, and a `fetch` and `render` path will be taken, or;
  - The link will be considered as outside of the viewport, and a `prefetch` and `render` later path will be taken.

  In the latter, the approach taken has been to separate the rendering of the UI of Smart Links from the data backing the Smart Link. This is important, as, otherwise, the browser will become extremely busy even though Smart Links are not in the viewport. Thus, instead, the data for Smart Links is fetched in the background, and persisted to the store.

  A few additional points here are:

  - The prefetching logic has been implemented as a hook which can be used in other components, `usePrefetch`;
  - The prefetching logic is error-safe, in that, if errors take place whilst replacing there should be no repercussions (this has been tested);
  - The prefetching logic and fetching logic peacefully co-exist, in that, if a link is scrolled into view whilst it is being prefetched, subject to prior logic in the Smart Links reducers, either one or the other is taken as the canonical source of truth for representation of the link's metadata (whichever finishes first, to benefit the customer experience).

  Tests have been added to verify associated functionality, with an integration test added to ensure the number of network requests at two points, (1) on initial page load and, (2) after scrolling to the end of the page are the same.

  **Note**: Prefetching is enabled by default. This is deliberate to minimise the UI reflow and associated 'jank' in the Smart Links experience. If required, opt-out behaviour will be provided in the future.

- [`7d831363d9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d831363d9) - Migrated to declarative entry points

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [`6e5372dcda`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6e5372dcda) - **Ticket:** EDM-1121

  **Changes:**

  Added integration tests across the board, asserting that a new window is opened to kick off the 3LO flow.

  - Added integration test for account connection and try another account flows for Inline Links;
  - Added integration test for account connection and try another account flows for Card Links;
  - Added integration test for account connection and try another account flows for Embed Links;
  - Aligned `data-testid`s across all buttons for all unauthenticated views for each of the above to be - `button-connect-account` for connecting account, and `button-connect-other-account` for trying with another account.

  Further, added an `AuthorizationWindow` method to the `@atlaskit/media-integration-test-helpers`, with the following methods:

  - `AuthorizationWindow.open()` - to open a window to authorize, dependent on which card state it is being activated from;
  - `AuthorizationWindow.checkUrl()` - to check if the window URL when redirected is the same as the `MOCK_URL_AUTH_PROVIDER` inside of the package for assertions which ship with our mocks;
  - `AuthorizationWindow.close()` - to close the window opened for authorization.

- [`9468594ef9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9468594ef9) - **Ticket:** EDM-1120

  **Changes:**

  - Refactored Card Link `view` tests to separate files to be more maintainable;
  - Added unit tests to all Card Link actions;
  - Added unit tests to Card Link PreviewAction;
  - Added `openPreviewState` and `waitForPreviewState` selectors for VR tests;
  - Added VR test in Editor for Preview State;
  - Added VR test in Renderer for Preview State.

- [`6089993d2e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6089993d2e) - EDM-1116: centralize Smart Links selector and client utils for Integration, VR tests. Added mega-VR test for Smart Links in Renderer.

  Selectors exported now include:

  - `inlineCardSelector` - for selecting the Inline Link representation, in any of its resolved or unresolved states;
  - `blockCardSelector` - for selecting the Card Link representation, in any of its resolved or unresolved states;
  - `embedCardSelector` - for selecting the Embed Link representation, in any of its resolved or unresolved states;
  - `lazyCardSelector` - for selecting the fallback representation of Smart Links whilst lazy rendering;
  - `getLazyRenderedCards` - for getting DOM references to all Smart Links currently off the viewport, and rendered with a lazy fallback;
  - `getCards` - for getting DOM references to all rendered Smart Links;
  - `waitForLazyRenderedCard` - a predicate for when a fallback Smart Link has been rendered;
  - `waitForResolvedInlineCard` - a predicate for when an Inline Link has been rendered;
  - `waitForResolvedBlockCard` - a predicate for when a Block Link has been rendered;
  - `waitForResolvedEmbedCard` - a predicate for when an Embed Link has been rendered;
  - `waitForInlineCardSelection` - a predicate for when an Inline Link has been rendered and selected in the Teamwork Platform Editor;
  - `waitForBlockCardSelection` - a predicate for when a Card Link has been rendered and selected in the Teamwork Platform Editor;
  - `waitForEmbedCardSelection` - a predicate for when an Embed Link has been rendered and selected in the Teamwork Platform Editor.

  Further, a `cardClient` is now shipped from the same test helpers package, with up-to-date mock responses for a host of test URLs (in the format, `https://<type: 'inline' | 'block' | 'embed'>Card/<status: 'resolved' | 'unauthorised' | 'forbidden' | ...>`). Importantly _all_ selectors are powered by `testId`s part of the implementation of Smart Links in `@atlaskit/smart-card` and `@atlaskit/media-ui`.

### Patch Changes

- [`97405d3f0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97405d3f0e) - fix: ensure that the Preview State is visible when asserting its existence.
- Updated dependencies

## 2.0.6

### Patch Changes

- [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 2.0.5

### Patch Changes

- Updated dependencies

## 2.0.4

### Patch Changes

- [`fa6fb5dfbb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa6fb5dfbb) - Removing unused code to be published
- Updated dependencies

## 2.0.3

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [`6bcdf043ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bcdf043ae) - Fixed flaky Media-Viewer integration tests
- Updated dependencies

## 2.0.0

### Major Changes

- [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 1.1.5

### Patch Changes

- Updated dependencies

## 1.1.4

### Patch Changes

- Updated dependencies

## 1.1.3

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- Updated dependencies

## 1.1.1

### Patch Changes

- [patch][4955ff3d36](https://bitbucket.org/atlassian/atlassian-frontend/commits/4955ff3d36):

  Minor package.json config compliance updates- Updated dependencies [9d2da865dd](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d2da865dd):

- Updated dependencies [9a93eff8e6](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a93eff8e6):
  - @atlaskit/media-card@67.1.1

## 1.1.0

### Minor Changes

- [minor][4dbce7330c](https://bitbucket.org/atlassian/atlassian-frontend/commits/4dbce7330c):

  New APIs: MediaPickerPageObject, RecentCardFilter and MediaViewerPageObject from media-test-helpers to media-integration-test-helpers

### Patch Changes

- Updated dependencies [64fb94fb1e](https://bitbucket.org/atlassian/atlassian-frontend/commits/64fb94fb1e):
- Updated dependencies [be57ca3829](https://bitbucket.org/atlassian/atlassian-frontend/commits/be57ca3829):
- Updated dependencies [d7ed7b1513](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7ed7b1513):
- Updated dependencies [39ee28797d](https://bitbucket.org/atlassian/atlassian-frontend/commits/39ee28797d):
- Updated dependencies [695e1c1c31](https://bitbucket.org/atlassian/atlassian-frontend/commits/695e1c1c31):
- Updated dependencies [109c1a2c0a](https://bitbucket.org/atlassian/atlassian-frontend/commits/109c1a2c0a):
- Updated dependencies [c57bb32f6d](https://bitbucket.org/atlassian/atlassian-frontend/commits/c57bb32f6d):
  - @atlaskit/webdriver-runner@0.3.0
  - @atlaskit/media-card@67.1.0
